## Initialize

The initialize of the Design System config defines the default values.

This example below is for HTML5 applications.
However, for Angular, Vue or React there are usage examples below.

```typescript
import { initialize } from '@baloise/design-system-components'

initialize({
  region: 'CH',
  language: 'de',
  allowedLanguages: ['de', 'fr', 'it', 'en'],
})
```

## Change on runtime

To change the language or region during run time use the two functions `updateBalLanguage` and `updateBalRegion`.

```typescript
import { updateBalAllowedLanguages, updateBalLanguage, updateBalRegion } from '@baloise/design-system-components'

updateBalLanguage('de')
updateBalRegion('CH')
updateBalAllowedLanguages(['fr', 'it'])
```

The config can be accessed with `useConfig`.

```typescript
import { useConfig } from '@baloise/design-system-components'

const config = useConfig()
config.language = 'de'
config.region = 'CH'
config.allowedLanguages = ['de', 'fr', 'it', 'en']
```

Both variants have the same effect.

## Subscribe for changes

To subscribe to changes of the region or language during runtime you can register your callback function using `onBalConfigChange`.

```typescript
import { onBalConfigChange, BalConfigState } from '@baloise/design-system-components'

onBalConfigChange((config: BalConfigState) => {
  // do something with the updated config here
})
```