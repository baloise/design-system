## Initialize

Import the **useBaloiseDesignSystem** function and pass the default values of the config.

```typescript
import { useBaloiseDesignSystem } from '@baloise/design-system-components-react'

useBaloiseDesignSystem({
  defaults: {
    region: 'BE',
    language: 'fr',
    allowedLanguages: ['de', 'fr', 'it', 'en'],
  },
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