import * as utils from './utils.mjs'

export const generateFlex = async () => {
  const valuesAlignContent = {
    'align-content-start': 'flex-start',
    'align-content-end': 'flex-end',
    'align-content-center': 'center',
    'align-content-space-between': 'space-between',
    'align-content-space-around': 'space-around',
    'align-content-space-evenly': 'space-evenly',
  }
  const docsAlignContent = utils.jsonClass({ property: 'align-content', values: valuesAlignContent })
  const rulesAlignContent = utils.styleClass({
    property: 'align-content',
    values: valuesAlignContent,
    important: true,
    responsive: true,
  })

  const valuesJustifyContent = {
    'justify-content-start': 'flex-start',
    'justify-content-end': 'flex-end',
    'justify-content-center': 'center',
    'justify-content-space-between': 'space-between',
    'justify-content-space-around': 'space-around',
    'justify-content-space-evenly': 'space-evenly',
  }
  const docsJustifyContent = utils.jsonClass({ property: 'justify-content', values: valuesJustifyContent })
  const rulesJustifyContent = utils.styleClass({
    property: 'justify-content',
    values: valuesJustifyContent,
    important: true,
    responsive: true,
  })

  const valuesAlignItems = {
    'align-items-start': 'flex-start',
    'align-items-end': 'flex-end',
    'align-items-center': 'center',
    'align-items-stretch': 'stretch',
    'align-items-baseline': 'baseline',
  }
  const docsAlignItems = utils.jsonClass({ property: 'align-items', values: valuesAlignItems })
  const rulesAlignItems = utils.styleClass({
    property: 'align-items',
    values: valuesAlignItems,
    important: true,
    responsive: true,
  })

  const valuesAlignSelf = {
    'align-self-start': 'flex-start',
    'align-self-end': 'flex-end',
    'align-self-center': 'center',
    'align-self-stretch': 'stretch',
    'align-self-baseline': 'baseline',
  }
  const docsAlignSelf = utils.jsonClass({ property: 'align-self', values: valuesAlignSelf })
  const rulesAlignSelf = utils.styleClass({
    property: 'align-self',
    values: valuesAlignSelf,
    important: true,
    responsive: true,
  })

  const valuesFlexDirection = {
    'flex-direction-row': 'row',
    'flex-direction-row-reverse': 'row-reverse',
    'flex-direction-column': 'column',
    'flex-direction-column-reverse': 'column-reverse',
  }
  const docsFlexDirection = utils.jsonClass({ property: 'flex-direction', values: valuesFlexDirection })
  const rulesFlexDirection = utils.styleClass({
    property: 'flex-direction',
    values: valuesFlexDirection,
    important: true,
    responsive: true,
  })

  const valuesFlex = {
    'flex-1': '1 1 0%',
    'flex-auto': '1 1 auto',
    'flex-initial': '0 1 auto',
    'flex-none': 'none',
  }
  const docsFlex = utils.jsonClass({ property: 'flex', values: valuesFlex })
  const rulesFlex = utils.styleClass({
    property: 'flex',
    values: valuesFlex,
    important: true,
    responsive: true,
  })

  const valuesFlexWrap = {
    'flex-nowrap': 'nowrap',
    'flex-wrap': 'wrap',
    'flex-wrap-reverse': 'wrap-reverse',
  }
  const docsFlexWrap = utils.jsonClass({ property: 'flex', values: valuesFlexWrap })
  const rulesFlexWrap = utils.styleClass({
    property: 'flex-wrap',
    values: valuesFlexWrap,
    important: true,
    responsive: true,
  })

  const tokens = await utils.getTokens({ token: 'size.space' })
  const keys = utils.filterTokenKeys({ tokens, ignore: ['tablet', 'desktop', 'none'] })
  const valuesGap = {
    'gap-none': 'none',
    'gap-auto': 'auto',
  }
  const valuesRowGap = {
    'row-gap-none': 'none',
    'row-gap-auto': 'auto',
  }
  const valuesColumnGap = {
    'column-gap-none': 'none',
    'column-gap-auto': 'auto',
  }
  for (const index in keys) {
    const key = keys[index]
    valuesGap[`gap-${key}`] = `var(--bal-space-${key})`
    valuesRowGap[`row-gap-${key}`] = `var(--bal-space-${key})`
    valuesColumnGap[`column-gap-${key}`] = `var(--bal-space-${key})`
  }
  const rulesFlexGap = utils.styleClass({ property: 'gap', values: valuesGap, important: true })
  const rulesFlexGapRow = utils.styleClass({ property: 'row-gap', values: valuesRowGap, important: true })
  const rulesFlexGapColumn = utils.styleClass({ property: 'column-gap', values: valuesColumnGap, important: true })

  const valuesGapTablet = {}
  const valuesRowGapTablet = {}
  const valuesColumnGapTablet = {}
  for (const index in keys) {
    const key = keys[index]
    valuesGapTablet[`gap-${key}`] = `var(--bal-space-tablet-${key})`
    valuesRowGapTablet[`row-gap-${key}`] = `var(--bal-space-tablet-${key})`
    valuesColumnGapTablet[`column-gap-${key}`] = `var(--bal-space-tablet-${key})`
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
    valuesGapDesktop[`gap-${key}`] = `var(--bal-space-desktop-${key})`
    valuesRowGapDesktop[`row-gap-${key}`] = `var(--bal-space-desktop-${key})`
    valuesColumnGapDesktop[`column-gap-${key}`] = `var(--bal-space-desktop-${key})`
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
    utils.merge({
      docs: [
        docsAlignContent,
        docsAlignItems,
        docsAlignSelf,
        docsFlexDirection,
        docsFlex,
        docsJustifyContent,
        docsFlexWrap,
      ],
      rules: [
        rulesAlignContent,
        rulesAlignItems,
        rulesAlignSelf,
        rulesFlexDirection,
        rulesFlex,
        rulesJustifyContent,
        rulesFlexWrap,
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
