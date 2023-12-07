import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import fg from 'fast-glob'
import { resolve } from 'path'

import { AngularGenerator, AngularLegacyGenerator, AngularStandaloneGenerator } from './config/stencil.bindings.angular'
import { VueGenerator, VueTestGenerator } from './config/stencil.bindings.vue'
import { ReactGenerator } from './config/stencil.bindings.react'
import { CustomDocumentationGenerator } from './config/doc-output-target'

const IS_BAL_DS_RELEASE = process.env.BAL_DS_RELEASE === 'true'

if (IS_BAL_DS_RELEASE) {
  console.log('')
  console.log('Build is set to release')
  console.log('')
}

export const config: Config = {
  autoprefixCss: true,
  sourceMap: false,
  namespace: 'design-system-components',
  hashedFileNameLength: 10,
  enableCache: true,
  buildEs5: 'prod',
  globalScript: 'src/global.ts',
  tsconfig: IS_BAL_DS_RELEASE ? 'tsconfig.release.json' : 'tsconfig.json',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: [`${__dirname.split('/packages/')[0]}/node_modules/`, 'node_modules/'],
    }),
  ],
  extras: {
    initializeNextTick: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      includeGlobalScripts: false,
      generateTypeDeclarations: false,
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [
        {
          src: '../config/custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      includeGlobalScripts: false,
    },
    {
      type: 'dist-hydrate-script',
    },
    /**
     * Documentation outputs
     */
    CustomDocumentationGenerator,
    // {
    //   type: 'www',
    //   dir: '../../docs/public',
    //   serviceWorker: false,
    //   empty: false,
    // },
    /**
     * JSON Outputs
     */
    {
      type: 'docs-vscode',
      file: 'dist/html.html-data.json',
      sourceCodeBaseUrl: 'https://github.com/baloise/design-system',
    },
    {
      type: 'docs-json',
      file: './.tmp/components.json',
    },
    /**
     * Proxy Library outputs
     */
    VueGenerator(),
    AngularGenerator(),
    AngularStandaloneGenerator(),
    AngularLegacyGenerator(),
    ReactGenerator(),
    /**
     * Copy assets for E2E testing
     */
    VueTestGenerator('../', '../../test/generated/components/index.ts'),
    {
      type: 'www',
      dir: 'www',
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
          src: '../../css/css/theme-compact.css',
          dest: 'assets/theme-compact.css',
        },
        { src: '../../css/css/baloise-design-system.css', dest: 'assets/baloise-design-system.css', warn: true },
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
      ],
    },
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
    { components: ['bal-data', 'bal-data-item', 'bal-data-label', 'bal-data-value'] },
    { components: ['bal-footer'] },
    { components: ['bal-heading', 'bal-text'] },
    { components: ['bal-hint', 'bal-hint-text', 'bal-hint-title'] },
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
    {
      components: [
        'bal-navigation',
        'bal-navigation-level-block',
        'bal-navigation-level-block-item',
        'bal-navigation-level-main',
        'bal-navigation-level-meta',
        'bal-navigation-levels',
      ],
    },
    { components: ['bal-pagination'] },
    { components: ['bal-popover', 'bal-popover-content'] },
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
    { components: ['bal-datepicker'] },
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
    //
    // overlay components
    { components: ['bal-modal', 'bal-modal-body', 'bal-modal-header'] },
    { components: ['bal-notices'] },
    { components: ['bal-notification'] },
    { components: ['bal-sheet'] },
    { components: ['bal-snackbar'] },
    { components: ['bal-toast'] },
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
    modulePathIgnorePatterns: ['cypress'],
  },
}
