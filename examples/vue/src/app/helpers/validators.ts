import { BalValidators } from '@baloise/ui-library'
import { useValidator, ValidatorFn } from '@baloise/ui-library-vue'
import { i18n } from '../../plugins/i18n.plugin'

export { validators } from '@baloise/ui-library-vue'

const { createValidator } = useValidator(i18n.global.t)

export const isRequired = (): ValidatorFn =>
  createValidator(BalValidators.isRequired(), 'validator.required')

export const isMinLength = (length: number): ValidatorFn =>
  createValidator(BalValidators.isMinLength(length), 'validator.minLength')

export const isMaxLength = (length: number): ValidatorFn =>
  createValidator(BalValidators.isMaxLength(length), 'validator.maxLength')
