import { ValueAccessorConfig, angularOutputTarget } from '@baloise/angular-output-target'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['bal-radio-group', 'bal-select', 'bal-datepicker', 'bal-timeinput', 'bal-tabs'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'select',
  },
  {
    elementSelectors: ['bal-checkbox', 'bal-popover', 'bal-accordion'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'boolean',
  },
  {
    elementSelectors: ['bal-input', 'bal-textarea', 'bal-slider'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'text',
  },
]

export const AngularGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/design-system-components',
    directivesProxyFile: '../components-angular/src/directives/proxies.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [
      'bal-doc-app',
      'bal-doc-color',
      'bal-doc-download',
      'bal-doc-github',
      'bal-doc-icons',
      'bal-doc-image',
    ],
    componentGroups: {
      'bal-button': {
        components: ['bal-button-group'],
      },
      'bal-card': {
        components: [
          'bal-card-title',
          'bal-card-subtitle',
          'bal-card-content',
          'bal-card-actions',
          'bal-card-button',
        ],
      },
      'bal-data': {
        components: [
          'bal-data-item',
          'bal-data-label',
          'bal-data-value',
        ],
      },
      'bal-hint': {
        components: [
          'bal-hint-title',
          'bal-hint-text',
        ],
      },
      'bal-list': {
        components: [
          'bal-list-item',
          'bal-list-item-title',
          'bal-list-item-subtitle',
          'bal-list-item-content',
          'bal-list-item-icon',
        ],
      },
      'bal-navbar': {
        components: [
          'bal-navbar-brand',
          'bal-navbar-menu',
          'bal-navbar-menu-start',
          'bal-navbar-menu-end',
        ],
      },
      'bal-popover': {
        components: [
          'bal-popover-content',
        ],
      },
      'bal-tabs': {
        components: [
          'bal-tab-item',
        ],
      },
      'bal-field': {
        components: [
          'bal-field-label',
          'bal-field-control',
          'bal-field-hint',
          'bal-field-message',
        ],
        declarations: [
          {
            name: 'BalNgErrorComponent',
            import: 'components/error/error.component.ts'
          }
        ]
      },
      'bal-radio': {
        components: [
          'bal-radio-group',
        ],
      },
      'bal-select': {
        components: [
          'bal-select-option',
        ],
      },
      'bal-modal': {
        components: ['bal-modal-header', 'bal-modal-body'],
        providers: [{
          name: 'BalModalService',
          import: 'overlays/modal.service.ts'
        }]
      },
      'bal-toast': {
        providers: [{
          name: 'BalToastService',
          import: 'overlays/toast.service.ts'
        }]
      },
      'bal-snackbar': {
        providers: [{
          name: 'BalSnackbarService',
          import: 'overlays/snackbar.service.ts'
        }]
      }
    }
  })
