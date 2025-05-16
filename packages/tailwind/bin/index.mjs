#!/usr/bin/env node
import { load } from 'cheerio'
import fs from 'fs'
import path from 'path'
import prompts from 'prompts'
import replace from 'replace-in-file'

// ================================================================================
// MAIN
// ================================================================================
const main = async () => {
  const log = logger('Tailwind CSS Migration')
  const response = await prompts([
    {
      type: 'multiselect',
      name: 'targets',
      message: 'What do you want to migrate',
      choices: [
        {
          title: 'html templates (*.html)',
          value: 'HTML',
          selected: true,
        },
        {
          title: 'Global stylesheet',
          value: 'GLOBAL_STYLES',
          selected: false,
        },
        {
          title: 'inline templates (angular - *.ts)',
          value: 'INLINE',
          selected: false,
        },
      ],
      instructions: false,
    },
    {
      type: (_prev, { targets }) =>
        targets.includes('HTML') || targets.includes('INLINE') || targets.includes('SCSS') ? 'text' : null,
      name: 'pathToComponentFiles',
      message: 'Where are your html template files located?',
      // initial: path.join('src', 'app'),
      initial: path.join('test'),
    },
    {
      type: (_prev, { targets }) => (targets.includes('CSS_VARIABLES') ? 'text' : null),
      name: 'pathToStylesheets',
      message: 'Where are your scss style files located?',
      initial: path.join('src'),
    },
    {
      type: (_prev, { targets }) => (targets.includes('GLOBAL_STYLES') ? 'text' : null),
      name: 'pathGlobalStylesheet',
      message: 'Where is your global stylesheet located, with the imports?',
      initial: path.join('src', 'styles.scss'),
    },
  ])

  log.info()
  log.start()
  log.info()

  const { targets, utils, pathGlobalStylesheet, pathToComponentFiles, pathToStylesheets } = response

  const filePath = path.join(process.cwd(), `${(pathToComponentFiles || 'src/app').trim()}`)
  const globalStyleSheetPath = path.join(process.cwd(), `${(pathGlobalStylesheet || 'src/styles.scss').trim()}`)

  const isDirectory = await isDirectoryFn({ filePath })
  const directoryPath = isDirectory ? filePath : path.dirname(filePath)

  let isFile = false
  if ((targets.includes('HTML') || targets.includes('SCSS') || targets.includes('INLINE')) && !isDirectory) {
    try {
      isFile = await isFileFn({ filePath })
    } catch (error) {
      log.fail(`Could not find directory or file at ${filePath}`, error)
      return exit()
    }
  }

  let doesGlobalStylesheetExist = false
  if (targets.includes('GLOBAL_STYLES')) {
    try {
      doesGlobalStylesheetExist = await isFileFn({
        filePath: globalStyleSheetPath,
      })
    } catch (error) {
      log.info(`Could not find global stylesheet at ${globalStyleSheetPath}`, error)
    }
  }

  const extension = path.extname(filePath)
  const context = {
    log,
    isDirectory,
    directoryPath,
    isFile,
    filePath,
    extension,
    utils,
    targets,
    globalStyleSheetPath,
  }

  if (targets.includes('INLINE') || targets.includes('HTML')) {
    const utilReplacers = filterReplacers(context)

    // if (targets.includes('INLINE')) {
    //   await migrateInlineTemplates({ ...context, utilReplacers })
    // }

    if (targets.includes('HTML')) {
      await migrateHtmlFiles({ ...context, utilReplacers })
    }
  }

  log.succeed()
  return done()
}

// ================================================================================
// UTILITIES
// ================================================================================

async function migrateHtmlFiles({ filePath, log, utilReplacers }) {
  // check if path is directly one file
  const isFile = filePath.trim().endsWith('.html')
  let files = filePath
  if (!isFile) {
    files = path.join(`${files}`, '**', '*.html')
  }

  try {
    const results = [
      await replace({
        files: path.normalize(files),
        processor: input => {
          const $ = load(input)
          let content = input
          $('[class]').each((index, element) => {
            const classes = $(element).attr('class').split(' ')

            const modifiedClasses = classes.map(className => {
              for (let index = 0; index < utilReplacers.from.length; index++) {
                const oldClassName = utilReplacers.from[index]
                const replacement = utilReplacers.to[index]
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
        allowEmptyPaths: true,
        glob: {
          windowsPathsNoEscape: true,
        },
      }),
    ]

    let changedFiles = results
      .flat()
      .filter(result => result.hasChanged)
      .map(result => result.file.replace(process.cwd(), ''))

    changedFiles = changedFiles.filter((item, index) => changedFiles.indexOf(item) === index)

    if (changedFiles.length > 0) {
      changedFiles.forEach(file => log.list(file))
    }
    log.info()
  } catch (error) {
    log.info()
    log.fail(error)
    return Promise.reject()
  } finally {
    return Promise.resolve()
  }
}

function replaceHtml({ template, from, to }) {
  const $ = load(template)
  let newTemplate = template
  $('[class]').each((index, element) => {
    const classes = $(element).attr('class').split(' ')

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

    newTemplate = newTemplate.replace(`class="${classes.join(' ')}"`, `class="${modifiedClasses.join(' ')}"`)
  })

  return newTemplate
}

function printResult({ result, log }) {
  // filter for only change files and return the path
  let changedFiles = result
    .flat()
    .filter(result => result.hasChanged)
    .map(result => result.file.replace(process.cwd(), ''))

  // remove duplications
  changedFiles = changedFiles.filter((item, index) => changedFiles.indexOf(item) === index)

  if (changedFiles.length > 0) {
    changedFiles.forEach(file => log.list(file))
  }
}

async function isDirectoryFn({ filePath }) {
  try {
    const isDirectory = fs.lstatSync(filePath).isDirectory()
    return Promise.resolve(isDirectory)
  } catch (error) {
    return Promise.resolve(false)
  }
}

async function isFileFn({ filePath }) {
  try {
    const isFile = fs.lstatSync(filePath).isFile()
    return Promise.resolve(isFile)
  } catch (error) {
    return Promise.reject(error)
  }
}

function escapeRegex(string) {
  if (typeof string === 'string') {
    return string.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
  }
  return string
}

const breakpointClasses = className => ({
  from: allBreakpoints.map(b => new RegExp(`is-${className}${b ? `-${b}` : ''}`, 'g')),
  to: allBreakpoints.map(b => `${b ? `${b}:` : ''}${className}`),
})

const spacingClasses = (oldClassName, newClassName) => ({
  from: allSpacingValues.map(s => new RegExp(`${oldClassName}${s ? `-${s}` : ''}`, 'g')),
  to: allSpacingValues.map(s => `${newClassName}${s ? `-${s}` : ''}`),
})

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
    fail: message => {
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
      console.log('\x1b[90mUPDATE\x1b[0m', message)
    },
  }
}

// ================================================================================
// REPLACEMENTS
// ================================================================================

function filterReplacers({ utils }) {
  const from = []
  const to = []

  from.push(replacementsFlexDirections.from)
  to.push(replacementsFlexDirections.to)

  from.push(replacementsAlignItems.from)
  to.push(replacementsAlignItems.to)

  from.push(replacementsAlignContent.from)
  to.push(replacementsAlignContent.to)

  from.push(replacementsAlignSelf.from)
  to.push(replacementsAlignSelf.to)

  from.push(replacementsJustifyContent.from)
  to.push(replacementsJustifyContent.to)

  from.push(replacementsPosition.from)
  to.push(replacementsPosition.to)

  from.push(replacementsVerticalAlign.from)
  to.push(replacementsVerticalAlign.to)

  from.push(replacementsHeights.from)
  to.push(replacementsHeights.to)

  from.push(replacementsWidths.from)
  to.push(replacementsWidths.to)

  from.push(replacementsFontFamily.from)
  to.push(replacementsFontFamily.to)

  from.push(replacementsTextAlign.from)
  to.push(replacementsTextAlign.to)

  from.push(replacementsFontWeight.from)
  to.push(replacementsFontWeight.to)

  from.push(replacementsWhiteSpace.from)
  to.push(replacementsWhiteSpace.to)

  from.push(replacementsRadius.from)
  to.push(replacementsRadius.to)

  from.push(replacementsBorderWidth.from)
  to.push(replacementsBorderWidth.to)

  return { from: from.flat(), to: to.flat() }
}

const replacementsFlexDirections = {
  from: [
    /^flex-direction-row-reverse$/g,
    /^flex-direction-row$/g,
    /^flex-direction-column-reverse$/g,
    /^flex-direction-column$/g,
  ],
  to: ['flex-row-reverse', 'flex-row', 'flex-col-reverse', 'flex-col'],
}

const replacementsAlignItems = {
  from: [
    /^align-items-start$/g,
    /^align-items-end$/g,
    /^align-items-center$/g,
    /^align-items-stretch$/g,
    /^align-items-baseline$/g,
  ],
  to: ['items-start', 'items-end', 'items-center', 'items-stretch', 'items-baseline'],
}

const replacementsAlignContent = {
  from: [
    /^align-content-start$/g,
    /^align-content-end$/g,
    /^align-content-center$/g,
    /^align-content-baseline$/g,
    /^align-content-space-between$/g,
    /^align-content-space-around$/g,
    /^align-content-space-evenly$/g,
  ],
  to: [
    'content-start',
    'content-end',
    'content-center',
    'content-baseline',
    'content-space-between',
    'content-space-around',
    'content-space-evenly',
  ],
}

const replacementsAlignSelf = {
  from: [
    /^align-self-start$/g,
    /^align-self-end$/g,
    /^align-self-center$/g,
    /^align-self-stretch$/g,
    /^align-self-baseline$/g,
  ],
  to: ['self-start', 'self-end', 'self-center', 'self-stretch', 'self-baseline'],
}

const replacementsJustifyContent = {
  from: [
    /^justify-content-start$/g,
    /^justify-content-end$/g,
    /^justify-content-center$/g,
    /^justify-content-space-between$/g,
    /^justify-content-space-around$/g,
    /^justify-content-space-evenly$/g,
  ],
  to: ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'],
}

const replacementsPosition = {
  from: [
    /^top-50$/g,
    /^right-50$/g,
    /^bottom-50$/g,
    /^left-50$/g,
    /^top-100$/g,
    /^right-100$/g,
    /^bottom-100$/g,
    /^left-100$/g,
    /^top-1rem$/g,
    /^right-1rem$/g,
    /^bottom-1rem$/g,
    /^left-1rem$/g,
    /^top-0-5rem$/g,
    /^top-0-25rem$/g,
  ],
  to: [
    'top-1/2',
    'right-1/2',
    'bottom-1/2',
    'left-1/2',
    'top-full',
    'right-full',
    'bottom-full',
    'left-full',
    'top-4',
    'right-4',
    'bottom-4',
    'left-4',
    'top-2',
    'top-1',
  ],
}

const replacementsVerticalAlign = {
  from: [/^vertical-align-top$/g, /^vertical-align-middle$/g, /^vertical-align-bottom$/g],
  to: ['align-top', 'align-middle', 'align-bottom'],
}

const replacementsHeights = {
  from: [
    /^h-1rem$/g,
    /^h-2rem$/g,
    /^h-3rem$/g,
    /^h-4rem$/g,
    /^h-5rem$/g,
    /^h-6rem$/g,
    /^h-7rem$/g,
    /^h-8rem$/g,
    /^h-9rem$/g,
    /^h-10rem$/g,
    /^h-11rem$/g,
    /^h-12rem$/g,
    /^h-13rem$/g,
    /^h-14rem$/g,
    /^h-15rem$/g,
    /^h-16rem$/g,
    /^h-17rem$/g,
    /^h-18rem$/g,
    /^h-19rem$/g,
    /^h-20rem$/g,
    /^h-21rem$/g,
    /^h-22rem$/g,
    /^h-23rem$/g,
    /^h-24rem$/g,
    /^h-25rem$/g,
    /^h-26rem$/g,
    /^h-27rem$/g,
    /^h-28rem$/g,
    /^h-29rem$/g,
    /^h-30rem$/g,
  ],
  to: [
    'h-4',
    'h-8',
    'h-12',
    'h-16',
    'h-20',
    'h-24',
    'h-28',
    'h-32',
    'h-36',
    'h-40',
    'h-44',
    'h-48',
    'h-52',
    'h-56',
    'h-60',
    'h-64',
    'h-68',
    'h-72',
    'h-76',
    'h-80',
    'h-84',
    'h-88',
    'h-92',
    'h-96',
    'h-100',
    'h-104',
    'h-108',
    'h-112',
    'h-116',
    'h-120',
  ],
}

const replacementsWidths = {
  from: [
    /^w-12$/g,
    /^w-11$/g,
    /^w-10$/g,
    /^w-9$/g,
    /^w-8$/g,
    /^w-7$/g,
    /^w-6$/g,
    /^w-5$/g,
    /^w-4$/g,
    /^w-3$/g,
    /^w-2$/g,
    /^w-1$/g,
    /^w-1rem$/g,
    /^w-2rem$/g,
    /^w-3rem$/g,
    /^w-4rem$/g,
    /^w-5rem$/g,
    /^w-6rem$/g,
    /^w-7rem$/g,
    /^w-8rem$/g,
    /^w-9rem$/g,
    /^w-10rem$/g,
    /^w-11rem$/g,
    /^w-12rem$/g,
    /^w-13rem$/g,
    /^w-14rem$/g,
    /^w-15rem$/g,
    /^w-16rem$/g,
    /^w-17rem$/g,
    /^w-18rem$/g,
    /^w-19rem$/g,
    /^w-20rem$/g,
    /^w-21rem$/g,
    /^w-22rem$/g,
    /^w-23rem$/g,
    /^w-24rem$/g,
    /^w-25rem$/g,
    /^w-26rem$/g,
    /^w-27rem$/g,
    /^w-28rem$/g,
    /^w-29rem$/g,
    /^w-30rem$/g,
  ],
  to: [
    'w-full',
    'w-11/12',
    'w-5/6',
    'w-3/4',
    'w-2/3',
    'w-7/12',
    'w-1/2',
    'w-5/12',
    'w-1/3',
    'w-1/4',
    'w-1/6',
    'w-1/12',
    'w-4',
    'w-8',
    'w-12',
    'w-16',
    'w-20',
    'w-24',
    'w-28',
    'w-32',
    'w-36',
    'w-40',
    'w-44',
    'w-48',
    'w-52',
    'w-56',
    'w-60',
    'w-64',
    'w-68',
    'w-72',
    'w-76',
    'w-80',
    'w-84',
    'w-88',
    'w-92',
    'w-96',
    'w-100',
    'w-104',
    'w-108',
    'w-112',
    'w-116',
    'w-120',
  ],
}

const replacementsFontFamily = {
  from: [/^font-family-title$/g, /^font-family-text$/g],
  to: ['font-title', 'font-text'],
}

const replacementsTextAlign = {
  from: [/^text-align-center$/g, /^text-align-left$/g, /^text-align-right$/g, /^text-align-justify$/g],
  to: ['text-center', 'text-left', 'text-right', 'text-justify'],
}

const replacementsFontWeight = {
  from: [/^font-weight-bold$/g, /^font-weight-regular$/g, /^font-weight-light$/g],
  to: ['font-bold', 'font-normal', 'font-light'],
}

const replacementsWhiteSpace = {
  from: [/^white-space-normal$/g, /^white-space-nowrap$/g],
  to: ['whitespace-normal', 'whitespace-nowrap'],
}

const replacementsRadius = {
  from: [/^radius-none$/g, /^radius-normal$/g, /^radius-large$/g, /^radius-rounded$/g],
  to: ['rounded-none', 'rounded-normal', 'rounded-large', 'rounded-full'],
}

const replacementsBorderWidth = {
  from: [/^border-none$/g, /^border-width-small$/g, /^border-width-normal$/g, /^border-width-large$/g],
  to: ['border-none', 'border-small', 'border-normal', 'border-large'],
}

main()
