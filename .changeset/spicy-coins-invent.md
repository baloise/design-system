---
'@baloise/design-system-components': minor
---

We introduced a new way of adding a options to the bal-radio-group and bal-checkbox-group 
by introducing the `options` property in which options can be passed using a Javascript.

**bal-radio-group**

```html
<bal-radio-group [options]="options"></bal-radio-group>
```

Label can be also passed by function using attribute `html`, which is type string or a function.

```typescript
import { newBalRadioOption } from '@baloise/design-system-components'

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
})
export class ExampleComponent {
  options = [
    newBalRadioOption({ name: 'radio-example', label: 'Label 1', value: '1' }),
    newBalRadioOption({ name: 'radio-example', html: () => 'Dynamic Label 2', value: '2' }),
  ]
}
```

**bal-checkbox-group**

To use the `bal-checkbox-group` with options we also need to set `control` attribute to true.

```html
<bal-checkbox-group control [options]="options"></bal-checkbox-group>
```

Label can be also passed by function using attribute `html`, which is type string or a function.

```typescript
import { newBalCheckboxOption } from '@baloise/design-system-components'

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
})
export class ExampleComponent {
  options = [
    newBalCheckboxOption({ value: '1', label: 'Label 1' }),
    newBalCheckboxOption({ value: '2', html: () => 'Dynamic Label 2' }),
  ]
}
```
