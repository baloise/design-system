// generated file by .scripts/validators.index.js

export { BalValidatorFn } from './validator.type'

import { isCustom } from './custom.validators'
import { isBefore, isAfter, isDate } from './date.validators'
import { isMin, isMax, isNumber, isMonetaryNumber } from './number.validators'
import { matchesRegex, isEmail, isPhone } from './regex.validators'
import { isRequired, isRequiredTrue } from './required.validators'
import { isMinLength, isMaxLength } from './string.validators'

export const BalValidators = {
  isCustom,
  isBefore,
  isAfter,
  isDate,
  isMin,
  isMax,
  isNumber,
  isMonetaryNumber,
  matchesRegex,
  isEmail,
  isPhone,
  isRequired,
  isRequiredTrue,
  isMinLength,
  isMaxLength,
}
