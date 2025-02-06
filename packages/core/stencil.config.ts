import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import fg from 'fast-glob'
import { join, parse, resolve } from 'path'

import { AngularGenerator, AngularLegacyGenerator, AngularModuleGenerator } from './config/stencil.bindings.angular'
import { VueGenerator } from './config/stencil.bindings.vue'
import { ReactGenerator } from './config/stencil.bindings.react'
import { CustomDocumentationGenerator } from './config/doc-output-target'
import { webOutputTarget } from '@baloise/output-target-web'

const IS_BAL_DS_RELEASE = process.env.BAL_DS_RELEASE === 'true'
const IS_BAL_DOCUMENTATION = process.env.BAL_DOCUMENTATION === 'true'
const IS_BAL_DEVELOPMENT = process.env.BAL_DEVELOPMENT === 'true'
const IS_BAL_TESTING = process.env.BAL_TESTING === 'true'

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

const workspaceDir = join(parse(__dirname).dir, '..')
const packagesDir = join('../..')
const nodeModulesProject = join(__dirname, 'node_modules')
const nodeModulesWorkspace = join(workspaceDir, 'node_modules')

export const config: Config = {
  autoprefixCss: true,
  sourceMap: IS_BAL_TESTING || IS_BAL_DEVELOPMENT,
  namespace: 'baloise-design-system',
  hashedFileNameLength: 10,
  enableCache: true,
  buildEs5: 'prod',
  globalScript: 'src/global.ts',
  tsconfig: IS_BAL_DS_RELEASE ? 'tsconfig.release.json' : 'tsconfig.lib.json',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: [nodeModulesWorkspace, nodeModulesProject, 'node_modules'],
    }),
  ],
  extras: {
    initializeNextTick: true,
  },
  outputTargets: [
    {
      type: 'docs-json',
      file: '../../resources/data/components.json',
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    /**
     * Use this outputs for documentation and e2e testing
     */
    ...(!IS_BAL_DEVELOPMENT
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
      empty: true,
      copy: [
        {
          src: '**/*.html',
        },
        {
          src: 'components.d.ts',
        },
        {
          src: join(packagesDir, 'styles', 'css', 'themes', 'compact.css'),
          dest: 'assets/compact.css',
          warn: true,
        },
        {
          src: join(packagesDir, 'styles', 'css', 'all.css'),
          dest: 'assets/all.css',
          warn: true,
        },
        {
          src: join(packagesDir, 'styles', 'css', 'basic.min.css'),
          dest: 'assets/basic.min.css',
          warn: true,
        },
        {
          src: join(packagesDir, 'maps', 'dist', 'index.esm.js'),
          dest: 'assets/maps.js',
          warn: true,
        },
        {
          src: join(packagesDir, 'fonts', 'assets'),
          dest: 'assets/fonts',
          warn: true,
        },
        {
          src: join(packagesDir, 'brand-icons', 'src', 'assets'),
          dest: 'assets/images/brand-icons',
          warn: true,
        },
      ],
    },
    /**
     * Skip those outputs for documentation releases on vercel and for e2e testing
     */
    ...(!IS_BAL_DOCUMENTATION && !IS_BAL_TESTING
      ? [
          {
            type: 'docs-vscode',
            file: 'dist/html.html-data.json',
            sourceCodeBaseUrl: 'https://github.com/baloise/design-system',
          },
          VueGenerator(),
          ReactGenerator(),
          AngularGenerator(),
          AngularModuleGenerator(),
          AngularLegacyGenerator(),
        ]
      : []),
  ],
  bundles: [
    { components: ['bal-accordion', 'bal-accordion-summary', 'bal-accordion-trigger', 'bal-accordion-details'] },
    { components: ['bal-app'] },
    { components: ['bal-badge'] },
    { components: ['bal-button', 'bal-button-group'] },
    {
      components: [
        'bal-card',
        'bal-card-actions',
        'bal-card-button',
        'bal-card-content',
        'bal-card-subtitle',
        'bal-card-title',
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
    {
      components: [
        'bal-nav',
        'bal-nav-link',
        'bal-nav-link-grid',
        'bal-nav-link-grid-col',
        'bal-nav-link-group',
        'bal-nav-menu-bar',
        'bal-nav-menu-flyout',
        'bal-nav-meta-bar',
      ],
    },
    //
    // form components
    { components: ['bal-checkbox', 'bal-checkbox-group'] },
    { components: ['bal-dropdown'] },
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
      components: ['bal-option-list', 'bal-option'],
    },
    //
    // overlay components
    { components: ['bal-modal', 'bal-modal-body', 'bal-modal-header'] },
    { components: ['bal-notices', 'bal-toast', 'bal-snackbar'] },
    { components: ['bal-notification'] },
    { components: ['bal-sheet'] },
  ],
  rollupPlugins: {
    before: [
      {
        name: 'watch-external',
        async buildStart() {
          const styleFiles = await fg(resolve(__dirname, './src/**/*.sass'))
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
