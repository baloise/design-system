/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineSetup } from './vue-component-lib/utils';
import * as Lib from '@baloise/ui-library';
import { defineComponent, PropType } from 'vue';


export const BalAccordion = /*@__PURE__*/ defineComponent({
  name: 'bal-accordion',
  props: {
    color: {
      type: String,
      default: 'primary',
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    openLabel: {
      type: String,
      default: '',
      required: false,
    },
    openIcon: {
      type: String,
      default: 'plus',
      required: false,
    },
    closeLabel: {
      type: String,
      default: '',
      required: false,
    },
    closeIcon: {
      type: String,
      default: 'minus',
      required: false,
    },
    card: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balCollapse: (value: boolean) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-accordion', ['balCollapse','update:modelValue'], {
    modelProp: 'is-active',
    modelUpdateEvent: 'balCollapsed'
  })
})

export const BalButton = /*@__PURE__*/ defineComponent({
  name: 'bal-button',
  props: {
    color: {
      type: String,
      default: 'primary',
      required: false,
    },
    type: {
      type: String,
      default: 'button',
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String,
      default: '',
      required: false,
    },
    link: {
      type: Boolean,
      default: false,
      required: false,
    },
    href: {
      type: String,
      default: undefined,
      required: false,
    },
    target: {
      type: String,
      default: '_self',
      required: false,
    },
    rel: {
      type: String,
      default: undefined,
      required: false,
    },
    download: {
      type: String,
      default: undefined,
      required: false,
    },
    iconPosition: {
      type: String,
      default: 'left',
      required: false,
    },
    square: {
      type: Boolean,
      default: false,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    outlined: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    topRounded: {
      type: Boolean,
      default: false,
      required: false,
    },
    bottomRounded: {
      type: Boolean,
      default: false,
      required: false,
    },
    icon: {
      type: String,
      default: '',
      required: false,
    },
    iconRight: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {
    balNavigate: (value: MouseEvent) => true,
    balFocus: (value: void) => true,
    balBlur: (value: void) => true,
    balDidRender: (value: void) => true,
  },
  setup: defineSetup('bal-button', ['balNavigate','balFocus','balBlur','balDidRender'], undefined)
})

export const BalCard = /*@__PURE__*/ defineComponent({
  name: 'bal-card',
  props: {
    border: {
      type: Boolean,
      default: false,
      required: false,
    },
    flatMobile: {
      type: Boolean,
      default: false,
      required: false,
    },
    flat: {
      type: Boolean,
      default: false,
      required: false,
    },
    square: {
      type: Boolean,
      default: false,
      required: false,
    },
    padding: {
      type: String,
      default: '',
      required: false,
    },
    padded: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    color: {
      type: String,
      default: '',
      required: false,
    },
    teaser: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-card', [], undefined)
})

export const BalCardActions = /*@__PURE__*/ defineComponent({
  name: 'bal-card-actions',
  props: {
    right: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-card-actions', [], undefined)
})

export const BalCardButton = /*@__PURE__*/ defineComponent({
  name: 'bal-card-button',
  props: {
    icon: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-card-button', [], undefined)
})

export const BalCardContent = /*@__PURE__*/ defineComponent({
  name: 'bal-card-content',
  props: {
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-card-content', [], undefined)
})

export const BalCardHead = /*@__PURE__*/ defineComponent({
  name: 'bal-card-head',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-card-head', [], undefined)
})

export const BalCardHeading = /*@__PURE__*/ defineComponent({
  name: 'bal-card-heading',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-card-heading', [], undefined)
})

export const BalCardSteps = /*@__PURE__*/ defineComponent({
  name: 'bal-card-steps',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-card-steps', [], undefined)
})

export const BalCardSubtitle = /*@__PURE__*/ defineComponent({
  name: 'bal-card-subtitle',
  props: {
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-card-subtitle', [], undefined)
})

export const BalCardTitle = /*@__PURE__*/ defineComponent({
  name: 'bal-card-title',
  props: {
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-card-title', [], undefined)
})

export const BalCheckbox = /*@__PURE__*/ defineComponent({
  name: 'bal-checkbox',
  props: {
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    interface: {
      type: String,
      default: 'checkbox',
      required: false,
    },
    balTabindex: {
      type: Number,
      default: 0,
      required: false,
    },
    value: {
      type: String,
      default: 'on',
      required: false,
    },
    checked: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balChange: (value: boolean) => true,
    balFocus: (value: FocusEvent) => true,
    balBlur: (value: FocusEvent) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-checkbox', ['balChange','balFocus','balBlur','update:modelValue'], {
    modelProp: 'checked',
    modelUpdateEvent: 'balChange'
  })
})

export const BalData = /*@__PURE__*/ defineComponent({
  name: 'bal-data',
  props: {
    border: {
      type: Boolean,
      default: false,
      required: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-data', [], undefined)
})

export const BalDataItem = /*@__PURE__*/ defineComponent({
  name: 'bal-data-item',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-data-item', [], undefined)
})

export const BalDataLabel = /*@__PURE__*/ defineComponent({
  name: 'bal-data-label',
  props: {
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-data-label', [], undefined)
})

export const BalDataValue = /*@__PURE__*/ defineComponent({
  name: 'bal-data-value',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-data-value', [], undefined)
})

export const BalDatepicker = /*@__PURE__*/ defineComponent({
  name: 'bal-datepicker',
  props: {
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
    balTabindex: {
      type: Number,
      default: 0,
      required: false,
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: undefined,
      required: false,
    },
    min: {
      type: String,
      default: undefined,
      required: false,
    },
    max: {
      type: String,
      default: undefined,
      required: false,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
      required: false,
    },
    triggerIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
    minYearProp: {
      type: Number,
      default: undefined,
      required: false,
    },
    maxYearProp: {
      type: Number,
      default: undefined,
      required: false,
    },
    debounce: {
      type: Number,
      default: 0,
      required: false,
    },
    defaultDate: {
      type: String,
      default: undefined,
      required: false,
    },
    value: {
      type: String,
      default: undefined,
      required: false,
    },
    allowedDates: {
      type: Function as PropType<(datestring: string) => boolean>,
      default: undefined,
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balChange: (value: string | undefined | null) => true,
    balInput: (value: string) => true,
    balBlur: (value: FocusEvent) => true,
    balFocus: (value: FocusEvent) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-datepicker', ['balChange','balInput','balBlur','balFocus','update:modelValue'], {
    modelProp: 'value',
    modelUpdateEvent: 'balChange'
  })
})

export const BalDropdown = /*@__PURE__*/ defineComponent({
  name: 'bal-dropdown',
  props: {
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    scrollable: {
      type: Number,
      default: 0,
      required: false,
    },
    fixedContentWidth: {
      type: Boolean,
      default: false,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balCollapse: (value: boolean) => true,
    balDropdownPrepare: (value: string) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-dropdown', ['balCollapse','balDropdownPrepare','update:modelValue'], {
    modelProp: 'is-active',
    modelUpdateEvent: 'balCollapsed'
  })
})

export const BalDropdownMenu = /*@__PURE__*/ defineComponent({
  name: 'bal-dropdown-menu',
  props: {
    scrollable: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-dropdown-menu', [], undefined)
})

export const BalDropdownTrigger = /*@__PURE__*/ defineComponent({
  name: 'bal-dropdown-trigger',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-dropdown-trigger', [], undefined)
})

export const BalField = /*@__PURE__*/ defineComponent({
  name: 'bal-field',
  props: {
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    invalid: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-field', [], undefined)
})

export const BalFieldControl = /*@__PURE__*/ defineComponent({
  name: 'bal-field-control',
  props: {
    iconRight: {
      type: String,
      default: '',
      required: false,
    },
    iconLeft: {
      type: String,
      default: '',
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-field-control', [], undefined)
})

export const BalFieldHint = /*@__PURE__*/ defineComponent({
  name: 'bal-field-hint',
  props: {
    subject: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-field-hint', [], undefined)
})

export const BalFieldLabel = /*@__PURE__*/ defineComponent({
  name: 'bal-field-label',
  props: {
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-field-label', [], undefined)
})

export const BalFieldMessage = /*@__PURE__*/ defineComponent({
  name: 'bal-field-message',
  props: {
    color: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-field-message', [], undefined)
})

export const BalFileUpload = /*@__PURE__*/ defineComponent({
  name: 'bal-file-upload',
  props: {
    label: {
      type: String,
      default: 'Choose or drop a file...',
      required: false,
    },
    multiple: {
      type: Boolean,
      default: true,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    accept: {
      type: String,
      default: '',
      required: false,
    },
    maxFiles: {
      type: Number,
      default: undefined,
      required: false,
    },
    maxFileSize: {
      type: Number,
      default: undefined,
      required: false,
    },
    maxBundleSize: {
      type: Number,
      default: undefined,
      required: false,
    },
  },
  emits: {
    balChange: (value: File[]) => true,
    balRejectedFile: (value: Lib.FileUploadRejectedFile) => true,
  },
  setup: defineSetup('bal-file-upload', ['balChange','balRejectedFile'], undefined)
})

export const BalHint = /*@__PURE__*/ defineComponent({
  name: 'bal-hint',
  props: {
    closeLabel: {
      type: String,
      default: 'Close',
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-hint', [], undefined)
})

export const BalHintText = /*@__PURE__*/ defineComponent({
  name: 'bal-hint-text',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-hint-text', [], undefined)
})

export const BalHintTitle = /*@__PURE__*/ defineComponent({
  name: 'bal-hint-title',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-hint-title', [], undefined)
})

export const BalIcon = /*@__PURE__*/ defineComponent({
  name: 'bal-icon',
  props: {
    name: {
      type: String,
      default: '',
      required: false,
    },
    size: {
      type: String,
      default: '',
      required: false,
    },
    color: {
      type: String,
      default: 'info',
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    rotate: {
      type: Boolean,
      default: false,
      required: false,
    },
    turn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon', [], undefined)
})

export const BalIconAccount = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-account',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-account', [], undefined)
})

export const BalIconAlert = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-alert',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-alert', [], undefined)
})

export const BalIconAlertCircle = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-alert-circle',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-alert-circle', [], undefined)
})

export const BalIconAnswer = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-answer',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-answer', [], undefined)
})

export const BalIconCall = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-call',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-call', [], undefined)
})

export const BalIconCaretDown = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-caret-down',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-caret-down', [], undefined)
})

export const BalIconCaretLeft = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-caret-left',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-caret-left', [], undefined)
})

export const BalIconCaretRight = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-caret-right',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-caret-right', [], undefined)
})

export const BalIconCaretUp = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-caret-up',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-caret-up', [], undefined)
})

export const BalIconCheck = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-check',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-check', [], undefined)
})

export const BalIconCheckCircle = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-check-circle',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-check-circle', [], undefined)
})

export const BalIconClock = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-clock',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-clock', [], undefined)
})

export const BalIconClose = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-close',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-close', [], undefined)
})

export const BalIconConsultant = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-consultant',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-consultant', [], undefined)
})

export const BalIconContact = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-contact',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-contact', [], undefined)
})

export const BalIconCopy = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-copy',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-copy', [], undefined)
})

export const BalIconDate = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-date',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-date', [], undefined)
})

export const BalIconDocument = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-document',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-document', [], undefined)
})

export const BalIconDownload = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-download',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-download', [], undefined)
})

export const BalIconEdit = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-edit',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-edit', [], undefined)
})

export const BalIconEyeClosed = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-eye-closed',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-eye-closed', [], undefined)
})

export const BalIconGithub = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-github',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-github', [], undefined)
})

export const BalIconInfo = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-info',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-info', [], undefined)
})

export const BalIconInfoCircle = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-info-circle',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-info-circle', [], undefined)
})

export const BalIconLocate = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-locate',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-locate', [], undefined)
})

export const BalIconLocation = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-location',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-location', [], undefined)
})

export const BalIconLogo = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-logo',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-logo', [], undefined)
})

export const BalIconMenuBars = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-menu-bars',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-menu-bars', [], undefined)
})

export const BalIconMenuDots = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-menu-dots',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-menu-dots', [], undefined)
})

export const BalIconMessage = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-message',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-message', [], undefined)
})

export const BalIconMinus = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-minus',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-minus', [], undefined)
})

export const BalIconNavBack = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-nav-back',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-nav-back', [], undefined)
})

export const BalIconNavGoDown = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-nav-go-down',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-nav-go-down', [], undefined)
})

export const BalIconNavGoLeft = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-nav-go-left',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-nav-go-left', [], undefined)
})

export const BalIconNavGoRight = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-nav-go-right',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-nav-go-right', [], undefined)
})

export const BalIconNavGoUp = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-nav-go-up',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-nav-go-up', [], undefined)
})

export const BalIconPlus = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-plus',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-plus', [], undefined)
})

export const BalIconPrint = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-print',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-print', [], undefined)
})

export const BalIconReadOnly = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-read-only',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-read-only', [], undefined)
})

export const BalIconRefresh = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-refresh',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-refresh', [], undefined)
})

export const BalIconSearch = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-search',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-search', [], undefined)
})

export const BalIconSend = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-send',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-send', [], undefined)
})

export const BalIconSocialFacebookLine = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-social-facebook-line',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-social-facebook-line', [], undefined)
})

export const BalIconSocialLinkedinLine = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-social-linkedin-line',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-social-linkedin-line', [], undefined)
})

export const BalIconSocialXingLine = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-social-xing-line',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-social-xing-line', [], undefined)
})

export const BalIconTrash = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-trash',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-trash', [], undefined)
})

export const BalIconUpload = /*@__PURE__*/ defineComponent({
  name: 'bal-icon-upload',
  props: {
    size: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-icon-upload', [], undefined)
})

export const BalInput = /*@__PURE__*/ defineComponent({
  name: 'bal-input',
  props: {
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    type: {
      type: String,
      default: 'text',
      required: false,
    },
    accept: {
      type: String,
      default: undefined,
      required: false,
    },
    autocapitalize: {
      type: String,
      default: 'off',
      required: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
      required: false,
    },
    autocorrect: {
      type: String,
      default: 'off',
      required: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false,
    },
    debounce: {
      type: Number,
      default: 0,
      required: false,
    },
    placeholder: {
      type: String,
      default: undefined,
      required: false,
    },
    max: {
      type: String,
      default: undefined,
      required: false,
    },
    maxLength: {
      type: Number,
      default: undefined,
      required: false,
    },
    min: {
      type: String,
      default: undefined,
      required: false,
    },
    minLength: {
      type: Number,
      default: undefined,
      required: false,
    },
    multiple: {
      type: Boolean,
      default: undefined,
      required: false,
    },
    pattern: {
      type: String,
      default: undefined,
      required: false,
    },
    balTabindex: {
      type: Number,
      default: 0,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    spellcheck: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    clickable: {
      type: Boolean,
      default: false,
      required: false,
    },
    autoComplete: {
      type: Boolean,
      default: false,
      required: false,
    },
    numberKeyboard: {
      type: Boolean,
      default: false,
      required: false,
    },
    onlyNumbers: {
      type: Boolean,
      default: false,
      required: false,
    },
    hasIconRight: {
      type: Boolean,
      default: false,
      required: false,
    },
    inputmode: {
      type: String,
      default: undefined,
      required: false,
    },
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balInput: (value: string | number | null) => true,
    balBlur: (value: FocusEvent) => true,
    balClick: (value: MouseEvent) => true,
    balKeyPress: (value: KeyboardEvent) => true,
    balFocus: (value: FocusEvent) => true,
    balChange: (value: string | number | null) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-input', ['balInput','balBlur','balClick','balKeyPress','balFocus','balChange','update:modelValue'], {
    modelProp: 'value',
    modelUpdateEvent: 'balInput'
  })
})

export const BalList = /*@__PURE__*/ defineComponent({
  name: 'bal-list',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    border: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-list', [], undefined)
})

export const BalListItem = /*@__PURE__*/ defineComponent({
  name: 'bal-list-item',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    clickable: {
      type: Boolean,
      default: false,
      required: false,
    },
    selected: {
      type: Boolean,
      default: false,
      required: false,
    },
    href: {
      type: String,
      default: '',
      required: false,
    },
    target: {
      type: String,
      default: '_self',
      required: false,
    },
  },
  emits: {
    balNavigate: (value: MouseEvent) => true,
  },
  setup: defineSetup('bal-list-item', ['balNavigate'], undefined)
})

export const BalListItemContent = /*@__PURE__*/ defineComponent({
  name: 'bal-list-item-content',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-list-item-content', [], undefined)
})

export const BalListItemIcon = /*@__PURE__*/ defineComponent({
  name: 'bal-list-item-icon',
  props: {
    right: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-list-item-icon', [], undefined)
})

export const BalListItemSubtitle = /*@__PURE__*/ defineComponent({
  name: 'bal-list-item-subtitle',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-list-item-subtitle', [], undefined)
})

export const BalListItemTitle = /*@__PURE__*/ defineComponent({
  name: 'bal-list-item-title',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-list-item-title', [], undefined)
})

export const BalModal = /*@__PURE__*/ defineComponent({
  name: 'bal-modal',
  props: {
    card: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-modal', [], undefined)
})

export const BalModalActions = /*@__PURE__*/ defineComponent({
  name: 'bal-modal-actions',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-modal-actions', [], undefined)
})

export const BalModalBody = /*@__PURE__*/ defineComponent({
  name: 'bal-modal-body',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-modal-body', [], undefined)
})

export const BalModalFooter = /*@__PURE__*/ defineComponent({
  name: 'bal-modal-footer',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-modal-footer', [], undefined)
})

export const BalModalHeader = /*@__PURE__*/ defineComponent({
  name: 'bal-modal-header',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-modal-header', [], undefined)
})

export const BalNavbar = /*@__PURE__*/ defineComponent({
  name: 'bal-navbar',
  props: {
    light: {
      type: Boolean,
      default: false,
      required: false,
    },
    noBurger: {
      type: Boolean,
      default: false,
      required: false,
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-navbar', [], undefined)
})

export const BalNavbarBrand = /*@__PURE__*/ defineComponent({
  name: 'bal-navbar-brand',
  props: {
    href: {
      type: String,
      default: '/',
      required: false,
    },
  },
  emits: {
    balNavigate: (value: MouseEvent) => true,
  },
  setup: defineSetup('bal-navbar-brand', ['balNavigate'], undefined)
})

export const BalNavbarMenu = /*@__PURE__*/ defineComponent({
  name: 'bal-navbar-menu',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-navbar-menu', [], undefined)
})

export const BalNavbarMenuEnd = /*@__PURE__*/ defineComponent({
  name: 'bal-navbar-menu-end',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-navbar-menu-end', [], undefined)
})

export const BalNavbarMenuStart = /*@__PURE__*/ defineComponent({
  name: 'bal-navbar-menu-start',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-navbar-menu-start', [], undefined)
})

export const BalNotification = /*@__PURE__*/ defineComponent({
  name: 'bal-notification',
  props: {
    color: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-notification', [], undefined)
})

export const BalPagination = /*@__PURE__*/ defineComponent({
  name: 'bal-pagination',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    value: {
      type: Number,
      default: 1,
      required: false,
    },
    totalPages: {
      type: Number,
      default: 1,
      required: false,
    },
    pageRange: {
      type: Number,
      default: 2,
      required: false,
    },
  },
  emits: {
    balChange: (value: number) => true,
  },
  setup: defineSetup('bal-pagination', ['balChange'], undefined)
})

export const BalRadio = /*@__PURE__*/ defineComponent({
  name: 'bal-radio',
  props: {
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    interface: {
      type: String,
      default: 'radio',
      required: false,
    },
    balTabindex: {
      type: Number,
      default: 0,
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    checked: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {
    balFocus: (value: FocusEvent) => true,
    balBlur: (value: FocusEvent) => true,
  },
  setup: defineSetup('bal-radio', ['balFocus','balBlur'], undefined)
})

export const BalRadioGroup = /*@__PURE__*/ defineComponent({
  name: 'bal-radio-group',
  props: {
    interface: {
      type: String,
      default: 'radio',
      required: false,
    },
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balChange: (value: string) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-radio-group', ['balChange','update:modelValue'], {
    modelProp: 'value',
    modelUpdateEvent: 'balChange'
  })
})

export const BalSelect = /*@__PURE__*/ defineComponent({
  name: 'bal-select',
  props: {
    multiple: {
      type: Boolean,
      default: false,
      required: false,
    },
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    noFilter: {
      type: Boolean,
      default: false,
      required: false,
    },
    balTabindex: {
      type: Number,
      default: 0,
      required: false,
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    typeahead: {
      type: Boolean,
      default: false,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: undefined,
      required: false,
    },
    filterPlaceholder: {
      type: String,
      default: '',
      required: false,
    },
    scrollable: {
      type: Number,
      default: 250,
      required: false,
    },
    value: {
      type: Array as PropType<Array<string>>,
      default: [],
      required: false,
    },
  },
  emits: {
    balChange: (value: string[]) => true,
    balInput: (value: string) => true,
    balBlur: (value: FocusEvent) => true,
    balFocus: (value: FocusEvent) => true,
    balClick: (value: MouseEvent) => true,
    balKeyPress: (value: KeyboardEvent) => true,
    balCancel: (value: KeyboardEvent) => true,
  },
  setup: defineSetup('bal-select', ['balChange','balInput','balBlur','balFocus','balClick','balKeyPress','balCancel'], undefined)
})

export const BalSelectOption = /*@__PURE__*/ defineComponent({
  name: 'bal-select-option',
  props: {
    value: {
      type: String,
      default: undefined,
      required: false,
    },
    label: {
      type: String,
      default: undefined,
      required: false,
    },
    hidden: {
      type: Boolean,
      default: true,
      required: false,
    },
    icon: {
      type: String,
      default: '',
      required: false,
    },
    focused: {
      type: Boolean,
      default: false,
      required: false,
    },
    selected: {
      type: Boolean,
      default: false,
      required: false,
    },
    checkbox: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-select-option', [], undefined)
})

export const BalSheet = /*@__PURE__*/ defineComponent({
  name: 'bal-sheet',
  props: {

  },
  emits: {

  },
  setup: defineSetup('bal-sheet', [], undefined)
})

export const BalSnackbar = /*@__PURE__*/ defineComponent({
  name: 'bal-snackbar',
  props: {
    color: {
      type: String,
      default: '',
      required: false,
    },
    duration: {
      type: Number,
      default: 0,
      required: false,
    },
    subject: {
      type: String,
      default: '',
      required: false,
    },
    message: {
      type: String,
      default: '',
      required: false,
    },
    icon: {
      type: String,
      default: '',
      required: false,
    },
    action: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {
    balClose: (value: string) => true,
    balAction: (value: string) => true,
  },
  setup: defineSetup('bal-snackbar', ['balClose','balAction'], undefined)
})

export const BalSpinner = /*@__PURE__*/ defineComponent({
  name: 'bal-spinner',
  props: {
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    small: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-spinner', [], undefined)
})

export const BalTabItem = /*@__PURE__*/ defineComponent({
  name: 'bal-tab-item',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    href: {
      type: String,
      default: '',
      required: false,
    },
    bubble: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    done: {
      type: Boolean,
      default: false,
      required: false,
    },
    failed: {
      type: Boolean,
      default: false,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
    prevent: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {
    balNavigate: (value: MouseEvent) => true,
  },
  setup: defineSetup('bal-tab-item', ['balNavigate'], undefined)
})

export const BalTabs = /*@__PURE__*/ defineComponent({
  name: 'bal-tabs',
  props: {
    interface: {
      type: String,
      default: 'tabs',
      required: false,
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
      required: false,
    },
    action: {
      type: Boolean,
      default: false,
      required: false,
    },
    actionLabel: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {
    balTabChange: (value: Lib.BalTabOption) => true,
    balActionClick: (value: MouseEvent) => true,
  },
  setup: defineSetup('bal-tabs', ['balTabChange','balActionClick'], undefined)
})

export const BalTag = /*@__PURE__*/ defineComponent({
  name: 'bal-tag',
  props: {
    color: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-tag', [], undefined)
})

export const BalTeaserStep = /*@__PURE__*/ defineComponent({
  name: 'bal-teaser-step',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    hidden: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    done: {
      type: Boolean,
      default: false,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-teaser-step', [], undefined)
})

export const BalTeaserSteps = /*@__PURE__*/ defineComponent({
  name: 'bal-teaser-steps',
  props: {
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    hidden: {
      type: Boolean,
      default: false,
      required: false,
    },
    hasBack: {
      type: Boolean,
      default: false,
      required: false,
    },
    navigation: {
      type: Boolean,
      default: false,
      required: false,
    },
    backLabel: {
      type: String,
      default: '',
      required: false,
    },
    showLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {
    balNavigate: (value: MouseEvent) => true,
    balTeaserStepChange: (value: Lib.BalTeaserStepOption) => true,
    balBackClick: (value: void) => true,
    balTeaserStepClick: (value: Lib.BalTeaserStepOption) => true,
  },
  setup: defineSetup('bal-teaser-steps', ['balNavigate','balTeaserStepChange','balBackClick','balTeaserStepClick'], undefined)
})

export const BalText = /*@__PURE__*/ defineComponent({
  name: 'bal-text',
  props: {
    small: {
      type: Boolean,
      default: false,
      required: false,
    },
    color: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: {

  },
  setup: defineSetup('bal-text', [], undefined)
})

export const BalTextarea = /*@__PURE__*/ defineComponent({
  name: 'bal-textarea',
  props: {
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    autocapitalize: {
      type: String,
      default: 'none',
      required: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false,
    },
    debounce: {
      type: Number,
      default: 0,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: undefined,
      required: false,
    },
    balTabindex: {
      type: Number,
      default: 0,
      required: false,
    },
    maxLength: {
      type: Number,
      default: undefined,
      required: false,
    },
    minLength: {
      type: Number,
      default: undefined,
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    cols: {
      type: Number,
      default: undefined,
      required: false,
    },
    rows: {
      type: Number,
      default: undefined,
      required: false,
    },
    wrap: {
      type: String,
      default: undefined,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    clickable: {
      type: Boolean,
      default: false,
      required: false,
    },
    inputmode: {
      type: String,
      default: undefined,
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balChange: (value: string) => true,
    balInput: (value: string) => true,
    balBlur: (value: FocusEvent) => true,
    balClick: (value: MouseEvent) => true,
    balKeyPress: (value: KeyboardEvent) => true,
    balFocus: (value: FocusEvent) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-textarea', ['balChange','balInput','balBlur','balClick','balKeyPress','balFocus','update:modelValue'], {
    modelProp: 'value',
    modelUpdateEvent: 'balInput'
  })
})

export const BalTimeinput = /*@__PURE__*/ defineComponent({
  name: 'bal-timeinput',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    maxTime: {
      type: String,
      default: '',
      required: false,
    },
    minTime: {
      type: String,
      default: '',
      required: false,
    },
    inverted: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: {
      default: undefined,
    },
  },
  emits: {
    balChange: (value: string) => true,
    balBlur: (value: FocusEvent) => true,
    'update:modelValue': (value: any) => true,
  },
  setup: defineSetup('bal-timeinput', ['balChange','balBlur','update:modelValue'], {
    modelProp: 'value',
    modelUpdateEvent: 'balChange'
  })
})

export const BalToast = /*@__PURE__*/ defineComponent({
  name: 'bal-toast',
  props: {
    color: {
      type: String,
      default: '',
      required: false,
    },
    duration: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  emits: {
    balClose: (value: string) => true,
  },
  setup: defineSetup('bal-toast', ['balClose'], undefined)
})

