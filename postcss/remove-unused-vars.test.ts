import { describe, expect, it } from 'vitest'

import { removeUnusedCssVars } from './remove-unused-vars'

describe('removeUnusedCssVars', () => {
  it('removes variables that are never referenced', () => {
    const input = `
      :root {
        --used: tomato;
        --unused: blue;
      }

      .title {
        color: var(--used);
      }
    `

    const output = removeUnusedCssVars(input)

    expect(output).toContain('--used: tomato')
    expect(output).toContain('color: var(--used)')
    expect(output).not.toContain('--unused: blue')
  })

  it('keeps dependency chains for used variables', () => {
    const input = `
      :root {
        --brand: #00f;
        --button-bg: var(--brand);
        --button-fg: #fff;
      }

      .button {
        background: var(--button-bg);
      }
    `

    const output = removeUnusedCssVars(input)

    expect(output).toContain('--brand: #00f')
    expect(output).toContain('--button-bg: var(--brand)')
    expect(output).not.toContain('--button-fg: #fff')
  })

  it('removes empty rules after deleting their only variable declaration', () => {
    const input = `
      :root {
        --unused-only: green;
      }

      .card {
        padding: 8px;
      }
    `

    const output = removeUnusedCssVars(input)

    expect(output).not.toContain('--unused-only: green')
    expect(output).not.toContain(':root {}')
    expect(output).toContain('.card')
  })
})
