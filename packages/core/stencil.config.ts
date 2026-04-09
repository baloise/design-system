import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import fg from 'fast-glob'
import { join, parse, resolve } from 'path'

import { webOutputTarget } from '@baloise/output-target-web'
import { CustomDocumentationGenerator } from './config/doc-output-target'
import { docsJsonWithoutTimestamp } from './config/docs-json-no-timestamp'
import { AngularGenerator } from './config/stencil.bindings.angular'
import { ReactGenerator } from './config/stencil.bindings.react'

const IS_DS_RELEASE = process.env.DS_RELEASE === 'true'
const IS_DS_DOCUMENTATION = process.env.DS_DOCUMENTATION === 'true'
const IS_DS_DEVELOPMENT = process.env.DS_DEVELOPMENT === 'true'
const IS_DS_PUBLISH = process.env.DS_PUBLISH === 'true'
const IS_DS_TESTING = process.env.DS_TESTING === 'true'
const IS_DS_PLAYWRIGHT_TESTING = process.env.DS_PLAYWRIGHT_TESTING === 'true'

if (IS_DS_RELEASE) {
  console.log('')
  console.log('🚀 Build is set to release 🚀')
  console.log('')
}

if (IS_DS_DOCUMENTATION) {
  console.log('')
  console.log('📝 Build is set to documentation 📝')
  console.log('')
}

if (IS_DS_DEVELOPMENT) {
  console.log('')
  console.log('👷 Build is set to development 👷')
  console.log('')
}

if (IS_DS_PUBLISH) {
  console.log('')
  console.log('🚀 Build is set to publish 🚀')
  console.log('')
}

if (IS_DS_TESTING) {
  console.log('')
  console.log('🧪 Build is set to testing 🧪')
  console.log('')
}

if (IS_DS_PLAYWRIGHT_TESTING) {
  console.log('')
  console.log('🎭 Build is set to testing 🎭')
  console.log('')
}

const workspaceDir = join(parse(__dirname).dir, '..')
const packagesDir = join('../..')
const nodeModulesProject = join(__dirname, 'node_modules')
const nodeModulesWorkspace = join(workspaceDir, 'node_modules')

export const config: Config = {
  autoprefixCss: true,
  sourceMap: false, //IS_DS_TESTING || IS_DS_DEVELOPMENT,
  namespace: 'design-system',
  preamble: '(C) Helvetia Design System https://design.baloise.dev/ - Apache License 2.0',
  hashedFileNameLength: 10,
  enableCache: true,
  // buildEs5: 'prod',
  globalScript: 'src/global.ts',
  globalStyle: 'src/global.scss',
  // transformAliasedImportPaths: true,
  tsconfig: IS_DS_RELEASE ? 'tsconfig.release.json' : 'tsconfig.lib.json',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: [nodeModulesWorkspace, nodeModulesProject, 'node_modules'],
      silenceDeprecations: ['bogus-combinators'],
    }),
  ],
  extras: {
    /**
     * Projects that use a Stencil library built using the `dist` output target may have trouble lazily
     * loading components when using a bundler such as Vite or Parcel. Setting this flag to `true` will change how Stencil
     * lazily loads components in a way that works with additional bundlers. Setting this flag to `true` will increase
     * the size of the compiled output. Defaults to `false`.
     */
    enableImportInjection: !IS_DS_DEVELOPMENT, // true,
    /**
     * When a component is first attached to the DOM, this setting will wait a single tick before
     * rendering. This works around an Angular issue, where Angular attaches the elements before
     * settings their initial state, leading to double renders and unnecessary event dispatches.
     * Defaults to `false`.
     */
    initializeNextTick: !IS_DS_DEVELOPMENT, // true,
    /**
     * `experimentalScopedSlotChanges` is necessary in Stencil v4 until the fixes described in
     * {@link https://stenciljs.com/docs/config-extras#experimentalscopedslotchanges the Stencil docs for the flag} are
     * the default behavior (slated for a future Stencil major version).
     */
    experimentalScopedSlotChanges: !IS_DS_DEVELOPMENT, // true,,
  },
  outputTargets: [
    ...(!IS_DS_DEVELOPMENT
      ? [
          docsJsonWithoutTimestamp({
            type: 'docs-json',
            file: '../../resources/data/components.json',
          }),
        ]
      : []),
    ...(!IS_DS_PLAYWRIGHT_TESTING
      ? [
          {
            type: 'dist',
            esmLoaderPath: '../loader',
          },
        ]
      : []),
    /**
     * Use this outputs for documentation and e2e testing
     */
    ...(!IS_DS_DEVELOPMENT && !IS_DS_PLAYWRIGHT_TESTING
      ? [
          CustomDocumentationGenerator,
          webOutputTarget({
            dir: 'components',
            isTest: false,
          }),
          {
            type: 'dist-custom-elements',
            dir: 'components',
            empty: true,
            includeGlobalScripts: false,
            generateTypeDeclarations: true,
          },
        ]
      : []),
    {
      type: 'www',
      dir: 'www',
      serviceWorker: false,
      empty: false,
      copy: [
        {
          src: '**/*.html',
        },
        {
          src: join(packagesDir, 'core', 'public', 'section.css'),
          dest: 'assets/section.css',
          warn: true,
        },
        {
          src: join(packagesDir, 'assets', 'src', 'fonts'),
          dest: 'assets/fonts',
          warn: true,
        },
        {
          src: join(packagesDir, '..', 'resources', 'images'),
          dest: 'assets/images',
          warn: true,
        },
      ],
    },
    /**
     * Skip those outputs for documentation releases on vercel and for e2e testing
     */
    ...(!IS_DS_DEVELOPMENT && !IS_DS_DOCUMENTATION && !IS_DS_PLAYWRIGHT_TESTING
      ? [
          {
            type: 'docs-vscode',
            file: 'dist/html.html-data.json',
            sourceCodeBaseUrl: 'https://github.com/baloise/design-system',
          },
          // ReactGenerator(),
          // AngularGenerator(),
        ]
      : []),
  ],
  rollupPlugins: {
    before: [
      {
        name: 'watch-external',
        async buildStart() {
          const styleFiles = await fg(resolve(__dirname, './src/**/*.scss'))
          for (const file of styleFiles) {
            this.addWatchFile(file)
          }

          const templateFiles = await fg(resolve(__dirname, './src/**/*.html'))
          for (const file of templateFiles) {
            this.addWatchFile(file)
          }
        },
      },
    ],
  },
  testing: {
    rootDir: 'src',
  },
}
