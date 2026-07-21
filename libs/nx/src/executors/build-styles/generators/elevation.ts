import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateElevation = async (options: BuildStylesExecutorSchema) => {
  const { rules: rulesOpacity, docs: docsOpacity } = await generateOpacity(options)
  const { rules: rulesShadow, docs: docsShadow } = await generateShadow(options)
  const { rules: rulesTextShadow, docs: docsTextShadow } = await generateTextShadow(options)

  return utils.save(
    'elevation',
    options.projectRoot,
    utils.merge({
      docs: [docsOpacity, docsShadow, docsTextShadow],
      rules: [rulesOpacity, rulesShadow, rulesTextShadow],
    }),
  )
}

const generateOpacity = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: 'opacity', ...options })
  const values = utils.toProps({ tokens })
  const property = 'opacity'

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true })

  return { docs, rules }
}

const generateShadow = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: 'shadow', ...options })
  const values = utils.toProps({ tokens })
  const property = 'box-shadow'
  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({
    property,
    values: {
      ['shadow-none']: 'none',
      ...values,
    },
    important: true,
    responsive: true,
    states: true,
    breakpoints: utils.minBreakpoints,
  })

  return { docs, rules }
}

const generateTextShadow = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: 'text.shadow', ...options })
  const values = utils.toProps({ tokens })
  const property = 'text-shadow'

  const docs = utils.jsonClass({ property, values })

  const rules = utils.styleClass({
    property,
    values,
    important: true,
    responsive: true,
    states: false,
    breakpoints: utils.minBreakpoints,
  })

  return { docs, rules }
}
