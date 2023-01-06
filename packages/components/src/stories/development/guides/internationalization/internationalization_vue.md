## Initialize

Simply pass the default config value through the plugin.

```typescript
import './main.scss'
import { BaloiseDesignSystem } from '@baloise/design-system-components-vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(BaloiseDesignSystem, {
    defaults: {
      region: 'LU',
      language: 'fr',
      allowedLanguages: ['de', 'fr', 'it', 'en'],
    },
  })
  .mount('#app')
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