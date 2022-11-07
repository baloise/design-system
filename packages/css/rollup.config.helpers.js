import config from '../../rollup.base'

export default Object.assign(
  config({
    input: 'src/helpers.ts',
    styleOutput: 'css/baloise-design-system-helpers.css',
    shouldClean: false,
  }),
)
