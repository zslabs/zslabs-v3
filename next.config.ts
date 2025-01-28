import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    })

    return config
  },
  experimental: {
    reactCompiler: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true, // Convert SVGs to a 1:1 aspect ratio for icons
              },
            },
          ],
          as: '*.js',
        },
      },
    },
  },
}

export default withContentlayer(nextConfig)
