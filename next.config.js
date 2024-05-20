const path = require('path')

const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
