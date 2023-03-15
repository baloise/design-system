import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import fg from 'fast-glob'
import { resolve } from 'path'
import { VueGenerator } from './stencil.bindings.vue'

const IS_BAL_DS_RELEASE = process.env.BAL_DS_RELEASE === 'true'

if (IS_BAL_DS_RELEASE) {
  console.log('')
  console.log('Build is set to release')
  console.log('')
}

export const StencilBaseConfig: Config = {
  autoprefixCss: true,
  namespace: 'design-system-components',
  hashedFileNameLength: 10,
  sourceMap: false,
  globalScript: 'src/global.ts',
  watchIgnoredRegex: [/\.stories\.(js|jsx|ts|tsx|mdx)$/, /\/stories\//], // ignore storybook files in --watch mode
  tsconfig: IS_BAL_DS_RELEASE ? 'tsconfig.release.json' : 'tsconfig.json',
  invisiblePrehydration: true,
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: [`${__dirname.split('/packages/')[0]}/node_modules/`, 'node_modules/'],
    }),
  ],
  outputTargets: [
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      includeGlobalScripts: false,
    },
    {
      type: 'docs-vscode',
      file: 'vscode-data.json',
    },
    {
      type: 'docs-json',
      file: './public/assets/data/components.json',
    },
    VueGenerator('../../..', './.storybook/vue/generated/components.ts', []),
  ],
  bundles: [
    { components: ['bal-accordion'] },
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
        'bal-navigation-main',
        'bal-navigation-main-body',
        'bal-navigation-main-head',
        'bal-navigation-menu',
        'bal-navigation-menu-list',
        'bal-navigation-menu-list-item',
        'bal-navigation-meta',
        'bal-navigation-meta-end',
        'bal-navigation-meta-start',
        'bal-navigation-popover',
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
        },
      },
    ],
  },
  testing: {
    rootDir: 'src',
    modulePathIgnorePatterns: ['cypress'],
  },
}
