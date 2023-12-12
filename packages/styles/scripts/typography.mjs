import * as utils from './utils.mjs'

export const generateTypography = async () => {
  const textColors = await generateTextColors()
  const fontFamily = await generateFontFamily()
  const fontSize = await generateFontSize()
  const textAlign = await generateTextAlign()
  const textTransform = await generateTextTransform()
  const fontWeight = await generateFontWeight()
  const whiteSpace = await generateWhiteSpace()

  return utils.save(
    'typography',
    utils.merge({
      docs: [textColors.docs, fontFamily.docs, textAlign.docs, textTransform.docs, fontWeight.docs, whiteSpace.docs],
      rules: [
        textColors.rules,
        fontFamily.rules,
        fontSize.rules,
        fontSize.rulesTablet,
        fontSize.rulesDesktop,
        textAlign.rules,
        textTransform.rules,
        fontWeight.rules,
        whiteSpace.rules,
      ],
    }),
  )
}

const generateTextColors = async () => {
  const tokens = await utils.getTokens({ token: 'color.text' })
  const values = utils.toProps({ tokens, replace: 'color-' })
  const property = 'color'

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true, states: true })

  return { rules, docs }
}

const generateFontFamily = async () => {
  const tokens = await utils.getTokens({ token: 'font.family' })
  const values = utils.toProps({ tokens })
  const property = 'font-family'

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true })

  return { rules, docs }
}

const generateFontSizeRule = ({ keys, property, prefix, breakpoint }) => {
  const values = {}
  for (const index in keys) {
    const key = keys[index]
    values[`${prefix}-${key}`] = `var(--bal-text-size-${key}${breakpoint ? `-${breakpoint}` : ''})`
  }
  return utils.styleClass({ property, values, important: true, breakpoint })
}

const generateFontSize = async () => {
  const tokens = await utils.getTokens({ token: 'size.text.size' })
  const keys = utils.filterTokenKeys({ tokens, ignore: ['tablet', 'desktop'] })
  const property = 'font-size'

  const rules = generateFontSizeRule({ keys, property, prefix: 'text' })
  const rulesTablet = generateFontSizeRule({ keys, property, prefix: 'text', breakpoint: 'tablet' })
  const rulesDesktop = generateFontSizeRule({ keys, property, prefix: 'text', breakpoint: 'desktop' })

  return { rules, rulesTablet, rulesDesktop }
}

const generateTextAlign = async () => {
  const property = 'text-align'
  const values = {
    'text-align-center': 'center',
    'text-align-left': 'left',
    'text-align-right': 'right',
    'text-align-justified': 'justified',
  }

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true, responsive: true })

  return { rules, docs }
}

const generateTextTransform = async () => {
  const property = 'text-transform'
  const values = {
    lowercase: 'lowercase',
    uppercase: 'uppercase',
    capitalize: 'capitalize',
  }

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true })

  return { rules, docs }
}

const generateFontWeight = async () => {
  const tokens = await utils.getTokens({ token: 'size.text.weight' })
  const values = utils.toProps({ tokens })
  const property = 'font-weight'

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true })

  return { rules, docs }
}

const generateWhiteSpace = async () => {
  const property = 'white-space'
  const values = {
    'white-space-normal': 'normal',
    'white-space-nowrap': 'nowrap',
  }

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true })

  return { rules, docs }
}
