import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'
import { COLON_SEPARATOR } from './utils'

export const generateSpacing = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.↔️ Space', ...options })
  const keys = utils.filterTokenKeys({ tokens, ignore: ['tablet', 'desktop'] })

  const margin = generateResponsiveSpace({ keys, property: 'margin', prefix: 'm' })
  const marginX = generateResponsiveSpace({ keys, property: ['margin-left', 'margin-right'], prefix: 'mx' })
  const marginY = generateResponsiveSpace({ keys, property: ['margin-top', 'margin-bottom'], prefix: 'my' })
  const marginTop = generateResponsiveSpace({ keys, property: 'margin-top', prefix: 'mt' })
  const marginRight = generateResponsiveSpace({ keys, property: 'margin-right', prefix: 'mr' })
  const marginBottom = generateResponsiveSpace({ keys, property: 'margin-bottom', prefix: 'mb' })
  const marginLeft = generateResponsiveSpace({ keys, property: 'margin-left', prefix: 'ml' })

  const padding = generateResponsiveSpace({ keys, property: 'padding', prefix: 'p' })
  const paddingX = generateResponsiveSpace({ keys, property: ['padding-left', 'padding-right'], prefix: 'px' })
  const paddingY = generateResponsiveSpace({ keys, property: ['padding-top', 'padding-bottom'], prefix: 'py' })
  const paddingTop = generateResponsiveSpace({ keys, property: 'padding-top', prefix: 'pt' })
  const paddingRight = generateResponsiveSpace({ keys, property: 'padding-right', prefix: 'pr' })
  const paddingBottom = generateResponsiveSpace({ keys, property: 'padding-bottom', prefix: 'pb' })
  const paddingLeft = generateResponsiveSpace({ keys, property: 'padding-left', prefix: 'pl' })

  return utils.save(
    'spacing',
    options.projectRoot,
    utils.merge({
      docs: [],
      rules: [
        // Margin
        margin.rules,
        marginX.rules,
        marginY.rules,
        marginTop.rules,
        marginRight.rules,
        marginBottom.rules,
        marginLeft.rules,
        // Padding
        padding.rules,
        paddingX.rules,
        paddingY.rules,
        paddingTop.rules,
        paddingRight.rules,
        paddingBottom.rules,
        paddingLeft.rules,
      ],
    }),
  )
}

function generateResponsiveSpace({ keys, property, prefix }) {
  const { rules: rules } = generateSpace({ keys, property, prefix })
  return { rules }
}

const tshirtSizesMapping = {
  '3xs': 'xx-small',
  '2xs': 'xx-small',
  'xs': 'x-small',
  'sm': 'small',
  'base': 'normal',
  'md': 'medium',
  'lg': 'large',
  'xl': 'x-large',
  '2xl': 'xx-large',
  '3xl': 'xx-large',
  '4xl': 'xx-large',
  '5xl': 'xx-large',
  '6xl': 'xx-large',
}

function generateSpace({ keys, prefix, property, breakpoint = '' }) {
  const values = {}
  for (const index in keys) {
    const key = keys[index].toLowerCase()
    const oldKey = tshirtSizesMapping[key]
    values[`${prefix}-${key}${oldKey ? `.${prefix}-${oldKey}` : ''}`] = `var(--bal-space-${key}-device)`
  }
  const rules = utils.styleClass({ property, values, breakpoint, important: true })
  return { rules }
}
