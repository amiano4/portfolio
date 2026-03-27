import site from '../../data/site.json'

export default defineEventHandler(() => {
  const siteUrl = site.seo.siteUrl.replace(/\/$/, '')
  const now = new Date().toISOString()

  const urls = [
    '/',
    '/about',
    '/work',
    '/writing',
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
    },
  })
})
