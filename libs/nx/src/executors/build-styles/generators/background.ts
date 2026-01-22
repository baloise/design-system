import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateBackgroundColors = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: 'color.background', ...options })
  const props = utils.toProps({ tokens, prefix: 'bg', replace: 'color-background-' })

  const tokensBrand = await utils.getTokens({ token: 'color.brand', ...options })
  const propsBrand = utils.toProps({ tokens: tokensBrand, prefix: 'bg', replace: 'color' })

  const tokensBase = await utils.getTokens({ token: 'color', ...options })
  const propsBase = utils.toProps({ tokens: tokensBase, prefix: 'bg', replace: 'color' })

  // merge colors
  for (const key in propsBrand) {
    if (!Object.keys(props).includes(key)) {
      props[key] = propsBrand[key]
    }
  }

  // merge colors
  for (const key in propsBase) {
    if (!Object.keys(props).includes(key)) {
      props[key] = propsBase[key]
    }
  }

  const docs = utils.jsonClass({
    property: 'background',
    values: {
      ...props,
      ['bg-transparent']: 'transparent',
    },
  })

  const rules = utils.styleClass({
    property: 'background',
    values: {
      ...props,
      ['bg-transparent']: 'transparent',
    },
    important: true,
    responsive: false,
    states: true,
    breakpoints: utils.minBreakpoints,
  })

  /**
   * EXPORT
   * ------------------------------------------------------------------------------------------
   */

  return utils.save(
    'background',
    options.projectRoot,
    utils.merge({
      docs: [docs],
      rules: [rules],
    }),
  )
}
