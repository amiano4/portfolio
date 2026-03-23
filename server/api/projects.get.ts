import { projectOverrides, siteConfig } from '~~/shared/site'
import type { ProjectSummary } from '~~/shared/types'

interface GithubRepository {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics?: string[]
  fork: boolean
  private: boolean
  archived: boolean
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const query = getQuery(event)
  const username = runtimeConfig.public.githubUsername
  const featuredOnly = query.featured === 'true'
  const limit = Number(query.limit || 0)

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'almario-portfolio'
  }

  if (runtimeConfig.githubToken) {
    headers.Authorization = `Bearer ${runtimeConfig.githubToken}`
  }

  const repositories = await $fetch<GithubRepository[]>(`https://api.github.com/users/${username}/repos`, {
    headers,
    query: {
      sort: 'updated',
      direction: 'desc',
      per_page: 100
    }
  }).catch(() => [])

  const projects = repositories
    .filter((repository) => !repository.private && !repository.fork && !repository.archived)
    .map<ProjectSummary>((repository) => {
      const override = projectOverrides[repository.name] || {}
      const stack = override.stack?.length ? override.stack : [...(repository.topics || []), repository.language].filter(Boolean) as string[]

      return {
        name: repository.name,
        description: override.summary || repository.description || 'Public repository with implementation details available on GitHub.',
        url: repository.html_url,
        homepage: repository.homepage,
        language: repository.language,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        updatedAt: repository.updated_at,
        topics: repository.topics || [],
        featured: override.featured ?? siteConfig.featuredRepos.includes(repository.name),
        role: override.role,
        stack,
        highlights: override.highlights || []
      }
    })
    .filter((project) => !(projectOverrides[project.name]?.hidden))
    .sort((left, right) => {
      const leftOrder = projectOverrides[left.name]?.order ?? Number.MAX_SAFE_INTEGER
      const rightOrder = projectOverrides[right.name]?.order ?? Number.MAX_SAFE_INTEGER

      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1
      }

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      if (left.stars !== right.stars) {
        return right.stars - left.stars
      }

      return +new Date(right.updatedAt) - +new Date(left.updatedAt)
    })

  const filteredProjects = featuredOnly ? projects.filter((project) => project.featured) : projects

  if (limit > 0) {
    return filteredProjects.slice(0, limit)
  }

  return filteredProjects
})
