interface ScrollToFirstInvalidFieldOptions {
  formEl: HTMLElement
  selector?: string
}

export const scrollToFirstInvalidField = (options: ScrollToFirstInvalidFieldOptions) => {
  const selector = options.selector || '.bal-field--invalid'
  const invalidFieldNodes = options.formEl.querySelectorAll(selector)
  const invalidFields = Array.from(invalidFieldNodes)

  if (invalidFields.length > 0) {
    const firstInvalidField = invalidFields[0]
    if (firstInvalidField) {
      const invalidField = firstInvalidField.closest('bal-field')

      if (invalidField && invalidField.scrollIntoView) {
        invalidField.scrollIntoView()
      }
    }
  }
}

export interface BalAriaForm {
  controlId?: string
  labelId?: string
  messageId?: string
}

export interface BalAriaFormLinking {
  ariaForm: BalAriaForm
  setAriaForm(ariaForm: BalAriaForm): Promise<void>
}

export const defaultBalAriaForm: BalAriaForm = {
  controlId: undefined,
  labelId: undefined,
  messageId: undefined,
}
