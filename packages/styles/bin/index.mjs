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
    // initial: '__tests__/templates',
    // initial: '../components/src/test',
  })

  log.info()
  log.start()
  log.info()
  const { filePath } = response
  let files = path.join(process.cwd(), `${filePath}`)
  const isFile = filePath.endsWith('.html')
  if (!isFile) {
    files = path.join(`${files}`, '**', '*.html')
  }
  console.log(files)

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
              ...replacementsDeprecatedBorder.from,
              ...replacementsColors.from,
              ...replacementsBlueColors.from,
              ...replacementsCore.from,
              ...replacementsDisplay.from,
              ...replacementsFlex.from,
              ...replacementsGrid.from,
              ...replacementsOpacity.from,
              ...replacementsRadius.from,
              ...replacementsShadow.from,
              ...replacementsSpacing.from,
              ...replacementsTypography.from,
              ...replacementsZIndex.from,
            ]
            const to = [
              ...replacementsBorder.to,
              ...replacementsDeprecatedBorder.to,
              ...replacementsColors.to,
              ...replacementsBlueColors.to,
              ...replacementsCore.to,
              ...replacementsDisplay.to,
              ...replacementsFlex.to,
              ...replacementsGrid.to,
              ...replacementsOpacity.to,
              ...replacementsRadius.to,
              ...replacementsShadow.to,
              ...replacementsSpacing.to,
              ...replacementsTypography.to,
              ...replacementsZIndex.to,
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

            content = content.replace(classes.join(' '), modifiedClasses.join(' '))
            // $(element).attr('class', modifiedClasses.join(' '))
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

const replacementsGrid = {
  from: [/columns/g, /column(?![^;]*;)/g],
  to: ['grid', 'col'],
}

const replacementsBorder = {
  from: [/has-border/g, /has-radius/g],
  to: ['border', 'radius'],
}

const replacementsDeprecatedBorder = {
  from: [/border-light-blue/g, /border-primary-dark/g],
  to: ['border-primary-hovered', 'border-primary-pressed'],
}

const replacementsColors = {
  from: [/has-background/g, ...invertedTextWhite.from, ...invertedTextPrimary.from],
  to: ['bg', ...invertedTextWhite.to, ...invertedTextPrimary.to],
}

const replacementsBlueColors = {
  from: [/bg-blue/g],
  to: ['bg-primary'],
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
    /is-flex-wrap-wrap/g,
    /is-flex-wrap-wrap-reverse/g,
    /is-justify-content-flex/g,
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
    'flex-wrap',
    'flex-wrap-reverse',
    'justify-content',
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
  from: [/has-opacity/g],
  to: ['opacity'],
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

main()
