# Filters

Use filter function to transform any kind of data to display.

## Usage

The filter are simple functions which always return a string. Just import the function and use it to transform data in to readable strings.

```typescript
import { balCapitalize } from '@baloise/design-system-components'

balCapitalize('baloise')
// returns 'Baloise'
```

### Vue

In Vue 3 just import the filter function and use it in computed functions or return it to the template.

```vue
<template>
  <p>{{ capitalized }}</p>
</template>

<script>
import { balCapitalize } from '@baloise/design-system-components'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    capitalized() {
      return balCapitalize(this.title)
    },
  },
}
</script>
```

::: tip
Vue 3 has removed filters [Link](https://v3.vuejs.org/guide/migration/filters.html).
:::

### Angular

The filter functions are defined as [Angular Pipes](https://angular.io/guide/pipes).

```html
<span>{{ 'baloise' | balCapitalize }}</span>
```

The can be used in the component typescript file aswell.

```typescript
import { Component } from '@angular/core'
import { balCapitalize } from '@baloise/design-system-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  capitalize(value: string) {
    return balCapitalize(value)
  }
}
```

<!-- generated content -->

## API

### balBlobToUrl

`balBlobToUrl(value: Blob) => string`

Transforms the given blob parameter to object URL string.

For more information look up the documentation about [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

### balCapitalize

`balCapitalize(value: string | null | undefined) => string`

Transforms the given string parameter to capitalize string.

```typescript
balCapitalize('baloise') // Baloise
```

### balClaimNumber

`balClaimNumber(value: string | undefined | null | number) => string`

Transforms the given string into the correct claim-number format.

```typescript
balClaimNumber('73001217169') // 73/001217/16.9
```

### balCurrency

`balCurrency(value: number | null, currencySign: string, showZero: boolean, decimalLength: number) => string`

Formats the number into a human readable currency string.

```typescript
balCurrency(1234567.89) // 1'234'567.89
```

### balDefaultString

`balDefaultString(value: string | undefined | null, defaultString: string) => string`

If the value is empty it shows a dash ('-').

```typescript
balDefaultString('') // -\n
balDefaultString('text') // text
```

### balFileSize

`balFileSize(value: number) => string`

Transforms the filesize in human readable string.

```typescript
balFileSize(86956565) // 82.9 MB
```

### balHighlight

`balHighlight(value: string, search: string, cssClass: string) => string`

Transforms the given text into a highlighted html content.

```typescript
balHighlight('Some Text') // <span class="bal-highlight">Some Text</span>
```

### balJoinArray

`balJoinArray(value: string[] | undefined | null, delimiter: string) => string`

Transforms the given string array in to a string.

```typescript
balJoinArray(['Apple', 'Potato', 'Bacon']) // Apple, Potato, Bacon
```

### balLimit

`balLimit(value: string | undefined | null, limit: number) => string`

Limits the input string.

```typescript
balLimit('Some string that is ways to long to be rendered') // Some string that is ...
```

### balOfferNumber

`balOfferNumber(value: string | null | undefined, varianteNr: string) => string`

Transforms the input string into a offer number.

```typescript
balOfferNumber('987654321') // 98/7.654.321
```

### balPhoneNumber

`balPhoneNumber(value: string | PhoneNumber | null | undefined) => string`

Formats the given phone.

```typescript
balPhoneNumber('41,41564410808') // +41 56 441 08 08
balPhoneNumber({ countryCode: '41', phoneNumber: '564410808' }) // +41 56 441 08 08
```
