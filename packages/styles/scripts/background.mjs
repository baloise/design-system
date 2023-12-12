import * as utils from './utils.mjs'

export const generateBackgroundColors = async () => {
  const tokens = await utils.getTokens({ token: 'color.background' })
  const props = utils.toProps({ tokens, prefix: 'bg', replace: 'color-background' })

  const tokensBase = await utils.getTokens({ token: 'color.base' })
  const propsBase = utils.toProps({ tokens: tokensBase, prefix: 'bg', replace: 'color' })

  const docs = utils.jsonClass({
    property: 'background',
    values: {
      ...props,
      ...propsBase,
    },
  })

  const rules = utils.styleClass({
    property: 'background',
    values: {
      ...props,
      ...propsBase,
    },
    important: true,
    responsive: false,
    states: true,
    breakpoints: utils.minBreakpoints,
  })

  const rulesPrimary = utils.styleClass({
    property: 'color',
    values: {
      'bg-primary': `var(--bal-color-white)`,
      'bg-primary-3': `var(--bal-color-white)`,
      'bg-primary-4': `var(--bal-color-white)`,
      'bg-primary-5': `var(--bal-color-white)`,
      'bg-primary-6': `var(--bal-color-white)`,
    },
    important: false,
    responsive: false,
    states: true,
    breakpoints: utils.minBreakpoints,
  })

  const visualTest = utils.visualTest({
    values: {
      ...props,
      ...propsBase,
    },
    template: className => `<div class="${className} p-normal mb-small">${className}</div>`,
  })

  /**
   * EXPORT
   * ------------------------------------------------------------------------------------------
   */

  return utils.save(
    'background',
    utils.merge({
      docs: [docs],
      rules: [rules, rulesPrimary],
      visualTest: [visualTest],
    }),
  )
}
