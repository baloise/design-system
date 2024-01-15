#!/usr/bin/env node

import prompts from 'prompts'
import replace from 'replace-in-file'
import path from 'path'
import { load } from 'cheerio'

// ================================================================================
// MAIN
// ================================================================================
const main = async () => {
  const log = logger('Styles Migration')

  const response = await prompts({
    type: 'text',
    name: 'filePath',
    message: 'Where are your html template files located?',
    initial: path.join('src', 'app'),
  })

  log.info()
  log.start()
  log.info()
  const { filePath } = response
  let files = path.join(process.cwd(), `${filePath.trim()}`)
  const isFile = filePath.trim().endsWith('.html')
  if (!isFile) {
    files = path.join(`${files}`, '**', '*.html')
  }

  try {
    const results = [
      await replace({
        files,
        processor: input => {
          const $ = load(input)
          let content = input
          $('[class]').each((index, element) => {
            const classes = $(element).attr('class').split(' ')

            const from = [
              ...replacementsBorder.from,
              ...replacementsColors.from,
              ...replacementsCore.from,
              ...replacementsFlex.from,
              ...replacementsDisplay.from,
              ...replacementsGrid.from,
              ...replacementsOpacity.from,
              ...replacementsRadius.from,
              ...replacementsShadow.from,
              ...replacementsSpacing.from,
              ...replacementsTypography.from,
              ...replacementsZIndex.from,
              ...replacementsSizing.from,
            ]
            const to = [
              ...replacementsBorder.to,
              ...replacementsColors.to,
              ...replacementsCore.to,
              ...replacementsFlex.to,
              ...replacementsDisplay.to,
              ...replacementsGrid.to,
              ...replacementsOpacity.to,
              ...replacementsRadius.to,
              ...replacementsShadow.to,
              ...replacementsSpacing.to,
              ...replacementsTypography.to,
              ...replacementsZIndex.to,
              ...replacementsSizing.to,
            ]

            const modifiedClasses = classes.map(className => {
              for (let index = 0; index < from.length; index++) {
                const oldClassName = from[index]
                const replacement = to[index]
                if (className.match(escapeRegex(oldClassName))) {
                  return className.replace(oldClassName, replacement)
                }
              }
              return className
            })

            content = content.replace(`class="${classes.join(' ')}"`, `class="${modifiedClasses.join(' ')}"`)
          })

          return content
        },
      }),
    ]

    let changedFiles = results
      .flat()
      .filter(result => result.hasChanged)
      .map(result => result.file.replace(path.join(process.cwd(), `${filePath}`), ''))

    changedFiles = changedFiles.filter((item, index) => changedFiles.indexOf(item) === index)

    if (changedFiles.length > 0) {
      changedFiles.forEach(file => log.list(file))
    } else {
      log.list('No files found to migrate')
    }
    log.info()
    log.succeed()
  } catch (error) {
    log.info()
    return log.fail(error)
  } finally {
    return done()
  }
}

// ================================================================================
// UTILITIES
// ================================================================================

function escapeRegex(string) {
  if (typeof string === 'string') {
    return string.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
  }
  return string
}

const exit = () => process.exit(1)
const done = () => process.exit(0)
const log = (message, ...args) => console.log(message, ...args)
const logger = subject => {
  let startTime = new Date()

  return {
    info: (message, ...args) => {
      console.log(message || '', ...args)
    },
    start: message => {
      startTime = new Date()
      log('⏳ ', `${subject} \x1b[90mstarted ...\x1b[0m`, message || '')
    },
    succeed: message => {
      const endTime = new Date()
      const duration = endTime - startTime
      const seconds = parseFloat(duration / 1000).toFixed(2)
      log('✅ ', `\x1b[32m${subject} \x1b[90mfinished in ${seconds}sec\x1b[0m`, message || '')
    },
    fail: (message, ...args) => {
      const endTime = new Date()
      const duration = endTime - startTime
      const seconds = parseFloat(duration / 1000).toFixed(2)
      log('❌ ', `\x1b[31m${subject} \x1b[90mfailed after ${seconds}sec\x1b[0m`)
      if (message) {
        console.error(message)
      }
      exit()
    },
    list: message => {
      console.log('❯', message)
    },
  }
}

const minBreakpoints = ['', 'mobile', 'tablet', 'desktop', 'widescreen']

const allBreakpoints = [
  'tablet-only',
  'desktop-only',
  'high-definition-only',
  'widescreen-only',
  'mobile',
  'tablet',
  'touch',
  'desktop',
  'high-definition',
  'widescreen',
  'fullhd',
  '',
]

const allSpacingValues = [
  'auto',
  'none',
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'x-large',
  'xx-large',
  'xxx-large',
  'xxxx-large',
  'large',
]

// ================================================================================
// MAPPINGS
// ================================================================================

const invertedTextWhite = {
  from: [
    /has-text-black-inverted/g,
    /has-text-grey-5-inverted/g,
    /has-text-grey-6-inverted/g,
    /has-text-blue-4-inverted/g,
    /has-text-blue-5-inverted/g,
    /has-text-blue-6-inverted/g,
    /has-text-light-blue-4-inverted/g,
    /has-text-light-blue-5-inverted/g,
    /has-text-light-blue-6-inverted/g,
    /has-text-purple-4-inverted/g,
    /has-text-purple-5-inverted/g,
    /has-text-purple-6-inverted/g,
    /has-text-green-6-inverted/g,
    /has-text-yellow-6-inverted/g,
    /has-text-red-4-inverted/g,
    /has-text-red-5-inverted/g,
    /has-text-red-6-inverted/g,
    /has-text-info-3-inverted/g,
    /has-text-info-4-inverted/g,
    /has-text-info-5-inverted/g,
    /has-text-info-6-inverted/g,
    /has-text-success-3-inverted/g,
    /has-text-success-4-inverted/g,
    /has-text-success-5-inverted/g,
    /has-text-success-6-inverted/g,
    /has-text-danger-3-inverted/g,
    /has-text-danger-4-inverted/g,
    /has-text-danger-5-inverted/g,
    /has-text-danger-6-inverted/g,
    /has-text-primary-4-inverted/g,
    /has-text-primary-5-inverted/g,
    /has-text-primary-6-inverted/g,
    /has-text-primary-inverted/g,
    /has-text-blue-inverted/g,
    /has-text-info-inverted/g,
    /has-text-success-inverted/g,
    /has-text-danger-inverted/g,
  ],
  to: [
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
  ],
}

const invertedTextPrimary = {
  from: [
    /has-text-transparent-inverted/g,
    /has-text-white-inverted/g,
    /has-text-grey-1-inverted/g,
    /has-text-grey-2-inverted/g,
    /has-text-grey-3-inverted/g,
    /has-text-grey-4-inverted/g,
    /has-text-blue-1-inverted/g,
    /has-text-blue-2-inverted/g,
    /has-text-blue-3-inverted/g,
    /has-text-light-blue-1-inverted/g,
    /has-text-light-blue-2-inverted/g,
    /has-text-light-blue-3-inverted/g,
    /has-text-purple-1-inverted/g,
    /has-text-purple-2-inverted/g,
    /has-text-purple-3-inverted/g,
    /has-text-green-1-inverted/g,
    /has-text-green-2-inverted/g,
    /has-text-green-3-inverted/g,
    /has-text-green-4-inverted/g,
    /has-text-green-5-inverted/g,
    /has-text-yellow-1-inverted/g,
    /has-text-yellow-2-inverted/g,
    /has-text-yellow-3-inverted/g,
    /has-text-yellow-4-inverted/g,
    /has-text-yellow-5-inverted/g,
    /has-text-red-1-inverted/g,
    /has-text-red-2-inverted/g,
    /has-text-red-3-inverted/g,
    /has-text-info-1-inverted/g,
    /has-text-info-2-inverted/g,
    /has-text-success-1-inverted/g,
    /has-text-success-2-inverted/g,
    /has-text-warning-1-inverted/g,
    /has-text-warning-2-inverted/g,
    /has-text-warning-3-inverted/g,
    /has-text-warning-4-inverted/g,
    /has-text-warning-5-inverted/g,
    /has-text-warning-6-inverted/g,
    /has-text-danger-1-inverted/g,
    /has-text-danger-2-inverted/g,
    /has-text-primary-1-inverted/g,
    /has-text-primary-2-inverted/g,
    /has-text-primary-3-inverted/g,
    /has-text-grey-inverted/g,
    /has-text-light-blue-inverted/g,
    /has-text-purple-inverted/g,
    /has-text-green-inverted/g,
    /has-text-yellow-inverted/g,
    /has-text-red-inverted/g,
    /has-text-warning-inverted/g,
  ],
  to: [
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
    'text-primary',
  ],
}

const textSizeLegacy = {
  from: [
    /is-size-display/g,
    /is-size-display-2/g,
    /is-size-1/g,
    /is-size-2/g,
    /is-size-3/g,
    /is-size-4/g,
    /is-size-5/g,
    /is-size-6/g,
    /is-size-7/g,
    /is-size-8/g,
  ],
  to: [
    'text-xxxxx-large',
    'text-xxxx-large',
    'text-xxx-large',
    'text-xx-large',
    'text-x-large',
    'text-large',
    'text-medium',
    'text-normal',
    'text-small',
    'text-x-small',
  ],
}

const textAlignment = {
  from: [
    /has-text-centered-desktop/g,
    /has-text-centered-tablet/g,
    /has-text-centered-mobile/g,
    /has-text-centered/g,
    /has-text-justified-desktop/g,
    /has-text-justified-tablet/g,
    /has-text-justified-mobile/g,
    /has-text-justified/g,
    /has-text-left-desktop/g,
    /has-text-left-tablet/g,
    /has-text-left-mobile/g,
    /has-text-left/g,
    /has-text-right-desktop/g,
    /has-text-right-tablet/g,
    /has-text-right-mobile/g,
    /has-text-right/g,
  ],
  to: [
    'desktop:text-align-center',
    'tablet:text-align-center',
    'mobile:text-align-center',
    'text-align-center',
    'desktop:text-align-justify',
    'tablet:text-align-justify',
    'mobile:text-align-justify',
    'text-align-justify',
    'desktop:text-align-left',
    'tablet:text-align-left',
    'mobile:text-align-left',
    'text-align-left',
    'desktop:text-align-right',
    'tablet:text-align-right',
    'mobile:text-align-right',
    'text-align-right',
  ],
}

const breakpointClasses = className => ({
  from: allBreakpoints.map(b => new RegExp(`is-${className}${b ? `-${b}` : ''}`, 'g')),
  to: allBreakpoints.map(b => `${b ? `${b}:` : ''}${className}`),
})

const spacingClasses = (oldClassName, newClassName) => ({
  from: allSpacingValues.map(s => new RegExp(`${oldClassName}${s ? `-${s}` : ''}`, 'g')),
  to: allSpacingValues.map(s => `${newClassName}${s ? `-${s}` : ''}`),
})

const marginAndPadding = () => {
  const props = ['m', 'p']
  const orientation = ['', '', 'x', 'y', 't', 'r', 'b', 'l']
  const sizes = [
    'none',
    'xx-small',
    'x-small',
    'small',
    'normal',
    'medium',
    'large',
    'x-large',
    'xx-large',
    'xxx-large',
    'xxxx-large',
  ]
  const fromResults = []
  const toResults = []
  props.forEach(p => {
    orientation.forEach(o => {
      sizes.forEach((s, i) => {
        fromResults.push(new RegExp(`${p}${o ? '-' + o : ''}-${i}`, 'g'))
        toResults.push(`${p}${o ? '-' + o : ''}-${s}`)
      })
    })
  })
  return {
    from: fromResults,
    to: toResults,
  }
}

// ================================================================================
// REPLACEMENTS
// ================================================================================
const ColSizes = [
  'is-narrow',
  'is-full',
  'is-three-quarters',
  'is-two-thirds',
  'is-half',
  'is-one-third',
  'is-one-quarter',
  'is-one-fifth',
  'is-two-fifths',
  'is-three-fifths',
  'is-four-fifths',
  'is-offset-three-quarters',
  'is-offset-two-thirds',
  'is-offset-half',
  'is-offset-one-third',
  'is-offset-one-quarter',
  'is-offset-one-fifth',
  'is-offset-two-fifths',
  'is-offset-three-fifths',
  'is-offset-four-fifths',
  'is-0',
  'is-offset-0',
  'is-1',
  'is-offset-1',
  'is-2',
  'is-offset-2',
  'is-3',
  'is-offset-3',
  'is-4',
  'is-offset-4',
  'is-5',
  'is-offset-5',
  'is-6',
  'is-offset-6',
  'is-7',
  'is-offset-7',
  'is-8',
  'is-offset-8',
  'is-8',
  'is-offset-9',
  'is-10',
  'is-offset-10',
  'is-11',
  'is-offset-11',
  'is-12',
  'is-offset-12',
]

const replacementsGrid = {
  from: [
    /(?<!-)columns/g,
    /(?<!-)\bcolumn\b/g,
    ...ColSizes.map(className => new RegExp(`${className}-mobile`, 'g')),
    ...ColSizes.map(className => new RegExp(`${className}-tablet`, 'g')),
    ...ColSizes.map(className => new RegExp(`${className}-touch`, 'g')),
    ...ColSizes.map(className => new RegExp(`${className}-desktop`, 'g')),
    ...ColSizes.map(className => new RegExp(`${className}-widescreen`, 'g')),
    ...ColSizes.map(className => new RegExp(`${className}-fullhd`, 'g')),
  ],
  to: [
    'grid',
    'col',
    ...ColSizes.map(className => `mobile:${className}`, 'g'),
    ...ColSizes.map(className => `tablet:${className}`, 'g'),
    ...ColSizes.map(className => `touch:${className}`, 'g'),
    ...ColSizes.map(className => `desktop:${className}`, 'g'),
    ...ColSizes.map(className => `widescreen:${className}`, 'g'),
    ...ColSizes.map(className => `fullhd:${className}`, 'g'),
  ],
}

const replacementsBorder = {
  from: [/has-border-light-blue/g, /has-border-primary-dark/g, /has-border/g, /has-radius/g],
  to: ['border-primary-hovered', 'border-primary-pressed', 'border', 'radius'],
}

const replacementsColors = {
  from: [/has-background-blue/g, /has-background/g, ...invertedTextWhite.from, ...invertedTextPrimary.from],
  to: ['bg-primary', 'bg', ...invertedTextWhite.to, ...invertedTextPrimary.to],
}

const replacementsCore = {
  from: [/is-vertical-align/g, /is-clickable/g],
  to: ['vertical-align', 'cursor-pointer'],
}

const replacementsDisplay = {
  from: [
    ...breakpointClasses('inline-block').from,
    ...breakpointClasses('inline-flex').from,
    ...breakpointClasses('block').from,
    ...breakpointClasses('flex').from,
    ...breakpointClasses('inline').from,
    ...breakpointClasses('hidden').from,
  ],
  to: [
    ...breakpointClasses('inline-block').to,
    ...breakpointClasses('inline-flex').to,
    ...breakpointClasses('block').to,
    ...breakpointClasses('flex').to,
    ...breakpointClasses('inline').to,
    ...breakpointClasses('hidden').to,
  ],
}

const replacementsFlex = {
  from: [
    /is-flex-direction/g,
    /is-flex-wrap-nowrap/g,
    /is-flex-wrap-wrap-reverse/g,
    /is-flex-wrap-wrap/g,
    /is-justify-content-flex/g,
    /is-justify-content-left/g,
    /is-justify-content-right/g,
    /is-justify-content/g,
    /is-align-content-flex/g,
    /is-align-content/g,
    /is-align-items-flex/g,
    /is-align-items-self/g,
    /is-align-items/g,
    /is-align-self-flex/g,
    /is-align-self/g,
    /is-flex-1/g,
    /is-flex-auto/g,
    /is-flex-initial/g,
    /is-flex-none/g,
    /is-flex-grow-0/g,
    /is-flex-shrink-0/g,
    /is-flex-grow-1/g,
    /is-flex-shrink-1/g,
    ...spacingClasses('fg', 'gap').from,
  ],
  to: [
    'flex-direction',
    'flex-nowrap',
    'flex-wrap-reverse',
    'flex-wrap',
    'justify-content',
    'justify-content-start',
    'justify-content-end',
    'justify-content',
    'align-content',
    'align-content',
    'align-items',
    'align-items',
    'align-items',
    'align-self',
    'align-self',
    'flex-1',
    'flex-auto',
    'flex-initial',
    'flex-none',
    'flex-initial',
    'flex-initial',
    'flex-1',
    'flex-1',
    ...spacingClasses('fg', 'gap').to,
  ],
}

const replacementsOpacity = {
  from: [/has-opacity-1/g, /has-opacity/g],
  to: ['opacity-100', 'opacity'],
}

const replacementsRadius = {
  from: [/has-radius/g],
  to: ['radius'],
}

const replacementsShadow = {
  from: [/has-shadow/g, /has-text-shadow/g, /has-button-shadow/g],
  to: ['shadow', 'text-shadow-normal', 'text-shadow-normal'],
}

const replacementsSpacing = {
  from: [/is-marginless/g, /is-paddingless/g, ...marginAndPadding().from],
  to: ['m-none', 'p-none', ...marginAndPadding().to],
}

const replacementsTypography = {
  from: [
    /has-text-weight/g,
    /is-white-space-normal/g,
    /has-no-wrap/g,
    /is-white-space-nowrap/g,
    /is-capitalized/g,
    /is-lowercase/g,
    /is-uppercase/g,
    /is-family-text/g,
    /is-family-title/g,
    /has-text/g,
    /is-size/g,
    ...textSizeLegacy.from,
    ...textAlignment.from,
  ],
  to: [
    'text-weight',
    'white-space-normal',
    'white-space-nowrap',
    'white-space-nowrap',
    'capitalize',
    'lowercase',
    'uppercase',
    'font-family-text',
    'font-family-title',
    'text',
    'text',
    ...textSizeLegacy.to,
    ...textAlignment.to,
  ],
}

const replacementsZIndex = {
  from: [/has-z-index/g],
  to: ['z-index'],
}

const replacementsSizing = {
  from: [/is-fullheight/g, /is-fullwidth/g],
  to: ['h-full', 'w-full'],
}

main()
