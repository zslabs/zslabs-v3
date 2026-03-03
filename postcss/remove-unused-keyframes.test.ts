import { describe, expect, it } from 'vitest'

import { removeUnusedKeyframes } from './remove-unused-keyframes'

describe('removeUnusedKeyframes', () => {
  it('removes unused keyframes and keeps used ones from animation shorthand', () => {
    const input = `
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }

      .loader {
        animation: 1s linear spin;
      }
    `

    const output = removeUnusedKeyframes(input)

    expect(output).toContain('@keyframes spin')
    expect(output).not.toContain('@keyframes fade')
  })

  it('keeps multiple animation names from comma-separated shorthand', () => {
    const input = `
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slide { from { transform: translateX(10px); } to { transform: translateX(0); } }
      @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-10px); } }

      .hero {
        animation: fade 200ms ease-in, slide 300ms cubic-bezier(0.2, 0, 0, 1);
      }
    `

    const output = removeUnusedKeyframes(input)

    expect(output).toContain('@keyframes fade')
    expect(output).toContain('@keyframes slide')
    expect(output).not.toContain('@keyframes bounce')
  })

  it('keeps names listed in animation-name', () => {
    const input = `
      @keyframes pulse { from { opacity: 0.8; } to { opacity: 1; } }
      @keyframes wiggle { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }

      .chip {
        animation-name: pulse;
      }
    `

    const output = removeUnusedKeyframes(input)

    expect(output).toContain('@keyframes pulse')
    expect(output).not.toContain('@keyframes wiggle')
  })

  it('preserves all keyframes when animation uses a dynamic var() name', () => {
    const input = `
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slide { from { transform: translateY(8px); } to { transform: translateY(0); } }

      .notice {
        animation-name: var(--motion-name);
      }
    `

    const output = removeUnusedKeyframes(input)

    expect(output).toContain('@keyframes fade')
    expect(output).toContain('@keyframes slide')
  })
})
