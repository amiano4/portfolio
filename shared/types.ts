export type PortfolioMode = 'product' | 'developer'

export interface WorkMetric {
  label: string
  value: string
  note?: string
}

export interface WorkPrinciple {
  title: string
  description: string
}

export interface AiTool {
  name: string
  purpose: string
}

export interface ProjectOverride {
  featured?: boolean
  hidden?: boolean
  order?: number
  summary?: string
  role?: string
  stack?: string[]
  highlights?: string[]
}

export interface ProjectSummary {
  repoName: string
  fullName: string
  name: string
  description: string
  githubUrl: string | null
  homepage: string | null
  language: string | null
  stars: number
  forks: number
  updatedAt: string
  topics: string[]
  categories: string[]
  featured: boolean
  role?: string
  stack: string[]
  highlights: string[]
  isPrivate: boolean
  curated: boolean
  showGithubLink: boolean
  previewImage: string | null
  snapshots: string[]
}
