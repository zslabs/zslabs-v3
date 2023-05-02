import { promises as fs } from 'fs'
import { performance } from 'perf_hooks'

import { importDirectory } from '@iconify/tools/lib/import/directory'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup'
import fsExtra from 'fs-extra'
import { createSpinner } from 'nanospinner'
import postcss from 'postcss'
// @ts-expect-error No types for this package
import lightning from 'postcss-lightningcss'

/** Function to return unique value to deter direct-styling of icons */
function makeBuildHash(): string {
  return (Math.random() + 1).toString(36).substring(9)
}

/** Used to generate unique classname and selector */
const buildHash = makeBuildHash()

async function processSvgs() {
  // Cleanup current build directory
  fsExtra.emptyDirSync('icons/build')

  /** Import icons from directory */
  const iconSet = await importDirectory('icons/src', {
    prefix: buildHash,
  })

  // Validate, clean up, fix palette and optimize
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = iconSet.toSVG(name)

    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimize icons
    try {
      await cleanupSVG(svg)

      await runSVGO(svg, {
        plugins: [
          'mergeStyles',
          'inlineStyles',
          'removeComments',
          'removeUselessDefs',
          'removeEditorsNSData',
          'removeEmptyAttrs',
          'removeEmptyContainers',
          'removeEmptyText',
          'convertStyleToAttrs',
          'convertColors',
          'convertPathData',
          'convertShapeToPath',
          'convertEllipseToCircle',
          'convertTransform',
          'removeUnknownsAndDefaults',
          'removeNonInheritableGroupAttrs',
          'removeUselessStrokeAndFill',
          'removeUnusedNS',
          'cleanupEnableBackground',
          'cleanupAttrs',
          'cleanupNumericValues',
          'cleanupListOfValues',
          'mergePaths',
          'minifyStyles',
          'moveElemsAttrsToGroup',
          'moveGroupAttrsToElems',
          'collapseGroups',
          'sortDefsChildren',
          'sortAttrs',
          'reusePaths',
          'removeRasterImages',
        ],
      })
    } catch (err) {
      // Invalid icon
      // eslint-disable-next-line no-console
      console.error(`Error parsing ${name}:`, err)

      iconSet.remove(name)
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export as IconifyJSON
  const iconsExport = iconSet.export()

  const exported = `${JSON.stringify(iconsExport, null, '\t')}\n`

  //
  // Generate types
  //

  // All icons
  const typesAll = `export type IconName = ${Object.keys(iconsExport.icons)
    .map((key) => `'${key}'`)
    .join(' | ')}\n`

  await fs.writeFile(`icons/build/types.d.ts`, typesAll, 'utf8')

  // Generate CSS
  const css = `
[data-${buildHash}] {
  display: block;
  /* Scale the icon to match the font-size of the parent element. */
  width: 1em;
  height: 1em;
  /* Prevent the icon from shrinking inside a flex container. */
  flex-shrink: 0;
  /* Preserve colors while printing */
  print-color-adjust: exact;
}

.is-inline {
  /* Place the icon on the text baseline. */
  display: inline-block;
  vertical-align: -0.125em;
}
`
  // Generate CSS
  const result = await postcss([lightning]).process(css, {
    from: undefined,
  })

  // Save CSS to file
  await fs.writeFile(`icons/build/styles.css`, result.css, 'utf8')

  // Save build hash to file
  await fs.writeFile(
    `icons/build/hash.ts`,
    `export const hash = '${buildHash}';`,
    'utf8'
  )

  // Save JSON of data file
  await fs.writeFile(`icons/build/manifest.json`, exported, 'utf8')
}

// eslint-disable-next-line
;(async () => {
  // Let's kick things off!
  const startTime = performance.now()
  const spinner = createSpinner('Generating icons...').start()

  await processSvgs()

  // All done!
  const endTime = performance.now()
  const elapsedTime = (endTime - startTime) / 1000

  spinner.success({
    text: `Icons generated successfully in ${elapsedTime.toFixed(2)} seconds`,
    mark: ':)',
  })
})()
