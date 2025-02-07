import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'
import { COLON_SEPARATOR } from './utils'

export const generateSpacing = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: 'size.space', ...options })
  const keys = utils.filterTokenKeys({ tokens, ignore: ['tablet', 'desktop', 'none'] })

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
        margin.rulesMobile,
        margin.rulesTablet,
        margin.rulesDesktop,
        marginX.rules,
        marginX.rulesMobile,
        marginX.rulesTablet,
        marginX.rulesDesktop,
        marginY.rules,
        marginY.rulesMobile,
        marginY.rulesTablet,
        marginY.rulesDesktop,
        marginTop.rules,
        marginTop.rulesMobile,
        marginTop.rulesTablet,
        marginTop.rulesDesktop,
        marginRight.rules,
        marginRight.rulesMobile,
        marginRight.rulesTablet,
        marginRight.rulesDesktop,
        marginBottom.rules,
        marginBottom.rulesMobile,
        marginBottom.rulesTablet,
        marginBottom.rulesDesktop,
        marginLeft.rules,
        marginLeft.rulesMobile,
        marginLeft.rulesTablet,
        marginLeft.rulesDesktop,
        // Padding
        padding.rules,
        padding.rulesMobile,
        padding.rulesTablet,
        padding.rulesDesktop,
        paddingX.rules,
        paddingX.rulesMobile,
        paddingX.rulesTablet,
        paddingX.rulesDesktop,
        paddingY.rules,
        paddingY.rulesMobile,
        paddingY.rulesTablet,
        paddingY.rulesDesktop,
        paddingTop.rules,
        paddingTop.rulesMobile,
        paddingTop.rulesTablet,
        paddingTop.rulesDesktop,
        paddingRight.rules,
        paddingRight.rulesMobile,
        paddingRight.rulesTablet,
        paddingRight.rulesDesktop,
        paddingBottom.rules,
        paddingBottom.rulesMobile,
        paddingBottom.rulesTablet,
        paddingBottom.rulesDesktop,
        paddingLeft.rules,
        paddingLeft.rulesMobile,
        paddingLeft.rulesTablet,
        paddingLeft.rulesDesktop,
      ],
    }),
  )
}

function generateResponsiveSpace({ keys, property, prefix }) {
  const { rules: rules } = generateSpace({ keys, property, prefix })
  const { rules: rulesMobile } = generateSpace({ keys, property, prefix, breakpoint: 'mobile' })
  const { rules: rulesTablet } = generateSpace({ keys, property, prefix, breakpoint: 'tablet' })
  const { rules: rulesDesktop } = generateSpace({ keys, property, prefix, breakpoint: 'desktop' })
  return { rules, rulesMobile, rulesTablet, rulesDesktop }
}

function generateSpace({ keys, prefix, property, breakpoint = '' }) {
  if (breakpoint === 'mobile') {
    const values = {}
    for (const index in keys) {
      const key = keys[index]
      values[`${breakpoint}${COLON_SEPARATOR}${prefix}-${key}`] =
        `var(--bal-space-${key}${breakpoint && breakpoint !== 'mobile' ? `-${breakpoint}` : ''})`
    }
    const rules = utils.styleClass({ property, values, breakpoint, important: true })
    return { rules }
  } else {
    const values = {
      [`${prefix}-none`]: '0',
      [`${prefix}-auto`]: 'auto',
    }
    for (const index in keys) {
      const key = keys[index]
      values[`${prefix}-${key}`] =
        `var(--bal-space-${key}${breakpoint && breakpoint !== 'mobile' ? `-${breakpoint}` : ''})`
      if (breakpoint) {
        values[`${breakpoint}${COLON_SEPARATOR}${prefix}-${key}`] =
          `var(--bal-space-${key}${breakpoint && breakpoint !== 'mobile' ? `-${breakpoint}` : ''})`
      }
    }
    const rules = utils.styleClass({ property, values, breakpoint, important: true })
    return { rules }
  }
}
