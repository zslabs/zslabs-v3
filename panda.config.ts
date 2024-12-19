import { defineKeyframes, defineTextStyles } from '@pandacss/dev'
import { defineTokens } from '@pandacss/dev'
import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import {
  slateDarkP3,
  blueDarkP3,
  irisDarkP3,
  yellowDarkP3,
  tomatoDarkP3,
  greenDarkP3,
  whiteP3A,
  blackP3A,
  slateDarkP3A,
} from '@radix-ui/colors'
import { produce } from 'immer'

const isProd = process.env.VERCEL_ENV === 'production'

// Cleanup old color tokens we're not using from the default preset
const preset = produce(pandaPreset, (draft) => {
  // @ts-expect-error Stingy types
  delete draft.theme.tokens.colors
})

interface ColorSets {
  [key: string]: { [key: string]: string }
}

// Create new color tokens using `@radix-ui/colors`
const colorSets: ColorSets = {
  slate: slateDarkP3,
  'slate.a': slateDarkP3A,
  blue: blueDarkP3,
  iris: irisDarkP3,
  yellow: yellowDarkP3,
  tomato: tomatoDarkP3,
  green: greenDarkP3,
  'white.a': whiteP3A,
  'black.a': blackP3A,
}

const colors: { [key: string]: { [key: string]: { value: string } } } = {}

for (const colorSetName in colorSets) {
  colors[colorSetName] = {}
  const colorSet = colorSets[colorSetName]
  let index = 1
  for (const colorKey in colorSet) {
    colors[colorSetName][index.toString()] = {
      value: colorSet[colorKey],
    }
    index++
  }
}

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
  'code:not([data-language])': {
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
  presets: [preset],
  include: ['./components/**/*.tsx', './layouts/**/*.tsx', './app/**/*.tsx'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  shorthands: false,
  hash: {
    cssVar: isProd ? true : false,
    className: isProd ? true : false,
  },
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
          ...colors,
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
            value: '0 0 0 0.125rem {colors.slate.4}',
          },
          contrast: {
            value:
              'inset 0 1px 0 0 {colors.black.a.2}, inset 0 -2px 0 0 {colors.black.a.1},-15px 0 30px -5px {colors.tomato.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.iris.5}',
          },
          default: {
            value:
              'inset 0 1px 0 0 {colors.white.a.2}, inset 0 -2px 0 0 {colors.black.a.4}, -15px 0 30px -5px {colors.iris.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.green.5}',
          },
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
          gggyrate: 'url(/media/gggyrate.svg)',
          noise: 'url(/media/noise-bg.png)',
          ooorganize: 'url(/media/ooorganize-bg.svg)',
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
  globalCss,
})
