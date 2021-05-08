<template>
  <form @submit.prevent="onSubmit">
    <BalCard class="has-large-margin-top">
      <BalCardTitle>Form + Validation</BalCardTitle>
      <BalCardSubtitle>
        Form is {{ isFormValid ? 'valid' : 'invalid' }}
      </BalCardSubtitle>
      <BalCardContent>
        <div class="columns">
          <div class="column">
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
          </div>
          <div class="column">
            <BalField expanded>
              <BalFieldLabel required>
                {{ $t('form.lastName.label') }}
              </BalFieldLabel>
              <BalFieldControl>
                <BalInput
                  v-model="lastName"
                  :name="lastNameName"
                  :placeholder="$t('form.lastName.placeholder')"
                ></BalInput>
              </BalFieldControl>
              <BalFieldMessage color="danger">
                {{ lastNameErrorMessage }}
              </BalFieldMessage>
            </BalField>
          </div>
        </div>
      </BalCardContent>
      <BalCardActions>
        <BalButton color="danger" @click="disable()">
          Disable Firstname
        </BalButton>
        <BalButton type="submit" color="primary"
          >{{ $t('form.submit.label') }}
        </BalButton>
      </BalCardActions>
    </BalCard>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  validators,
  isMaxLength,
  isMinLength,
  isRequired,
} from '../helpers/validators'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { balToastController } from '@baloise/design-system-components'

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
    } = useField(
      'firstName',
      validators(isFirstNameDisabled, [
        isRequired(),
        isMinLength(6),
        isMaxLength(8),
      ]),
    )

    const {
      errorMessage: lastNameErrorMessage,
      value: lastName,
      name: lastNameName,
    } = useField('lastName', validators([isRequired()]))

    lastName.value = 'Wayne'

    async function onSubmit() {
      const { valid, errors } = await validate()
      balToastController.create({
        message: `Form is ${valid ? 'valid' : 'invalid'}`,
        color: valid ? 'success' : 'warning',
      })
      console.log(valid, errors)
    }

    function disable() {
      isFirstNameDisabled.value = !isFirstNameDisabled.value
    }

    return {
      firstNameErrorMessage,
      firstName,
      firstNameName,
      lastName,
      lastNameErrorMessage,
      lastNameName,
      disable,
      isFirstNameDisabled,
      onSubmit,
      isFormValid,
    }
  },
})
</script>
