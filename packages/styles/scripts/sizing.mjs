import * as utils from './utils.mjs'

export const generateSizing = async () => {
  const height = utils.staticClass({
    property: 'height',
    values: {
      'h-full': '100%',
      'h-screen': '100vh',
      'h-auto': 'auto',
      'h-min': 'min-content',
      'h-max': 'max-content',
      'h-fit': 'fit-content',
    },
  })

  const minHeight = utils.staticClass({
    property: 'min-height',
    values: {
      'min-h-auto': 'auto',
      'min-h-0': '0px',
      'min-h-full': '100%',
      'min-h-screen': '100vh',
      'min-h-min': 'min-content',
      'min-h-max': 'max-content',
      'min-h-fit': 'fit-content',
    },
  })

  const maxHeight = utils.staticClass({
    property: 'max-height',
    values: {
      'max-h-auto': 'auto',
      'max-h-0': '0px',
      'max-h-full': '100%',
      'max-h-screen': '100vh',
      'min-h-min': 'min-content',
      'min-h-max': 'max-content',
      'min-h-fit': 'fit-content',
    },
  })

  const width = utils.staticClass({
    property: 'width',
    values: {
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
      'w-12': '100%',
    },
  })

  const minWidth = utils.staticClass({
    property: 'min-width',
    values: {
      'min-w-auto': 'auto',
      'min-w-0': '0px',
      'min-w-full': '100%',
      'min-w-screen': '100vw',
      'min-w-min': 'min-content',
      'min-w-max': 'max-content',
      'min-w-fit': 'fit-content',
    },
  })

  const maxWidth = utils.staticClass({
    property: 'max-width',
    values: {
      'max-w-auto': 'auto',
      'max-w-0': '0px',
      'max-w-full': '100%',
      'max-w-screen': '100vw',
      'max-w-min': 'min-content',
      'max-w-max': 'max-content',
      'max-w-fit': 'fit-content',
    },
  })

  return utils.save(
    'sizing',
    utils.merge({
      docs: [height.docs, width.docs, minHeight.docs, minWidth.docs, maxHeight.docs, maxWidth.docs],
      rules: [height.rules, width.rules, minHeight.rules, minWidth.rules, maxHeight.rules, maxWidth.rules],
    }),
  )
}
