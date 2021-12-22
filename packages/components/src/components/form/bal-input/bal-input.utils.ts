export const filterInputValue = (
  value: string,
  oldValue: string | number | undefined,
  decimalPoints: number | undefined = undefined,
): string => {
  const regex = /^(((0|[1-9]\d*)?)(\.\d*)?)$/g
  let regexString = regex.source
  if (decimalPoints === 0) {
    regexString = /^[0-9]*$/g.source
  } else if (decimalPoints !== undefined && decimalPoints > 0) {
    regexString = regexString.replace('d*)?)$', `d{0,${decimalPoints}})?)$`)
  }
  const regexp = new RegExp(regexString, 'g')

  if (regexp.test(value)) {
    return value
  }
  return oldValue === undefined ? '' : `${oldValue}`
}

export const formatInputValue = (value: string, decimalPoints: number | undefined = undefined): string => {
  if (value.charAt(0) === '.') {
    value = `0${value}`
  }

  let num: number | string = parseFloat(value)

  if (isNaN(num)) {
    return ''
  }

  if (decimalPoints !== undefined) {
    if (decimalPoints === 0) {
      num = parseInt(value, 10)
    } else {
      num = num.toFixed(decimalPoints)
    }
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
