import { mkdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import get from 'lodash.get'

export const NEWLINE = '\n'
export const DASH_SEPARATOR = '-'
export const COLON_SEPARATOR = `\\:`
export const pseudoStates = ['focus', 'hover', 'active']
export const minBreakpoints = ['mobile', 'tablet', 'desktop', 'widescreen']

export const allBreakpoints = [
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

interface BaseRule {
  toString(indent: string): string
}

class RuleValue implements BaseRule {
  prop: string
  value: string
  important: boolean

  constructor({ prop, value, important = false }) {
    this.prop = prop
    this.value = value
    this.important = important
  }

  toString(indent = '') {
    return `${indent}${this.prop}: ${this.value}${this.important === true ? ' !important' : ''}`
  }
}

class Rule implements BaseRule {
  selectors: string[] = []
  values: RuleValue[] = []

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
    return [selector, ...values].join(NEWLINE) + NEWLINE
  }
}

class BreakpointRule implements BaseRule {
  rules: BaseRule[] = []
  breakpoint = []

  constructor({ breakpoint }) {
    this.breakpoint = breakpoint
  }

  append(rule: BaseRule) {
    this.rules.push(rule)
  }

  toString(indent = '') {
    return [
      indent + `+${this.breakpoint}`,
      indent + this.rules.map(rule => rule.toString(`  ${indent}`)).join(NEWLINE),
    ].join(`${NEWLINE}`)
  }
}

class RuleGroup implements BaseRule {
  rules: BaseRule[] = []

  append(rule: BaseRule) {
    this.rules.push(rule)
  }

  toString(indent = '') {
    return this.rules.map(rule => rule.toString(indent)).join(NEWLINE)
  }
}

export const jsonClass = ({ property = '', values = {} }) => {
  const keys = Object.keys(values)
  return {
    [property]: keys.map(key => {
      return {
        class: key,
        css: `${property}: ${values[key]};`,
        property: property,
        value: values[key],
      }
    }),
  }
}

export const filterTokenKeys = ({ tokens, ignore = [] }) => {
  return Object.keys(tokens).filter(key => !ignore.includes(key))
}

export const visualTest = ({ values, template }) => {
  const lines = []
  for (const className in values) {
    lines.push(template(className))
  }
  return lines.map(l => `        ${l}`).join(NEWLINE)
}

export const toCssVarName = (tokenName, token) => {
  const isSizeVariable = token.attributes.category === 'size'
  const isColorVariable = token.attributes.category === 'color'
  const endsWithMobile = token.name.endsWith('-mobile') || token.name.endsWith('Mobile')
  const endsWithDefault = token.name.endsWith('-default') || token.name.endsWith('Default')

  if (isSizeVariable) {
    tokenName = tokenName.replace('bal-size', 'bal')
  }
  if (isColorVariable) {
    tokenName = tokenName.replace('bal-color-base', 'bal-color')
  }
  if (endsWithMobile) {
    tokenName = tokenName.replace('-mobile', '')
  }
  if (endsWithDefault) {
    tokenName = tokenName.replace('-default', '')
  }
  return tokenName
}

export const toCssVar = token => {
  return `var(--${toCssVarName(token.name, token)})`
}

const removeLeadingTrailingDashes = inputString => {
  // Remove leading dashes
  const stringWithoutLeadingDashes = inputString.replace(/^[-]+/, '')
  // Remove trailing dashes
  return stringWithoutLeadingDashes.replace(/[-]+$/, '')
}

export const toProp = ({ property, prefix, replace, replace2 }) => {
  const propPrefix = `${prefix ? prefix + '-' : ''}`
  const propName = removeLeadingTrailingDashes(
    propPrefix + `${property.name.replace('bal-', '')}`.replace(replace, '').replace(replace2, ''),
  )
  const propValue = toCssVar(property)
  return {
    [`${propName}`.replace(/--/g, '-')]: propValue,
  }
}

export const toProps = ({ tokens, prefix = undefined, replace = undefined, replace2 = undefined }) => {
  let props = {}
  for (const key in tokens) {
    const property = tokens[key]

    if (!property.value) {
      props = {
        ...props,
        ...toProps({ tokens: property, prefix, replace, replace2 }),
      }
    } else {
      props = {
        ...props,
        ...toProp({ property, prefix, replace, replace2 }),
      }
    }
  }
  return props
}

export const styleClass = ({
  property = '',
  values = {},
  important = false,
  responsive = false,
  states = false,
  breakpoints = minBreakpoints,
  additionalValues = {},
  breakpoint = '',
}) => {
  const propNames = Array.isArray(property) ? property : [property]
  const rules = new RuleGroup()

  if (breakpoint) {
    const breakpointRule = new BreakpointRule({ breakpoint })
    for (const className in values) {
      const rule = new Rule({
        selectors: [`.${className}`],
      })
      propNames.forEach(prop => {
        rule.append({ prop, value: values[className], important })
        if (additionalValues) {
          for (const additionalValue in additionalValues) {
            rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
          }
        }
      })
      rules.append(rule)
    }
    breakpointRule.append(rules)
    return breakpointRule
  } else {
    for (const className in values) {
      const rule = new Rule({
        selectors: [`.${className}`],
      })
      propNames.forEach(prop => {
        rule.append({ prop, value: values[className], important })
        if (additionalValues) {
          for (const additionalValue in additionalValues) {
            rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
          }
        }
      })
      rules.append(rule)
    }

    if (states) {
      for (const className in values) {
        for (const pseudo_state of pseudoStates) {
          const rule = new Rule({
            selectors: [`.${pseudo_state}${COLON_SEPARATOR}${className}:${pseudo_state}`],
          })
          propNames.forEach(prop => {
            rule.append({ prop, value: values[className], important })
            if (additionalValues) {
              for (const additionalValue in additionalValues) {
                rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
              }
            }
          })
          rules.append(rule)
        }
      }
    }

    if (responsive) {
      for (const breakpoint of breakpoints) {
        const breakpointRule = new BreakpointRule({ breakpoint })
        for (const className in values) {
          const rule = new Rule({
            selectors: [`.${breakpoint}${COLON_SEPARATOR}${className}`],
          })
          propNames.forEach(prop => {
            rule.append({ prop, value: values[className], important })
            if (additionalValues) {
              for (const additionalValue in additionalValues) {
                rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
              }
            }
          })
          breakpointRule.append(rule)
        }

        if (states) {
          for (const className in values) {
            for (const pseudo_state of pseudoStates) {
              const rule = new Rule({
                selectors: [
                  `.${breakpoint}${COLON_SEPARATOR}${pseudo_state}${COLON_SEPARATOR}${className}:${pseudo_state}`,
                ],
              })
              propNames.forEach(prop => {
                rule.append({ prop, value: values[className], important })
                if (additionalValues) {
                  for (const additionalValue in additionalValues) {
                    rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
                  }
                }
              })
              breakpointRule.append(rule)
            }
          }
        }

        rules.append(breakpointRule)
      }
    }
  }

  return rules
}

export const styleClassDeprecated = ({
  property = '',
  values = {},
  important = false,
  responsive = false,
  breakpoints = minBreakpoints,
  prefix = '',
}) => {
  const propNames = Array.isArray(property) ? property : [property]
  const rules = new RuleGroup()

  for (const className in values) {
    const selectors = [prefix !== '' ? `.${[prefix, className].join(DASH_SEPARATOR)}` : className]
    const rule = new Rule({ selectors })
    propNames.forEach(prop => rule.append({ prop, value: values[className], important }))
    rules.append(rule)
  }

  if (responsive) {
    for (const breakpoint of breakpoints) {
      const breakpointRule = new BreakpointRule({ breakpoint })
      for (const className in values) {
        const selectors = [prefix !== '' ? `.${[prefix, className, breakpoint].join(DASH_SEPARATOR)}` : className]
        const rule = new Rule({ selectors })
        propNames.forEach(prop => rule.append({ prop, value: values[className], important }))
        breakpointRule.append(rule)
      }

      rules.append(breakpointRule)
    }
  }

  return rules
}

export const merge = ({ docs = [], rules = [], deprecated = [], visualTest = [] }) => {
  return {
    json: JSON.stringify(docs, undefined, 2),
    rules: [`@use '../mixins/_all' as *`, NEWLINE, ...rules.map(r => r.toString())].join(NEWLINE),
    deprecated: [...deprecated.map(r => r.toString())].join(NEWLINE),
    visualTest: `<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <script type="module" src="/build/baloise-design-system.esm.js"></script>
    <script nomodule src="/build/baloise-design-system.js"></script>
  </head>
  <body>
    <bal-doc-app>
      <main class="container">
${visualTest.join(NEWLINE)}
      </main>
    </bal-doc-app>
  </body>
</html>
`,
  }
}

export const staticClass = ({
  property,
  values,
  important = true,
  responsive = true,
  states = false,
  breakpoints = minBreakpoints,
}) => {
  const docs = jsonClass({ property, values })
  const rules = styleClass({ property, values, important, responsive, states, breakpoints })
  return { rules, docs }
}

export const staticClassByToken = async ({
  token,
  property,
  values = {},
  tokensRoot,
  important = true,
  responsive = true,
  states = false,
  replace = undefined,
  replace2 = undefined,
  prefix = undefined,
}) => {
  const tokens = await getTokens({ token, tokensRoot })
  const props = toProps({ tokens, replace, prefix, replace2 })
  const docs = jsonClass({ property, values: { ...values, ...props } })
  const rules = styleClass({ property, values: { ...values, ...props }, important, responsive, states })
  return { rules, docs }
}

export const save = async (fileName, projectRoot, { json, rules }) => {
  await writeFileRecursive(join(projectRoot, 'docs', `${fileName}.json`), json)
  await writeFileRecursive(join(projectRoot, 'src/generated', `${fileName}.sass`), rules)
}

export const getTokens = async ({ token, tokensRoot }) => {
  const content = await readFile(join(tokensRoot, `dist/tokens.docs.json`), 'utf8')
  const json = JSON.parse(content)
  return get(json, token)
}

export const writeFileRecursive = async (filePath, data) => {
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, data)
}
