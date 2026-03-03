// SOURCE https://github.com/chakra-ui/panda/blob/main/sandbox/vite-ts/remove-unused-keyframes.ts
import postcss from 'postcss'

const cssWideKeywords = new Set([
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
])

const timingKeywords = new Set([
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'step-start',
  'step-end',
])

const directionKeywords = new Set([
  'normal',
  'reverse',
  'alternate',
  'alternate-reverse',
])

const fillModeKeywords = new Set(['none', 'forwards', 'backwards', 'both'])

const playStateKeywords = new Set(['running', 'paused'])

const isTimeToken = (token: string) => /^-?(?:\d+|\d*\.\d+)(ms|s)$/i.test(token)

const isNumberToken = (token: string) => /^-?(?:\d+|\d*\.\d+)$/.test(token)

const isTimingFunction = (token: string) =>
  /^(cubic-bezier|steps|linear)\(/i.test(token)

const stripQuotes = (value: string) => {
  const quote = value.at(0)
  if (!quote || (quote !== '"' && quote !== "'")) return value
  return value.at(-1) === quote ? value.slice(1, -1) : value
}

const splitTopLevel = (value: string, separator: ',' | ' ') => {
  const parts: string[] = []
  let depth = 0
  let activeQuote: string | null = null
  let token = ''

  for (let i = 0; i < value.length; i++) {
    const char = value[i]

    if (activeQuote) {
      token += char
      if (char === activeQuote && value[i - 1] !== '\\') activeQuote = null
      continue
    }

    if (char === '"' || char === "'") {
      activeQuote = char
      token += char
      continue
    }

    if (char === '(') {
      depth++
      token += char
      continue
    }

    if (char === ')') {
      depth = Math.max(0, depth - 1)
      token += char
      continue
    }

    if (depth === 0) {
      if (separator === ',' && char === ',') {
        const next = token.trim()
        if (next) parts.push(next)
        token = ''
        continue
      }

      if (separator === ' ' && /\s/.test(char)) {
        const next = token.trim()
        if (next) parts.push(next)
        token = ''
        continue
      }
    }

    token += char
  }

  const last = token.trim()
  if (last) parts.push(last)

  return parts
}

const normalizeName = (name: string) => stripQuotes(name.trim())

const getAnimationNames = (value: string) => {
  const names = new Set<string>()
  let hasDynamicReference = false

  for (const animation of splitTopLevel(value, ',')) {
    for (const part of splitTopLevel(animation, ' ')) {
      const token = part.trim()
      if (!token) continue

      const lower = token.toLowerCase()

      if (token.includes('var(')) {
        hasDynamicReference = true
        continue
      }

      if (cssWideKeywords.has(lower)) continue
      if (isTimeToken(token)) continue
      if (timingKeywords.has(lower) || isTimingFunction(token)) continue
      if (isNumberToken(token) || lower === 'infinite') continue
      if (directionKeywords.has(lower)) continue
      if (fillModeKeywords.has(lower)) continue
      if (playStateKeywords.has(lower)) continue

      const normalized = normalizeName(token)
      if (normalized && normalized !== 'none') names.add(normalized)
    }
  }

  return { names, hasDynamicReference }
}

const getAnimationNameList = (value: string) => {
  const names = new Set<string>()
  let hasDynamicReference = false

  for (const entry of splitTopLevel(value, ',')) {
    const token = entry.trim()
    if (!token) continue
    if (token.includes('var(')) {
      hasDynamicReference = true
      continue
    }

    const normalized = normalizeName(token)
    const lower = normalized.toLowerCase()
    if (cssWideKeywords.has(lower) || lower === 'none') continue

    names.add(normalized)
  }

  return { names, hasDynamicReference }
}

export const removeUnusedKeyframes = (css: string) => {
  const root = postcss.parse(css)

  const usedNames = new Set<string>()
  let hasDynamicAnimationReference = false

  root.walkDecls((decl) => {
    const prop = decl.prop.toLowerCase()
    if (prop !== 'animation' && prop !== 'animation-name') return

    const parsed =
      prop === 'animation'
        ? getAnimationNames(decl.value)
        : getAnimationNameList(decl.value)

    for (const name of parsed.names) usedNames.add(name)

    if (parsed.hasDynamicReference) hasDynamicAnimationReference = true
  })

  if (hasDynamicAnimationReference) return root.toString()

  // Remove unused keyframes
  root.walkAtRules('keyframes', (rule) => {
    const keyframeName = normalizeName(rule.params)
    if (!usedNames.has(keyframeName)) rule.remove()
  })

  return root.toString()
}
