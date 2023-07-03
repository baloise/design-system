## Usage

By default the icons are not loaded by the Design System. To import the icons we support two ways.

- Pass the raw SVG content directly to the `bal-icon` component (recommended)
- During the initialization of the Design System

### Import into the component

When importing an SVG into your component you decrease the initial page load. So you use the SVG only where
you needed and at the time you wanted.

First import the bal-icon module and the SVG icon.
Then use it directly with the `bal-icon` component inside your app component.

```js
import { balIconAccount } from '@baloise/design-system-icons'

document.getElementById('my-icon').svg = balIconAccount
```

### Import during initialization

Import the icons form the `@baloise/design-system-icons` package and pass them with
the BalConfig during the initialization.

```typescript
import { initializeBaloiseDesignSystem } from '@baloise/design-system-components'
import { balIconAccount } from '@baloise/design-system-icons'

initializeBaloiseDesignSystem({
  icons: { balIconAccount },
})
```

Then the icon can be found with the name prop of the component. Just remove the prefix `balIcon` and start with a small letter.

```HTML
<bal-icon name="account"></bal-icon>
<bal-icon name="plus"></bal-icon>
```

> **TIP** If you want to use the icons directly without any builder use the ES module file and the script type module.
>
> ```
> <script type="module">
>     import { balIconAccount } from 'https://cdn.jsdelivr.net/npm/@baloise/design-system-icons/dist/index.esm.js'
>
>     console.log('balIconAccount', balIconAccount)
> </script>
> ```
