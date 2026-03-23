import type { AiTool, ProjectOverride, WorkMetric, WorkPrinciple } from './types'

export const siteConfig = {
  owner: 'Almario',
  title: 'Almario — Full-stack engineer',
  shortTitle: 'Almario',
  role: 'Full-stack engineer building polished products with Laravel, Vue, and pragmatic systems thinking.',
  location: 'Philippines',
  githubUrl: 'https://github.com/amiano4',
  intro: 'I design and ship clean web products, with Laravel and Vue as my core stack and AI-assisted workflows supporting faster execution.',
  metrics: [
    {
      label: 'Core stack',
      value: 'Laravel · Vue · Symfony',
      note: 'Default stack'
    },
    {
      label: 'Workflow',
      value: 'AI-assisted delivery',
      note: 'Research to implementation'
    },
    {
      label: 'Focus',
      value: 'Product quality',
      note: 'Clean UX and maintainable systems'
    }
  ] satisfies WorkMetric[],
  principles: [
    {
      title: 'Product-minded',
      description: 'Build for the outcome, not just the ticket.'
    },
    {
      title: 'Pragmatic architecture',
      description: 'Keep systems simple until complexity is earned.'
    },
    {
      title: 'Fast delivery',
      description: 'Use tooling to shorten loops without lowering standards.'
    }
  ] satisfies WorkPrinciple[],
  aiTools: [
    {
      name: 'Pi coding agent',
      purpose: 'Repo-aware implementation and multi-file delivery'
    },
    {
      name: 'Claude / ChatGPT',
      purpose: 'Research, architecture exploration, and review support'
    },
    {
      name: 'GitHub Copilot / Cursor',
      purpose: 'Inline acceleration for repetitive implementation work'
    }
  ] satisfies AiTool[],
  featuredRepos: ['portfolio', 'aegis-mailer', 'monorepo-template', 'laravel-vue-docker-based-boilerplate', 'jsflow']
}

export const projectOverrides: Record<string, ProjectOverride> = {
  'aegis-mailer': {
    featured: true,
    order: 1,
    role: 'Backend / systems engineering',
    stack: ['PHP', 'Queues', 'Daemon workers', 'Email infrastructure'],
    highlights: ['Async email pipeline', 'Queue-aware architecture', 'Production-oriented worker design']
  },
  'monorepo-template': {
    featured: true,
    order: 2,
    role: 'Platform / DX',
    stack: ['Laravel', 'JavaScript', 'Docker', 'Makefile'],
    highlights: ['Monorepo conventions', 'Local dev infrastructure', 'Reusable project foundation']
  },
  'laravel-vue-docker-based-boilerplate': {
    featured: true,
    order: 3,
    role: 'Full-stack product setup',
    stack: ['Laravel', 'Vue', 'Vite', 'Docker'],
    highlights: ['Backend + frontend split', 'Containerized development', 'Frontend-ready API workflow']
  },
  jsflow: {
    featured: true,
    order: 4,
    role: 'Frontend interaction design',
    stack: ['JavaScript', 'Canvas / diagrams', 'Interactive UI'],
    highlights: ['Custom diagramming UX', 'Client-side state handling', 'Visual tooling mindset']
  }
}
