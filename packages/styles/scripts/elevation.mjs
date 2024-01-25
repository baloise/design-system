import * as utils from './utils.mjs'

export const generateElevation = async () => {
  const { rules: rulesOpacity, docs: docsOpacity } = await generateOpacity()
  const { rules: rulesShadow, docs: docsShadow } = await generateShadow()
  const { rules: rulesTextShadow, docs: docsTextShadow } = await generateTextShadow()

  return utils.save(
    'elevation',
    utils.merge({
      docs: [docsOpacity, docsShadow, docsTextShadow],
      rules: [rulesOpacity, rulesShadow, rulesTextShadow],
    }),
  )
}

const generateOpacity = async () => {
  const tokens = await utils.getTokens({ token: 'opacity' })
  const values = utils.toProps({ tokens })
  const property = 'opacity'

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true })

  return { docs, rules }
}

const generateShadow = async () => {
  const tokens = await utils.getTokens({ token: 'shadow' })
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

const generateTextShadow = async () => {
  const tokens = await utils.getTokens({ token: 'text.shadow' })
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
