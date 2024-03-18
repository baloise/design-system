// Load type definitions that come with Cypress module
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
import type { DiffOption, TypeOption, VisualRegressionOptions, VisualRegressionResult } from './plugin'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Chainable {
      // eslint-disable-next-line @typescript-eslint/method-signature-style
      testVisual(name: string, options?: PluginCommandOptions): Chainable<VisualRegressionResult>
    }
  }
}

export type ScreenshotOptions = Partial<Cypress.ScreenshotOptions & PluginSetupOptions>

export type PluginCommandOptions = number | ScreenshotOptions

export type PluginSetupOptions = {
  errorThreshold: number
  failSilently: boolean
}

export type CypressConfigEnv = {
  visualRegression: {
    type: TypeOption
    baseDirectory?: string
    diffDirectory?: string
    generateDiff?: DiffOption
    failSilently?: boolean
  }
}

/** Add custom cypress command to compare image snapshots of an element or the window. */
function addCompareSnapshotCommand(screenshotOptions?: ScreenshotOptions): void {
  console.log('')
  console.log('visualRegressionType => ', Cypress.env('visualRegressionType'))
  console.log('')

  Cypress.Commands.add(
    'testVisual',
    { prevSubject: 'optional' },
    function (
      subject: keyof HTMLElementTagNameMap,
      name: string,
      commandOptions: PluginCommandOptions,
    ): Cypress.Chainable {
      if (name === undefined || name === '') {
        throw new Error('Snapshot name must be specified')
      }

      // prepare screenshot options
      let errorThreshold = 0

      if (screenshotOptions?.errorThreshold !== undefined) {
        errorThreshold = screenshotOptions.errorThreshold
      }

      if (typeof commandOptions === 'object') {
        screenshotOptions = { ...screenshotOptions, ...commandOptions }
        if (commandOptions.errorThreshold !== undefined) {
          errorThreshold = commandOptions.errorThreshold
        }
      } else if (typeof commandOptions === 'number') {
        errorThreshold = commandOptions
      }

      const visualRegressionOptions: VisualRegressionOptions = prepareOptions(name, errorThreshold, screenshotOptions)

      return takeScreenshot(subject, name, screenshotOptions).then((screenshotAbsolutePath: string) => {
        visualRegressionOptions.screenshotAbsolutePath = screenshotAbsolutePath
        switch (visualRegressionOptions.type) {
          case 'regression':
            return compareScreenshots(visualRegressionOptions)
          case 'base':
            return cy.task('updateSnapshot', visualRegressionOptions)
          default:
            throw new Error(
              `The "type" environment variable is unknown.
              Expected: "regression" or "base"
              Actual: ${visualRegressionOptions.type as string}`,
            )
        }
      })
    },
  )
}

function prepareOptions(
  name: string,
  errorThreshold: number,
  screenshotOptions?: ScreenshotOptions,
): VisualRegressionOptions {
  if (Cypress.env('visualRegression') === undefined) {
    throw new Error(
      'Environment variables under "visualRegression" apper to be missing. Please consult the plugin documentation for the proper setup.',
    )
  }
  const options: VisualRegressionOptions = {
    type: (Cypress.env('visualRegressionType') as TypeOption) || 'regression',
    screenshotName: name,
    specName: Cypress.spec.name,
    screenshotAbsolutePath: 'null', // will be set after takeScreenshot
    errorThreshold,
    baseDirectory: Cypress.env('visualRegression')?.baseDirectory,
    diffDirectory: Cypress.env('visualRegression')?.diffDirectory,
    generateDiff: Cypress.env('visualRegression')?.generateDiff,
    failSilently: Cypress.env('visualRegression')?.failSilently,
  }

  if (screenshotOptions?.failSilently !== undefined) {
    options.failSilently = screenshotOptions.failSilently
  } else if (Cypress.env('visualRegression').failSilently !== undefined) {
    options.failSilently = Cypress.env('visualRegression').failSilently
  }

  return options
}

/** Take a screenshot and move screenshot to base or actual folder */
function takeScreenshot(
  subject: string | undefined,
  name: string,
  screenshotOptions?: ScreenshotOptions,
): Cypress.Chainable<string> {
  const objToOperateOn = subject !== undefined ? cy.get(subject) : cy
  let screenshotPath: string
  return objToOperateOn
    .waitAfterFramePaint()
    .waitAfterIdleCallback()
    .screenshot(name, {
      ...screenshotOptions,
      onAfterScreenshot(_el, props) {
        screenshotPath = props.path
      },
    })
    .then(() => {
      return screenshotPath
    })
}

/** Call the plugin to compare snapshot images and generate a diff */
function compareScreenshots(options: VisualRegressionOptions): Cypress.Chainable {
  return cy.task('compareSnapshots', options).then((results: VisualRegressionResult) => {
    if (results.error !== undefined && !options.failSilently) {
      throw new Error(results.error)
    }
    return results
  })
}

export { addCompareSnapshotCommand }
