import { defineKeyframes, defineTextStyles } from '@pandacss/dev'
import { defineTokens } from '@pandacss/dev'
import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { produce } from 'immer'

import { removeUnusedKeyframes } from '@/postcss/remove-unused-keyframes'
import { removeUnusedCssVars } from '@/postcss/remove-unused-vars'

const isProd = process.env.VERCEL_ENV === 'production'

// Cleanup old color tokens we're not using from the default preset
const preset = produce(pandaPreset, (draft) => {
  // @ts-expect-error Stingy types
  delete draft.theme.tokens.colors
})

const colors = {
  slate: {
    1: { value: 'oklch(17.853% 0.00407 285.9841)' },
    2: { value: 'oklch(21.318% 0.00421 264.41128)' },
    3: { value: 'oklch(25.214% 0.00582 271.18119)' },
    4: { value: 'oklch(28.319% 0.00699 248.06152)' },
    5: { value: 'oklch(31.177% 0.0083 255.56204)' },
    6: { value: 'oklch(34.655% 0.01029 253.97812)' },
    7: { value: 'oklch(39.928% 0.01206 252.9322)' },
    8: { value: 'oklch(48.932% 0.01551 251.7052)' },
    9: { value: 'oklch(53.7% 0.01532 262.34603)' },
    10: { value: 'oklch(58.251% 0.01455 266.61041)' },
    11: { value: 'oklch(76.856% 0.00964 258.3287)' },
    12: { value: 'oklch(94.892% 0.00288 264.62562)' },

    a: {
      1: { value: 'oklch(0% 0 0 / 0%)' },
      2: { value: 'oklch(94.75% 0.02936 201.89926 / 4%)' },
      3: { value: 'oklch(93.148% 0.02357 250.08128 / 8%)' },
      4: { value: 'oklch(93.047% 0.0312 225.10389 / 11%)' },
      5: { value: 'oklch(93.649% 0.03139 243.71253 / 15%)' },
      6: { value: 'oklch(93.007% 0.03315 243.96824 / 19%)' },
      7: { value: 'oklch(93.681% 0.0324 245.30143 / 25%)' },
      8: { value: 'oklch(93.681% 0.0324 245.30143 / 36%)' },
      9: { value: 'oklch(93.647% 0.02761 258.36039 / 43%)' },
      10: { value: 'oklch(94.481% 0.02325 264.44635 / 48%)' },
      11: { value: 'oklch(97.363% 0.01134 252.07632 / 71%)' },
      12: { value: 'oklch(99.385% 0.00285 264.56919 / 94%)' },
    },
  },
  blue: {
    1: { value: 'oklch(19.361% 0.0255 256.48154)' },
    2: { value: 'oklch(21.293% 0.03033 261.25815)' },
    3: { value: 'oklch(27.447% 0.06629 253.92995)' },
    4: { value: 'oklch(32.014% 0.09678 252.34577)' },
    5: { value: 'oklch(36.71% 0.10588 250.70255)' },
    6: { value: 'oklch(41.603% 0.11326 252.00498)' },
    7: { value: 'oklch(47.411% 0.12187 253.08911)' },
    8: { value: 'oklch(54.057% 0.13953 253.17411)' },
    9: { value: 'oklch(64.929% 0.19304 251.77905)' },
    10: { value: 'oklch(68.838% 0.16932 251.4024)' },
    11: { value: 'oklch(76.422% 0.12575 249.46529)' },
    12: { value: 'oklch(90.712% 0.05104 238.44324)' },
  },
  iris: {
    1: { value: 'oklch(19.236% 0.02213 284.12416)' },
    2: { value: 'oklch(20.911% 0.02946 286.60796)' },
    3: { value: 'oklch(27.219% 0.06935 278.45724)' },
    4: { value: 'oklch(31.81% 0.10227 275.99434)' },
    5: { value: 'oklch(35.683% 0.10955 277.30536)' },
    6: { value: 'oklch(40.035% 0.11168 279.4522)' },
    7: { value: 'oklch(44.848% 0.11985 280.42201)' },
    8: { value: 'oklch(50.685% 0.13766 280.8063)' },
    9: { value: 'oklch(54.031% 0.18412 278.28457)' },
    10: { value: 'oklch(58.68% 0.17174 281.2589)' },
    11: { value: 'oklch(77.429% 0.12152 287.46428)' },
    12: { value: 'oklch(91.398% 0.04204 287.01255)' },
  },
  jade: {
    1: { value: 'oklch(18.639% 0.01352 169.77851)' },
    2: { value: 'oklch(21.515% 0.01651 168.18641)' },
    3: { value: 'oklch(27.36% 0.04342 165.18928)' },
    4: { value: 'oklch(31.624% 0.05718 167.619)' },
    5: { value: 'oklch(36.117% 0.06388 168.16585)' },
    6: { value: 'oklch(41.272% 0.06868 169.57354)' },
    7: { value: 'oklch(46.84% 0.07584 170.26817)' },
    8: { value: 'oklch(53.651% 0.08747 172.23395)' },
    9: { value: 'oklch(64.215% 0.11502 170.7293)' },
    10: { value: 'oklch(67.775% 0.12556 169.56536)' },
    11: { value: 'oklch(78.524% 0.15591 167.11005)' },
    12: { value: 'oklch(90.268% 0.07756 166.87581)' },
  },
  yellow: {
    1: { value: 'oklch(18.208% 0.01392 94.03578)' },
    2: { value: 'oklch(20.947% 0.01736 91.81568)' },
    3: { value: 'oklch(26.094% 0.04715 90.25519)' },
    4: { value: 'oklch(29.29% 0.06003 93.80138)' },
    5: { value: 'oklch(33.464% 0.06848 92.46048)' },
    6: { value: 'oklch(38.49% 0.07762 92.90959)' },
    7: { value: 'oklch(45.205% 0.08089 91.96956)' },
    8: { value: 'oklch(53.491% 0.09467 89.38264)' },
    9: { value: 'oklch(91.758% 0.18377 100.9351)' },
    10: { value: 'oklch(97.11% 0.18192 109.35723)' },
    11: { value: 'oklch(90.011% 0.16638 101.71449)' },
    12: { value: 'oklch(94.155% 0.07484 101.10875)' },
  },
  tomato: {
    1: { value: 'oklch(18.662% 0.01175 18.24993)' },
    2: { value: 'oklch(20.783% 0.01698 31.44396)' },
    3: { value: 'oklch(25.474% 0.05477 26.76156)' },
    4: { value: 'oklch(29.024% 0.08662 27.75731)' },
    5: { value: 'oklch(33.11% 0.09753 28.62781)' },
    6: { value: 'oklch(38.001% 0.10033 29.89717)' },
    7: { value: 'oklch(44.636% 0.10625 31.60927)' },
    8: { value: 'oklch(53.806% 0.12937 33.40633)' },
    9: { value: 'oklch(62.708% 0.19359 33.33791)' },
    10: { value: 'oklch(66.429% 0.17859 34.08603)' },
    11: { value: 'oklch(77.935% 0.13103 34.90533)' },
    12: { value: 'oklch(89.867% 0.0465 31.23213)' },
  },
  black: {
    a: {
      1: { value: 'oklch(0% 0 0 / 0.05)' },
      2: { value: 'oklch(0% 0 0 / 0.1)' },
      3: { value: 'oklch(0% 0 0 / 0.15)' },
      4: { value: 'oklch(0% 0 0 / 0.2)' },
      5: { value: 'oklch(0% 0 0 / 0.3)' },
      6: { value: 'oklch(0% 0 0 / 0.4)' },
      7: { value: 'oklch(0% 0 0 / 0.5)' },
      8: { value: 'oklch(0% 0 0 / 0.6)' },
      9: { value: 'oklch(0% 0 0 / 0.7)' },
      10: { value: 'oklch(0% 0 0 / 0.8)' },
      11: { value: 'oklch(0% 0 0 / 0.9)' },
      12: { value: 'oklch(0% 0 0 / 0.95)' },
    },
  },
  white: {
    a: {
      1: { value: 'oklch(100% 0 0 / 0.05)' },
      2: { value: 'oklch(100% 0 0 / 0.1)' },
      3: { value: 'oklch(100% 0 0 / 0.15)' },
      4: { value: 'oklch(100% 0 0 / 0.2)' },
      5: { value: 'oklch(100% 0 0 / 0.3)' },
      6: { value: 'oklch(100% 0 0 / 0.4)' },
      7: { value: 'oklch(100% 0 0 / 0.5)' },
      8: { value: 'oklch(100% 0 0 / 0.6)' },
      9: { value: 'oklch(100% 0 0 / 0.7)' },
      10: { value: 'oklch(100% 0 0 / 0.8)' },
      11: { value: 'oklch(100% 0 0 / 0.9)' },
      12: { value: 'oklch(100% 0 0 / 0.95)' },
    },
  },
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
          inset: {
            value: 'inset 0 0 0 1px {colors.slate.4}',
          },
          default: {
            value:
              'inset 0 1px 0 0 {colors.white.a.2}, inset 0 -2px 0 0 {colors.black.a.4}, -15px 0 30px -5px {colors.iris.5}, 0 0 30px -5px {colors.blue.5}, 15px 0 30px -5px {colors.jade.5}',
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
          gggyrate: 'url(/media/gggyrate.svg)',
          noise: 'url(/media/noise-bg.png)',
          ooorganize: 'url(/media/ooorganize-bg.svg)',
        },
      },
      scale: {
        values: {
          '1.05': '1.05',
          '1': '1',
          '0.95': '0.95',
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
  /*
  hooks: {
    'cssgen:done': ({ artifact, content }) => {
      if (artifact === 'styles.css') {
        return removeUnusedCssVars(removeUnusedKeyframes(content))
      }
    },
  },
  */
})
