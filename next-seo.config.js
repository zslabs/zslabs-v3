const title = 'Zach Schnackel'
const description = 'Full-stack/motion developer'

const SEO = {
  title,
  description,
  canonical: 'https://zslabs.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://zslabs.com',
    title,
    description,
    images: [
      {
        url: 'https://zslabs.com/media/og.png',
        alt: title,
        width: 2400,
        height: 1200,
      },
    ],
  },
  twitter: {
    handle: '@zslabs',
    site: '@zslabs',
    cardType: 'summary_large_image',
  },
}

export default SEO
