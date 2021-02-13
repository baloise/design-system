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

export const assertNil = (obj: any): void => {
  if (obj != null) {
    throw new Error('Assertion error: given param must be nil.')
  }
}

export const assertNotNil = (obj: any): void => {
  if (obj == null) {
    throw new Error('Assertion error: given param must not be nil.')
  }
}

export const assertFunction = (obj: any): void => {
  if (!isFunction(obj)) {
    throw new Error('Assertion error: given param must be a function.')
  }
}

export const invokeFnWithNotNilParam = (obj: any, fn: (obj: any) => void): void => {
  assertNotNil(obj)
  fn(obj)
}

export const invokeFnIfParamNotNil = (obj: any, fn: (obj: any) => any): void => {
  if (obj != null) {
    fn(obj)
  }
}

export const noop = (): void => {}

export const xor = (a: boolean, b: boolean): boolean => {
  return (a && !b) || (!a && b)
}

export const xnor = (a: boolean, b: boolean): boolean => {
  return (a && b) || (!a && !b)
}

export const ensureArray = (obj: any): any[] => {
  if (isArray(obj)) {
    return obj
  } else {
    return [obj]
  }
}

export const createMap = <K, V>(obj: any): Map<K, V> => {
  let result = new Map()

  if (obj != null) {
    Object.keys(obj).forEach(key => {
      result.set(key, obj[key])
    })
  }

  return result
}
