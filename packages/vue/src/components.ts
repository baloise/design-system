/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import type { Components } from '@baloise/ui-library';




const customElementTags: string[] = [
 'bal-accordion',
 'bal-button',
 'bal-card',
 'bal-card-actions',
 'bal-card-button',
 'bal-card-content',
 'bal-card-heading',
 'bal-card-step',
 'bal-card-steps',
 'bal-card-subtitle',
 'bal-card-title',
 'bal-checkbox',
 'bal-data',
 'bal-data-item',
 'bal-data-label',
 'bal-data-value',
 'bal-datepicker',
 'bal-dropdown',
 'bal-dropdown-menu',
 'bal-dropdown-trigger',
 'bal-field',
 'bal-field-control',
 'bal-field-label',
 'bal-field-message',
 'bal-file-upload',
 'bal-hint',
 'bal-hint-text',
 'bal-hint-title',
 'bal-icon',
 'bal-input',
 'bal-list',
 'bal-list-item',
 'bal-list-item-content',
 'bal-list-item-icon',
 'bal-list-item-subtitle',
 'bal-list-item-title',
 'bal-modal',
 'bal-modal-actions',
 'bal-modal-body',
 'bal-modal-footer',
 'bal-modal-header',
 'bal-navbar',
 'bal-navbar-brand',
 'bal-navbar-menu',
 'bal-navbar-menu-end',
 'bal-navbar-menu-start',
 'bal-notification',
 'bal-pagination',
 'bal-radio',
 'bal-radio-group',
 'bal-select',
 'bal-select-option',
 'bal-snackbar',
 'bal-spinner',
 'bal-tab-item',
 'bal-tabs',
 'bal-tag',
 'bal-text',
 'bal-textarea',
 'bal-timeinput',
 'bal-toast',
];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


export const BalAccordion = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalAccordion['type']>,
    isActive: {} as PropOptions<Components.BalAccordion['isActive']>,
    openLabel: {} as PropOptions<Components.BalAccordion['openLabel']>,
    openIcon: {} as PropOptions<Components.BalAccordion['openIcon']>,
    closeLabel: {} as PropOptions<Components.BalAccordion['closeLabel']>,
    closeIcon: {} as PropOptions<Components.BalAccordion['closeIcon']>,
  },

  model: {
    prop: 'is-active',
    event: 'balCollapsed'
  },

  methods: {
    open: createCommonMethod('open') as Components.BalAccordion['open'],
    close: createCommonMethod('close') as Components.BalAccordion['close'],
    toggle: createCommonMethod('toggle') as Components.BalAccordion['toggle'],
  },
  render: createCommonRender('bal-accordion', ['balCollapse']),
});


export const BalButton = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalButton['type']>,
    size: {} as PropOptions<Components.BalButton['size']>,
    isSquare: {} as PropOptions<Components.BalButton['isSquare']>,
    disabled: {} as PropOptions<Components.BalButton['disabled']>,
    light: {} as PropOptions<Components.BalButton['light']>,
    isActive: {} as PropOptions<Components.BalButton['isActive']>,
    expanded: {} as PropOptions<Components.BalButton['expanded']>,
    outlined: {} as PropOptions<Components.BalButton['outlined']>,
    inverted: {} as PropOptions<Components.BalButton['inverted']>,
    dense: {} as PropOptions<Components.BalButton['dense']>,
    loading: {} as PropOptions<Components.BalButton['loading']>,
    bottomRounded: {} as PropOptions<Components.BalButton['bottomRounded']>,
    icon: {} as PropOptions<Components.BalButton['icon']>,
    iconRight: {} as PropOptions<Components.BalButton['iconRight']>,
  },


  render: createCommonRender('bal-button', []),
});


export const BalCard = /*@__PURE__*/ Vue.extend({

  props: {
    border: {} as PropOptions<Components.BalCard['border']>,
    flat: {} as PropOptions<Components.BalCard['flat']>,
    square: {} as PropOptions<Components.BalCard['square']>,
    inverted: {} as PropOptions<Components.BalCard['inverted']>,
    teaser: {} as PropOptions<Components.BalCard['teaser']>,
  },


  render: createCommonRender('bal-card', []),
});


export const BalCardActions = /*@__PURE__*/ Vue.extend({

  props: {
    right: {} as PropOptions<Components.BalCardActions['right']>,
  },


  render: createCommonRender('bal-card-actions', []),
});


export const BalCardButton = /*@__PURE__*/ Vue.extend({

  props: {
    icon: {} as PropOptions<Components.BalCardButton['icon']>,
  },


  render: createCommonRender('bal-card-button', []),
});


export const BalCardContent = /*@__PURE__*/ Vue.extend({

  props: {
    inverted: {} as PropOptions<Components.BalCardContent['inverted']>,
  },


  render: createCommonRender('bal-card-content', []),
});


export const BalCardHeading = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-card-heading', []),
});


export const BalCardStep = /*@__PURE__*/ Vue.extend({

  props: {
    value: {} as PropOptions<Components.BalCardStep['value']>,
    label: {} as PropOptions<Components.BalCardStep['label']>,
    hidden: {} as PropOptions<Components.BalCardStep['hidden']>,
    disabled: {} as PropOptions<Components.BalCardStep['disabled']>,
    done: {} as PropOptions<Components.BalCardStep['done']>,
    active: {} as PropOptions<Components.BalCardStep['active']>,
  },


  methods: {
    getOptions: createCommonMethod('getOptions') as Components.BalCardStep['getOptions'],
    setActive: createCommonMethod('setActive') as Components.BalCardStep['setActive'],
  },
  render: createCommonRender('bal-card-step', []),
});


export const BalCardSteps = /*@__PURE__*/ Vue.extend({

  props: {
    inverted: {} as PropOptions<Components.BalCardSteps['inverted']>,
    hidden: {} as PropOptions<Components.BalCardSteps['hidden']>,
    hasBack: {} as PropOptions<Components.BalCardSteps['hasBack']>,
    navigation: {} as PropOptions<Components.BalCardSteps['navigation']>,
    backLabel: {} as PropOptions<Components.BalCardSteps['backLabel']>,
    showLabel: {} as PropOptions<Components.BalCardSteps['showLabel']>,
  },


  methods: {
    select: createCommonMethod('select') as Components.BalCardSteps['select'],
    sync: createCommonMethod('sync') as Components.BalCardSteps['sync'],
  },
  render: createCommonRender('bal-card-steps', ['balCardStepChange', 'balBackClick', 'balCardStepClick']),
});


export const BalCardSubtitle = /*@__PURE__*/ Vue.extend({

  props: {
    inverted: {} as PropOptions<Components.BalCardSubtitle['inverted']>,
  },


  render: createCommonRender('bal-card-subtitle', []),
});


export const BalCardTitle = /*@__PURE__*/ Vue.extend({

  props: {
    inverted: {} as PropOptions<Components.BalCardTitle['inverted']>,
  },


  render: createCommonRender('bal-card-title', []),
});


export const BalCheckbox = /*@__PURE__*/ Vue.extend({

  props: {
    name: {} as PropOptions<Components.BalCheckbox['name']>,
    label: {} as PropOptions<Components.BalCheckbox['label']>,
    balTabindex: {} as PropOptions<Components.BalCheckbox['balTabindex']>,
    value: {} as PropOptions<Components.BalCheckbox['value']>,
    checked: {} as PropOptions<Components.BalCheckbox['checked']>,
    disabled: {} as PropOptions<Components.BalCheckbox['disabled']>,
    inverted: {} as PropOptions<Components.BalCheckbox['inverted']>,
  },

  model: {
    prop: 'checked',
    event: 'balChange'
  },

  methods: {
    setFocus: createCommonMethod('setFocus') as Components.BalCheckbox['setFocus'],
  },
  render: createCommonRender('bal-checkbox', ['balChange', 'balFocus', 'balBlur']),
});


export const BalData = /*@__PURE__*/ Vue.extend({

  props: {
    border: {} as PropOptions<Components.BalData['border']>,
    horizontal: {} as PropOptions<Components.BalData['horizontal']>,
  },


  render: createCommonRender('bal-data', []),
});


export const BalDataItem = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.BalDataItem['disabled']>,
  },


  render: createCommonRender('bal-data-item', []),
});


export const BalDataLabel = /*@__PURE__*/ Vue.extend({

  props: {
    required: {} as PropOptions<Components.BalDataLabel['required']>,
  },


  render: createCommonRender('bal-data-label', []),
});


export const BalDataValue = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-data-value', []),
});


export const BalDatepicker = /*@__PURE__*/ Vue.extend({

  props: {
    locale: {} as PropOptions<Components.BalDatepicker['locale']>,
    balTabindex: {} as PropOptions<Components.BalDatepicker['balTabindex']>,
    expanded: {} as PropOptions<Components.BalDatepicker['expanded']>,
    inverted: {} as PropOptions<Components.BalDatepicker['inverted']>,
    readonly: {} as PropOptions<Components.BalDatepicker['readonly']>,
    disabled: {} as PropOptions<Components.BalDatepicker['disabled']>,
    placeholder: {} as PropOptions<Components.BalDatepicker['placeholder']>,
    value: {} as PropOptions<Components.BalDatepicker['value']>,
    maxDate: {} as PropOptions<Components.BalDatepicker['maxDate']>,
    minDate: {} as PropOptions<Components.BalDatepicker['minDate']>,
    closeOnSelect: {} as PropOptions<Components.BalDatepicker['closeOnSelect']>,
    triggerIcon: {} as PropOptions<Components.BalDatepicker['triggerIcon']>,
    minYearProp: {} as PropOptions<Components.BalDatepicker['minYearProp']>,
    maxYearProp: {} as PropOptions<Components.BalDatepicker['maxYearProp']>,
    filter: {} as PropOptions<Components.BalDatepicker['filter']>,
  },

  model: {
    prop: 'value',
    event: 'balChange'
  },

  methods: {
    select: createCommonMethod('select') as Components.BalDatepicker['select'],
  },
  render: createCommonRender('bal-datepicker', ['balChange', 'balInput', 'balBlur', 'balFocus']),
});


export const BalDropdown = /*@__PURE__*/ Vue.extend({

  props: {
    expanded: {} as PropOptions<Components.BalDropdown['expanded']>,
    scrollable: {} as PropOptions<Components.BalDropdown['scrollable']>,
    fixedContentWidth: {} as PropOptions<Components.BalDropdown['fixedContentWidth']>,
    isActive: {} as PropOptions<Components.BalDropdown['isActive']>,
  },

  model: {
    prop: 'is-active',
    event: 'balCollapsed'
  },

  methods: {
    open: createCommonMethod('open') as Components.BalDropdown['open'],
    close: createCommonMethod('close') as Components.BalDropdown['close'],
    toggle: createCommonMethod('toggle') as Components.BalDropdown['toggle'],
    getContentElement: createCommonMethod('getContentElement') as Components.BalDropdown['getContentElement'],
  },
  render: createCommonRender('bal-dropdown', ['balCollapse', 'balDropdownPrepare']),
});


export const BalDropdownMenu = /*@__PURE__*/ Vue.extend({

  props: {
    scrollable: {} as PropOptions<Components.BalDropdownMenu['scrollable']>,
  },


  render: createCommonRender('bal-dropdown-menu', []),
});


export const BalDropdownTrigger = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-dropdown-trigger', []),
});


export const BalField = /*@__PURE__*/ Vue.extend({

  props: {
    expanded: {} as PropOptions<Components.BalField['expanded']>,
    disabled: {} as PropOptions<Components.BalField['disabled']>,
    inverted: {} as PropOptions<Components.BalField['inverted']>,
    loading: {} as PropOptions<Components.BalField['loading']>,
  },


  render: createCommonRender('bal-field', []),
});


export const BalFieldControl = /*@__PURE__*/ Vue.extend({

  props: {
    iconRight: {} as PropOptions<Components.BalFieldControl['iconRight']>,
    iconLeft: {} as PropOptions<Components.BalFieldControl['iconLeft']>,
    loading: {} as PropOptions<Components.BalFieldControl['loading']>,
  },


  render: createCommonRender('bal-field-control', []),
});


export const BalFieldLabel = /*@__PURE__*/ Vue.extend({

  props: {
    text: {} as PropOptions<Components.BalFieldLabel['text']>,
    required: {} as PropOptions<Components.BalFieldLabel['required']>,
  },


  render: createCommonRender('bal-field-label', []),
});


export const BalFieldMessage = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalFieldMessage['type']>,
  },


  render: createCommonRender('bal-field-message', []),
});


export const BalFileUpload = /*@__PURE__*/ Vue.extend({

  props: {
    label: {} as PropOptions<Components.BalFileUpload['label']>,
    multiple: {} as PropOptions<Components.BalFileUpload['multiple']>,
    disabled: {} as PropOptions<Components.BalFileUpload['disabled']>,
    accept: {} as PropOptions<Components.BalFileUpload['accept']>,
    maxFiles: {} as PropOptions<Components.BalFileUpload['maxFiles']>,
    maxFileSize: {} as PropOptions<Components.BalFileUpload['maxFileSize']>,
    maxBundleSize: {} as PropOptions<Components.BalFileUpload['maxBundleSize']>,
  },


  render: createCommonRender('bal-file-upload', ['balChange', 'balRejectedFile']),
});


export const BalHint = /*@__PURE__*/ Vue.extend({

  props: {
    closeLabel: {} as PropOptions<Components.BalHint['closeLabel']>,
    disabled: {} as PropOptions<Components.BalHint['disabled']>,
  },


  methods: {
    toggle: createCommonMethod('toggle') as Components.BalHint['toggle'],
    open: createCommonMethod('open') as Components.BalHint['open'],
    close: createCommonMethod('close') as Components.BalHint['close'],
  },
  render: createCommonRender('bal-hint', []),
});


export const BalHintText = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-hint-text', []),
});


export const BalHintTitle = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-hint-title', []),
});


export const BalIcon = /*@__PURE__*/ Vue.extend({

  props: {
    name: {} as PropOptions<Components.BalIcon['name']>,
    size: {} as PropOptions<Components.BalIcon['size']>,
    isRight: {} as PropOptions<Components.BalIcon['isRight']>,
    isLeft: {} as PropOptions<Components.BalIcon['isLeft']>,
    rotate: {} as PropOptions<Components.BalIcon['rotate']>,
    turn: {} as PropOptions<Components.BalIcon['turn']>,
    color: {} as PropOptions<Components.BalIcon['color']>,
  },


  render: createCommonRender('bal-icon', []),
});


export const BalInput = /*@__PURE__*/ Vue.extend({

  props: {
    name: {} as PropOptions<Components.BalInput['name']>,
    type: {} as PropOptions<Components.BalInput['type']>,
    placeholder: {} as PropOptions<Components.BalInput['placeholder']>,
    balTabindex: {} as PropOptions<Components.BalInput['balTabindex']>,
    maxLength: {} as PropOptions<Components.BalInput['maxLength']>,
    minLength: {} as PropOptions<Components.BalInput['minLength']>,
    inverted: {} as PropOptions<Components.BalInput['inverted']>,
    readonly: {} as PropOptions<Components.BalInput['readonly']>,
    disabled: {} as PropOptions<Components.BalInput['disabled']>,
    clickable: {} as PropOptions<Components.BalInput['clickable']>,
    autoComplete: {} as PropOptions<Components.BalInput['autoComplete']>,
    numberKeyboard: {} as PropOptions<Components.BalInput['numberKeyboard']>,
    onlyNumbers: {} as PropOptions<Components.BalInput['onlyNumbers']>,
    value: {} as PropOptions<Components.BalInput['value']>,
  },

  model: {
    prop: 'value',
    event: 'balInput'
  },

  methods: {
    setFocus: createCommonMethod('setFocus') as Components.BalInput['setFocus'],
  },
  render: createCommonRender('bal-input', ['balInput', 'balBlur', 'balClick', 'balKeyPress', 'balFocus']),
});


export const BalList = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.BalList['disabled']>,
    inverted: {} as PropOptions<Components.BalList['inverted']>,
    border: {} as PropOptions<Components.BalList['border']>,
  },


  render: createCommonRender('bal-list', []),
});


export const BalListItem = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.BalListItem['disabled']>,
    clickable: {} as PropOptions<Components.BalListItem['clickable']>,
    selected: {} as PropOptions<Components.BalListItem['selected']>,
  },


  render: createCommonRender('bal-list-item', []),
});


export const BalListItemContent = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-list-item-content', []),
});


export const BalListItemIcon = /*@__PURE__*/ Vue.extend({

  props: {
    right: {} as PropOptions<Components.BalListItemIcon['right']>,
  },


  render: createCommonRender('bal-list-item-icon', []),
});


export const BalListItemSubtitle = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-list-item-subtitle', []),
});


export const BalListItemTitle = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-list-item-title', []),
});


export const BalModal = /*@__PURE__*/ Vue.extend({

  props: {
    card: {} as PropOptions<Components.BalModal['card']>,
  },


  methods: {
    open: createCommonMethod('open') as Components.BalModal['open'],
    close: createCommonMethod('close') as Components.BalModal['close'],
  },
  render: createCommonRender('bal-modal', []),
});


export const BalModalActions = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-modal-actions', []),
});


export const BalModalBody = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-modal-body', []),
});


export const BalModalFooter = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-modal-footer', []),
});


export const BalModalHeader = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-modal-header', []),
});


export const BalNavbar = /*@__PURE__*/ Vue.extend({

  props: {
    light: {} as PropOptions<Components.BalNavbar['light']>,
  },


  render: createCommonRender('bal-navbar', []),
});


export const BalNavbarBrand = /*@__PURE__*/ Vue.extend({

  props: {
    href: {} as PropOptions<Components.BalNavbarBrand['href']>,
  },


  render: createCommonRender('bal-navbar-brand', []),
});


export const BalNavbarMenu = /*@__PURE__*/ Vue.extend({



  methods: {
    toggle: createCommonMethod('toggle') as Components.BalNavbarMenu['toggle'],
  },
  render: createCommonRender('bal-navbar-menu', []),
});


export const BalNavbarMenuEnd = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-navbar-menu-end', []),
});


export const BalNavbarMenuStart = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-navbar-menu-start', []),
});


export const BalNotification = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalNotification['type']>,
  },


  render: createCommonRender('bal-notification', []),
});


export const BalPagination = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.BalPagination['disabled']>,
    value: {} as PropOptions<Components.BalPagination['value']>,
    totalPages: {} as PropOptions<Components.BalPagination['totalPages']>,
    pageRange: {} as PropOptions<Components.BalPagination['pageRange']>,
  },


  methods: {
    next: createCommonMethod('next') as Components.BalPagination['next'],
    previous: createCommonMethod('previous') as Components.BalPagination['previous'],
  },
  render: createCommonRender('bal-pagination', ['balChange']),
});


export const BalRadio = /*@__PURE__*/ Vue.extend({

  props: {
    name: {} as PropOptions<Components.BalRadio['name']>,
    interface: {} as PropOptions<Components.BalRadio['interface']>,
    balTabindex: {} as PropOptions<Components.BalRadio['balTabindex']>,
    label: {} as PropOptions<Components.BalRadio['label']>,
    value: {} as PropOptions<Components.BalRadio['value']>,
    checked: {} as PropOptions<Components.BalRadio['checked']>,
    disabled: {} as PropOptions<Components.BalRadio['disabled']>,
    inverted: {} as PropOptions<Components.BalRadio['inverted']>,
  },


  methods: {
    setFocus: createCommonMethod('setFocus') as Components.BalRadio['setFocus'],
  },
  render: createCommonRender('bal-radio', ['balFocus', 'balBlur']),
});


export const BalRadioGroup = /*@__PURE__*/ Vue.extend({

  props: {
    interface: {} as PropOptions<Components.BalRadioGroup['interface']>,
    inverted: {} as PropOptions<Components.BalRadioGroup['inverted']>,
    value: {} as PropOptions<Components.BalRadioGroup['value']>,
  },

  model: {
    prop: 'value',
    event: 'balChange'
  },

  render: createCommonRender('bal-radio-group', ['balChange']),
});


export const BalSelect = /*@__PURE__*/ Vue.extend({

  props: {
    multiple: {} as PropOptions<Components.BalSelect['multiple']>,
    noFilter: {} as PropOptions<Components.BalSelect['noFilter']>,
    balTabindex: {} as PropOptions<Components.BalSelect['balTabindex']>,
    expanded: {} as PropOptions<Components.BalSelect['expanded']>,
    inverted: {} as PropOptions<Components.BalSelect['inverted']>,
    disabled: {} as PropOptions<Components.BalSelect['disabled']>,
    typeahead: {} as PropOptions<Components.BalSelect['typeahead']>,
    loading: {} as PropOptions<Components.BalSelect['loading']>,
    placeholder: {} as PropOptions<Components.BalSelect['placeholder']>,
    filterPlaceholder: {} as PropOptions<Components.BalSelect['filterPlaceholder']>,
    scrollable: {} as PropOptions<Components.BalSelect['scrollable']>,
    value: {} as PropOptions<Components.BalSelect['value']>,
  },


  methods: {
    open: createCommonMethod('open') as Components.BalSelect['open'],
    close: createCommonMethod('close') as Components.BalSelect['close'],
    select: createCommonMethod('select') as Components.BalSelect['select'],
    clear: createCommonMethod('clear') as Components.BalSelect['clear'],
    setFocus: createCommonMethod('setFocus') as Components.BalSelect['setFocus'],
    sync: createCommonMethod('sync') as Components.BalSelect['sync'],
  },
  render: createCommonRender('bal-select', ['balChange', 'balInput', 'balBlur', 'balFocus', 'balClick', 'balKeyPress', 'balCancel']),
});


export const BalSelectOption = /*@__PURE__*/ Vue.extend({

  props: {
    value: {} as PropOptions<Components.BalSelectOption['value']>,
    label: {} as PropOptions<Components.BalSelectOption['label']>,
    hidden: {} as PropOptions<Components.BalSelectOption['hidden']>,
    icon: {} as PropOptions<Components.BalSelectOption['icon']>,
    focused: {} as PropOptions<Components.BalSelectOption['focused']>,
    selected: {} as PropOptions<Components.BalSelectOption['selected']>,
    checkbox: {} as PropOptions<Components.BalSelectOption['checkbox']>,
  },


  methods: {
    getOption: createCommonMethod('getOption') as Components.BalSelectOption['getOption'],
  },
  render: createCommonRender('bal-select-option', []),
});


export const BalSnackbar = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalSnackbar['type']>,
    duration: {} as PropOptions<Components.BalSnackbar['duration']>,
    subject: {} as PropOptions<Components.BalSnackbar['subject']>,
    message: {} as PropOptions<Components.BalSnackbar['message']>,
    icon: {} as PropOptions<Components.BalSnackbar['icon']>,
  },


  methods: {
    closeIn: createCommonMethod('closeIn') as Components.BalSnackbar['closeIn'],
    close: createCommonMethod('close') as Components.BalSnackbar['close'],
  },
  render: createCommonRender('bal-snackbar', ['balClose']),
});


export const BalSpinner = /*@__PURE__*/ Vue.extend({

  props: {
    inverted: {} as PropOptions<Components.BalSpinner['inverted']>,
    small: {} as PropOptions<Components.BalSpinner['small']>,
  },


  render: createCommonRender('bal-spinner', []),
});


export const BalTabItem = /*@__PURE__*/ Vue.extend({

  props: {
    value: {} as PropOptions<Components.BalTabItem['value']>,
    label: {} as PropOptions<Components.BalTabItem['label']>,
    bubble: {} as PropOptions<Components.BalTabItem['bubble']>,
    disabled: {} as PropOptions<Components.BalTabItem['disabled']>,
    done: {} as PropOptions<Components.BalTabItem['done']>,
    failed: {} as PropOptions<Components.BalTabItem['failed']>,
    active: {} as PropOptions<Components.BalTabItem['active']>,
  },


  methods: {
    getOptions: createCommonMethod('getOptions') as Components.BalTabItem['getOptions'],
    setActive: createCommonMethod('setActive') as Components.BalTabItem['setActive'],
  },
  render: createCommonRender('bal-tab-item', []),
});


export const BalTabs = /*@__PURE__*/ Vue.extend({

  props: {
    interface: {} as PropOptions<Components.BalTabs['interface']>,
    expanded: {} as PropOptions<Components.BalTabs['expanded']>,
    dense: {} as PropOptions<Components.BalTabs['dense']>,
    rounded: {} as PropOptions<Components.BalTabs['rounded']>,
    action: {} as PropOptions<Components.BalTabs['action']>,
    actionLabel: {} as PropOptions<Components.BalTabs['actionLabel']>,
  },


  methods: {
    select: createCommonMethod('select') as Components.BalTabs['select'],
    sync: createCommonMethod('sync') as Components.BalTabs['sync'],
  },
  render: createCommonRender('bal-tabs', ['balTabChange', 'balActionClick']),
});


export const BalTag = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalTag['type']>,
  },


  render: createCommonRender('bal-tag', []),
});


export const BalText = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('bal-text', []),
});


export const BalTextarea = /*@__PURE__*/ Vue.extend({

  props: {
    name: {} as PropOptions<Components.BalTextarea['name']>,
    placeholder: {} as PropOptions<Components.BalTextarea['placeholder']>,
    balTabindex: {} as PropOptions<Components.BalTextarea['balTabindex']>,
    maxLength: {} as PropOptions<Components.BalTextarea['maxLength']>,
    minLength: {} as PropOptions<Components.BalTextarea['minLength']>,
    inverted: {} as PropOptions<Components.BalTextarea['inverted']>,
    readonly: {} as PropOptions<Components.BalTextarea['readonly']>,
    disabled: {} as PropOptions<Components.BalTextarea['disabled']>,
    clickable: {} as PropOptions<Components.BalTextarea['clickable']>,
    value: {} as PropOptions<Components.BalTextarea['value']>,
  },

  model: {
    prop: 'value',
    event: 'balInput'
  },

  methods: {
    setFocus: createCommonMethod('setFocus') as Components.BalTextarea['setFocus'],
  },
  render: createCommonRender('bal-textarea', ['balInput', 'balBlur', 'balClick', 'balKeyPress', 'balFocus']),
});


export const BalTimeinput = /*@__PURE__*/ Vue.extend({

  props: {
    disabled: {} as PropOptions<Components.BalTimeinput['disabled']>,
    value: {} as PropOptions<Components.BalTimeinput['value']>,
    maxTime: {} as PropOptions<Components.BalTimeinput['maxTime']>,
    minTime: {} as PropOptions<Components.BalTimeinput['minTime']>,
    inverted: {} as PropOptions<Components.BalTimeinput['inverted']>,
  },

  model: {
    prop: 'value',
    event: 'balChange'
  },

  render: createCommonRender('bal-timeinput', ['balChange', 'balBlur']),
});


export const BalToast = /*@__PURE__*/ Vue.extend({

  props: {
    type: {} as PropOptions<Components.BalToast['type']>,
    duration: {} as PropOptions<Components.BalToast['duration']>,
  },


  methods: {
    closeIn: createCommonMethod('closeIn') as Components.BalToast['closeIn'],
    close: createCommonMethod('close') as Components.BalToast['close'],
  },
  render: createCommonRender('bal-toast', ['balClose']),
});

