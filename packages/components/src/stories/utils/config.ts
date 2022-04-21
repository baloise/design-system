import { initialize } from '../../../dist'

export const configDefaultArgs = {
  region: 'CH',
  language: 'de',
}

export const configArgTypes = {
  region: {
    description: 'Region of the running app.',
    table: {
      category: 'global',
      defaultValue: { summary: 'CH' },
    },
    options: ['CH', 'BE', 'DE', 'LU'],
    control: {
      type: 'inline-radio',
    },
  },
  language: {
    description: 'Language of the running app.',
    table: {
      category: 'global',
      defaultValue: { summary: 'de' },
    },
    options: ['de', 'fr', 'en', 'it', 'nl'],
    control: {
      type: 'inline-radio',
    },
  },
}

export const setConfig = (args: any) => {
  initialize({
    region: args.region,
    language: args.language,
  })
}

export const reduceConfigArgs = (args: any) =>
  Object.keys(args)
    .filter(key => !['region', 'language'].includes(key))
    .reduce((obj, key) => {
      obj[key] = args[key]
      return obj
    }, {})
