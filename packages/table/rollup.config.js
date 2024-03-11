import config from '../../rollup.base'

export default Object.assign(
  config({
    cleanTargets: ['/dist', '/css'],
    styleOutput: 'css/design-system-table.css',
  }),
)
