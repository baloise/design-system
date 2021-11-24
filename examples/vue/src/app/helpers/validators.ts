import { BalValidators } from '@baloise/web-app-validators'
import { useValidator, ValidatorFn } from '@baloise/web-app-validators-vue'
import { i18n } from '../../plugins/i18n.plugin'

export { rules } from '@baloise/web-app-validators-vue'

const { createValidator } = useValidator(i18n.global.t)

export const isRequired = (): ValidatorFn => createValidator(BalValidators.isRequired(), 'validator.required')

export const isMinLength = (length: number): ValidatorFn =>
  createValidator(BalValidators.isMinLength(length), 'validator.minLength')

export const isMaxLength = (length: number): ValidatorFn =>
  createValidator(BalValidators.isMaxLength(length), 'validator.maxLength')
