# Validators

The library serve a collection of validator functions.

## Usage

The utilities are simple functions.

### Vue

For Vue we use the libary [VeeValidate](https://vee-validate.logaretm.com/v4/) togehter with the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html).

First install VeeValidate (Version >= 4.x.x).

```bash
npm add vee-validate
```

#### Define i18n validators

In this section we change the return type of our `BalValidators` into the the translated texts.
Pass your i18n translation function to the `useValidator` helper and then use the returned helper function `createValidator` to map the `BalValidators` with your translations.

```typescript
import { BalValidators } from '@baloise/ui-library'
import { useValidator, ValidatorFn } from '@baloise/ui-library-vue'
import { i18n } from '../../plugins/i18n.plugin'

const { createValidator } = useValidator(i18n.global.t)

export const isRequired = (): ValidatorFn => createValidator(BalValidators.isRequired(), 'validator.required')
```

#### Create form

First we define our template like this.

```html
<form @submit.prevent="submit">
  <BalField expanded :disabled="isFirstNameDisabled">
    <BalFieldLabel required>
      {{ $t('form.firstName.label') }}
    </BalFieldLabel>
    <BalFieldControl>
      <BalInput
        v-model="firstName"
        :name="firstNameName"
        :placeholder="$t('form.firstName.placeholder')"
        :disabled="isFirstNameDisabled"
      ></BalInput>
    </BalFieldControl>
    <BalFieldMessage color="danger" v-if="!isFirstNameDisabled">
      {{ firstNameErrorMessage }}
    </BalFieldMessage>
  </BalField>
</form>
```

Now we have to define the logic of our form with the help of VeeValidate.

:::tip
The helper function `validators` helps us to combine validators and to use the possibility to dynamically disable fields and their validation rules.
:::

```typescript
import { defineComponent, ref } from 'vue'
import { validators } from '@baloise/ui-library-vue'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { isMaxLength, isMinLength, isRequired } from '../helpers/validators'

export default defineComponent({
  name: 'Form',
  setup() {
    const { validate } = useForm()
    const isFormValid = useIsFormValid()
    const isFirstNameDisabled = ref(false)

    const {
      errorMessage: firstNameErrorMessage,
      value: firstName,
      name: firstNameName,
    } = useField('firstName', validators(isFirstNameDisabled, [ isRequired() ]))

    async function submit() {
      const { valid, errors } = await validate()
      ...
    }

    function disable() {
      isFirstNameDisabled.value = !isFirstNameDisabled.value
    }

    return {
      firstName, firstNameErrorMessage, firstNameName,
      isFirstNameDisabled, isFormValid,
      disable, submit,
    }
  },
})
```

### Angular

The validator functions are defined as [Angular Custom Validators](https://angular.io/guide/form-validation#defining-custom-validators).

```typescript
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { newDateString, now } from '@baloise/ui-library'
import { BalValidators } from '@baloise/ui-library-angular'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  form = new FormGroup({
    birthdate: new FormControl(newDateString(now()), [
      BalValidators.isRequired()
      BalValidators.isAfter(now()),
    ]),
  })
  ...
}

```

<!-- generated content -->

## API

### isCustom

`isCustom(validatorFn: BalValidatorFn) => BalValidatorFn`

Returns `true` if the value date is before the given date

```typescript
BalValidators.isCustom((value) => value > 2)(3) // true
```

### isBefore

`isBefore(date: Date | string) => BalValidatorFn`

Returns `true` if the value date is before the given date

```typescript
BalValidators.isBefore('2000-01-02')('2000-01-01') // true
BalValidators.isBefore(new Date(2020, 0, 2))(new Date(2020, 0, 1)) // true
```

### isAfter

`isAfter(date: Date | string) => BalValidatorFn`

Returns `true` if the value date is before the given date

```typescript
BalValidators.isAfter('2000-01-01')('2000-01-02') // true
BalValidators.isAfter(new Date(2020, 0, 1))(new Date(2020, 0, 2)) // true
```

### isDate

`isDate() => BalValidatorFn`

Returns `true` if the value is valid date

```typescript
BalValidators.isDate()('2000-01-02') // true
BalValidators.isDate()(new Date(2000, 0, 1)) // true
```

### isMin

`isMin(min: number) => BalValidatorFn`

Returns `true` if the number is bigger or equal than the min number

```typescript
BalValidators.isMin(10)(10) // true
BalValidators.isMin(10)(11) // true
BalValidators.isMin(10)(9) // false
```

### isMax

`isMax(max: number) => BalValidatorFn`

Returns `true` if the number is smaller or equal than the max number

```typescript
BalValidators.isMax(10)(10) // true
BalValidators.isMax(10)(9) // true
BalValidators.isMax(10)(11) // false
```

### isNumber

`isNumber() => BalValidatorFn`

Returns `true` if the number is valid

```typescript
BalValidators.isNumber()(10) // true
BalValidators.isNumber()('a') // false
```

### isMonetaryNumber

`isMonetaryNumber() => BalValidatorFn`

Returns `true` if the value is a valid formatted number

```typescript
BalValidators.isMonetaryNumber()(10) // true
BalValidators.isMonetaryNumber()(`1'000.99`) // true
BalValidators.isMonetaryNumber()(`a`) // false
```

### matchesRegex

`matchesRegex(regex: RegExp) => BalValidatorFn`

Returns `true` if the value matches the regex

```typescript
BalValidators.matchesRegex(new RegExp('^\\d+$'))('1') // true
```

### isEmail

`isEmail() => BalValidatorFn`

Returns `true` if the value matches the regex

```typescript
BalValidators.isEmail()('peter@baloise.ch') // true
```

### isPhone

`isPhone() => BalValidatorFn`

Returns `true` if the value matches the regex

```typescript
BalValidators.isPhone()('123 456 78 90') // true
```

### isRequired

`isRequired() => BalValidatorFn`

Returns `true` if the value is a non-empty value

```typescript
BalValidators.isRequired()('foo') // true
BalValidators.isRequired()('') // false
```

### isRequiredTrue

`isRequiredTrue() => BalValidatorFn`

Returns `true` if the value is true. This validator is commonly used for required checkboxes.

```typescript
BalValidators.isRequiredTrue()(true) // true
BalValidators.isRequiredTrue()('') // false
```

### isMinLength

`isMinLength(minLength: number) => BalValidatorFn`

Returns `true` if the string is bigger or equal than the min length

```typescript
BalValidators.isMinLength(3)('123') // true
BalValidators.isMinLength(3)('12') // false
```

### isMaxLength

`isMaxLength(maxLength: number) => BalValidatorFn`

Returns `true` if the string is smaller or equal than the max length

```typescript
BalValidators.isMaxLength(3)('123') // true
BalValidators.isMaxLength(3)('1234') // false
```
