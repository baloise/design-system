export namespace Props {
  export type BalAccordionColor = 'primary' | 'info'

  export type BalFormColSize = 'fullwidth' | 'half' | 'one-third' | 'two-thirds' | 'one-quarter' | 'three-quarters'

  export type BalBadgeSize = 'small' | 'large' | ''
  export type BalBadgeColor = 'danger' | 'warning' | 'success'
  export type BalBadgePosition = 'card' | 'button' | 'tabs' | ''

  export type BalButtonGroupPosition = 'right' | 'center' | ''
  export type BalButtonColor =
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'link'
    | 'primary-light'
    | 'info-light'
  export type BalButtonType = 'button' | 'reset' | 'submit'
  export type BalButtonSize = 'small' | ''
  export type BalButtonTarget = '_blank' | ' _parent' | '_self' | '_top'
  export type BalButtonIconPosition = 'left' | 'right'

  export type BalCardActionsPosition = 'right' | 'center' | ''
  export type BalCardButtonType = BalButtonType
  export type BalCardButtonTarget = BalButtonTarget
  export type BalCardColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | ''

  export type BalCloseSize = 'small' | 'large' | 'medium' | ''

  export type BalSelectFilter = 'includes' | 'starts-with'

  export type BalHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  export type BalHeadingColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | '' | 'blue'

  export type BalHintPlacement = 'left' | 'right'
  export type BalIconColor = BalButtonColor | 'white'
  export type BalIconSize = 'xsmall' | 'small' | 'medium' | 'large' | ''

  export type BalListItemTarget = BalButtonTarget
  export type BalListSize = 'large' | ''

  export type BalLogoColor = 'blue' | 'white'
  export type BalLogoBrand = 'group' | 'soba' | 'insurance'

  export type BalPopoverPlacement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'

  export type BalStageColor = 'blue' | 'white'
  export type BalStageSize = 'small' | '' | 'medium' | 'large' | 'halfheight' | 'fullheight'

  export type BalTabsInterface = 'tabs' | 'tabs-sub' | 'steps' | 'o-steps' | 'navbar'

  export type BalTagColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | ''
  export type BalTagSize = 'small' | 'medium' | 'large' | ''

  export type BalTextColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'hint' | ''

  export type BalModalInterface = 'light' | 'card'
  export type BalModalSpace = 'small' | 'medium' | 'large'
  export type ComponentProps = { [key: string]: any }
  // eslint-disable-next-line
  export type ComponentRef = Function | HTMLElement | string | null
  export interface FrameworkDelegate {
    attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>
    removeViewFromDom(container: any, component: any): Promise<void>
  }

  export type BalNotificationColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | ''
  export type BalTostColor = BalNotificationColor
  export type BalSnackbarColor = BalNotificationColor

  export type BalCheckboxInterface = 'checkbox' | 'switch'

  export type BalDatepickerCallback = (dateString: string) => boolean

  export type BalFieldLabelWeight = 'bold' | 'regular'
  export type BalFieldMessageColor = '' | 'success' | 'warning' | 'danger'

  export type BalRadioGroupInterface = 'radio' | 'select-button'
  export type BalRadioInterface = BalRadioGroupInterface

  export type BalTextareaWrap = 'hard' | 'soft' | 'off'
  export type BalTextareaInputMode = BalInputInputMode

  export type BalInputAutocorrect = 'on' | 'off'

  export type BalInputInputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'

  export type BalInputMask = 'contract-number' | 'claim-number' | 'offer-number'

  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
  export type BalInputInputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  export type BalInputAutocomplete =
    | 'on'
    | 'off'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
}
