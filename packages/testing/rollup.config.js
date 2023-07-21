import config from '../../rollup.base'

export default Object.assign(
  config({
    input: {
      'index': 'src/index.ts',
      'selectors': 'src/selectors.ts',
      'custom-commands': 'src/custom-commands.ts',
      'override-commands': 'src/override-commands.ts',
    },
  }),
)
