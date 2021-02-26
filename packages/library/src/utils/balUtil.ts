export function isDefined(obj: any): boolean {
  return obj !== null && obj !== undefined
}

export function isFunction(obj: any): boolean {
  return obj != null && typeof obj === 'function'
}

export function isNumber(obj: any): boolean {
  return obj != null && !isNaN(parseFloat(obj)) && isFinite(obj)
}

export function isString(obj: any): boolean {
  return obj != null && typeof obj === 'string'
}

export function isArray(obj: any): boolean {
  return obj != null && Array.isArray(obj)
}

export function isNotArray(obj: any): boolean {
  return !isArray(obj)
}

export function isError(obj: any): boolean {
  return obj != null && obj instanceof Error
}

export function isObject(obj: any): boolean {
  return obj === Object(obj) && !isArray(obj)
}

export function isBoolean(obj: any): boolean {
  return obj === true || obj === false
}

export function assertNull(obj: any): void {
  if (obj != null) {
    throw new Error('Assertion error: given param must be nil.')
  }
}

export function assertNotNull(obj: any): void {
  if (obj == null) {
    throw new Error('Assertion error: given param must not be nil.')
  }
}

export function assertFunction(obj: any): void {
  if (!isFunction(obj)) {
    throw new Error('Assertion error: given param must be a function.')
  }
}

export function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  const copyA = [...a].sort()
  const copyB = [...b].sort()

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < copyA.length; ++i) {
    if (copyA[i] !== copyB[i]) return false
  }
  return true
}
