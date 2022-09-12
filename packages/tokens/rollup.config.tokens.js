import config from '../../rollup.base'

export default Object.assign(
  config({
    input: 'src/tokens.ts',
    cleanTargets: [],
  }),
)
