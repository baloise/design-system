import { BuildStylesExecutorSchema } from '../schema'
import * as utils from './utils'

export const generateFlex = async (options: BuildStylesExecutorSchema) => {
  const alignContent = utils.staticClass({
    property: 'align-content',
    values: {
      'align-content-start': 'flex-start',
      'align-content-end': 'flex-end',
      'align-content-center': 'center',
      'align-content-baseline': 'baseline',
      'align-content-space-between': 'space-between',
      'align-content-space-around': 'space-around',
      'align-content-space-evenly': 'space-evenly',
    },
  })

  const justifyContent = utils.staticClass({
    property: 'justify-content',
    values: {
      'justify-content-start': 'flex-start',
      'justify-content-end': 'flex-end',
      'justify-content-center': 'center',
      'justify-content-space-between': 'space-between',
      'justify-content-space-around': 'space-around',
      'justify-content-space-evenly': 'space-evenly',
    },
  })

  const alignItems = utils.staticClass({
    property: 'align-items',
    values: {
      'align-items-start': 'flex-start',
      'align-items-end': 'flex-end',
      'align-items-center': 'center',
      'align-items-stretch': 'stretch',
      'align-items-baseline': 'baseline',
    },
  })

  const alignSelf = utils.staticClass({
    property: 'align-self',
    values: {
      'align-self-start': 'flex-start',
      'align-self-end': 'flex-end',
      'align-self-center': 'center',
      'align-self-stretch': 'stretch',
      'align-self-baseline': 'baseline',
    },
  })

  const flexDirection = utils.staticClass({
    property: 'flex-direction',
    values: {
      'flex-direction-row': 'row',
      'flex-direction-row-reverse': 'row-reverse',
      'flex-direction-column': 'column',
      'flex-direction-column-reverse': 'column-reverse',
    },
  })

  const flex = utils.staticClass({
    property: 'flex',
    values: {
      'flex-1': '1 1 0%',
      'flex-auto': '1 1 auto',
      'flex-initial': '0 1 auto',
      'flex-none': 'none',
    },
  })

  const flexWrap = utils.staticClass({
    property: 'flex-wrap',
    values: {
      'flex-nowrap': 'nowrap',
      'flex-wrap': 'wrap',
      'flex-wrap-reverse': 'wrap-reverse',
    },
  })

  const tokens = await utils.getTokens({ token: 'size.space', ...options })
  const keys = utils.filterTokenKeys({ tokens, ignore: ['tablet', 'desktop', 'none'] })
  const valuesGap = {
    'gap-none': '0',
    'gap-auto': 'auto',
  }
  const valuesRowGap = {
    'row-gap-none': '0',
    'row-gap-auto': 'auto',
  }
  const valuesColumnGap = {
    'column-gap-none': '0',
    'column-gap-auto': 'auto',
  }
  for (const index in keys) {
    const key = keys[index]
    valuesGap[`gap-${key}`] = `var(--bal-space-${key})`
    valuesRowGap[`row-gap-${key}`] = `var(--bal-space-${key})`
    valuesColumnGap[`column-gap-${key}`] = `var(--bal-space-${key})`
  }
  const rulesFlexGap = utils.styleClass({ property: 'gap', values: valuesGap, important: true })
  const rulesFlexGapDocs = utils.jsonClass({ property: 'gap', values: valuesGap })
  const rulesFlexGapRow = utils.styleClass({ property: 'row-gap', values: valuesRowGap, important: true })
  const rulesFlexGapColumn = utils.styleClass({ property: 'column-gap', values: valuesColumnGap, important: true })

  const valuesGapTablet = {}
  const valuesRowGapTablet = {}
  const valuesColumnGapTablet = {}
  for (const index in keys) {
    const key = keys[index]
    valuesGapTablet[`gap-${key}`] = `var(--bal-space-${key}-tablet)`
    valuesRowGapTablet[`row-gap-${key}`] = `var(--bal-space-${key}-tablet)`
    valuesColumnGapTablet[`column-gap-${key}`] = `var(--bal-space-${key}-tablet)`
  }
  const rulesFlexGapTablet = utils.styleClass({
    property: 'gap',
    values: valuesGapTablet,
    important: true,
    breakpoint: 'tablet',
  })
  const rulesFlexGapRowTablet = utils.styleClass({
    property: 'row-gap',
    values: valuesRowGapTablet,
    important: true,
    breakpoint: 'tablet',
  })
  const rulesFlexGapColumnTablet = utils.styleClass({
    property: 'column-gap',
    values: valuesColumnGapTablet,
    important: true,
    breakpoint: 'tablet',
  })

  const valuesGapDesktop = {}
  const valuesRowGapDesktop = {}
  const valuesColumnGapDesktop = {}
  for (const index in keys) {
    const key = keys[index]
    valuesGapDesktop[`gap-${key}`] = `var(--bal-space-${key}-desktop)`
    valuesRowGapDesktop[`row-gap-${key}`] = `var(--bal-space-${key}-desktop)`
    valuesColumnGapDesktop[`column-gap-${key}`] = `var(--bal-space-${key}-desktop)`
  }
  const rulesFlexGapDesktop = utils.styleClass({
    property: 'gap',
    values: valuesGapDesktop,
    important: true,
    breakpoint: 'desktop',
  })
  const rulesFlexGapRowDesktop = utils.styleClass({
    property: 'row-gap',
    values: valuesRowGapDesktop,
    important: true,
    breakpoint: 'desktop',
  })
  const rulesFlexGapColumnDesktop = utils.styleClass({
    property: 'column-gap',
    values: valuesColumnGapDesktop,
    important: true,
    breakpoint: 'desktop',
  })

  return utils.save(
    'flex',
    options.projectRoot,
    utils.merge({
      docs: [
        alignContent.docs,
        alignItems.docs,
        alignSelf.docs,
        flexDirection.docs,
        flex.docs,
        justifyContent.docs,
        flexWrap.docs,
        rulesFlexGapDocs,
      ],
      rules: [
        alignContent.rules,
        alignItems.rules,
        alignSelf.rules,
        flexDirection.rules,
        flex.rules,
        justifyContent.rules,
        flexWrap.rules,
        rulesFlexGap,
        rulesFlexGapRow,
        rulesFlexGapColumn,
        rulesFlexGapTablet,
        rulesFlexGapRowTablet,
        rulesFlexGapColumnTablet,
        rulesFlexGapDesktop,
        rulesFlexGapRowDesktop,
        rulesFlexGapColumnDesktop,
      ],
    }),
  )
}
