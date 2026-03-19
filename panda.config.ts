import { pluginRemoveFeatures } from '@pandabox/panda-plugins'
import { defineKeyframes, defineTextStyles } from '@pandacss/dev'
import { defineTokens } from '@pandacss/dev'
import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import {
  blackP3A,
  blueDarkP3,
  irisDarkP3,
  jadeDarkP3,
  slateDarkP3A,
  slateDarkP3,
  tomatoDarkP3,
  whiteP3A,
  yellowDarkP3,
} from '@radix-ui/colors'
import { removeUnusedKeyframes } from 'postcss/remove-unused-keyframes'
import { removeUnusedCssVars } from 'postcss/remove-unused-vars'

const isProd = process.env.VERCEL_ENV === 'production'

// @SOURCE https://github.com/cschroeter/park-ui/blob/main/plugins/panda/src/theme/tokens/easings.ts
export const easings = defineTokens.easings({
  pulse: { value: 'cubic-bezier(0.4, 0.0, 0.6, 1.0)' },
  default: { value: 'cubic-bezier(0.2, 0.0, 0, 1.0)' },
  'emphasized-in': { value: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)' },
  'emphasized-out': { value: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)' },
})

export const keyframes = defineKeyframes({
  'slide-up-fade': {
    '0%': { opacity: '0', transform: 'translateY(0.25rem)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'slide-down-fade': {
    '0%': { opacity: '0', transform: 'translateY(-0.25rem)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'slide-right-fade': {
    '0%': { opacity: '0', transform: 'translateX(0.25rem)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  'slide-left-fade': {
    '0%': { opacity: '0', transform: 'translateX(-0.25rem)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
})

export const textStyles = defineTextStyles({
  body: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily: 'sans',
      fontFeatureSettings: '"ss03", "ss05", "ss18", "liga"',
      fontVariationSettings: '"slnt" 0',
    },
  },
  mono: {
    description: 'The monospace text style - used in code blocks',
    value: {
      fontFamily: 'mono',
      fontFeatureSettings: '"salt"',
      fontVariationSettings: '"slnt" 0',
    },
  },
})

const RADIX_SHADES = Array.from({ length: 12 }, (_, index) => String(index + 1))

const createRadixScale = (scale: Record<string, string>, prefix: string) =>
  Object.fromEntries(
    RADIX_SHADES.map((shade) => [
      shade,
      {
        value: scale[`${prefix}${shade}`],
      },
    ])
  )

const radixColors = {
  slate: {
    ...createRadixScale(slateDarkP3, 'slate'),
    a: createRadixScale(slateDarkP3A, 'slateA'),
  },
  blue: createRadixScale(blueDarkP3, 'blue'),
  iris: createRadixScale(irisDarkP3, 'iris'),
  jade: createRadixScale(jadeDarkP3, 'jade'),
  yellow: createRadixScale(yellowDarkP3, 'yellow'),
  tomato: createRadixScale(tomatoDarkP3, 'tomato'),
  black: {
    a: createRadixScale(blackP3A, 'blackA'),
  },
  white: {
    a: createRadixScale(whiteP3A, 'whiteA'),
  },
}

const globalCss = defineGlobalStyles({
  '::selection': {
    color: '{colors.slate.12}',
    backgroundColor: '{colors.blue.5}',
    textShadow: 'none',
  },
  'code, kbd, samp, pre': {
    textStyle: 'mono',
  },
  'strong, b': {
    fontWeight: 'medium',
    color: 'slate.12',
  },
  'code:not([data-snippet])': {
    color: 'slate.12',
    backgroundColor: 'black.a.8',
    paddingInline: '1',
    paddingBlock: '0.5',
    borderRadius: 'xl',
  },
  '[data-rehype-pretty-code-title]': {
    color: 'slate.12',
    fontSize: 'xs',
    borderRadius: 'full',
    textStyle: 'mono',
    backgroundColor: 'black.a.8',
    width: 'fit',
    paddingInline: '2',
    paddingBlock: '1',
    marginBlockEnd: '2',
  },
  '[data-line]': {
    paddingInlineEnd: '4',
  },
})

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-panda'],
  conditions: {
    extend: {
      notClass: '&:not([class])',
      notFirstChild: '&:not(:first-child)',
      notLastChild: '&:not(:last-child)',
    },
  },
  include: [
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
    './src/routes/**/*.tsx',
  ],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  shorthands: false,
  hash: {
    cssVar: isProd ? true : false,
    className: isProd ? true : false,
  },
  plugins: [pluginRemoveFeatures({ features: ['no-styled', 'no-jsx'] })],
  strictTokens: true,
  minify: true,
  lightningcss: true,
  browserslist: ['last 2 versions', 'not dead', 'not < 2%'],
  theme: {
    textStyles,
    extend: {
      keyframes,
      tokens: {
        animations: {
          'slide-up-fade': {
            value: 'slide-up-fade {durations.fast} {easings.default} forwards',
          },
          'slide-down-fade': {
            value:
              'slide-down-fade {durations.fast} {easings.default} forwards',
          },
          'slide-right-fade': {
            value:
              'slide-right-fade {durations.fast} {easings.default} forwards',
          },
          'slide-left-fade': {
            value:
              'slide-left-fade {durations.fast} {easings.default} forwards',
          },
        },
        easings,
        colors: {
          currentColor: { value: 'currentColor' },
          transparent: { value: 'transparent' },
          ...radixColors,
        },
        fonts: {
          mono: {
            value: '"TT Commons Pro Mono Variable", monospace',
          },
          sans: {
            value: '"TT Commons Pro Variable", sans-serif',
          },
        },
        fontSizes: {
          '4.5xl': { value: '2.5rem' },
        },
        lineHeights: {
          normal: { value: '1.65' },
        },
        sizes: {
          fit: { value: 'fit-content' },
          current: { value: '1em' },
          120: { value: '30rem' },
        },
        shadows: {
          slate: {
            value: '0 0 0 0.125rem {colors.slate.3}',
          },
          contrast: {
            value:
              'inset 0 1px 0 0 {colors.black.a.2}, inset 0 -2px 0 0 {colors.black.a.1},-15px 0 30px -5px {colors.tomato.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.iris.5}',
          },
          inset: {
            value: 'inset 0 0 0 1px {colors.slate.4}',
          },
          default: {
            value:
              'inset 0 1px 0 0 {colors.white.a.2}, inset 0 -2px 0 0 {colors.black.a.4}, -15px 0 30px -5px {colors.iris.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.jade.5}',
          },
        },
        spacing: {
          '1/4': { value: '25%' },
          '1/2': { value: '50%' },
          '2/3': { value: '66.6667%' },
          '3/4': { value: '75%' },
        },
      },
    },
  },
  utilities: {
    fontWeight: {
      className: 'fw',
      values: {
        normal: '500',
        medium: '600',
      },
    },
    fontVariationSettings: {
      className: 'fvs',
      values: {
        wide: "'wdth' 125, 'slnt' 0;",
      },
    },
    gridTemplateColumns: {
      className: 'grid-tc',
      group: 'Grid Layout',
      values: {
        '1': 'repeat(1, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
    gridTemplateRows: {
      className: 'grid-tr',
      group: 'Grid Layout',
      values: {
        '1': 'repeat(1, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
    gridColumn: {
      className: 'grid-c',
      group: 'Grid Layout',
      values: {
        full: '1 / -1',
        '1': 'span 1 / span 1',
        '2': 'span 2 / span 2',
        '3': 'span 3 / span 3',
        '4': 'span 4 / span 4',
        '5': 'span 5 / span 5',
        '6': 'span 6 / span 6',
        '7': 'span 7 / span 7',
        '8': 'span 8 / span 8',
        '9': 'span 9 / span 9',
        '10': 'span 10 / span 10',
        '11': 'span 11 / span 11',
        '12': 'span 12 / span 12',
      },
    },
    gridRow: {
      className: 'grid-r',
      group: 'Grid Layout',
      values: {
        full: '1 / -1',
        '1': 'span 1 / span 1',
        '2': 'span 2 / span 2',
        '3': 'span 3 / span 3',
        '4': 'span 4 / span 4',
        '5': 'span 5 / span 5',
        '6': 'span 6 / span 6',
        '7': 'span 7 / span 7',
        '8': 'span 8 / span 8',
        '9': 'span 9 / span 9',
        '10': 'span 10 / span 10',
        '11': 'span 11 / span 11',
        '12': 'span 12 / span 12',
      },
    },
    extend: {
      backgroundImage: {
        values: {
          noise: 'url(/media/noise-bg.png)',
          ooorganize: 'url(/media/ooorganize-bg.svg)',
        },
      },
      scale: {
        values: {
          '1.025': '1.025',
          '1': '1',
          '0.975': '0.975',
        },
      },
      transitionProperty: {
        values: [
          'opacity',
          'transform',
          'color',
          'scale',
          'textUnderlineOffset',
        ],
      },
      filter: {
        values: {
          grayscale: 'grayscale(1)',
        },
      },
      willChange: {
        values: ['opacity', 'transform'],
      },
      zIndex: {
        values: ['-1', '10', '50'],
      },
    },
  },
  patterns: {
    extend: {
      inlineIcon: {
        description: 'An inline icon',
        transform() {
          return {
            display: 'inline-block',
            verticalAlign: '-0.125em',
          }
        },
      },
    },
  },
  globalCss,
  hooks: {
    // Strip default Panda color tokens so only this project's palette is used.
    'preset:resolved': ({ utils, preset, name }) => {
      if (name === '@pandacss/preset-panda') {
        return utils.omit(preset, [
          'theme.tokens.colors',
          'theme.semanticTokens.colors',
        ])
      }
      return preset
    },

    // Post-process final CSS to drop unused vars and keyframes.
    'cssgen:done': ({ artifact, content }) => {
      if (artifact === 'styles.css') {
        return removeUnusedCssVars(removeUnusedKeyframes(content))
      }
    },
  },
})
