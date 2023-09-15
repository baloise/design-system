const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Typography CSS Utils')

  const fontFamilyProps = {
    'font-title': 'var(--bal-font-family-title)',
    'font-text': 'var(--bal-font-family-text)',
  }

  const textAlignProps = {
    'text-center': 'center',
    'text-justify': 'justify',
    'text-left': 'left',
    'text-right': 'right',
    'text-start': 'start',
    'text-end': 'end',
    'text-centered': 'center', // legacy
    'text-justified': 'justify', // legacy
  }

  const textDecorationProps = {
    'underline': 'underline',
    'line-through': 'line-through',
    'no-underline': 'none',
  }

  const textTransformProps = {
    lowercase: 'lowercase',
    uppercase: 'uppercase',
    capitalize: 'capitalize',
    capitalized: 'capitalize', // legacy
  }

  const textOverflowProps = {
    'text-overflow-clip': 'clip',
    'text-overflow-ellipsis': 'ellipsis',
  }

  const fontWeightProps = {
    'font-light': 'var(--bal-weight-light)',
    'font-regular': 'var(--bal-weight-regular)',
    'font-bold': 'var(--bal-weight-bold)',
  }

  const whiteSpaceProps = {
    'white-space-normal': 'normal',
    'white-space-nowrap': 'nowrap',
    'no-wrap': 'nowrap', // legacy
  }

  const verticalAlignProps = {
    'vertical-align-baseline': 'baseline',
    'vertical-align-top': 'top',
    'vertical-align-middle': 'middle',
    'vertical-align-bottom': 'bottom',
    'vertical-align-text-top': 'text-top',
    'vertical-align-text-bottom': 'text-bottom',
    'vertical-align-sub': 'sub',
    'vertical-align-super': 'super',
  }

  const listStyle = {
    'list-none': 'none',
    'list-disc': 'disc',
    'list-decimal': 'decimal',
  }

  return [
    utils.styleClass('', 'font-family', fontFamilyProps, true, false, false).toString(),
    utils.styleClass('has', 'text-align', textAlignProps, true, true, false, utils.allBreakpoints).toString(),
    utils.styleClass('', 'text-decoration', textDecorationProps, true, false, true).toString(),
    utils.styleClass('is', 'text-transform', textTransformProps, true, false, false).toString(),
    utils.styleClass('', 'text-overflow', textOverflowProps, true, true, false).toString(),
    utils.styleClass('', 'font-weight', fontWeightProps, true, true, false).toString(),
    utils.styleClass('has', 'white-space', whiteSpaceProps, true, false, false).toString(),
    utils.styleClass('is', 'vertical-align', verticalAlignProps, true, true, false).toString(),
    utils.styleClass('', 'list-style', listStyle, true, false, false).toString(),
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
