## Vue integration

> Use the package `@baloise/web-app-form-vue`

Delivers utility components to create forms that follow the guides of the Baloise Design System.
Moreover it extends the useField function to work as smooth as possible with the Baloise Design System and defines Baloise specific yup schema validations.

### Installation

For Vue we use the library [VeeValidate](https://vee-validate.logaretm.com/v4/) together with the [Yup Schema Validation](https://github.com/jquense/yup).

```bash
npm install @baloise/web-app-form-vue vee-validate@next yup vue-i18n
```

```typescript
import { baloiseForm } from '@baloise/web-app-form-vue'
import App from './App.vue'

// the error message of the form fields are directly translated
// with the vue-i18n library
export const i18n = createI18n({
  ...
})

createApp(App).use(baloiseForm, { i18n }).mount('#app')
```

### Define Form Schema

Based on the domain model create a form schema with the tool [Yup Schema Validation](https://github.com/jquense/yup).

```typescript
import { object, string, SchemaOf } from 'yup'

export type Pokemon = {
  name: string
  frontImage?: string
  backImage?: string
}

export function usePokemonSchema(): SchemaOf<Pokemon> {
  return object({
    name: string().defined().required(),
    frontImage: string(),
    backImage: string(),
  })
}
```

### Define Form Field

Instead of using the `useField` from **Vee-Validate** use the wrapper `useBalField`.
This extends the **Vee-Validate** implementation with the property invalid and
message from the yup schema validations.

- [Vee-Validate useField API](https://vee-validate.logaretm.com/v4/api/use-field)

```vue
<script setup lang="ts">
...
import { useForm, handleSubmit } from 'vee-validate'
import { useBalField } from '@baloise/web-app-form-vue'

const { handleSubmit, isSubmitting } = useForm<Pokemon>({
  // the computed is used to have the schema dynamic and
  // can be altered during runtime.
  validationSchema: computed(() => usePokemonSchema()),
})

// onSubmit will be called when the from schema is valid
const onSubmit = handleSubmit((values) => /* Use the values to submit it to an api */)

const { value } = useField<string>('name')
const { invalid, message } = useBalField('name')
</script>

<template>
  <form novalidate @submit="onSubmit">
    <BalFormGrid>
      <BalFormCol>
        <BalField :invalid="invalid">
          <BalFieldLabel :required="true">My name label</BalFieldLabel>
          <BalFieldControl>
            <BalInput v-model="value" />
          </BalFieldControl>
          <BalFieldMessage>
            {{ message }}
          </BalFieldMessage>
        </BalField>
      </BalFormCol>
    </BalFormGrid>
  </from>
</template>
```

For Vue we use the library [VeeValidate](https://vee-validate.logaretm.com/v4/) together with the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html).

First install VeeValidate (Version >= 4.x.x).

```bash
npm add vee-validate@next
```

First we need to install the validators package.
More documentation is [here](https://github.com/baloise/web-app-utils/blob/master/packages/validators/README.md)

```bash
npm install @baloise/web-app-validators-vue
```

#### Define i18n validators

In this section we change the return type of our `BalValidators` into the the translated texts.
Pass your i18n translation function to the `useValidator` helper and then use the returned helper function `createValidator` to map the `BalValidators` with your translations.

```typescript
import { BalValidators, useValidator, ValidatorFn } from '@baloise/web-app-validators-vue'
import { i18n } from '../../plugins/i18n.plugin'

export { rules } from '@baloise/web-app-validators-vue'

const { createValidator } = useValidator(i18n.global.t)

export const isRequired = (): ValidatorFn => createValidator(BalValidators.isRequired(), 'validator.required')
```

#### Create form

First we define our template like this.

```html
<form @submit.prevent="submit">
  <BalField :disabled="isFirstNameDisabled">
    <BalFieldLabel required> {{ $t('form.firstName.label') }} </BalFieldLabel>
    <BalFieldControl>
      <BalInput
        v-model="firstName"
        :name="firstNameName"
        :placeholder="$t('form.firstName.placeholder')"
        :disabled="isFirstNameDisabled"
      ></BalInput>
    </BalFieldControl>
    <BalFieldMessage color="danger" v-if="!isFirstNameDisabled"> {{ firstNameErrorMessage }} </BalFieldMessage>
  </BalField>
</form>
```

Now we have to define the logic of our form with the help of VeeValidate.

```typescript
import { ref } from 'vue'
import { BalField, BalFieldLabel, BalFieldControl, BalFieldMessage, BalInput } from '@baloise/design-system-components-vue'
import { rules } from '@baloise/web-app-validators-vue'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { isRequired } from '../helpers/validators'

const { validate } = useForm()
const isFormValid = useIsFormValid()

const isFirstNameDisabled = ref(false)
const {
  firstname: value,
  firstNameName: name,
  firstnameErrorMessage: errorMessage,
} = useField('firstname', rules(isFirstNameDisabled, [
  isRequired(),
]))

async function submit() {
  const { valid, errors } = await validate()
  ...
}

function disable() {
  isFirstNameDisabled.value = !isFirstNameDisabled.value
}
```