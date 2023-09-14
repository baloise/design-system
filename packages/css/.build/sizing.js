const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Sizing CSS Utils')

  let heights = {
    'h-full': '100%',
    'h-screen': '100vh',
    'h-auto': 'auto',
    'h-min': 'min-content',
    'h-max': 'max-content',
    'h-fit': 'fit-content',
  }

  let minHeights = {
    'min-h-auto': 'auto',
    'min-h-0': '0px',
    'min-h-full': '100%',
    'min-h-screen': '100vh',
    'min-h-min': 'min-content',
    'min-h-max': 'max-content',
    'min-h-fit': 'fit-content',
  }

  let maxHeights = {
    'max-h-auto': 'auto',
    'max-h-0': '0px',
    'max-h-full': '100%',
    'max-h-screen': '100vh',
    'min-h-min': 'min-content',
    'min-h-max': 'max-content',
    'min-h-fit': 'fit-content',
  }

  let widths = {
    'w-full': '100%',
    'w-screen': '100vw',
    'w-auto': 'auto',
    'w-min': 'min-content',
    'w-max': 'max-content',
    'w-fit': 'fit-content',
    'w-1': '8.3333%',
    'w-2': '16.6667%',
    'w-3': '25%',
    'w-4': '33.3333%',
    'w-5': '41.6667%',
    'w-6': '50%',
    'w-7': '58.3333%',
    'w-8': '66.6667%',
    'w-9': '75%',
    'w-10': '83.3333%',
    'w-11': '91.6667%',
    'w-12': '100%'
};

let minWidths = {
    'min-w-auto': 'auto',
    'min-w-0': '0px',
    'min-w-full': '100%',
    'min-w-screen': '100vw',
    'min-w-min': 'min-content',
    'min-w-max': 'max-content',
    'min-w-fit': 'fit-content'
}

let maxWidths = {
    'max-w-auto': 'auto',
    'max-w-0': '0px',
    'max-w-full': '100%',
    'max-w-screen': '100vw',
    'max-w-min': 'min-content',
    'max-w-max': 'max-content',
    'max-w-fit': 'fit-content'
}

  return [
    utils.styleClass('', 'height', heights, true, true, false).toString(),
    utils.styleClass('', 'min-height', minHeights, true, true, false).toString(),
    utils.styleClass('', 'max-height', maxHeights, true, true, false).toString(),
    utils.styleClass('', 'width', widths, true, true, false).toString(),
    utils.styleClass('', 'min-width', minWidths, true, true, false).toString(),
    utils.styleClass('', 'max-width', maxWidths, true, true, false).toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
