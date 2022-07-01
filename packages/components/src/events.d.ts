export namespace Events {
  export type BalAccordionChangeDetail = boolean
  export type BalAccordionChange = CustomEvent<BalAccordionChangeDetail>

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

  export type BalSliderChangeDetail = string | number | null
  export type BalSliderChange = CustomEvent<BalSliderChangeDetail>
}
