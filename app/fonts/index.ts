import localFont from 'next/font/local'

// @NOTE These are licensed fonts; please don't use in your project ☠️
export const ttCommonsPro = localFont({
  src: './TT_Commons_Pro_Variable.woff2',
  display: 'swap',
  variable: '--font-sans',
})

export const ttCommonsProMono = localFont({
  src: './TT_Commons_Pro_Mono_Variable.woff2',
  display: 'swap',
  variable: '--font-mono',
})
