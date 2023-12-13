import * as utils from './utils.mjs'

export const generateLayout = async () => {
  const display = utils.staticClass({
    property: 'display',
    values: {
      'hidden': 'none',
      'block': 'block',
      'inline': 'inline',
      'inline-block': 'inline-block',
      'flex': 'flex',
      'inline-flex': 'inline-flex',
    },
  })

  const overflow = utils.staticClass({
    property: 'overflow',
    values: {
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
    },
  })

  const position = utils.staticClass({
    property: 'position',
    values: {
      static: 'static',
      fixed: 'fixed',
      relative: 'relative',
      absolute: 'absolute',
      sticky: 'sticky',
    },
  })

  const top = utils.staticClass({
    property: 'top',
    values: {
      'top-auto': 'auto',
      'top-0': '0',
      'top-50': '50%',
      'top-100': '100%',
    },
  })

  const right = utils.staticClass({
    property: 'right',
    values: {
      'right-auto': 'auto',
      'right-0': '0',
      'right-50': '50%',
      'right-100': '100%',
    },
  })

  const bottom = utils.staticClass({
    property: 'bottom',
    values: {
      'bottom-auto': 'auto',
      'bottom-0': '0',
      'bottom-50': '50%',
      'bottom-100': '100%',
    },
  })

  const left = utils.staticClass({
    property: 'left',
    values: {
      'left-auto': 'auto',
      'left-0': '0',
      'left-50': '50%',
      'left-100': '100%',
    },
  })

  const zIndex = await utils.staticClassByToken({
    token: 'size.z-index',
    property: 'z-index',
  })

  return utils.save(
    'layout',
    utils.merge({
      docs: [display.docs, overflow.docs, position.docs, top.docs, right.docs, bottom.docs, left.docs, zIndex.docs],
      rules: [
        display.rules,
        overflow.rules,
        position.rules,
        top.rules,
        right.rules,
        bottom.rules,
        left.rules,
        zIndex.rules,
      ],
    }),
  )
}
