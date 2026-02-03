import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateTypography = async (options: BuildStylesExecutorSchema) => {
  const textColors = await generateTextColors(options)
  const fontFamily = await generateFontFamily(options)
  const fontSize = await generateFontSize(options)
  const textAlign = generateTextAlign()
  const textTransform = generateTextTransform()
  const fontWeight = await generateFontWeight(options)
  const whiteSpace = generateWhiteSpace()
  const lineHeight = await generateLineHeight(options)
  const textOverflow = await generateTextOverflow()

  return utils.save(
    'typography',
    options.projectRoot,
    utils.merge({
      docs: [
        textColors.docs,
        fontFamily.docs,
        lineHeight.docs,
        // fontSize.docs,
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
        lineHeight.rules,
        fontSize.rules,
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

const generateLineHeight = async (options: BuildStylesExecutorSchema) => {
  return utils.staticClassByToken({
    token: '🏷️ Semantic.🔤 Text.LineHeight',
    property: 'line-height',
    responsive: false,
    replace: 'text-',
    ...options,
  })
}

const generateTextOverflow = async () => {
  return utils.staticClass({
    property: 'text-overflow',
    values: {
      'text-overflow-clip': 'clip',
      'text-overflow-ellipsis': 'ellipsis',
    },
  })
}

const generateTextColors = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🔤 Text.Color', ...options })
  const values = utils.toProps({ tokens, replace: 'color-' })
  const property = 'color'

  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({ property, values, important: true, states: true })

  return { rules, docs }
}

const generateFontFamily = async (options: BuildStylesExecutorSchema) => {
  return utils.staticClassByToken({
    token: '🏷️ Semantic.🔤 Text.Family',
    property: 'font-family',
    responsive: false,
    ...options,
  })
}

const generateFontSizeRule = ({ keys, property, prefix, breakpoint = undefined }) => {
  const values = {}
  for (const index in keys) {
    const key = keys[index]
    values[`${prefix}-${key}`] = `var(--bal-text-size-${key}-device)`
  }
  return utils.styleClass({ property, values, important: true, breakpoint })
}

const generateFontSize = async (options: BuildStylesExecutorSchema) => {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🔤 Text.Size', ...options })
  const keys = utils.filterTokenKeys({ tokens, ignore: ['tablet', 'desktop'] })
  const property = 'font-size'

  const rules = generateFontSizeRule({ keys, property, prefix: 'text' })

  return { rules }
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

const generateFontWeight = async (options: BuildStylesExecutorSchema) => {
  return utils.staticClassByToken({ token: 'font.weight', property: 'font-weight', responsive: false, ...options })
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
