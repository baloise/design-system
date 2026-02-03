import { isArray } from 'lodash'
import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateBorder = async (options: BuildStylesExecutorSchema) => {
  const borders = await generateBorderByColor(options)
  const bordersTop = await generateBorderByColor(options, { placement: 'top' })
  const bordersRight = await generateBorderByColor(options, { placement: 'right' })
  const bordersBottom = await generateBorderByColor(options, { placement: 'bottom' })
  const bordersLeft = await generateBorderByColor(options, { placement: 'left' })

  const borderWidth = await utils.staticClassByToken({
    token: 'border.width',
    property: 'border-width',
    ...options,
  })

  const tokens = await utils.getTokens({ token: '🏷️ Semantic.🔵 Radius', ...options })
  const radius = await generateRadius(tokens)
  const radiusTop = await generateRadius(tokens, 'top', ['top-left', 'top-right'])
  const radiusTopLeft = await generateRadius(tokens, 'top-left', ['top-left'])
  const radiusTopRight = await generateRadius(tokens, 'top-right', ['top-right'])
  const radiusBottom = await generateRadius(tokens, 'bottom', ['bottom-left', 'bottom-right'])
  const radiusBottomLeft = await generateRadius(tokens, 'bottom-left', ['bottom-left'])
  const radiusBottomRight = await generateRadius(tokens, 'bottom-right', ['bottom-right'])

  return utils.save(
    'border',
    options.projectRoot,
    utils.merge({
      docs: [
        radius.docs,
        radiusTop.docs,
        radiusTopLeft.docs,
        radiusTopRight.docs,
        radiusBottom.docs,
        radiusBottomLeft.docs,
        radiusBottomRight.docs,
        borders.docs,
        bordersTop.docs,
        bordersRight.docs,
        bordersBottom.docs,
        bordersLeft.docs,
        borderWidth.docs,
      ],
      rules: [
        radius.rules,
        radiusTop.rules,
        radiusTopLeft.rules,
        radiusTopRight.rules,
        radiusBottom.rules,
        radiusBottomLeft.rules,
        radiusBottomRight.rules,
        borders.rules,
        bordersTop.rules,
        bordersRight.rules,
        bordersBottom.rules,
        bordersLeft.rules,
        borderWidth.rules,
      ],
      visualTest: [],
    }),
  )
}

async function generateRadius(tokens, name = undefined, positions: string[] = []) {
  const props = utils.toProps({
    tokens,
    prefix: name ? `radius-${name}` : 'radius',
    replace: 'radius',
  })

  let property: any = positions.map(position => `border-${position}-radius`) as any
  if (positions.length === 0) {
    property = 'border-radius'
  }

  const docs = utils.jsonClass({
    property: isArray(property) ? property.join(', ') : property,
    values: {
      ...props,
    },
  })

  const rules = utils.styleClass({
    property,
    values: {
      ...props,
    },
    important: true,
    responsive: false,
    states: false,
    breakpoints: utils.minBreakpoints,
  })

  return { docs, rules }
}

async function generateBorderByColor(options: BuildStylesExecutorSchema, { placement = '' } = {}) {
  const tokens = await utils.getTokens({ token: '🏷️ Semantic.▭ Border.Color', ...options })
  const formattedPlacement = placement ? `-${placement}` : ''
  const values = {
    ...utils.toProps({
      tokens: tokens,
      replace: 'border-color-',
      replace2: 'border-color',
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
