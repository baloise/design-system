import {
  checkEmptyOrOneOf,
  checkEmptyOrType,
  checkOneOf,
  checkType,
  checkEmptyOrPattern,
  checkEmptyOrUrl,
  checkEmptyOrArrayOf,
  checkEmptyOrDate,
  checkRequiredAndOneOf,
  checkRequiredAndPattern,
  checkRequiredAndType,
  checkRequiredAndUrl,
  checkRequiredAndArrayOf,
  checkIsoDate,
  type PropertyType,
} from './property-checkers'

export const VALIDATE_METADATA = Symbol('validate-metadata')

export interface ValidateMetadata {
  [propName: string]: {
    validator: (component: any, propName: string) => void
  }
}

/**
 * Property decorator for declaring validation rules on @Prop properties.
 * Validation runs automatically in connectedCallback() when setupValidation() is called.
 *
 * The validator should be the final validation function: (component, prop) => void
 * Created by calling a curried checker with all its arguments.
 *
 * @example
 * ```ts
 * @Prop()
 * @Validate(checkEmptyOrOneOf(['primary', 'secondary']))
 * readonly color: DS.ButtonColor = 'primary'
 *
 * connectedCallback() {
 *   setupValidation(this)
 * }
 * ```
 */
export function Validate(validator: (component: any, propName: string) => void) {
  return function (target: any, propertyKey: string) {
    // Store validation metadata on the prototype
    if (!target[VALIDATE_METADATA]) {
      target[VALIDATE_METADATA] = {}
    }
    target[VALIDATE_METADATA][propertyKey] = {
      validator,
    }
  }
}

/**
 * Internal helper to set validation metadata
 */
function setValidationMetadata(target: any, propertyKey: string, validator: (component: any, propName: string) => void) {
  if (!target[VALIDATE_METADATA]) {
    target[VALIDATE_METADATA] = {}
  }
  target[VALIDATE_METADATA][propertyKey] = { validator }
}

/**
 * Call this in connectedCallback() to run all @Validate() validators for the component.
 */
export function setupValidation(component: any) {
  const metadata: ValidateMetadata = component.constructor.prototype[VALIDATE_METADATA] || {}

  if (Object.keys(metadata).length === 0) return

  // Run all validators on init
  Object.entries(metadata).forEach(([propName, config]) => {
    config.validator(component, propName)
  })

  // Store validators for easy access in custom watchers (optional)
  component.__validators = metadata
}

/**
 * Call this in a custom @Watch handler to run validation for that specific property.
 * Use when you need both business logic AND validation in the same watcher.
 *
 * @example
 * ```ts
 * @Watch('size')
 * sizeChanged(newValue: DS.ButtonSize) {
 *   this.size = normalizeDeprecatedTShirtSize(newValue) // business logic
 *   validateProperty(this, 'size')
 * }
 * ```
 */
export function validateProperty(component: any, propName: string) {
  const metadata: ValidateMetadata = component.constructor.prototype[VALIDATE_METADATA] || {}
  const config = metadata[propName]

  if (config) {
    config.validator(component, propName)
  }
}

/**
 * Validate that prop is empty or one of the specified values
 * @example @ValidateEmptyOrOneOf(['sm', 'md', 'lg'])
 */
export function ValidateEmptyOrOneOf(...values: unknown[]) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkEmptyOrOneOf(values))
  }
}

/**
 * Validate that prop is empty or of the specified type
 * @example @ValidateEmptyOrType('string')
 */
export function ValidateEmptyOrType(type: PropertyType) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkEmptyOrType(type))
  }
}

/**
 * Validate that prop is one of the specified values
 * @example @ValidateOneOf(['primary', 'secondary'])
 */
export function ValidateOneOf(...values: unknown[]) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkOneOf(values))
  }
}

/**
 * Validate that prop is of the specified type
 * @example @ValidateType('string')
 */
export function ValidateType(type: PropertyType) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkType(type))
  }
}

/**
 * Validate that prop is empty or matches the pattern
 * @example @ValidateEmptyOrPattern('^[a-z]+$')
 */
export function ValidateEmptyOrPattern(pattern: string | RegExp) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkEmptyOrPattern(pattern))
  }
}

/**
 * Validate that prop is empty or is a valid URL
 * @example @ValidateEmptyOrUrl()
 */
export function ValidateEmptyOrUrl() {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkEmptyOrUrl())
  }
}

/**
 * Validate that prop is empty or is an array of the specified type
 * @example @ValidateEmptyOrArrayOf('string')
 */
export function ValidateEmptyOrArrayOf(type: PropertyType) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkEmptyOrArrayOf(type))
  }
}

/**
 * Validate that prop is empty or is a valid date
 * @example @ValidateEmptyOrDate()
 */
export function ValidateEmptyOrDate() {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkEmptyOrDate())
  }
}

/**
 * Validate that prop is required and one of the specified values
 * @example @ValidateRequiredAndOneOf(['primary', 'secondary'])
 */
export function ValidateRequiredAndOneOf(...values: unknown[]) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkRequiredAndOneOf(values))
  }
}

/**
 * Validate that prop is required and matches the pattern
 * @example @ValidateRequiredAndPattern('^[a-z]+$')
 */
export function ValidateRequiredAndPattern(pattern: string | RegExp) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkRequiredAndPattern(pattern))
  }
}

/**
 * Validate that prop is required and of the specified type
 * @example @ValidateRequiredAndType('string')
 */
export function ValidateRequiredAndType(type: PropertyType) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkRequiredAndType(type))
  }
}

/**
 * Validate that prop is required and is a valid URL
 * @example @ValidateRequiredAndUrl()
 */
export function ValidateRequiredAndUrl() {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkRequiredAndUrl())
  }
}

/**
 * Validate that prop is required and is an array of the specified type
 * @example @ValidateRequiredAndArrayOf('string')
 */
export function ValidateRequiredAndArrayOf(type: PropertyType) {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkRequiredAndArrayOf(type))
  }
}

/**
 * Validate that prop is an ISO date string
 * @example @ValidateIsoDate()
 */
export function ValidateIsoDate() {
  return (target: any, propertyKey: string) => {
    setValidationMetadata(target, propertyKey, checkIsoDate())
  }
}
