const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Radius CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const radius = BaloiseDesignToken.radius

  function props(propName = 'radius') {
    const _props = {}
    for (const level in radius) {
      _props[`${propName}-${level}`] = `var(--bal-radius-${level})`
    }
    return _props
  }

  return [
    utils.styleClass('has', 'border-radius', props(), true, true, false).toString(),
    utils
      .styleClass('has', ['border-top-left-radius', 'border-top-right-radius'], props('radius-top'), true, true, false)
      .toString(),
    utils.styleClass('has', ['border-top-left-radius'], props('radius-top-left'), true, true, false).toString(),
    utils.styleClass('has', ['border-top-right-radius'], props('radius-top-right'), true, true, false).toString(),
    utils
      .styleClass(
        'has',
        ['border-bottom-left-radius', 'border-bottom-right-radius'],
        props('radius-bottom'),
        true,
        true,
        false,
      )
      .toString(),
    utils.styleClass('has', ['border-bottom-left-radius'], props('radius-bottom-left'), true, true, false).toString(),
    utils.styleClass('has', ['border-bottom-right-radius'], props('radius-bottom-right'), true, true, false).toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
