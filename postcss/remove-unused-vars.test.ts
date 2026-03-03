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

  it('keeps gradient utility vars used through a custom-property dependency chain', () => {
    const input = `
      * {
        --gradient-from-position: ;
        --gradient-to-position: ;
      }

      .bg-linear_to-r {
        --gradient-stops: var(--gradient-via-stops, var(--gradient-position), var(--gradient-from) var(--gradient-from-position), var(--gradient-to) var(--gradient-to-position));
        --gradient-position: to right;
        background-image: linear-gradient(var(--gradient-stops));
      }

      .grad-from_blue\.9 {
        --gradient-from: var(--colors-blue-9);
      }

      .grad-to_iris\.9 {
        --gradient-to: var(--colors-iris-9);
      }

      :root {
        --colors-blue-9: #0073ff;
        --colors-iris-9: #6f56f4;
      }
    `

    const output = removeUnusedCssVars(input)

    expect(output).toContain('.grad-to_iris.9')
    expect(output).toContain('--gradient-to: var(--colors-iris-9)')
    expect(output).toContain('--colors-iris-9: #6f56f4')
    expect(output).toContain('--gradient-to-position:')
    expect(output).toContain('--gradient-from-position:')
  })
})
