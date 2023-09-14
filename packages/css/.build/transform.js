const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Transform CSS Utils')

  const rotate = {
    'rotate-45': 'rotate(45deg)',
    '-rotate-45': 'rotate(-45deg)',
    'rotate-90': 'rotate(90deg)',
    '-rotate-90': 'rotate(-90deg)',
    'rotate-180': 'rotate(180deg)',
    '-rotate-180': 'rotate(-180deg)',
  }

  return [utils.styleClass('', 'transform', rotate, true, true, false).toString()].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
