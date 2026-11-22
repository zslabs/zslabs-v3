// React Aria Components 1.22 data attributes.
// Preset-base already matches: current, disabled, dragging, empty, expanded,
// indeterminate, inert, invalid, open, pressed, required, selected, today,
// unavailable, horizontal, vertical, and placeholder (data-placeholder).
// level, stack-index, and trigger are open-ended values, so they are not conditions.

const flags = {
  allowsDragging: 'allows-dragging',
  allowsRemoving: 'allows-removing',
  allowsSorting: 'allows-sorting',
  currentAncestor: 'current-ancestor',
  dropTarget: 'drop-target',
  entering: 'entering',
  exiting: 'exiting',
  focusVisibleWithin: 'focus-visible-within',
  focusVisibleWithinRow: 'focus-visible-within-row',
  hasChildItems: 'has-child-items',
  hasDescendants: 'has-descendants',
  hasSubmenu: 'has-submenu',
  outsideMonth: 'outside-month',
  outsideVisibleRange: 'outside-visible-range',
  pending: 'pending',
  resizing: 'resizing',
  selectionEnd: 'selection-end',
  selectionStart: 'selection-start',
  treeColumn: 'tree-column',
} as const

const enums = [
  {
    prefix: 'channel',
    attribute: 'channel',
    values: [
      'hex',
      'hue',
      'saturation',
      'brightness',
      'lightness',
      'red',
      'green',
      'blue',
      'alpha',
    ],
  },
  { prefix: 'layout', attribute: 'layout', values: ['stack', 'grid'] },
  {
    prefix: 'orientation',
    attribute: 'orientation',
    values: ['horizontal', 'vertical'],
  },
  {
    prefix: 'placement',
    attribute: 'placement',
    values: ['left', 'right', 'top', 'bottom'],
  },
  {
    prefix: 'position',
    attribute: 'position',
    values: ['bottom', 'top', 'left', 'right', 'center'],
  },
  {
    prefix: 'resizable',
    attribute: 'resizable-direction',
    values: ['right', 'left', 'both'],
  },
  {
    prefix: 'selection',
    attribute: 'selection-mode',
    values: ['single', 'multiple'],
  },
  {
    prefix: 'sort',
    attribute: 'sort-direction',
    values: ['ascending', 'descending'],
  },
  {
    prefix: 'swipe',
    attribute: 'swipe-direction',
    values: ['bottom', 'top', 'vertical', 'left', 'right', 'horizontal'],
  },
  {
    prefix: 'type',
    attribute: 'type',
    values: [
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'dayPeriod',
      'literal',
      'timeZoneName',
    ],
  },
] as const

const upperFirst = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

const attribute = (name: string, value?: string) =>
  value === undefined ? `&[data-${name}]` : `&[data-${name}="${value}"]`

// RAC ignores emulated touch hover and uses its own attributes. Native
// elements keep the preset pseudo-classes.
const nativeOrRac = (racAttribute: string, native: string) =>
  `&:where([data-rac])[data-${racAttribute}], &:where(:not([data-rac]))${native}`

const splitSelectors = (selector: string) => {
  const parts: string[] = []
  let current = ''
  let depth = 0

  for (const char of selector) {
    if (char === '(') depth += 1
    if (char === ')') depth -= 1
    if (char === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
      continue
    }
    current += char
  }

  if (current.trim()) parts.push(current.trim())
  return parts
}

const retarget = (selector: string, parent: string, combinator: string) =>
  splitSelectors(selector)
    .map((part) => `${parent}${part.slice(1)}${combinator}&`)
    .join(', ')

const add = (
  conditions: Record<string, string>,
  name: string,
  selector: string,
) => {
  const suffix = upperFirst(name)
  conditions[name] = selector
  conditions[`group${suffix}`] = retarget(selector, '.group', ' ')
  conditions[`peer${suffix}`] = retarget(selector, '.peer', ' ~ ')
}

export const reactAriaConditions: Record<string, string> = {}

add(
  reactAriaConditions,
  'hover',
  nativeOrRac('hovered', ':is(:hover, [data-hover])'),
)
add(
  reactAriaConditions,
  'focus',
  nativeOrRac('focused', ':is(:focus, [data-focus])'),
)
add(
  reactAriaConditions,
  'focusWithin',
  nativeOrRac('focus-within', ':focus-within'),
)
add(
  reactAriaConditions,
  'focusVisible',
  nativeOrRac('focus-visible', ':is(:focus-visible, [data-focus-visible])'),
)
add(
  reactAriaConditions,
  'readOnly',
  nativeOrRac(
    'readonly',
    ':is(:read-only, [data-read-only], [aria-readonly=true])',
  ),
)
add(
  reactAriaConditions,
  'active',
  '&:where([data-rac]):is([data-pressed], [data-active]), &:where(:not([data-rac])):is(:active, [data-active])',
)
add(
  reactAriaConditions,
  'placeholderShown',
  '&:is(:placeholder-shown, [data-placeholder], [data-placeholder-shown])',
)

for (const [name, attr] of Object.entries(flags)) {
  add(reactAriaConditions, name, attribute(attr))
}

for (const { prefix, attribute: attributeName, values } of enums) {
  for (const value of values) {
    add(
      reactAriaConditions,
      `${prefix}${upperFirst(value)}`,
      attribute(attributeName, value),
    )
  }
}
