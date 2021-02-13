export const isFunction = (obj: any): boolean => {
  return obj != null && typeof obj === 'function'
}

export const isNumber = (obj: any): boolean => {
  return obj != null && !isNaN(parseFloat(obj)) && isFinite(obj)
}

export const isString = (obj: any): boolean => {
  return obj != null && typeof obj === 'string'
}

export const isArray = (obj: any): boolean => {
  return obj != null && Array.isArray(obj)
}

export const isNotArray = (obj: any): boolean => {
  return !isArray(obj)
}

export const isError = (obj: any): boolean => {
  return obj != null && obj instanceof Error
}

export const isObject = (obj: any): boolean => {
  return obj === Object(obj) && !isArray(obj)
}

export const isBoolean = (obj: any): boolean => {
  return obj === true || obj === false
}

export const assertNull = (obj: any): void => {
  if (obj != null) {
    throw new Error('Assertion error: given param must be nil.')
  }
}

export const assertNotNull = (obj: any): void => {
  if (obj == null) {
    throw new Error('Assertion error: given param must not be nil.')
  }
}

export const assertFunction = (obj: any): void => {
  if (!isFunction(obj)) {
    throw new Error('Assertion error: given param must be a function.')
  }
}
