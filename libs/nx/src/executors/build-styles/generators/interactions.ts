import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateInteractions = async (options: BuildStylesExecutorSchema) => {
  const userSelect = utils.staticClass({
    property: 'user-select',
    responsive: false,
    values: {
      'select-none': 'none',
      'select-text': 'text',
      'select-all': 'all',
      'select-auto': 'auto',
    },
  })

  const cursor = utils.staticClass({
    property: 'cursor',
    responsive: false,
    values: {
      'cursor-auto': 'auto',
      'cursor-pointer': 'pointer',
      'cursor-wait': 'wait',
      'cursor-move': 'move',
      'cursor-not-allowed': 'not-allowed',
    },
  })

  return utils.save(
    'interaction',
    options.projectRoot,
    utils.merge({
      docs: [userSelect.docs, cursor.docs],
      rules: [userSelect.rules, cursor.rules],
    }),
  )
}
