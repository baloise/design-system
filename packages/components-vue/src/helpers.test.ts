import { useValidator, ValidatorFn, validators } from './helpers'

describe('helpers', () => {
  describe('validators', () => {
    test('verify validator function return types', async () => {
      expect(await validators([() => undefined])('1234')).toBe(true)
      expect(await validators([() => null])('1234')).toBe(true)
      expect(await validators([() => ''])('1234')).toBe(true)
      expect(await validators([() => true])('1234')).toBe(true)
      expect(await validators([() => false])('1234')).toBe(false)
      expect(await validators([() => 'Error Message'])('1234')).toBe('Error Message')
    })
    test('should return the first error message', async () => {
      expect(await validators([() => true, () => 'Error Message'])('1234')).toBe('Error Message')
      expect(await validators([() => 'Error Message', () => 'Other Error Message'])('1234')).toBe('Error Message')
    })
    test('should return a error message if the field is not disabled', async () => {
      expect(await validators(false, [() => true, () => 'Error Message'])('1234')).toBe('Error Message')
      expect(await validators(false, [() => 'Error Message', () => 'Other Error Message'])('1234')).toBe(
        'Error Message',
      )
    })
    test('should return true if the field is disabled', async () => {
      expect(await validators(true, [() => true, () => 'Error Message'])('1234')).toBe(true)
      expect(await validators(true, [() => 'Error Message', () => 'Other Error Message'])('1234')).toBe(true)
    })
  })
  describe('useValidator', () => {
    const i18n = (key: string) => {
      if (key === 'second.validator.required') {
        return 'Validation message 2'
      }

      return 'Validation message'
    }
    const { createValidator } = useValidator(i18n)
    test('should return translated error message', () => {
      const isRequiredValidator = () => false
      const isRequired = (): ValidatorFn => createValidator(isRequiredValidator, 'validator.required')
      expect(isRequired()('1234')).toBe('Validation message')
    })
    test('should return true due to valid input', () => {
      const isRequiredValidator = () => true
      const isRequired = (): ValidatorFn => createValidator(isRequiredValidator, 'validator.required')
      expect(isRequired()('1234')).toBe(true)
    })
    test('should return the second validator', async () => {
      const firstValidator = () => true
      const secondValidator = () => false
      const isFirstValidator = (): ValidatorFn => createValidator(firstValidator, 'first.validator.required')
      const isSecondValidator = (): ValidatorFn => createValidator(secondValidator, 'second.validator.required')

      expect(await validators([isFirstValidator(), isSecondValidator()])('1234')).toBe('Validation message 2')
      expect(await validators([isSecondValidator(), isFirstValidator()])('1234')).toBe('Validation message 2')
    })
    test('should return the error message of the first failed validator', async () => {
      const firstValidator = () => false
      const secondValidator = () => false
      const isFirstValidator = (): ValidatorFn => createValidator(firstValidator, 'first.validator.required')
      const isSecondValidator = (): ValidatorFn => createValidator(secondValidator, 'second.validator.required')

      expect(await validators([isFirstValidator(), isSecondValidator()])('1234')).toBe('Validation message')
      expect(await validators([isSecondValidator(), isFirstValidator()])('1234')).toBe('Validation message 2')
    })
    test('should return true due to all valid validators', async () => {
      const firstValidator = () => true
      const secondValidator = () => true
      const isFirstValidator = (): ValidatorFn => createValidator(firstValidator, 'first.validator.required')
      const isSecondValidator = (): ValidatorFn => createValidator(secondValidator, 'second.validator.required')

      expect(await validators([])('1234')).toBe(true)
      expect(await validators([isFirstValidator(), isSecondValidator()])('1234')).toBe(true)
      expect(await validators([isSecondValidator(), isFirstValidator()])('1234')).toBe(true)
    })
  })
})
