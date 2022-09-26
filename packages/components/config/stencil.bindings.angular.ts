import { ValueAccessorConfig, angularOutputTarget } from '@baloise/design-system-next-output-target-angular'
import { docComponents } from './doc.components'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['bal-radio-group', 'bal-checkbox-group', 'bal-select', 'bal-datepicker', 'bal-tabs'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'select',
  },
  {
    elementSelectors: ['bal-popover', 'bal-accordion'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'boolean',
  },
  {
    elementSelectors: ['bal-number-input', 'bal-input-stepper'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'number',
  },
  {
    elementSelectors: ['bal-input', 'bal-textarea', 'bal-input-slider'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'text',
  },
]

export const AngularGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/design-system-next-components',
    directivesProxyFile: '../components-angular/src/directives/proxies.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [...docComponents],
    componentGroups: {
      'bal-button': {
        components: ['bal-button-group'],
      },
      'bal-checkbox': {
        components: ['bal-checkbox-group'],
      },
      'bal-form-grid': {
        components: ['bal-form-col'],
      },
      'bal-tag': {
        components: ['bal-tag-group'],
      },
      'bal-card': {
        components: ['bal-card-title', 'bal-card-subtitle', 'bal-card-content', 'bal-card-actions', 'bal-card-button'],
      },
      'bal-data': {
        components: ['bal-data-item', 'bal-data-label', 'bal-data-value'],
      },
      'bal-stage': {
        components: ['bal-stage-back-link', 'bal-stage-body', 'bal-stage-foot', 'bal-stage-head', 'bal-stage-image'],
      },
      'bal-hint': {
        components: ['bal-hint-title', 'bal-hint-text'],
      },
      'bal-list': {
        components: [
          'bal-list-item',
          'bal-list-item-title',
          'bal-list-item-subtitle',
          'bal-list-item-content',
          'bal-list-item-icon',
          'bal-list-item-accordion-head',
          'bal-list-item-accordion-body',
        ],
      },
      'bal-navbar': {
        components: ['bal-navbar-brand', 'bal-navbar-menu', 'bal-navbar-menu-start', 'bal-navbar-menu-end'],
      },
      'bal-popover': {
        components: ['bal-popover-content'],
      },
      'bal-tabs': {
        components: ['bal-tab-item'],
      },
      'bal-field': {
        components: ['bal-field-label', 'bal-field-control', 'bal-field-hint', 'bal-field-message'],
        declarations: [
          {
            name: 'BalNgErrorComponent',
            import: 'components/error/error.component.ts',
          },
        ],
      },
      'bal-radio': {
        components: ['bal-radio-group'],
      },
      'bal-select': {
        components: ['bal-select-option'],
      },
      'bal-modal': {
        components: ['bal-modal-header', 'bal-modal-body'],
        providers: [
          {
            name: 'BalModalService',
            import: 'overlays/modal.service.ts',
          },
        ],
      },
      'bal-toast': {
        providers: [
          {
            name: 'BalToastService',
            import: 'overlays/toast.service.ts',
          },
        ],
      },
      'bal-snackbar': {
        providers: [
          {
            name: 'BalSnackbarService',
            import: 'overlays/snackbar.service.ts',
          },
        ],
      },
    },
  })
