const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Display CSS Utils')

  const propsDisplay = {
    'hidden': 'none',
    'block': 'block',
    'inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex',
    'inline-flex': 'inline-flex',
  }

  const rulesDisplay = utils.styleClass('is', 'display', propsDisplay, true, true, false, utils.allBreakpoints)

  const rulesVisibility = utils.styleClass(
    'is',
    'visibility',
    {
      invisible: 'hidden',
    },
    true,
    true,
    false,
    utils.allBreakpoints,
  )

  const propsOverflow = {
    'overflow-auto': 'auto',
    'overflow-hidden': 'hidden',
    'overflow-visible': 'visible',
    'overflow-scroll': 'scroll',
    'overflow-x-auto': 'auto',
    'overflow-x-hidden': 'hidden',
    'overflow-x-visible': 'visible',
    'overflow-x-scroll': 'scroll',
    'overflow-y-auto': 'auto',
    'overflow-y-hidden': 'hidden',
    'overflow-y-visible': 'visible',
    'overflow-y-scroll': 'scroll',
  }

  const rulesOverflow = utils.styleClass('', 'overflow', propsOverflow, true, true, false)

  const propsPosition = {
    static: 'static',
    fixed: 'fixed',
    relative: 'relative',
    absolute: 'absolute',
    sticky: 'sticky',
  }

  const rulesPosition = utils.styleClass('', 'position', propsPosition, true, true, false)

  const propsTopPlacement = {
    'top-auto': 'auto',
    'top-0': '0',
    'top-50': '50%',
    'top-100': '100%',
  }

  const propsRightPlacement = {
    'right-auto': 'auto',
    'right-0': '0',
    'right-50': '50%',
    'right-100': '100%',
  }

  const propsBottomPlacement = {
    'bottom-auto': 'auto',
    'bottom-0': '0',
    'bottom-50': '50%',
    'bottom-100': '100%',
  }

  const propsLeftPlacement = {
    'left-auto': 'auto',
    'left-0': '0',
    'left-50': '50%',
    'left-100': '100%',
  }

  const rulesTopPlacement = utils.styleClass('', 'top', propsTopPlacement, true, true, false)
  const rulesRightPlacement = utils.styleClass('', 'right', propsRightPlacement, true, true, false)
  const rulesBottomPlacement = utils.styleClass('', 'bottom', propsBottomPlacement, true, true, false)
  const rulesLeftPlacement = utils.styleClass('', 'left', propsLeftPlacement, true, true, false)

  return [
    rulesDisplay.toString(),
    rulesVisibility.toString(),
    rulesOverflow.toString(),
    rulesPosition.toString(),
    rulesTopPlacement.toString(),
    rulesRightPlacement.toString(),
    rulesBottomPlacement.toString(),
    rulesLeftPlacement.toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
