# Migration from 1.x to 2.x

The following workflow walks through the steps of migrating from version 1.x to 2.x.
Note that the actual steps required for your project may vary, and these steps should be treated as general guidance rather than strict instructions.

## Preparations

Did you use utility functions like?

- `utlis`
- `filters/pipes`
- `validations`

If **No** than you can easly migrate to the new version, but if **Yes** than go to the installation guide.

Those utility function have been moved to [baloise/web-app-utils repo](https://github.com/baloise/web-app-utils). With the goal to have all utility functions at one place and to reduce the complexity of the Design System.

## Installation

Fist we need to install the missing util packages there for follow the installation guide of the [baloise/web-app-utils documentation](https://github.com/baloise/web-app-utils).

After the installation update the Design System to 2.x version and replace the import statments, which still use utility functions from the `@baloise/design-system-components` package.

### Example Utils

```typescript
// - old
import { year, month, isoString } from '@baloise/design-system-components'

// + new
import { year, month, isoString } from '@baloise/web-app-utils'


const selectorDayBox = (date: Date) => `[data-date="${isoString(date)}"]`
...
```

### Example Validators

```typescript
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

// - old
import { BalValidators } from '@baloise/design-system-components-angular'

// + new
import { BalValidators } from '@baloise/web-app-validators-angular'

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  form = new FormGroup({
    email: new FormControl(null, [BalValidators.isRequired(), BalValidators.isMinLength(4), BalValidators.isEmail()]),
  })
}
...
```
