import localFont from 'next/font/local'

export const manrope = localFont({
  src: './Manrope[wght].woff2',
  variable: '--font-sans',
  weight: '400 600',
  style: 'normal',
})

export const jetBrainsMono = localFont({
  src: './JetBrainsMono[wght].woff2',
  variable: '--font-mono',
  weight: '400 600',
  style: 'normal',
})
