const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Border CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const borderColors = BaloiseDesignToken.border.colors
  const borderWidths = BaloiseDesignToken.border.width

  function props(propName = 'border') {
    const _props = {}
    for (const color in borderColors) {
      _props[`${propName}-${color}`] = `var(--bal-border-width-normal) solid var(--bal-color-border-${color})`
    }
    return _props
  }

  const noneRules = new utils.RuleGroup()

  const rule = new utils.Rule({ selectors: ['.has-border-none', '.border-none'] })
  rule.append({ prop: 'border', value: 'none', important: true })
  noneRules.append(rule)

  const ruleTop = new utils.Rule({ selectors: ['.has-border-top-none', '.border-top-none'] })
  ruleTop.append({ prop: 'border-top', value: 'none', important: true })
  noneRules.append(ruleTop)

  const ruleLeft = new utils.Rule({ selectors: ['.has-border-left-none', '.border-left-none'] })
  ruleLeft.append({ prop: 'border-left', value: 'none', important: true })
  noneRules.append(ruleLeft)

  const ruleBottom = new utils.Rule({ selectors: ['.has-border-bottom-none', '.border-bottom-none'] })
  ruleBottom.append({ prop: 'border-bottom', value: 'none', important: true })
  noneRules.append(ruleBottom)

  const ruleRight = new utils.Rule({ selectors: ['.has-border-top-none', '.border-top-none'] })
  ruleRight.append({ prop: 'border-top', value: 'none', important: true })
  noneRules.append(ruleRight)

  const borderStyle = {
    'border-solid': 'solid',
    'border-dashed': 'dashed',
    // 'border-dotted': 'dotted',
    // 'border-double': 'double',
  }

  function propsWidth(propName = 'border-width') {
    const _props = {}
    for (const width in borderWidths) {
      _props[`${propName}-${width}`] = `var(--bal-border-width-${width})`
    }
    return _props
  }

  function propsColor(propName = 'border-color') {
    const _props = {}
    for (const color in borderColors) {
      _props[`${propName}-${color}`] = `var(--bal-border-${color})`
    }
    return _props
  }

  return [
    utils.styleClass('has', 'border', props(), true, false, true).toString(),
    utils.styleClass('has', 'border-top', props('border-top'), true, false, false).toString(),
    utils.styleClass('has', 'border-bottom', props('border-bottom'), true, false, false).toString(),
    utils.styleClass('has', 'border-left', props('border-left'), true, false, false).toString(),
    utils.styleClass('has', 'border-right', props('border-right'), true, false, false).toString(),
    utils.styleClass('', 'border-style', borderStyle, true, false, false).toString(),
    utils.styleClass('', 'border-width', propsWidth(), true, true, false).toString(),
    utils.styleClass('', 'border-color', propsColor(), true, false, true).toString(),
    noneRules.toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
