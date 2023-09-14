const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Shadow CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const shadows = BaloiseDesignToken.shadow.box

  function props(propName = 'shadow') {
    const _props = {}
    for (const level in shadows) {
      _props[`${propName}-${level}`] = `var(--bal-shadow-${level})`
    }
    return _props
  }

  const textShadows = BaloiseDesignToken.shadow.text

  function propsText(propName = 'text-shadow') {
    const _props = {}
    for (const level in textShadows) {
      _props[`${propName}-${level}`] = `var(--bal-text-shadow-${level})`
    }
    return _props
  }

  return [
    utils.styleClass('has', 'box-shadow', props(), true, true, true).toString(),
    utils.styleClass('has', 'text-shadow', propsText(), true, true, false).toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
