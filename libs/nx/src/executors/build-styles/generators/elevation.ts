import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateElevation = async (options: BuildStylesExecutorSchema) => {
  const { rules: rulesZIndex, docs: docsZIndex } = await generateZIndex(options)
  const { rules: rulesOpacity, docs: docsOpacity } = await generateOpacity(options)
  const { rules: rulesShadow, docs: docsShadow } = await generateShadow(options)
  const { rules: rulesTextShadow, docs: docsTextShadow } = await generateTextShadow(options)

  return utils.save(
    'elevation',
    options.projectRoot,
    utils.merge({
      docs: [docsZIndex, docsOpacity, docsShadow, docsTextShadow],
      rules: [rulesZIndex, rulesOpacity, rulesShadow, rulesTextShadow],
    }),
  )
}

const generateZIndex = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🗂️ Z-Index', ...options })
  const values = utils.toProps({ tokens })
  const property = 'z-index'

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

const generateOpacity = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🌫️ Opacity', ...options })
  const values = utils.toProps({ tokens })
  const property = 'opacity'

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

const generateShadow = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🌓 Shadow.Box', ...options })
  const values = utils.toProps({ tokens, replace: 'box-' })
  const property = 'box-shadow'
  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({
    property,
    values: {
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
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🌓 Shadow.Text', ...options })
  const values = utils.toProps({ tokens })
  const property = 'text-shadow'

  const docs = utils.jsonClass({ property, values })

  const rules = utils.styleClass({
    property,
    values: {
      ...values,
    },
    important: true,
    responsive: true,
    states: false,
    breakpoints: utils.minBreakpoints,
  })

  return { docs, rules }
}
