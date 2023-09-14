const NEWLINE = '\n'
const DASH_SEPARATOR = '-'
const COLON_SEPARATOR = `\\:`
const pseudoStates = ['focus', 'hover', 'active']
const minBreakpoints = [
  'tablet',
  'tablet-only',
  'touch',
  'desktop',
]

const allBreakpoints = [
  'mobile',
  'tablet',
  'tablet-only',
  'touch',
  'desktop',
  'desktop-only',
  'high-definition',
  'high-definition-only',
  'widescreen',
  'widescreen-only',
  'fullhd',
]

class RuleValue {
  constructor({ prop, value, important = false }) {
    this.prop = prop
    this.value = value
    this.important = important
  }

  toString(indent = '') {
    return `${indent}${this.prop}: ${this.value}${this.important === true ? ' !important' : ''}`
  }
}

class Rule {
  values = []

  constructor({ selectors }) {
    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index
    }

    this.selectors = selectors.filter(s => s !== '').filter(onlyUnique)
  }

  append(opts) {
    this.values.push(new RuleValue(opts))
  }

  toString(indent = '') {
    const selector = this.selectors.map(s => `${indent}${s}`).join(`,${NEWLINE}`)
    const values = this.values.map(value => {
      return [`  ${value.toString(indent)}`].join(NEWLINE)
    })
    return [selector, values].join(NEWLINE) + NEWLINE
  }
}

class BreakpointRule {
  rules = []

  constructor({ breakpoint }) {
    this.breakpoint = breakpoint
  }

  append(rule) {
    this.rules.push(rule)
  }

  toString(indent = '') {
    return [
      indent + `+${this.breakpoint}`,
      indent + this.rules.map(rule => rule.toString(`  ${indent}`)).join(NEWLINE),
    ].join(`${NEWLINE}`)
  }
}

class RuleGroup {
  rules = []

  constructor() {}

  append(rule) {
    this.rules.push(rule)
  }

  toString(indent = '') {
    return this.rules.map(rule => rule.toString(indent)).join(NEWLINE)
  }
}

const styleClass = (prefix = '', propName = '', obj = {}, important = false, responsive = false, states = false, breakpoints = minBreakpoints) => {
  const propNames = Array.isArray(propName) ? propName : [propName]
  const rules = new RuleGroup()

  for (const className in obj) {
    let rule = new Rule({
      selectors: [prefix !== '' ? `.${[prefix, className].join(DASH_SEPARATOR)}` : '', `.${className}`],
    })
    propNames.forEach(prop => rule.append({ prop, value: obj[className], important }))
    rules.append(rule)
  }

  if (states) {
    for (const className in obj) {
      for (const pseudo_state of pseudoStates) {
        let rule = new Rule({
          selectors: [
            // prefix !== '' ? `.${pseudo_state}${COLON_SEPARATOR}${[prefix, className].join(DASH_SEPARATOR)}:${pseudo_state}`: '',
            `.${pseudo_state}${COLON_SEPARATOR}${className}:${pseudo_state}`,
          ],
        })
        propNames.forEach(prop => rule.append({ prop, value: obj[className], important }))
        rules.append(rule)
      }
    }
  }

  if (responsive) {
    for (const breakpoint of breakpoints) {
      let breakpointRule = new BreakpointRule({ breakpoint })
      for (const className in obj) {
        let rule = new Rule({
          selectors: [
            prefix !== '' ? `.${[prefix, className, breakpoint].join(DASH_SEPARATOR)}`:'',
            `.${breakpoint}${COLON_SEPARATOR}${className}`,
          ],
        })
        propNames.forEach(prop => rule.append({ prop, value: obj[className], important }))
        breakpointRule.append(rule)
      }

      if (states) {
        for (const className in obj) {
          for (const pseudo_state of pseudoStates) {
            let rule = new Rule({
              selectors: [
                // prefix !== '' ? `.${breakpoint}${COLON_SEPARATOR}${pseudo_state}${COLON_SEPARATOR}${[prefix, className].join(DASH_SEPARATOR)}:${pseudo_state}`: '',
                `.${breakpoint}${COLON_SEPARATOR}${pseudo_state}${COLON_SEPARATOR}${className}:${pseudo_state}`,
              ],
            })
            propNames.forEach(prop => rule.append({ prop, value: obj[className], important }))
            breakpointRule.append(rule)
          }
        }
      }

      rules.append(breakpointRule)
    }
  }

  return rules
}

module.exports = {
  styleClass,
  NEWLINE,
  RuleGroup,
  RuleValue,
  Rule,
  BreakpointRule,
  allBreakpoints,
}
