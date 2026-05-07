import { noRelativeImports } from './rules/no-relative-imports'
import { propReadonly } from './rules/prop-readonly'
import { propTypeAnnotation } from './rules/prop-type-annotation'
import { listenNaming } from './rules/listen-naming'
import { watchNaming } from './rules/watch-naming'
import { handlerNaming } from './rules/handler-naming'
import { eventPrefix } from './rules/event-prefix'
import { methodAsync } from './rules/method-async'
import { methodPrivate } from './rules/method-private'
import { componentTagPrefix } from './rules/component-tag-prefix'

const plugin = {
  rules: {
    'no-relative-imports': noRelativeImports,
    'prop-readonly': propReadonly,
    'prop-type-annotation': propTypeAnnotation,
    'listen-naming': listenNaming,
    'watch-naming': watchNaming,
    'handler-naming': handlerNaming,
    'event-prefix': eventPrefix,
    'method-async': methodAsync,
    'method-private': methodPrivate,
    'component-tag-prefix': componentTagPrefix,
  },
  configs: {} as Record<string, unknown>,
}

plugin.configs['recommended'] = {
  plugins: ['@baloise/ds'],
  rules: {
    '@baloise/ds/no-relative-imports': 'error',
    '@baloise/ds/prop-readonly': 'error',
    '@baloise/ds/prop-type-annotation': 'error',
    '@baloise/ds/listen-naming': 'error',
    '@baloise/ds/watch-naming': 'error',
    '@baloise/ds/handler-naming': 'warn',
    '@baloise/ds/event-prefix': 'error',
    '@baloise/ds/method-async': 'error',
    '@baloise/ds/method-private': 'warn',
    '@baloise/ds/component-tag-prefix': 'error',
  },
}

export = plugin
