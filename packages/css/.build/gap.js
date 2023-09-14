const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Gap CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const spacing = BaloiseDesignToken.spacing

  const rules = new utils.RuleGroup()
  const tabletRules = new utils.BreakpointRule({ breakpoint: 'tablet' })
  const desktopRules = new utils.BreakpointRule({ breakpoint: 'desktop' })

  for (const level in spacing) {
    const space = spacing[level]

    let rule = new utils.Rule({ selectors: [`fg-${level}`, `fg-${space.legacy}`, `gap-${level}`, `gap-${space.legacy}`] })
    rule.append({ prop: 'gap', value: `var(--bal-space-${level})`, important: true })

    let ruleRow = new utils.Rule({
      selectors: [`row-gap-${level}`, `row-gap-${space.legacy}`],
    })
    ruleRow.append({ prop: 'row-gap', value: `var(--bal-space-${level})`, important: true })

    let ruleColumn = new utils.Rule({
      selectors: [`column-gap-${level}`, `column-gap-${space.legacy}`],
    })
    ruleColumn.append({ prop: 'column-gap', value: `var(--bal-space-${level})`, important: true })

    rules.append(rule)
    rules.append(ruleRow)
    rules.append(ruleColumn)
  }

  for (const level in spacing) {
    const space = spacing[level]

    let rule = new utils.Rule({ selectors: [`fg-${level}`, `fg-${space.legacy}`, `gap-${level}`, `gap-${space.legacy}`] })
    rule.append({ prop: 'gap', value: `var(--bal-space-tablet-${level})`, important: true })

    let ruleRow = new utils.Rule({
      selectors: [`row-gap-${level}`, `row-gap-${space.legacy}`],
    })
    ruleRow.append({ prop: 'row-gap', value: `var(--bal-space-tablet-${level})`, important: true })

    let ruleColumn = new utils.Rule({
      selectors: [`column-gap-${level}`, `column-gap-${space.legacy}`],
    })
    ruleColumn.append({ prop: 'column-gap', value: `var(--bal-space-tablet-${level})`, important: true })

    tabletRules.append(rule)
    tabletRules.append(ruleRow)
    tabletRules.append(ruleColumn)
  }
  rules.append(tabletRules)

  for (const level in spacing) {
    const space = spacing[level]

    let rule = new utils.Rule({ selectors: [`fg-${level}`, `fg-${space.legacy}`, `gap-${level}`, `gap-${space.legacy}`] })
    rule.append({ prop: 'gap', value: `var(--bal-space-desktop-${level})`, important: true })

    let ruleRow = new utils.Rule({
      selectors: [`row-gap-${level}`, `row-gap-${space.legacy}`],
    })
    ruleRow.append({ prop: 'row-gap', value: `var(--bal-space-desktop-${level})`, important: true })

    let ruleColumn = new utils.Rule({
      selectors: [`column-gap-${level}`, `column-gap-${space.legacy}`],
    })
    ruleColumn.append({ prop: 'column-gap', value: `var(--bal-space-desktop-${level})`, important: true })

    desktopRules.append(rule)
    desktopRules.append(ruleRow)
    desktopRules.append(ruleColumn)
  }
  rules.append(desktopRules)

  return rules.toString()
}

module.exports = {
  generate,
}
