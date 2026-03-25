import projectsJson from '../../data/projects.json'
import principlesJson from '../../data/principles.json'
import siteJson from '../../data/site.json'

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
  contact: {
    email: string
    github: string
    linkedin: string
  }
  seo: {
    description: string
  }
}

export const projects = projectsJson as Project[]
export const principles = principlesJson as Principle[]
export const site = siteJson as Site
