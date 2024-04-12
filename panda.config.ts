import { defineKeyframes } from '@pandacss/dev'
import { defineTokens } from '@pandacss/dev'
import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { produce } from 'immer'
import radixColorsPreset from 'pandacss-preset-radix-colors'

// Cleanup old color tokens we're not using from the default preset
const preset = produce(pandaPreset, (draft) => {
  // @ts-expect-error
  delete draft.theme.tokens.colors
})

// @SOURCE https://github.com/cschroeter/park-ui/blob/main/plugins/panda/src/theme/tokens/easings.ts
export const easings = defineTokens.easings({
  pulse: { value: 'cubic-bezier(0.4, 0.0, 0.6, 1.0)' },
  default: { value: 'cubic-bezier(0.2, 0.0, 0, 1.0)' },
  'emphasized-in': { value: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)' },
  'emphasized-out': { value: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)' },
})

// @SOURCE https://github.com/cschroeter/park-ui/blob/main/plugins/panda/src/theme/tokens/animations.ts
export const animations = defineTokens.animations({
  'backdrop-in': {
    value: 'fade-in 250ms {easings.emphasized-in}',
  },
  'backdrop-out': {
    value: 'fade-out 200ms {easings.emphasized-out}',
  },
  'dialog-in': {
    value: 'slide-in 400ms {easings.emphasized-in}',
  },
  'dialog-out': {
    value: 'slide-out 200ms {easings.emphasized-out}',
  },
  'drawer-in-left': {
    value: 'slide-in-left 400ms {easings.emphasized-in}',
  },
  'drawer-out-left': {
    value: 'slide-out-left 200ms {easings.emphasized-out}',
  },
  'drawer-in-right': {
    value: 'slide-in-right 400ms {easings.emphasized-in}',
  },
  'drawer-out-right': {
    value: 'slide-out-right 200ms {easings.emphasized-out}',
  },
  'skeleton-pulse': {
    value: 'skeleton-pulse 2s {easings.pulse} infinite',
  },
  'fade-in': {
    value: 'fade-in 400ms {easings.emphasized-in}',
  },
  'collapse-in': {
    value: 'collapse-in 250ms {easings.emphasized-in}',
  },
  'collapse-out': {
    value: 'collapse-out 200ms {easings.emphasized-out}',
  },
})

export const keyframes = defineKeyframes({
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  'slide-in': {
    '0%': { opacity: '0', transform: 'translateY(64px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'slide-out': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(64px)' },
  },
  'slide-in-left': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0%)' },
  },
  'slide-out-left': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(-100%)' },
  },
  'slide-in-right': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0%)' },
  },
  'slide-out-right': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  'collapse-in': {
    '0%': { height: '0' },
    '100%': { height: 'var(--height)' },
  },
  'collapse-out': {
    '0%': { height: 'var(--height)' },
    '100%': { height: '0' },
  },
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(-4px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeOut: {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-4px)' },
  },
  'skeleton-pulse': {
    '50%': { opacity: '0.5' },
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
  presets: [
    radixColorsPreset({
      darkMode: true,
      colorScales: [
        'slate',
        'blue',
        'white',
        'black',
        'yellow',
        'tomato',
        'green',
      ],
    }),
    preset,
  ],
  include: ['./components/**/*.tsx', './layouts/**/*.tsx', './app/**/*.tsx'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  shorthands: false,
  hash: {
    cssVar: true,
    className: true,
  },
  strictTokens: true,
  optimize: true,
  minify: true,
  lightningcss: true,
  browserslist: ['last 2 versions', 'not dead', 'not < 2%'],
  theme: {
    extend: {
      tokens: {
        animations,
        easings,
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
          blue: {
            value: '0 0 0.5rem {colors.blue.a.10}',
          },
          slate: {
            value: '0 0 0.5rem {colors.slate.a.10}',
          },
          slateSolid: {
            value: '0 0 0 0.125rem {colors.slate.a.4}',
          },
        },
      },
    },
  },
  utilities: {
    extend: {
      keyframes,
      backgroundImage: {
        values: {
          nnnoise: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3Cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.114' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'/%3E%3CfeSpecularLighting surfaceScale='15' specularConstant='0.75' specularExponent='20' lighting-color='%23CF3266' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='100'/%3E%3C/feSpecularLighting%3E%3CfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='transparent'/%3E%3Crect width='700' height='700' fill='%23cf3266' filter='url(%23nnnoise-filter)'/%3E%3C/svg%3E%0A")`,
          ooorganize: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cg stroke='none' fill='%23fff'%3E%3Ccircle r='1.25' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' opacity='.35'/%3E%3Ccircle r='1.25' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='50'/%3E%3Ccircle r='1.25' cx='200' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='50'/%3E%3Ccircle r='1.25' cx='450' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='50'/%3E%3Ccircle r='1.25' cx='750' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='50' opacity='.35'/%3E%3Ccircle r='1.25' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='100'/%3E%3Ccircle r='1.25' cx='250' cy='100'/%3E%3Ccircle r='1.25' cx='300' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='100'/%3E%3Ccircle r='1.25' cx='500' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='100'/%3E%3Ccircle r='1.25' cx='650' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='100'/%3E%3Ccircle r='1.25' cx='800' cy='100' opacity='.35'/%3E%3Ccircle r='1.25' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='150'/%3E%3Ccircle r='1.25' cx='250' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='150'/%3E%3Ccircle r='1.25' cx='350' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='150'/%3E%3Ccircle r='1.25' cx='550' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='150'/%3E%3Ccircle r='1.25' cx='700' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='150' opacity='.35'/%3E%3Ccircle r='1.25' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='200'/%3E%3Ccircle r='1.25' cx='100' cy='200'/%3E%3Ccircle r='1.25' cx='150' cy='200'/%3E%3Ccircle r='1.25' cx='200' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='200'/%3E%3Ccircle r='1.25' cx='400' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='200'/%3E%3Ccircle r='1.25' cx='600' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='200' opacity='.35'/%3E%3Ccircle r='1.25' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='250'/%3E%3Ccircle r='1.25' cx='200' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='250'/%3E%3Ccircle r='1.25' cx='300' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='250'/%3E%3Ccircle r='1.25' cx='400' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='250' opacity='.35'/%3E%3Ccircle r='1.25' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='300'/%3E%3Ccircle r='1.25' cx='150' cy='300'/%3E%3Ccircle r='1.25' cx='200' cy='300'/%3E%3Ccircle r='1.25' cx='250' cy='300'/%3E%3Ccircle r='1.25' cx='300' cy='300'/%3E%3Ccircle r='1.25' cx='350' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='300'/%3E%3Ccircle r='1.25' cx='450' cy='300'/%3E%3Ccircle r='1.25' cx='500' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='300'/%3E%3Ccircle r='1.25' cx='700' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='300'/%3E%3Ccircle r='1.25' cx='800' cy='300' opacity='.35'/%3E%3Ccircle r='1.25' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='350'/%3E%3Ccircle r='1.25' cx='200' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='350'/%3E%3Ccircle r='1.25' cx='450' cy='350'/%3E%3Ccircle r='1.25' cx='500' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='350'/%3E%3Ccircle r='1.25' cx='700' cy='350'/%3E%3Ccircle r='1.25' cx='750' cy='350'/%3E%3Ccircle r='1.25' cx='800' cy='350' opacity='.35'/%3E%3Ccircle r='1.25' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='400'/%3E%3Ccircle r='1.25' cx='150' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='400'/%3E%3Ccircle r='1.25' cx='350' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='400'/%3E%3Ccircle r='1.25' cx='700' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='400'/%3E%3Ccircle r='1.25' cx='800' cy='400' opacity='.35'/%3E%3Ccircle r='1.25' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='450'/%3E%3Ccircle r='1.25' cx='250' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='450'/%3E%3Ccircle r='1.25' cx='350' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='450'/%3E%3Ccircle r='1.25' cx='700' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='450' opacity='.35'/%3E%3Ccircle r='1.25' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='500'/%3E%3Ccircle r='1.25' cx='350' cy='500'/%3E%3Ccircle r='1.25' cx='400' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='500'/%3E%3Ccircle r='1.25' cx='750' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='500' opacity='.35'/%3E%3Ccircle r='1.25' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='550'/%3E%3Ccircle r='1.25' cx='550' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='550'/%3E%3Ccircle r='1.25' cx='650' cy='550'/%3E%3Ccircle r='1.25' cx='700' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='550' opacity='.35'/%3E%3Ccircle r='1.25' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='600'/%3E%3Ccircle r='1.25' cx='300' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='600'/%3E%3Ccircle r='1.25' cx='450' cy='600'/%3E%3Ccircle r='1.25' cx='500' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='600' opacity='.35'/%3E%3Ccircle r='1.25' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='650'/%3E%3Ccircle r='1.25' cx='100' cy='650'/%3E%3Ccircle r='1.25' cx='150' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='650'/%3E%3Ccircle r='1.25' cx='500' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='650'/%3E%3Ccircle r='1.25' cx='650' cy='650'/%3E%3Ccircle r='1.25' cx='700' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='650' opacity='.35'/%3E%3Ccircle r='1.25' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='700'/%3E%3Ccircle r='1.25' cx='250' cy='700'/%3E%3Ccircle r='1.25' cx='300' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='700' opacity='.35'/%3E%3Ccircle r='1.25' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='750'/%3E%3Ccircle r='1.25' cx='200' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='750' opacity='.35'/%3E%3Ccircle r='1.25' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='50' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='100' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='150' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='200' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='250' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='300' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='350' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='400' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='450' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='500' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='550' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='600' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='650' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='700' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='750' cy='800' opacity='.35'/%3E%3Ccircle r='1.25' cx='800' cy='800' opacity='.35'/%3E%3C/g%3E%3C/svg%3E%0A")`,
        },
      },
      willChange: {
        values: ['transform'],
      },
      textWrap: {
        values: ['pretty'],
      },
      verticalAlign: {
        values: {
          inline: '-0.125em',
        },
      },
    },
  },
  globalCss,
})
