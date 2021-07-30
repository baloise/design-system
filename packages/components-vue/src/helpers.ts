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

export function validators(rules: ValidatorFn[]): ValidatorsRulesFn
export function validators(isDisabled: Ref<boolean> | boolean, rules: ValidatorFn[]): ValidatorsRulesFn
export function validators(isDisabledOrRules: any, rules?: any): ValidatorsRulesFn {
  return async function (value) {
    const isDisabled = unref(isDisabledOrRules)
    if (isDisabled === true) {
      return true
    }

    if (isDisabled !== false) {
      rules = isDisabledOrRules
    }

    if (isArray(rules)) {
      for (let i = 0; i < rules.length; i++) {
        const errorMessage = await rules[i](unref(value))
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
