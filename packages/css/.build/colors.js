const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Color CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const colors = BaloiseDesignToken.typography.colors

  function props(propName = 'text') {
    const _props = {}
    for (const color in colors) {
      _props[`${propName}-${color}`] = `var(--bal-color-${color})`
    }
    return _props
  }

  const invertedPrimary = new utils.RuleGroup()
  const invertedWhite = new utils.RuleGroup()
  const invertedPrimarySelectors = []
  const invertedWhiteSelectors = []
  const backgroundColors = BaloiseDesignToken.color

  for (const level in backgroundColors) {
    if (backgroundColors[level].inverted === 'primary') {
      invertedPrimarySelectors.push(`text-${level}-inverted`)
    }
    if (backgroundColors[level].inverted === 'white') {
      invertedWhiteSelectors.push(`text-${level}-inverted`)
    }
  }

  const rule = new utils.Rule({ selectors: invertedPrimarySelectors })
  rule.append({ prop: 'color', value: `var(--bal-color-primary)`, important: true })
  invertedPrimary.append(rule)

  const ruleWhite = new utils.Rule({ selectors: invertedWhiteSelectors })
  ruleWhite.append({ prop: 'color', value: `var(--bal-color-white)`, important: true })
  invertedWhite.append(ruleWhite)

  return [
    utils.styleClass('has', 'color', props(), true, false, true).toString(),
    invertedPrimary.toString(),
    invertedWhite.toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
