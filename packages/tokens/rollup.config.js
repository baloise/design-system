import config from '../../rollup.base'

export default Object.assign(
  config({
    target: '.tmp/',
    declarationDir: '.tmp/types',
    cleanTargets: ['dist/', '.tmp/'],
  }),
)
