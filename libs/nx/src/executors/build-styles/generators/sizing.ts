import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateSizing = async (options: BuildStylesExecutorSchema) => {
  const height = utils.staticClass({
    property: 'height',
    values: {
      'h-full': '100%',
      'h-screen': '100vh',
      'h-auto': 'auto',
      'h-min': 'min-content',
      'h-max': 'max-content',
      'h-fit': 'fit-content',
      'h-1rem': '1rem',
      'h-2rem': '2rem',
      'h-3rem': '3rem',
      'h-4rem': '4rem',
      'h-5rem': '5rem',
      'h-6rem': '6rem',
      'h-7rem': '7rem',
      'h-8rem': '8rem',
      'h-9rem': '9rem',
      'h-10rem': '10rem',
      'h-11rem': '11rem',
      'h-12rem': '12rem',
      'h-13rem': '13rem',
      'h-14rem': '14rem',
      'h-15rem': '15rem',
      'h-16rem': '16rem',
      'h-17rem': '17rem',
      'h-18rem': '18rem',
      'h-19rem': '19rem',
      'h-20rem': '20rem',
      'h-21rem': '21rem',
      'h-22rem': '22rem',
      'h-23rem': '23rem',
      'h-24rem': '24rem',
      'h-25rem': '25rem',
      'h-26rem': '26rem',
      'h-27rem': '27rem',
      'h-28rem': '28rem',
      'h-29rem': '29rem',
      'h-30rem': '30rem',
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
      'w-1rem': '1rem',
      'w-2rem': '2rem',
      'w-3rem': '3rem',
      'w-4rem': '4rem',
      'w-5rem': '5rem',
      'w-6rem': '6rem',
      'w-7rem': '7rem',
      'w-8rem': '8rem',
      'w-9rem': '9rem',
      'w-10rem': '10rem',
      'w-11rem': '11rem',
      'w-12rem': '12rem',
      'w-13rem': '13rem',
      'w-14rem': '14rem',
      'w-15rem': '15rem',
      'w-16rem': '16rem',
      'w-17rem': '17rem',
      'w-18rem': '18rem',
      'w-19rem': '19rem',
      'w-20rem': '20rem',
      'w-21rem': '21rem',
      'w-22rem': '22rem',
      'w-23rem': '23rem',
      'w-24rem': '24rem',
      'w-25rem': '25rem',
      'w-26rem': '26rem',
      'w-27rem': '27rem',
      'w-28rem': '28rem',
      'w-29rem': '29rem',
      'w-30rem': '30rem',
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
    options.projectRoot,
    utils.merge({
      docs: [height.docs, width.docs, minHeight.docs, minWidth.docs, maxHeight.docs, maxWidth.docs],
      rules: [height.rules, width.rules, minHeight.rules, minWidth.rules, maxHeight.rules, maxWidth.rules],
    }),
  )
}
