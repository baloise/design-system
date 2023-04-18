export namespace Events {
  export type BalAccordionChangeDetail = boolean
  export type BalAccordionChange = CustomEvent<BalAccordionChangeDetail>

  export type BalCollapseChangeDetail = boolean
  export type BalCollapseChange = CustomEvent<BalCollapseChangeDetail>

  export type BalNavigationLevelClickDetail = MouseEvent
  export type BalNavigationLEvelCloseClick = CustomEvent<BalNavigationLevelClickDetail>

  export type BalTagCloseClickDetail = MouseEvent
  export type BalTagCloseClick = CustomEvent<BalTagCloseClickDetail>

  export type BalPopoverChangeDetail = boolean
  export type BalPopoverChange = CustomEvent<BalPopoverChangeDetail>

  export type BalCheckboxChangeDetail = boolean
  export type BalCheckboxChange = CustomEvent<BalCheckboxChangeDetail>

  export type BalCheckboxGroupChangeDetail = any[]
  export type BalCheckboxGroupChange = CustomEvent<BalCheckboxGroupChangeDetail>

  export type BalDatepickerChangeDetail = string | undefined
  export type BalDatepickerChange = CustomEvent<BalDatepickerChangeDetail>
  export type BalDatepickerInputDetail = string | undefined
  export type BalDatepickerInput = CustomEvent<BalDatepickerInputDetail>

  export type BalInputChangeDetail = string | undefined
  export type BalInputChange = CustomEvent<BalInputChangeDetail>
  export type BalInputInputDetail = string | undefined
  export type BalInputInput = CustomEvent<BalInputInputDetail>

  export type BalTextareaChangeDetail = string | undefined
  export type BalTextareaChange = CustomEvent<BalTextareaChangeDetail>
  export type BalTextareaInputDetail = string | undefined
  export type BalTextareaInput = CustomEvent<BalTextareaInputDetail>

  export type BalInputStepperChangeDetail = number | undefined
  export type BalInputStepperChange = CustomEvent<BalInputStepperChangeDetail>
  export type BalInputStepperInputDetail = number | undefined
  export type BalInputStepperInput = CustomEvent<BalInputStepperInputDetail>

  export type BalInputNumberChangeDetail = number | undefined
  export type BalInputNumberChange = CustomEvent<BalInputNumberChangeDetail>
  export type BalInputNumberInputDetail = number | undefined
  export type BalInputNumberInput = CustomEvent<BalInputNumberInputDetail>

  export type BalRadioChangeDetail = boolean
  export type BalRadioChange = CustomEvent<BalRadioChangeDetail>

  export type BalRadioGroupChangeDetail = number | string | boolean
  export type BalRadioGroupChange = CustomEvent<BalRadioGroupChangeDetail>

  export type BalSelectChangeDetail = string | string[] | undefined
  export type BalSelectChange = CustomEvent<BalSelectChangeDetail>

  export type BalInputSliderChangeDetail = string | number | null
  export type BalInputSliderChange = CustomEvent<BalInputSliderChangeDetail>

  export type BalTabsChangeDetail = string
  export type BalTabsChange = CustomEvent<BalTabsChangeDetail>

  export type BalCarouselChangeDetail = number | undefined
  export type BalCarouselChange = CustomEvent<BalCarouselChangeDetail>

  export type BalPaginationChangeDetail = number
  export type BalPaginationChange = CustomEvent<BalPaginationChangeDetail>

  export type BalInputTimeChangeDetail = string | undefined
  export type BalInputTimeChange = CustomEvent<BalInputTimeChangeDetail>
  export type BalInputTimeInputDetail = string | undefined
  export type BalInputTimeInput = CustomEvent<BalInputTimeInputDetail>

  export type BalAccordionWillAnimateDetail = void
  export interface BalAccordionWillAnimate extends CustomEvent {
    detail: BalAccordionWillAnimateDetail
    target: HTMLBalAccordionElement
  }

  export type BalAccordionDidAnimateDetail = void
  export interface BalAccordionDidAnimate extends CustomEvent {
    detail: BalAccordionDidAnimateDetail
    target: HTMLBalAccordionElement
  }

  export type BalTabsWillAnimateDetail = void
  export interface BalTabsWillAnimate extends CustomEvent {
    detail: BalTabsWillAnimateDetail
    target: HTMLBalTabsElement
  }

  export type BalTabsDidAnimateDetail = void
  export interface BalTabsDidAnimate extends CustomEvent {
    detail: BalTabsDidAnimateDetail
    target: HTMLBalTabsElement
  }

  export type BalListItemWillAnimateDetail = void
  export interface BalListItemWillAnimate extends CustomEvent {
    detail: BalListItemWillAnimateDetail
    target: HTMLBalListItemElement
  }

  export type BalListItemDidAnimateDetail = void
  export interface BalListItemDidAnimate extends CustomEvent {
    detail: BalListItemDidAnimateDetail
    target: HTMLBalListItemElement
  }

  export type BalNavbarBrandWillAnimateDetail = void
  export interface BalNavbarBrandWillAnimate extends CustomEvent {
    detail: BalNavbarBrandWillAnimateDetail
    target: HTMLBalNavbarBrandElement
  }

  export type BalNavbarBrandDidAnimateDetail = void
  export interface BalNavbarBrandDidAnimate extends CustomEvent {
    detail: BalNavbarBrandDidAnimateDetail
    target: HTMLBalNavbarBrandElement
  }

  export type BalPopoverWillAnimateDetail = void
  export interface BalPopoverWillAnimate extends CustomEvent {
    detail: BalPopoverWillAnimateDetail
    target: HTMLBalPopoverElement
  }

  export type BalPopoverDidAnimateDetail = void
  export interface BalPopoverDidAnimate extends CustomEvent {
    detail: BalPopoverDidAnimateDetail
    target: HTMLBalPopoverElement
  }
}
