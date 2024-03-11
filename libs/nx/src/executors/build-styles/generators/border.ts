import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateBorder = async (options: BuildStylesExecutorSchema) => {
  const borders = await generateBorderByColor(options)
  const bordersTop = await generateBorderByColor(options, { placement: 'top' })
  const bordersRight = await generateBorderByColor(options, { placement: 'right' })
  const bordersBottom = await generateBorderByColor(options, { placement: 'bottom' })
  const bordersLeft = await generateBorderByColor(options, { placement: 'left' })

  const borderNone = await utils.staticClass({ property: 'border-width', values: { 'border-none': '0' } })
  const borderWidth = await utils.staticClassByToken({
    token: 'size.border.width',
    property: 'border-width',
    ...options,
  })

  const borderNoneTop = await utils.staticClass({ property: 'border-top-width', values: { 'border-top-none': '0' } })
  const borderNoneRight = await utils.staticClass({
    property: 'border-right-width',
    values: { 'border-right-none': '0' },
  })
  const borderNoneBottom = await utils.staticClass({
    property: 'border-bottom-width',
    values: { 'border-bottom-none': '0' },
  })
  const borderNoneLeft = await utils.staticClass({ property: 'border-left-width', values: { 'border-left-none': '0' } })

  const borderRadius = await utils.staticClassByToken({
    token: 'size.radius',
    property: 'border-radius',
    values: {
      ['radius-none']: '0',
    },
    ...options,
  })

  const borderRadiusTop = await utils.staticClassByToken({
    token: 'size.radius',
    property: ['border-top-left-radius', 'border-top-right-radius'],
    replace: 'radius',
    prefix: 'radius-top',
    values: {
      ['radius-top-none']: '0',
    },
    ...options,
  })
  const borderRadiusLeft = await utils.staticClassByToken({
    token: 'size.radius',
    property: ['border-top-left-radius', 'border-bottom-left-radius'],
    replace: 'radius',
    prefix: 'radius-left',
    values: {
      ['radius-left-none']: '0',
    },
    ...options,
  })
  const borderRadiusRight = await utils.staticClassByToken({
    token: 'size.radius',
    property: ['border-top-right-radius', 'border-bottom-right-radius'],
    replace: 'radius',
    prefix: 'radius-right',
    values: {
      ['radius-right-none']: '0',
    },
    ...options,
  })
  const borderRadiusBottom = await utils.staticClassByToken({
    token: 'size.radius',
    property: ['border-bottom-left-radius', 'border-bottom-right-radius'],
    replace: 'radius',
    prefix: 'radius-bottom',
    values: {
      ['radius-bottom-none']: '0',
    },
    ...options,
  })

  return utils.save(
    'border',
    options.projectRoot,
    utils.merge({
      docs: [
        borderNone.docs,
        borderNoneTop.docs,
        borderNoneRight.docs,
        borderNoneBottom.docs,
        borderNoneLeft.docs,
        borders.docs,
        bordersTop.docs,
        bordersRight.docs,
        bordersBottom.docs,
        bordersLeft.docs,
        borderWidth.docs,
        borderRadius.docs,
        borderRadiusTop.docs,
        borderRadiusLeft.docs,
        borderRadiusRight.docs,
        borderRadiusBottom.docs,
      ],
      rules: [
        borders.rules,
        bordersTop.rules,
        bordersRight.rules,
        bordersBottom.rules,
        bordersLeft.rules,
        borderWidth.rules,
        borderRadius.rules,
        borderRadiusTop.rules,
        borderRadiusLeft.rules,
        borderRadiusRight.rules,
        borderRadiusBottom.rules,
        borderNone.rules,
        borderNoneTop.rules,
        borderNoneRight.rules,
        borderNoneBottom.rules,
        borderNoneLeft.rules,
      ],
      visualTest: [],
    }),
  )
}

async function generateBorderByColor(options: BuildStylesExecutorSchema, { placement = '' } = {}) {
  const tokens = await utils.getTokens({ token: 'color.border', ...options })
  const formattedPlacement = placement ? `-${placement}` : ''
  const values = {
    [`border${formattedPlacement}`]: 'var(--bal-color-grey-3)',
    ...utils.toProps({
      tokens: tokens,
      replace: 'color-border-',
      replace2: 'color-border',
      prefix: `border${formattedPlacement}`,
    }),
  }
  const property = `border${formattedPlacement}-color`
  const docs = utils.jsonClass({ property, values })
  const rules = utils.styleClass({
    property,
    values,
    important: true,
    states: true,
    additionalValues: {
      [`border${formattedPlacement}-width`]: 'var(--bal-border-width-normal) !important',
      [`border${formattedPlacement}-style`]: 'solid',
    },
  })
  return { docs, rules }
}
