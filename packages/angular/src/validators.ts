// generated file by .scripts/validators.script.js

import { AbstractControl, ValidatorFn } from '@angular/forms';
import { BalValidators, BalValidatorFn } from '@baloise/ui-library'

function createError(key: string, control: AbstractControl) {
  return {
    [`${key}`]: { value: control.value },
  }
}

function validate(result: boolean, key: string, control: AbstractControl) {
  return result === true ? null : createError(key, control)
}

export function isCustom(validatorFn: BalValidatorFn): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isCustom(validatorFn)(control.value), 'isCustom', control)
  }
}

export function isBefore(date: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isBefore(date)(control.value), 'isBefore', control)
  }
}

export function isAfter(date: Date | string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isAfter(date)(control.value), 'isAfter', control)
  }
}

export function isDate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isDate()(control.value), 'isDate', control)
  }
}

export function isMin(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isMin(min)(control.value), 'isMin', control)
  }
}

export function isMax(max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isMax(max)(control.value), 'isMax', control)
  }
}

export function isNumber(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isNumber()(control.value), 'isNumber', control)
  }
}

export function isMonetaryNumber(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isMonetaryNumber()(control.value), 'isMonetaryNumber', control)
  }
}

export function matchesRegex(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.matchesRegex(regex)(control.value), 'matchesRegex', control)
  }
}

export function isEmail(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isEmail()(control.value), 'isEmail', control)
  }
}

export function isPhone(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isPhone()(control.value), 'isPhone', control)
  }
}

export function isRequired(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isRequired()(control.value), 'isRequired', control)
  }
}

export function isRequiredTrue(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isRequiredTrue()(control.value), 'isRequiredTrue', control)
  }
}

export function isMinLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isMinLength(minLength)(control.value), 'isMinLength', control)
  }
}

export function isMaxLength(maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return validate(BalValidators.isMaxLength(maxLength)(control.value), 'isMaxLength', control)
  }
}
