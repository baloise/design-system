interface ScrollToFirstInvalidFieldOptions {
  formEl: HTMLElement
}

export const scrollToFirstInvalidField = (options: ScrollToFirstInvalidFieldOptions) => {
  const invalidFieldNodes = options.formEl.querySelectorAll('.bal-field--invalid')
  const invalidFields = Array.from(invalidFieldNodes)
  if (invalidFields.length > 0) {
    const firstInvalidField = invalidFields[0]
    if (firstInvalidField && firstInvalidField.scrollIntoView) {
      firstInvalidField.scrollIntoView()
    }
  }
}
