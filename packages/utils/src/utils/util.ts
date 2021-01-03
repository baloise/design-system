export const BalUtil = {
  isFunction(obj: any) {
    return obj != null && typeof obj === 'function'
  },

  isNumber(obj: any) {
    return obj != null && !isNaN(parseFloat(obj)) && isFinite(obj)
  },

  isString(obj: any) {
    return obj != null && typeof obj === 'string'
  },

  isArray(obj: any) {
    return obj != null && Array.isArray(obj)
  },

  isNotArray(obj: any) {
    return !BalUtil.isArray(obj)
  },

  isError(obj: any) {
    return obj != null && obj instanceof Error
  },

  isObject(obj: any): boolean {
    return obj === Object(obj) && !BalUtil.isArray(obj)
  },

  isBoolean(obj: any) {
    return obj === true || obj === false
  },

  assertNil(obj: any) {
    if (obj != null) {
      throw new Error('Assertion error: given param must be nil.')
    }
  },

  assertNotNil(obj: any) {
    if (obj == null) {
      throw new Error('Assertion error: given param must not be nil.')
    }
  },

  assertFunction(obj: any) {
    if (!BalUtil.isFunction(obj)) {
      throw new Error('Assertion error: given param must be a function.')
    }
  },

  invokeFnWithNotNilParam(obj: any, fn: (obj: any) => void) {
    BalUtil.assertNotNil(obj)
    fn(obj)
  },

  invokeFnIfParamNotNil(obj: any, fn: (obj: any) => any) {
    if (obj != null) {
      fn(obj)
    }
  },

  noop() {},

  xor(a: boolean, b: boolean) {
    return (a && !b) || (!a && b)
  },

  xnor(a: boolean, b: boolean) {
    return (a && b) || (!a && !b)
  },

  ensureArray(obj: any) {
    if (BalUtil.isArray(obj)) {
      return obj
    } else {
      return [obj]
    }
  },

  createMap<K, V>(obj: any): Map<K, V> {
    let result = new Map()

    if (obj != null) {
      Object.keys(obj).forEach(key => {
        result.set(key, obj[key])
      })
    }

    return result
  },
}
