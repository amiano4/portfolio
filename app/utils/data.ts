import projectsJson from '../../data/projects.json'
import principlesJson from '../../data/principles.json'
import siteJson from '../../data/site.json'
import aiToolsJson from '../../data/ai-tools.json'

export interface Project {
  slug: string
  title: string
  tagline: string
  role: string
  year: string
  status: 'live' | 'completed' | 'tenure-ended'
  company?: string | null
  problem: string
  outcome: string
  stack: string[]
  highlights: string[]
  images?: string[]
  featured: boolean
}

export interface Principle {
  number: string
  title: string
  body: string
}

export interface Site {
  name: string
  fullName: string
  title: string
  available: boolean
  hero: {
    heading: string
    headingAccent: string
    subheading: string
  }
  about: {
    intro: string
    story: string[]
    philosophy: string[]
    stack: Record<string, string[]>
    currently: { label: string; value: string; sub: string }[]
  }
  pages: {
    work: { description: string }
    writing: { heading: string; description: string }
    contact: { heading: string; headingAccent: string; description: string }
  }
  assets: {
    resume: string
    favicon?: string
    repo?: string
  }
  contact: {
    email: string
    github: string
    linkedin: string
  }
  seo: {
    description: string
  }
}

export interface AiTools {
  primary: { name: string; type: string; description: string }
  agents: { name: string; note: string }[]
  models: string[]
  editors: string[]
}

export const projects = projectsJson as Project[]
export const principles = principlesJson as Principle[]
export const site = siteJson as Site
export const aiTools = aiToolsJson as AiTools
