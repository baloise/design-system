const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Background CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const colors = BaloiseDesignToken.color

  const props = {}

  for (const level in colors) {
    props[`background-${level}`] = `var(--bal-color-${level})`
  }

  const rules = utils.styleClass('has', 'background-color', props, true, false, true)

  const invertedPrimary = new utils.RuleGroup()
  const invertedWhite = new utils.RuleGroup()
  const invertedPrimarySelectors = []
  const invertedWhiteSelectors = []

  for (const level in colors) {
    if (colors[level].inverted === 'primary') {
      invertedPrimarySelectors.push(`background-${level}-inverted`)
    }
    if (colors[level].inverted === 'white') {
      invertedWhiteSelectors.push(`background-${level}-inverted`)
    }
  }

  const rule = new utils.Rule({ selectors: invertedPrimarySelectors })
  rule.append({ prop: 'background-color', value: `var(--bal-color-primary)`, important: true })
  invertedPrimary.append(rule)

  const ruleWhite = new utils.Rule({ selectors: invertedWhiteSelectors })
  ruleWhite.append({ prop: 'background-color', value: `var(--bal-color-white)`, important: true })
  invertedWhite.append(ruleWhite)

  return [
    rules.toString(),
    invertedPrimary.toString(),
    invertedWhite.toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
