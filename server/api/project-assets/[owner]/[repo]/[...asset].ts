import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const localRepoRoot = process.cwd()

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')
  const asset = decodeURI(getRouterParam(event, 'asset') || '')
  const username = String(runtimeConfig.public.githubUsername || '').toLowerCase()

  if (!owner || !repo || !asset || !asset.startsWith('.portfolio/')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid asset path' })
  }

  const isLocalPortfolioRepo = owner.toLowerCase() === username && repo === 'portfolio'

  if (isLocalPortfolioRepo) {
    const localPath = join(localRepoRoot, asset)

    try {
      await access(localPath)
      const buffer = await readFile(localPath)
      const extension = localPath.split('.').pop()?.toLowerCase()
      const contentTypes: Record<string, string> = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        webp: 'image/webp',
        gif: 'image/gif',
        svg: 'image/svg+xml',
        avif: 'image/avif'
      }

      setHeader(event, 'Content-Type', contentTypes[extension || ''] || 'application/octet-stream')
      setHeader(event, 'Cache-Control', 'public, max-age=3600')
      return new Uint8Array(buffer)
    } catch {
      throw createError({ statusCode: 404, statusMessage: 'Asset not found' })
    }
  }

  const encodedPath = asset
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.raw',
    'User-Agent': 'almario-portfolio'
  }

  if (runtimeConfig.githubToken) {
    headers.Authorization = `Bearer ${runtimeConfig.githubToken}`
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`, {
    headers
  })

  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: 'Asset not found' })
  }

  const contentType = response.headers.get('content-type') || 'application/octet-stream'
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return new Uint8Array(await response.arrayBuffer())
})
