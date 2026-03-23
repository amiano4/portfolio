import { access, readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { projectOverrides, siteConfig } from '~~/shared/site'
import type { ProjectSummary } from '~~/shared/types'

interface GithubRepository {
  name: string
  full_name: string
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
  owner: {
    login: string
  }
}

interface PortfolioInfo {
  title?: string
  summary?: string
  role?: string
  featured?: boolean
  hidden?: boolean
  order?: number
  private?: boolean
  showGithubLink?: boolean
  stack?: string[]
  categories?: string[]
  highlights?: string[]
  snapshots?: string[]
}

interface RepoPortfolioMeta {
  info: PortfolioInfo | null
  snapshots: string[]
}

const assetExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']
const localPortfolioRoot = join(process.cwd(), '.portfolio')

const categoryMatchers: Array<{ category: string; terms: string[] }> = [
  {
    category: 'Mobile',
    terms: ['quasar', 'capacitor', 'android', 'ios', 'mobile', 'mobile-app', 'cordova', 'react-native', 'flutter']
  },
  {
    category: 'Desktop',
    terms: ['electron', 'tauri', 'desktop', 'desktop-app']
  },
  {
    category: 'IoT',
    terms: ['iot', 'arduino', 'esp32', 'raspberry', 'embedded', 'sensor', 'mqtt', 'microcontroller']
  },
  {
    category: 'Web',
    terms: ['laravel', 'vue', 'symfony', 'nuxt', 'react', 'next', 'web', 'api', 'dashboard', 'portal', 'website']
  },
  {
    category: 'Internal tools',
    terms: ['internal', 'admin', 'erp', 'pos', 'inventory', 'workflow', 'operations', 'backoffice', 'management']
  },
  {
    category: 'Tooling',
    terms: ['cli', 'automation', 'tooling', 'devtools', 'script', 'command-line']
  },
  {
    category: 'OSS / Package',
    terms: ['library', 'package', 'plugin', 'toolkit', 'boilerplate', 'template', 'starter']
  }
]

const buildGithubHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'almario-portfolio'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

const encodeGithubPath = (path: string) => path.split('/').map((segment) => encodeURIComponent(segment)).join('/')

const buildAssetProxyUrl = (fullName: string, assetPath: string) => {
  const [owner, repo] = fullName.split('/')
  const encodedAssetPath = assetPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `/api/project-assets/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodedAssetPath}`
}

const parseGithubFileContent = (payload: { content?: string; encoding?: string }) => {
  if (!payload.content) {
    return null
  }

  if (payload.encoding === 'base64') {
    return Buffer.from(payload.content, 'base64').toString('utf8')
  }

  return payload.content
}

const normalizeCategoryList = (values: string[]) =>
  [...new Set(values.map((value) => value.trim()).filter(Boolean))]

const deriveCategories = (repository: GithubRepository, info: PortfolioInfo | null, stack: string[]) => {
  if (info?.categories?.length) {
    return normalizeCategoryList(info.categories)
  }

  const haystack = [
    repository.name,
    repository.description || '',
    repository.language || '',
    repository.homepage || '',
    ...(repository.topics || []),
    ...stack
  ]
    .join(' ')
    .toLowerCase()

  const matched = categoryMatchers
    .filter(({ terms }) => terms.some((term) => haystack.includes(term)))
    .map(({ category }) => category)

  if (matched.length) {
    return normalizeCategoryList(matched)
  }

  const language = (repository.language || '').toLowerCase()

  if (['php', 'javascript', 'typescript', 'html', 'css', 'twig'].includes(language)) {
    return ['Web']
  }

  if (['java', 'kotlin', 'swift', 'dart'].includes(language)) {
    return ['Mobile']
  }

  return ['Software']
}

const isLocalRepoOverlay = (repository: GithubRepository, username: string) =>
  repository.owner.login.toLowerCase() === username && repository.name === 'portfolio'

const readLocalPortfolioInfo = async () => {
  try {
    const content = await readFile(join(localPortfolioRoot, 'info.json'), 'utf8')
    return JSON.parse(content) as PortfolioInfo
  } catch {
    return null
  }
}

const readLocalPortfolioSnapshots = async (fullName: string, info: PortfolioInfo | null) => {
  const explicitSnapshots = (info?.snapshots || [])
    .filter((path) => path.startsWith('.portfolio/'))
    .map((path) => buildAssetProxyUrl(fullName, path))

  if (explicitSnapshots.length) {
    return explicitSnapshots
  }

  try {
    const entries = await readdir(join(localPortfolioRoot, 'snapshots'), { withFileTypes: true })

    return entries
      .filter((entry) => entry.isFile() && assetExtensions.some((extension) => entry.name.toLowerCase().endsWith(extension)))
      .sort((left, right) => {
        const leftIsCover = left.name.startsWith('cover.')
        const rightIsCover = right.name.startsWith('cover.')

        if (leftIsCover !== rightIsCover) {
          return leftIsCover ? -1 : 1
        }

        return left.name.localeCompare(right.name)
      })
      .map((entry) => buildAssetProxyUrl(fullName, `.portfolio/snapshots/${entry.name}`))
  } catch {
    return []
  }
}

const readPortfolioInfo = async (headers: Record<string, string>, fullName: string) => {
  const response = await $fetch<{ content?: string; encoding?: string }>(
    `https://api.github.com/repos/${fullName}/contents/${encodeGithubPath('.portfolio/info.json')}`,
    { headers }
  ).catch(() => null)

  if (!response) {
    return null
  }

  const content = parseGithubFileContent(response)

  if (!content) {
    return null
  }

  try {
    return JSON.parse(content) as PortfolioInfo
  } catch {
    return null
  }
}

const readPortfolioSnapshots = async (
  headers: Record<string, string>,
  fullName: string,
  info: PortfolioInfo | null
) => {
  const explicitSnapshots = (info?.snapshots || [])
    .filter((path) => path.startsWith('.portfolio/'))
    .map((path) => buildAssetProxyUrl(fullName, path))

  if (explicitSnapshots.length) {
    return explicitSnapshots
  }

  const response = await $fetch<Array<{ type: string; name: string; path: string }>>(
    `https://api.github.com/repos/${fullName}/contents/${encodeGithubPath('.portfolio/snapshots')}`,
    { headers }
  ).catch(() => [])

  return response
    .filter((entry) => entry.type === 'file' && assetExtensions.some((extension) => entry.name.toLowerCase().endsWith(extension)))
    .sort((left, right) => {
      const leftIsCover = left.name.startsWith('cover.')
      const rightIsCover = right.name.startsWith('cover.')

      if (leftIsCover !== rightIsCover) {
        return leftIsCover ? -1 : 1
      }

      return left.name.localeCompare(right.name)
    })
    .map((entry) => buildAssetProxyUrl(fullName, entry.path))
}

const loadRepoPortfolioMeta = async (
  headers: Record<string, string>,
  repository: GithubRepository,
  username: string
): Promise<RepoPortfolioMeta> => {
  if (isLocalRepoOverlay(repository, username)) {
    const info = await readLocalPortfolioInfo()
    const snapshots = await readLocalPortfolioSnapshots(repository.full_name, info)

    return {
      info,
      snapshots
    }
  }

  const info = await readPortfolioInfo(headers, repository.full_name)
  const snapshots = await readPortfolioSnapshots(headers, repository.full_name, info)

  return {
    info,
    snapshots
  }
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const query = getQuery(event)
  const username = String(runtimeConfig.public.githubUsername || '').toLowerCase()
  const featuredOnly = query.featured === 'true'
  const limit = Number(query.limit || 0)
  const headers = buildGithubHeaders(runtimeConfig.githubToken)

  const repositories = await (runtimeConfig.githubToken
    ? $fetch<GithubRepository[]>('https://api.github.com/user/repos', {
        headers,
        query: {
          visibility: 'all',
          affiliation: 'owner,collaborator,organization_member',
          sort: 'updated',
          direction: 'desc',
          per_page: 100
        }
      })
    : $fetch<GithubRepository[]>(`https://api.github.com/users/${username}/repos`, {
        headers,
        query: {
          sort: 'updated',
          direction: 'desc',
          per_page: 100
        }
      })
  ).catch(() => [])

  const candidateRepositories = repositories.filter((repository) => !repository.fork && !repository.archived)

  const portfolioMetaByRepo = new Map<string, RepoPortfolioMeta>()

  await Promise.all(
    candidateRepositories.map(async (repository) => {
      const meta = await loadRepoPortfolioMeta(headers, repository, username)
      portfolioMetaByRepo.set(repository.full_name, meta)
    })
  )

  const projects = candidateRepositories
    .map<ProjectSummary | null>((repository) => {
      const override = projectOverrides[repository.name] || {}
      const portfolioMeta = portfolioMetaByRepo.get(repository.full_name)
      const info = portfolioMeta?.info || null
      const snapshots = portfolioMeta?.snapshots || []
      const ownedByUser = repository.owner.login.toLowerCase() === username
      const curated = Boolean(info)
      const safeToExpose = ownedByUser || curated || Boolean(projectOverrides[repository.name])

      if (!safeToExpose || info?.hidden || override.hidden) {
        return null
      }

      const stack = info?.stack?.length
        ? info.stack
        : override.stack?.length
          ? override.stack
          : ([...(repository.topics || []), repository.language].filter(Boolean) as string[])

      const categories = deriveCategories(repository, info, stack)
      const showGithubLink = info?.showGithubLink ?? !repository.private

      return {
        repoName: repository.name,
        fullName: repository.full_name,
        name: info?.title || repository.name,
        description:
          info?.summary ||
          override.summary ||
          repository.description ||
          'Repository with implementation details available through the portfolio.',
        githubUrl: showGithubLink ? repository.html_url : null,
        homepage: repository.homepage,
        language: repository.language,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        updatedAt: repository.updated_at,
        topics: [...(repository.topics || []), ...categories],
        categories,
        featured: info?.featured ?? override.featured ?? siteConfig.featuredRepos.includes(repository.name),
        role: info?.role || override.role,
        stack,
        highlights: info?.highlights || override.highlights || [],
        isPrivate: repository.private,
        curated,
        showGithubLink,
        previewImage: snapshots[0] || null,
        snapshots
      }
    })
    .filter((project): project is ProjectSummary => Boolean(project))
    .sort((left, right) => {
      const leftInfo = portfolioMetaByRepo.get(left.fullName)?.info
      const rightInfo = portfolioMetaByRepo.get(right.fullName)?.info
      const leftOrder = leftInfo?.order ?? projectOverrides[left.repoName]?.order ?? Number.MAX_SAFE_INTEGER
      const rightOrder = rightInfo?.order ?? projectOverrides[right.repoName]?.order ?? Number.MAX_SAFE_INTEGER

      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1
      }

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      if (left.curated !== right.curated) {
        return left.curated ? -1 : 1
      }

      if (left.isPrivate !== right.isPrivate) {
        return left.isPrivate ? -1 : 1
      }

      return +new Date(right.updatedAt) - +new Date(left.updatedAt)
    })

  const filteredProjects = featuredOnly ? projects.filter((project) => project.featured) : projects

  if (limit > 0) {
    return filteredProjects.slice(0, limit)
  }

  return filteredProjects
})
