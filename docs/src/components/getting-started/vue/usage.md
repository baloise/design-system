# Vue Usage

All the Baloise Design System components are registered globally, so just use them in your template like the `BalButton`.

::: tip
More usage examples are in our [Vue Starter Kit app](https://github.com/baloise/vue-starter-kit/blob/vue-next/src/app/pages/Home.vue) or in our [Vue example app](https://github.com/baloise/design-system/tree/master/examples/vue).
:::

## Component

After adding the `BaloiseDesignSystem` plugin the components are registerd in the framework and can be used directly in your custom vue components.

::: tip
To get more typesafty you need to register the components from Baloise Design System in your custom vue components.

```typescript{2,5}
import { defineComponent, ref } from 'vue'
import { BalButton } from '@baloise/design-system-components-vue'

export default defineComponent({
  components: { BalButton },
  setup() { ... },
})
```

:::

```vue
<template>
  <BalButton :disabled="disabled" @click="action()">Button</BalButton>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  setup() {
    const disabled = ref(false)

    function action() { .. }

    return {
      disabled,
      action,
    }
  },
})
</script>
```

## Toast & Snackbar

The Baloise Design System has 2 controllers `balSnackbarController` and `balToastController` to create new notices.
Just import the controllers into the component.

**Components:**

- [Snackbar](/components/components/bal-snackbar.html)
- [Toast](/components/components/bal-toast.html)

```vue
<template>
  <div id="app">
    <BalCheckbox v-model="checkbox"></BalCheckbox>
    <BalButton @click="createToast()">Create Toast</BalButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalCheckbox, BalButton } from '@baloise/design-system-components-vue'
import { balToastController } from '@baloise/design-system-components'

export default Vue.extend({
  components: { BalCheckbox, BalButton },
  setup() {
    let myToast?: HTMLBalToastElement>
    const checkbox = ref(true)

    function createToast() {
      myToast = balToastController.create({
        message: 'Message',
      })
    }

    async function closeToast() {
      await myToast.close()
    }

    return {
      checkbox,
      createToast,
      closeToast,
    }
  },
})
</script>
```

## Filters / Pipes

In Vue 3 just import the filter function and use it in computed functions or return it to the template.
Vue 3 has removed filters [Link](https://v3.vuejs.org/guide/migration/filters.html).

More documentation is [here](https://github.com/baloise/web-app-utils/blob/master/packages/pipes/README.md)

First we need to install the pipes package.

```bash
npm install @baloise/web-app-pipes-vue
```

Lets add the PipePlugin to our vue app.

```typescript
import Vue from 'vue'
import { BaloisePipes } from '@baloise/web-app-pipes-vue'

Vue.use(BaloisePipes)
```

After that it can be used in the components template.

```vue
<template>
  <p>{{ formatedClaimNumber }}</p>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { balClaimNumber } from '@baloise/web-app-pipes-vue'

export default defineComponent({
  setup() {
    const claimNumber = ref('73001217169')

    const formatedClaimNumber = computed(() => balClaimNumber(claimNumber.value))

    return {
      formatedClaimNumber,
    }
  },
})
</script>
```

## Form & Validation

For Vue we use the libary [VeeValidate](https://vee-validate.logaretm.com/v4/) togehter with the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html).

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

::: tip
Go to [Validators](/components/tooling/validators.html) page to see our collection of available validators.
:::

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
import { rules } from '@baloise/web-app-validators-vue'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { isRequired } from '../helpers/validators'

export default defineComponent({
  setup() {
    const { validate } = useForm()
    const isFormValid = useIsFormValid()

    const isFirstNameDisabled = ref(false)
    const firstnameField = useField('firstname', rules(isFirstNameDisabled, [
      isRequired(),
    ]))

    async function submit() {
      const { valid, errors } = await validate()
      ...
    }

    function disable() {
      isFirstNameDisabled.value = !isFirstNameDisabled.value
    }

    return {
      firstname: firstnameField.value,
      firstNameName: firstnameField.name,
      firstnameErrorMessage: firstnameField.errorMessage,
      isFirstNameDisabled,
      isFormValid, disable, submit,
    }
  },
})
```

## Modal

Simply define the modal layout in your custom component and add the element reference with `ref="modalRef"` to the model element.
In your component register the element reference with `const modalRef = ref<{ $el: Components.BalModal }>()`. With that reference you are able to access the methods of the modal component.

```vue{4,20,25,28,32,36}
<template>
  <BalButton @click="openModal()">Open Modal</BalButton>

  <BalModal ref="modalRef">
    <BalModalHeader>Modal Title</BalModalHeader>
    <BalModalBody>
      <p>...</p>
    </BalModalBody>
    <BalModalBooter>
      <BalModalActions>
        <BalButton color="link" @click="closeModal()">Cancel</BalButton>
        <BalButton color="primary" @click="closeModal()">Okay</BalButton>
      </BalModalActions>
    </BalModalBooter>
  </BalModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Components } from '@baloise/design-system-components'

export default defineComponent({
  components: { ... },
  setup() {
    const modalRef = ref<{ $el: Components.BalModal }>()

    function openModal() {
      modalRef.value?.$el.open()
    }

    function closeModal() {
      modalRef.value?.$el.close()
    }

    return {
      modalRef,
      openModal,
      closeModal,
    }
  },
})
</script>
```
