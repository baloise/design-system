const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Opacity CSS Utils')

  let opacities = {
    'opacity-0': '0',
    'opacity-10': '.1',
    'opacity-20': '.2',
    'opacity-30': '.3',
    'opacity-40': '.4',
    'opacity-50': '.5',
    'opacity-60': '.6',
    'opacity-70': '.7',
    'opacity-80': '.8',
    'opacity-90': '.9',
    'opacity-100': '1',
    'opacity-1': '1',
  }

  return [utils.styleClass('has', 'opacity', opacities, true, false, false).toString()].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
