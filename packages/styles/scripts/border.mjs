import * as utils from './utils.mjs'

export const generateBorder = async () => {
  const { docsBorderWidth, rulesBorderWidth } = await generateBorderWidth({})
  const { docsBorderWidth: docsBorderTopWidth, rulesBorderWidth: rulesBorderTopWidth } = await generateBorderWidth({
    placement: 'top',
  })
  const { docsBorderWidth: docsBorderBottomWidth, rulesBorderWidth: rulesBorderBottomWidth } =
    await generateBorderWidth({
      placement: 'bottom',
    })
  const { docsBorderWidth: docsBorderLeftWidth, rulesBorderWidth: rulesBorderLeftWidth } = await generateBorderWidth({
    placement: 'left',
  })
  const { docsBorderWidth: docsBorderRightWidth, rulesBorderWidth: rulesBorderRightWidth } = await generateBorderWidth({
    placement: 'right',
  })

  const { docsBorderRadius, rulesBorderRadius } = await generateBorderRadius()
  const { docsBorderColors, rulesBorderColors } = await generateBorderColors()

  /**
   * EXPORT
   * ------------------------------------------------------------------------------------------
   */

  return utils.save(
    'border',
    utils.merge({
      docs: [
        docsBorderWidth,
        docsBorderTopWidth,
        docsBorderBottomWidth,
        docsBorderLeftWidth,
        docsBorderRightWidth,
        docsBorderRadius,
        docsBorderColors,
      ],
      rules: [
        rulesBorderWidth,
        rulesBorderTopWidth,
        rulesBorderBottomWidth,
        rulesBorderLeftWidth,
        rulesBorderRightWidth,
        rulesBorderRadius,
        rulesBorderColors,
      ],
      visualTest: [],
    }),
  )
}

async function generateBorderWidth({ placement = '' }) {
  const tokens = await utils.getTokens({ token: 'size.border.width' })
  const values = {
    [`border-${placement ? `${placement}-` : ''}none`]: 'none',
    ...utils.toProps({ tokens, prefix: `border-${placement ? `${placement}-` : ''}`, replace: 'border-width-' }),
  }
  const property = `border-${placement ? `${placement}-` : ''}width`
  const docsBorderWidth = utils.jsonClass({ property, values })
  const rulesBorderWidth = utils.styleClass({
    property,
    values,
    important: true,
    responsive: true,
    additionalValues: {
      'border-style': 'solid',
      'border-color': 'var(--bal-color-grey-3)',
    },
  })

  return {
    docsBorderWidth,
    rulesBorderWidth,
  }
}

async function generateBorderRadius() {
  const tokens = await utils.getTokens({ token: 'size.radius' })
  const values = utils.toProps({ tokens: tokens })
  const property = 'border-radius'

  const docsBorderRadius = utils.jsonClass({ property, values })
  const rulesBorderRadius = utils.styleClass({ property, values, important: true })

  return {
    docsBorderRadius,
    rulesBorderRadius,
  }
}

async function generateBorderColors() {
  const tokens = await utils.getTokens({ token: 'color.border' })
  const values = utils.toProps({ tokens: tokens, replace: 'color-' })
  const property = 'border-color'

  const docsBorderColors = utils.jsonClass({ property, values })
  const rulesBorderColors = utils.styleClass({
    property,
    values,
    important: true,
    states: true,
    additionalValues: {
      'border-width': 'var(--bal-border-width-normal)',
      'border-style': 'solid',
    },
  })

  return {
    docsBorderColors,
    rulesBorderColors,
  }
}
