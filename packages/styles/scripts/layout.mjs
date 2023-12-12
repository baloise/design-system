import * as utils from './utils.mjs'

export const generateLayout = async () => {
  const { docs: docsDisplay, rules: rulesDisplay } = await generateDisplay()

  return utils.save(
    'layout',
    utils.merge({
      docs: [docsDisplay],
      rules: [rulesDisplay],
    }),
  )
}

const generateDisplay = async () => {
  const property = 'display'
  const values = {
    'hidden': 'none',
    'block': 'block',
    'inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex',
    'inline-flex': 'inline-flex',
  }

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({
    property,
    values,
    important: true,
    responsive: true,
    states: false,
    breakpoints: utils.allBreakpoints,
  })

  return { rules, docs }
}
