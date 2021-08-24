import { BalValidatorFn } from '@baloise/design-system-components'
import { isArray } from 'lodash'
import { Ref, unref } from 'vue'

/**
 * WebComponent Helpers
 */

interface WebComponent<T> {
  $el: T
}

export const element = <T>(elementReference: Ref<any>): T => {
  const component: WebComponent<T> = elementReference.value
  return component.$el
}

/**
 * Validator Helpers
 */

export type ValidatorFn = (value: any) => Promise<string | boolean> | string | boolean
export type ValidatorsRulesFn = (value: any) => Promise<boolean | string> | boolean | string

export function rules(validators: ValidatorFn[]): ValidatorsRulesFn
export function rules(isDisabled: Ref<boolean> | boolean, rules: ValidatorFn[]): ValidatorsRulesFn
export function rules(isDisabledOrRules: any, validators?: any): ValidatorsRulesFn {
  return async function (value) {
    const isDisabled = unref(isDisabledOrRules)
    if (isDisabled === true) {
      return true
    }

    if (isDisabled !== false) {
      validators = isDisabledOrRules
    }

    if (isArray(validators)) {
      for (let i = 0; i < validators.length; i++) {
        const errorMessage = await validators[i](unref(value))
        if (errorMessage !== null && errorMessage !== undefined && errorMessage !== '' && errorMessage !== true) {
          return errorMessage
        }
      }
    }
    return true
  }
}

export function useValidator(translateFn: (key: string) => string) {
  return {
    createValidator:
      (validatorFn: BalValidatorFn, translationKey: string): ValidatorFn =>
      value => {
        const isValid = validatorFn(value)
        return isValid ? true : translateFn(translationKey)
      },
  }
}
