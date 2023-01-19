## Usage

By default the icons are not loaded by the Design System. To import the icons we support two ways.

- Pass the raw SVG content directly to the `bal-icon` component (recommended)
- During the initialization of the Design System

### Import into the component

When importing an SVG into your component you decrease the initial page load. So you use the SVG only where
you needed and at the time you wanted.

First import the bal-icon module and the SVG icon.
Then use it directly with the `bal-icon` component inside your app component.

```vue
<script lang="ts" setup>
import { BalIcon } from '@baloise/design-system-components-vue'
import { balIconAccount } from '@baloise/design-system-icons'
</script>

<template>
  <BalIcon :svg="balIconAccount"></BalIcon>
</template>
```

### Import during initialization

Import the icons form the `@baloise/design-system-icons` package and pass them with
the BalConfig during the initialization.

```typescript
import { balIconAccount } from '@baloise/design-system-icons'

createApp(App)
  .use(
    createBaloiseDesignSystem({
      defaults: {
        icons: { balIconAccount },
      },
    }),
  )
  .mount('#app')
```

Then the icon can be found with the name prop of the component. Just remove the prefix `balIcon` and start with a small letter.

```HTML
<bal-icon name="account"></bal-icon> <bal-icon name="plus"></bal-icon>
```
