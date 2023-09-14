const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Interactivity CSS Utils')

  const userSelect = {
    'select-none': 'none',
    'select-text': 'text',
    'select-all': 'all',
    'select-auto': 'auto',
  }

  const cursor = {
    'cursor-auto': 'auto',
    // 'cursor-default': 'default',
    'cursor-pointer': 'pointer',
    'cursor-wait': 'wait',
    'cursor-move': 'move',
    // 'cursor-help': 'help',
    // 'cursor-text': 'text',
    // 'cursor-vertical-text': 'vertical-text',
    // 'cursor-alias': 'alias',
    // 'cursor-copy': 'copy',
    // 'cursor-no-drop': 'no-drop',
    'cursor-not-allowed': 'not-allowed',
    // 'cursor-grab': 'grab',
    // 'cursor-grabbing': 'grabbing',
    // 'cursor-col-resize': 'col-resize',
    // 'cursor-row-resize': 'row-resize',
    // 'cursor-n-resize': 'n-resize',
    // 'cursor-e-resize': 'e-resize',
    // 'cursor-s-resize': 's-resize',
    // 'cursor-w-resize': 'w-resize',
    // 'cursor-ne-resize': 'ne-resize',
    // 'cursor-nw-resize': 'nw-resize',
    // 'cursor-se-resize': 'se-resize',
    // 'cursor-sw-resize': 'sw-resize',
    // 'cursor-ew-resize': 'ew-resize',
    // 'cursor-ns-resize': 'ns-resize',
    // 'cursor-nesw-resize': 'nesw-resize',
    // 'cursor-nwse-resize': 'nwse-resize',
    // 'cursor-zoom-in': 'zoom-in',
    // 'cursor-zoom-out': 'zoom-out',
  }

  return [
    utils.styleClass('', 'user-select', userSelect, true, false, false).toString(),
    utils.styleClass('', 'cursor', cursor, true, false, false).toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
