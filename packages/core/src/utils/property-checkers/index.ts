import { requiredAnd } from './required-and'
import { checkOneOf } from './check-one-of'
import { checkPattern } from './check-pattern'
import { checkType } from './check-type'
import { checkUrl as checkUrlFactory } from './check-url'
import { checkDate as checkDateFactory } from './check-date'
import { emptyOr } from './empty-or'
import { checkArrayOf } from './check-array-of'
import { isValueEmpty } from './is-value-empty'

// Base checkers (curried)
export { checkOneOf } from './check-one-of'
export { checkPattern } from './check-pattern'
export { checkType } from './check-type'
export { checkArrayOf } from './check-array-of'

// Type exports
export type { PropertyType, PrimitiveType, ReferenceType } from './property-types'

// Composed checkers (emptyOr variants)
export const checkEmptyOrOneOf = emptyOr(checkOneOf)
export const checkEmptyOrPattern = emptyOr(checkPattern)
export const checkEmptyOrType = emptyOr(checkType)
export const checkEmptyOrArrayOf = emptyOr(checkArrayOf)

// Zero-argument validators that need special handling
export const checkUrl = () => checkUrlFactory()
export const checkDate = () => checkDateFactory()

// EmptyOr wrappers for zero-argument validators
export const checkEmptyOrUrl = () => {
  const validator = checkUrlFactory()
  return (component: any, prop: string) => {
    if (!isValueEmpty(component[prop])) {
      validator(component, prop)
    }
  }
}

export const checkEmptyOrDate = () => {
  const validator = checkDateFactory()
  return (component: any, prop: string) => {
    if (!isValueEmpty(component[prop])) {
      validator(component, prop)
    }
  }
}

// Composed checkers (requiredAnd variants)
export const checkRequiredAndOneOf = requiredAnd(checkOneOf)
export const checkRequiredAndPattern = requiredAnd(checkPattern)
export const checkRequiredAndType = requiredAnd(checkType)
export const checkRequiredAndUrl = () => {
  const validator = checkUrlFactory()
  return (component: any, prop: string) => {
    const propValue = component[prop]
    if (propValue !== undefined && propValue !== null && propValue !== '') {
      validator(component, prop)
    }
  }
}
export const checkRequiredAndArrayOf = requiredAnd(checkArrayOf)

export { checkIsoDate } from './check-iso-date'
