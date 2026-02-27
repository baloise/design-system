import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import fg from 'fast-glob'
import { join, parse, resolve } from 'path'

import { webOutputTarget } from '@baloise/output-target-web'
import { CustomDocumentationGenerator } from './config/doc-output-target'
import { docsJsonWithoutTimestamp } from './config/docs-json-no-timestamp'
import { AngularGenerator } from './config/stencil.bindings.angular'
import { ReactGenerator } from './config/stencil.bindings.react'

const IS_BAL_DS_RELEASE = process.env.BAL_DS_RELEASE === 'true'
const IS_BAL_DOCUMENTATION = process.env.BAL_DOCUMENTATION === 'true'
const IS_BAL_DEVELOPMENT = process.env.BAL_DEVELOPMENT === 'true'
const IS_BAL_TESTING = process.env.BAL_TESTING === 'true'
const IS_BAL_PLAYWRIGHT_TESTING = process.env.BAL_PLAYWRIGHT_TESTING === 'true'

if (IS_BAL_DS_RELEASE) {
  console.log('')
  console.log('🚀 Build is set to release 🚀')
  console.log('')
}

if (IS_BAL_DOCUMENTATION) {
  console.log('')
  console.log('📝 Build is set to documentation 📝')
  console.log('')
}

if (IS_BAL_DEVELOPMENT) {
  console.log('')
  console.log('👷 Build is set to development 👷')
  console.log('')
}

if (IS_BAL_TESTING) {
  console.log('')
  console.log('🧪 Build is set to testing 🧪')
  console.log('')
}

if (IS_BAL_PLAYWRIGHT_TESTING) {
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
  sourceMap: false, //IS_BAL_TESTING || IS_BAL_DEVELOPMENT,
  namespace: 'baloise-design-system',
  preamble: '(C) Baloise Design System https://design.baloise.dev/ - Apache License 2.0',
  hashedFileNameLength: 10,
  enableCache: true,
  // buildEs5: 'prod',
  globalScript: 'src/global.ts',
  globalStyle: 'src/global.scss',
  // transformAliasedImportPaths: true,
  tsconfig: IS_BAL_DS_RELEASE ? 'tsconfig.release.json' : 'tsconfig.lib.json',
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
    enableImportInjection: !IS_BAL_DEVELOPMENT, // true,
    /**
     * When a component is first attached to the DOM, this setting will wait a single tick before
     * rendering. This works around an Angular issue, where Angular attaches the elements before
     * settings their initial state, leading to double renders and unnecessary event dispatches.
     * Defaults to `false`.
     */
    initializeNextTick: !IS_BAL_DEVELOPMENT, // true,
    /**
     * `experimentalScopedSlotChanges` is necessary in Stencil v4 until the fixes described in
     * {@link https://stenciljs.com/docs/config-extras#experimentalscopedslotchanges the Stencil docs for the flag} are
     * the default behavior (slated for a future Stencil major version).
     */
    experimentalScopedSlotChanges: !IS_BAL_DEVELOPMENT, // true,,
  },
  outputTargets: [
    ...(!IS_BAL_DEVELOPMENT
      ? [
          docsJsonWithoutTimestamp({
            type: 'docs-json',
            file: '../../resources/data/components.json',
          }),
        ]
      : []),
    ...(!IS_BAL_PLAYWRIGHT_TESTING
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
    ...(!IS_BAL_DEVELOPMENT && !IS_BAL_PLAYWRIGHT_TESTING
      ? [
          CustomDocumentationGenerator,
          webOutputTarget({
            dir: IS_BAL_TESTING ? '../../e2e/generated/components' : 'components',
            isTest: IS_BAL_TESTING,
          }),
          {
            type: 'dist-custom-elements',
            dir: IS_BAL_TESTING ? '../../e2e/generated/components' : 'components',
            empty: true,
            includeGlobalScripts: false,
            generateTypeDeclarations: true,
          },
        ]
      : []),
    {
      type: 'www',
      dir: IS_BAL_TESTING ? '../../e2e/generated/www' : 'www',
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
          src: join(packagesDir, 'fonts', 'assets'),
          dest: 'assets/fonts',
          warn: true,
        },
        {
          src: join(packagesDir, '..', 'resources', 'images'),
          dest: 'assets/images',
          warn: true,
        },
        // {
        //   src: join(packagesDir, 'styles', 'css'),
        //   dest: 'assets/styles',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'tokens', 'dist', 'css'),
        //   dest: 'assets/tokens',
        //   warn: true,
        // },
        // {
        //   src: 'components.d.ts',
        // },
        // {
        //   src: join(packagesDir, 'core', 'public', 'future-logo.svg'),
        //   dest: 'assets/future-logo.svg',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'core', 'public', 'future-logo-red.svg'),
        //   dest: 'assets/future-logo-red.svg',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'core', 'public', 'future-logo-black.svg'),
        //   dest: 'assets/future-logo-black.svg',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'styles', 'css', 'themes', 'tcs.css'),
        //   dest: 'assets/tcs.css',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'styles', 'css', 'themes', 'santander.css'),
        //   dest: 'assets/santander.css',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'styles', 'css', 'themes', 'future.css'),
        //   dest: 'assets/future.css',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'styles', 'css', 'themes', 'compact.css'),
        //   dest: 'assets/compact.css',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'maps', 'dist', 'index.esm.js'),
        //   dest: 'assets/maps.js',
        //   warn: true,
        // },
        // {
        //   src: join(packagesDir, 'brand-icons', 'src', 'assets'),
        //   dest: 'assets/images/brand-icons',
        //   warn: true,
        // },
      ],
    },
    /**
     * Skip those outputs for documentation releases on vercel and for e2e testing
     */
    ...(!IS_BAL_DEVELOPMENT && !IS_BAL_DOCUMENTATION && !IS_BAL_TESTING && !IS_BAL_PLAYWRIGHT_TESTING
      ? [
          {
            type: 'docs-vscode',
            file: 'dist/html.html-data.json',
            sourceCodeBaseUrl: 'https://github.com/baloise/design-system',
          },
          ReactGenerator(),
          AngularGenerator(),
        ]
      : []),
  ],
  bundles: [
    { components: ['bal-accordion'] },
    { components: ['bal-app'] },
    { components: ['bal-badge'] },
    { components: ['bal-button', 'bal-button-group'] },
    {
      components: [
        'bal-card',
        'bal-card-header',
        'bal-card-content',
        'bal-card-footer',
        'bal-card-actions', // deprecated
        'bal-card-button', // deprecated
        'bal-card-subtitle', // deprecated
        'bal-card-title', // deprecated
      ],
    },
    { components: ['bal-close'] },
    { components: ['bal-segment', 'bal-segment-item'] },
    { components: ['bal-data', 'bal-data-item', 'bal-data-label', 'bal-data-value'] },
    { components: ['bal-footer'] },
    { components: ['bal-heading', 'bal-text'] },
    { components: ['bal-icon'] },
    { components: ['bal-carousel', 'bal-carousel-item'] },
    {
      components: [
        'bal-list',
        'bal-list-item',
        'bal-list-item-accordion-head',
        'bal-list-item-accordion-body',
        'bal-list-item-content',
        'bal-list-item-icon',
        'bal-list-item-title',
        'bal-list-item-subtitle',
      ],
    },
    { components: ['bal-logo'] },
    {
      components: ['bal-navbar', 'bal-navbar-brand', 'bal-navbar-menu', 'bal-navbar-menu-start', 'bal-navbar-menu-end'],
    },
    { components: ['bal-pagination'] },
    { components: ['bal-popover', 'bal-popover-content', 'bal-hint', 'bal-hint-text', 'bal-hint-title'] },
    { components: ['bal-shape'] },
    { components: ['bal-spinner'] },
    {
      components: [
        'bal-stage',
        'bal-stage-back-link',
        'bal-stage-body',
        'bal-stage-foot',
        'bal-stage-head',
        'bal-stage-image',
      ],
    },
    { components: ['bal-table'] },
    { components: ['bal-tabs', 'bal-tab-item'] },
    { components: ['bal-tag', 'bal-tag-group'] },
    //
    // form components
    { components: ['bal-checkbox', 'bal-checkbox-group'] },
    { components: ['bal-field', 'bal-field-label', 'bal-field-control', 'bal-field-message', 'bal-field-hint'] },
    { components: ['bal-file-upload'] },
    { components: ['bal-form'] },
    { components: ['bal-form-grid', 'bal-form-col'] },
    { components: ['bal-input'] },
    { components: ['bal-input-group'] },
    { components: ['bal-input-slider'] },
    { components: ['bal-input-stepper'] },
    { components: ['bal-number-input'] },
    { components: ['bal-radio', 'bal-radio-group'] },
    { components: ['bal-select', 'bal-select-option'] },
    { components: ['bal-textarea'] },
    { components: ['bal-time-input'] },
    {
      components: ['bal-dropdown', 'bal-option-list', 'bal-option'],
    },
    //
    // overlay components
    { components: ['bal-modal', 'bal-modal-body', 'bal-modal-header'] },
    { components: ['bal-notification', 'bal-notification-container'] },
    { components: ['bal-sheet'] },
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
