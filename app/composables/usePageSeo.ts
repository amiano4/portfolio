import { site } from '~/utils/data'

type SchemaInput = Record<string, any> | (() => Record<string, any>)

interface UsePageSeoInput {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'profile' | 'article'
  noindex?: boolean
  schema?: SchemaInput | SchemaInput[]
}

export function usePageSeo(input: UsePageSeoInput) {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = runtimeConfig.public.siteUrl || site.seo.siteUrl
  const path = computed(() => input.path ?? route.path)
  const canonicalUrl = computed(() => new URL(path.value, siteUrl).toString())
  const imageUrl = computed(() => input.image ? new URL(input.image, siteUrl).toString() : undefined)
  const fullTitle = computed(() => {
    if (!input.title) return site.fullName
    return `${input.title} · ${site.fullName}`
  })

  useSeoMeta({
    title: input.title,
    description: input.description,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
    ogTitle: fullTitle,
    ogDescription: input.description,
    ogType: input.type ?? 'website',
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    twitterTitle: fullTitle,
    twitterDescription: input.description,
    twitterImage: imageUrl,
    twitterCard: 'summary_large_image',
  })

  const schemas = computed(() => {
    const items = Array.isArray(input.schema)
      ? input.schema
      : input.schema
        ? [input.schema]
        : []

    return items
      .map((item) => (typeof item === 'function' ? item() : item))
      .filter(Boolean)
  })

  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl.value,
      },
    ],
    script: schemas.value.length
      ? [
          {
            id: 'ld-json-page',
            type: 'application/ld+json',
            textContent: JSON.stringify(
              schemas.value.length === 1
                ? schemas.value[0]
                : {
                    '@context': 'https://schema.org',
                    '@graph': schemas.value,
                  },
            ),
          },
        ]
      : [],
  }))

  return {
    canonicalUrl,
    fullTitle,
    siteUrl,
  }
}
