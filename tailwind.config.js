const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const colors = require('./helpers/tw.json')

// @NOTE Use https://colorbox.io/ to generate color palettes
// Primary: #3990b9
// Success: #3da35f
// Danger: #952327

const patterns = plugin(({ addUtilities }) => {
  addUtilities({
    '.nnnoise': {
      backgroundImage: "url('/media/nnnoise-bg.svg')",
    },
    '.ooorganize': {
      backgroundImage: "url('/media/ooorganize-bg.svg')",
    },
    '.gggyrate': {
      backgroundImage: "url('/media/gggyrate.svg')",
    },
  })
})

const utilities = plugin(({ addVariant }) => {
  addVariant('hocus', [
    '@media (hover: hover) and (pointer: fine) { &:hover }',
    '&:focus',
  ])
  addVariant('group-hocus', [
    '@media (hover: hover) and (pointer: fine) { .group:hover & }',
    '.group:focus &',
  ])
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      animation: {
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade':
          'slide-down-fade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade':
          'slide-left-fade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(0.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: '0', transform: 'translateX(-0.25rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-0.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: '0', transform: 'translateX(0.25rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'button-contrast':
          '-15px 0 30px -5px var(--tomato5), 0 0 30px -5px var(--blue5), 15px 0 30px -5px var(--violet5)',
        'button-default':
          '-15px 0 30px -5px var(--violet5), 0 0 30px -5px var(--blue5), 15px 0 30px -5px var(--green5)',
        'button-cta':
          '-15px 0 30px -5px var(--violet5), 0 0 30px -5px var(--blue5), 15px 0 30px -5px var(--tomato5)',
        'button-overlay-contrast': '0 0 0 1px var(--whiteA6)',
      },
      fontFamily: {
        sans: ['Manrope Variable', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono Variable', ...defaultTheme.fontFamily.mono],
      },
      maxHeight: {
        120: '30rem',
      },
      textUnderlineOffset: {
        5: '5',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  plugins: [
    patterns,
    utilities,
    require('tailwindcss-radix')({ variantPrefix: 'rdx' }),
  ],
}
