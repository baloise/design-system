import * as utils from './utils.mjs'

export const generateTypography = async () => {
  const textColors = await generateTextColors()
  const fontFamily = await generateFontFamily()
  // const fontFamilyLineHeight = await generateLineHeightFontFamily()
  const fontSize = await generateFontSize()
  const textAlign = generateTextAlign()
  const textTransform = generateTextTransform()
  const fontWeight = await generateFontWeight()
  const whiteSpace = generateWhiteSpace()
  const lineHeight = await generateLineHeight()
  const textOverflow = await generateTextOverflow()

  return utils.save(
    'typography',
    utils.merge({
      docs: [
        textColors.docs,
        fontFamily.docs,
        // fontFamilyLineHeight.rules,
        fontSize.rules,
        fontSize.rulesTablet,
        fontSize.rulesDesktop,
        textAlign.docs,
        textTransform.docs,
        fontWeight.docs,
        whiteSpace.docs,
        lineHeight.docs,
        textOverflow.docs,
      ],
      rules: [
        textColors.rules,
        fontFamily.rules,
        // fontFamilyLineHeight.rules,
        fontSize.rules,
        fontSize.rulesTablet,
        fontSize.rulesDesktop,
        textAlign.rules,
        textTransform.rules,
        fontWeight.rules,
        whiteSpace.rules,
        lineHeight.rules,
        textOverflow.rules,
      ],
    }),
  )
}

const generateLineHeight = async () => {
  return utils.staticClassByToken({
    token: 'size.text.line-height',
    property: 'line-height',
    responsive: false,
    replace: 'text-',
  })
}

// const generateLineHeightFontFamily = async () => {
//   return utils.staticClass({
//     property: 'line-height',
//     responsive: false,
//     important: false,
//     values: {
//       'font-family-title': 'var(--bal-text-line-height-title)',
//       'font-family-text': 'var(--bal-text-line-height-text)',
//     },
//   })
// }

const generateTextOverflow = async () => {
  return utils.staticClass({
    property: 'text-overflow',
    values: {
      'text-overflow-clip': 'clip',
      'text-overflow-ellipsis': 'ellipsis',
    },
  })
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
  return utils.staticClassByToken({
    token: 'font.family',
    property: 'font-family',
    responsive: false,
  })
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

const generateTextAlign = () => {
  return utils.staticClass({
    property: 'text-align',
    values: {
      'text-align-center': 'center',
      'text-align-left': 'left',
      'text-align-right': 'right',
      'text-align-justify': 'justify',
    },
  })
}

const generateTextTransform = () => {
  return utils.staticClass({
    property: 'text-transform',
    responsive: false,
    values: {
      lowercase: 'lowercase',
      uppercase: 'uppercase',
      capitalize: 'capitalize',
    },
  })
}

const generateFontWeight = async () => {
  return utils.staticClassByToken({ token: 'size.font.weight', property: 'font-weight', responsive: false })
}

const generateWhiteSpace = () => {
  return utils.staticClass({
    property: 'white-space',
    responsive: false,
    values: {
      'white-space-normal': 'normal',
      'white-space-nowrap': 'nowrap',
    },
  })
}
