const path = require('path')

const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      include: [path.resolve(__dirname, 'icons')],
      use: [
        { loader: '@svgr/webpack', options: { icon: true, ref: true } },
        'url-loader',
      ],
    })

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    })

    return config
  },
}

module.exports = () => {
  const plugins = [[withContentlayer, {}]]
  const config = plugins.reduce(
    (acc, next) => (Array.isArray(next) ? next[0](acc) : next(acc)),
    {
      ...nextConfig,
    }
  )

  return config
}
