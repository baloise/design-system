import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateBackgroundColors = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🎨 Background.Color', ...options })
  const props = utils.toProps({ tokens, prefix: 'bg', replace: 'background-color' })

  const tokensBase = await utils.getTokens({ token: '🧱 Primitive.🌈 Color', ...options })
  const propsBase = utils.toProps({ tokens: tokensBase, prefix: 'bg', replace: 'color' })

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
    },
  })

  const rules = utils.styleClass({
    property: 'background',
    values: {
      ...props,
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
