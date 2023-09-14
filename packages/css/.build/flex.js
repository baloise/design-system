const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Flexbox CSS Utils')

  const flexDirection = {
    'flex-row': 'row',
    'flex-row-reverse': 'row-reverse',
    'flex-column': 'column',
    'flex-column-reverse': 'column-reverse',
  }

  const flexWrap = {
    'flex-wrap': 'wrap',
    'flex-wrap-reverse': 'wrap-reverse',
    'flex-nowrap': 'nowrap',
  }

  const justifyContent = {
    'justify-content-start': 'flex-start',
    'justify-content-end': 'flex-end',
    'justify-content-center': 'center',
    'justify-content-between': 'space-between',
    'justify-content-around': 'space-around',
    'justify-content-evenly': 'space-evenly',
    'justify-content-flex-start': 'flex-start', // legacy
    'justify-content-flex-end': 'flex-end', // legacy
    'justify-content-left': 'left', // legacy
    'justify-content-right': 'right', // legacy
  }

  const alignContent = {
    'align-content-start': 'flex-start',
    'align-content-end': 'flex-end',
    'align-content-center': 'center',
    'align-content-between': 'space-between',
    'align-content-around': 'space-around',
    'align-content-evenly': 'space-evenly',
    'align-content-stretch': 'stretch',
    'align-content-baseline': 'baseline', // legacy
    'align-content-flex-start': 'flex-start', // legacy
    'align-content-flex-end': 'flex-end', // legacy
  }

  const alignItems = {
    'align-items-stretch': 'stretch',
    'align-items-start': 'flex-start',
    'align-items-center': 'center',
    'align-items-end': 'flex-end',
    'align-items-baseline': 'baseline',
    'align-items-flex-end': 'flex-end', // legacy
    'align-items-flex-start': 'flex-start', // legacy
    'align-items-self-start': 'self-start', // legacy
    'align-items-self-end': 'self-end', // legacy
  }

  const alignSelf = {
    'align-self-auto': 'auto',
    'align-self-start': 'flex-start',
    'align-self-end': 'flex-end',
    'align-self-center': 'center',
    'align-self-stretch': 'stretch',
    'align-self-baseline': 'baseline',
  }

  const order = {
    'flex-order-0': '0',
    'flex-order-1': '1',
    'flex-order-2': '2',
    'flex-order-3': '3',
    'flex-order-4': '4',
    'flex-order-5': '5',
    'flex-order-6': '6',
  }

  const flex = {
    'flex-1': '1 1 0%',
    'flex-auto': '1 1 auto',
    'flex-initial': '0 1 auto',
    'flex-none': 'none',
  }

  const flexGrow = {
    'flex-grow-0': 0,
    'flex-grow-1': 1,
    'flex-grow-2': 2,
    'flex-grow-3': 3,
    'flex-grow-4': 4,
    'flex-grow-5': 5,
  }

  const flexShrink = {
    'flex-shrink-0': 0,
    'flex-shrink-1': 1,
    'flex-shrink-2': 2,
    'flex-shrink-3': 3,
    'flex-shrink-4': 4,
    'flex-shrink-5': 5,
  }

  return [
    utils.styleClass('', 'flex-direction', flexDirection, true, true, false).toString(),
    utils.styleClass('', 'flex-wrap', flexWrap, true, true, false).toString(),
    utils.styleClass('', 'justify-content', justifyContent, true, true, false).toString(),
    utils.styleClass('', 'align-content', alignContent, true, true, false).toString(),
    utils.styleClass('', 'align-items', alignItems, true, true, false).toString(),
    utils.styleClass('is', 'align-self', alignSelf, true, true, false).toString(),
    utils.styleClass('', 'order', order, true, true, false).toString(),
    utils.styleClass('', 'flex', flex, true, true, false).toString(),
    utils.styleClass('is', 'flex-grow', flexGrow, true, true, false).toString(),
    utils.styleClass('is', 'flex-shrink', flexShrink, true, true, false).toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
