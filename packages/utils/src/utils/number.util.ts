export const BalNumberUtil = {
  round(value: number, digits = 0) {
    let multiplicator = Math.pow(10, digits)
    value = parseFloat((value * multiplicator).toFixed(11))
    let test = Math.round(value) / multiplicator
    return +test.toFixed(digits)
  },
}
