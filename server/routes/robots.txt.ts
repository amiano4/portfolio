import site from '../../data/site.json'

export default defineEventHandler(() => {
  const siteUrl = site.seo.siteUrl

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${siteUrl}/sitemap.xml`,
    ].join('\n'),
    {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    },
  )
})
