import { defineKeyframes } from '@pandacss/dev'
import { defineTokens } from '@pandacss/dev'
import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import {
  slateDark,
  blueDark,
  irisDark,
  yellowDark,
  tomatoDark,
  greenDark,
  whiteA,
  blackA,
} from '@radix-ui/colors'
import { produce } from 'immer'

const isProd = process.env.VERCEL_ENV === 'production'

// Cleanup old color tokens we're not using from the default preset
const preset = produce(pandaPreset, (draft) => {
  // @ts-expect-error
  delete draft.theme.tokens.colors
})

interface ColorSets {
  [key: string]: { [key: string]: string }
}

// Create new color tokens using `@radix-ui/colors`
const colorSets: ColorSets = {
  slate: slateDark,
  blue: blueDark,
  iris: irisDark,
  yellow: yellowDark,
  tomato: tomatoDark,
  green: greenDark,
  'white.a': whiteA,
  'black.a': blackA,
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

const globalCss = defineGlobalStyles({
  '*, &::before, &::after': {
    letterSpacing: '-0.0125ch',
  },
  '::selection': {
    color: '{colors.slate.12}',
    backgroundColor: '{colors.blue.5}',
    textShadow: 'none',
  },
  'strong, b': {
    fontWeight: 'semibold',
    color: 'slate.12',
  },
  'code, pre': {
    letterSpacing: 'normal',
  },
  'code:not([data-language])': {
    color: 'slate.12',
    backgroundColor: 'black.a.8',
    paddingInline: '1',
    paddingBlock: '0.5',
    borderRadius: 'lg',
  },
  '[data-rehype-pretty-code-title]': {
    color: 'slate.12',
    fontSize: 'xs',
    borderRadius: 'full',
    fontFamily: 'code',
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
  optimize: true,
  minify: true,
  lightningcss: true,
  browserslist: ['last 2 versions', 'not dead', 'not < 2%'],
  theme: {
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
          code: {
            value: "'JetBrains Mono Variable', monospace",
          },
          sans: {
            value: "'Plus Jakarta Sans Variable', sans-serif",
          },
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
              '-15px 0 30px -5px {colors.tomato.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.iris.5}',
          },
          default: {
            value:
              '-15px 0 30px -5px {colors.iris.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.green.5}',
          },
        },
      },
    },
  },
  utilities: {
    extend: {
      backgroundImage: {
        values: {
          gggyrate: 'url(/media/gggyrate.svg)',
          nnnoise: 'url(/media/nnnoise-bg.svg)',
          ooorganize: 'url(/media/ooorganize-bg.svg)',
        },
      },
      willChange: {
        values: ['transform'],
      },
      textWrap: {
        values: ['pretty'],
      },
      zIndex: {
        values: ['-1', '10', '50'],
      },
    },
  },
  globalCss,
})
