<template>
  <form @submit.prevent="onSubmit">
    <BalCard class="mt-6">
      <BalCardContent>
        <BalHeading space="bottom">Reactive Form</BalHeading>
        <BalHeading level="h3" color="warning" space="bottom" subtitle>
          Form is {{ isFormValid ? 'valid' : 'invalid' }}
        </BalHeading>
        <div class="columns is-multiline mt-0">
          <BalField class="column is-full py-0" expanded>
            <BalFieldControl>
              <BalRadioGroup value="male" v-model="gender">
                <BalRadio name="gender" value="male">Male</BalRadio>
                <BalRadio name="gender" value="female">Female</BalRadio>
              </BalRadioGroup>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ genderErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <BalField class="column is-half py-0" expanded>
            <BalFieldLabel required>Firstname</BalFieldLabel>
            <BalFieldControl>
              <BalInput v-model="firstname"></BalInput>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ firstnameErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <BalField class="column is-half py-0" expanded>
            <BalFieldLabel required>Lastname</BalFieldLabel>
            <BalFieldControl>
              <BalInput v-model="lastname"></BalInput>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ lastnameErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <BalField class="column is-half py-0" expanded>
            <BalFieldLabel required>Street</BalFieldLabel>
            <BalFieldControl>
              <BalInput v-model="street"></BalInput>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ streetErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <div class="column is-half pb-0">
            <div class="columns">
              <BalField class="column is-one-third py-0" expanded>
                <BalFieldLabel required>Postal Code</BalFieldLabel>
                <BalFieldControl>
                  <BalInput v-model="postalCode" number-keyboard></BalInput>
                </BalFieldControl>
                <BalFieldMessage color="danger">
                  {{ postalCodeErrorMessage }}
                </BalFieldMessage>
              </BalField>

              <BalField class="column is-two-thirds py-0" expanded>
                <BalFieldLabel required>City</BalFieldLabel>
                <BalFieldControl>
                  <BalInput v-model="city"></BalInput>
                </BalFieldControl>
                <BalFieldMessage color="danger">
                  {{ cityErrorMessage }}
                </BalFieldMessage>
              </BalField>
            </div>
          </div>

          <BalField class="column is-half py-0" expanded>
            <BalFieldLabel required>Canton</BalFieldLabel>
            <BalFieldControl>
              <BalSelect placeholder="Select your canton" v-model="canton" expanded>
                <BalSelectOption v-for="c in cantons" :key="c.value" :value="c.value" :label="c.label">
                  {{ c.label }}
                </BalSelectOption>
              </BalSelect>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ cantonErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <BalField class="column is-half py-0" expanded>
            <BalFieldLabel required>Birthdate</BalFieldLabel>
            <BalFieldControl>
              <BalDatepicker placeholder="Select your birthdate" v-model="birthdate" expanded></BalDatepicker>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ birthdateErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <BalField class="column is-full py-0" expanded>
            <BalFieldControl>
              <BalCheckbox v-model="checkbox">Checkbox</BalCheckbox>
            </BalFieldControl>
            <BalFieldMessage color="danger">
              {{ checkboxErrorMessage }}
            </BalFieldMessage>
          </BalField>

          <BalField class="column is-full py-0" expanded :disabled="isCommentDisabled">
            <BalFieldLabel required>Comment</BalFieldLabel>
            <BalFieldControl>
              <BalTextarea v-model="comment" :disabled="isCommentDisabled"></BalTextarea>
            </BalFieldControl>
            <BalFieldMessage color="danger" v-if="!isCommentDisabled">
              {{ commentErrorMessage }}
            </BalFieldMessage>
          </BalField>
        </div>
      </BalCardContent>
      <BalCardActions right>
        <BalButton @click="onSubmit">Submit</BalButton>
        <BalButton color="info" outlined @click="updateName">Update Name</BalButton>
        <BalButton color="danger" outlined @click="setCommentDisabled">Disable Comment</BalButton>
      </BalCardActions>
    </BalCard>
  </form>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { rules, isRequired } from '../helpers/validators'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { NewBalOptionValue } from '@baloise/design-system-components'

export default defineComponent({
  setup() {
    const { validate } = useForm()
    const isFormValid = useIsFormValid()

    const cantons = ref([
      NewBalOptionValue('AG', 'AG'),
      NewBalOptionValue('BS', 'BS'),
      NewBalOptionValue('BL', 'BL'),
      NewBalOptionValue('JU', 'JU'),
      NewBalOptionValue('SO', 'SO'),
    ])

    const genderField = useField('gender', rules([isRequired()]))
    const firstnameField = useField('firstname', rules([isRequired()]))
    const lastnameField = useField('lastname', rules([isRequired()]))
    const streetField = useField('street', rules([isRequired()]))
    const postalCodeField = useField('postalCode', rules([isRequired()]))
    const cityField = useField('city', rules([isRequired()]))
    const birthdateField = useField('birthdate', rules([isRequired()]))
    const cantonField = useField('canton', rules([isRequired()]))
    const checkboxField = useField('checkbox', rules([isRequired()]))
    const isCommentDisabled = ref(false)
    const commentField = useField('comment', rules(isCommentDisabled, [isRequired()]))

    async function onSubmit() {
      const { valid, errors } = await validate()
      console.log(valid, errors)
      alert('Form is submitted!')
    }

    function setCommentDisabled() {
      isCommentDisabled.value = true
    }

    function updateName() {
      firstnameField.value.value = 'Nancy'
      lastnameField.value.value = 'Miller'
    }

    onMounted(() => {
      genderField.value.value = 'female'
    })

    return {
      cantons,
      onSubmit,
      setCommentDisabled,
      updateName,
      isFormValid,
      gender: genderField.value,
      genderErrorMessage: genderField.errorMessage,
      firstname: firstnameField.value,
      firstnameErrorMessage: firstnameField.errorMessage,
      lastname: lastnameField.value,
      lastnameErrorMessage: lastnameField.errorMessage,
      street: streetField.value,
      streetErrorMessage: streetField.errorMessage,
      postalCode: postalCodeField.value,
      postalCodeErrorMessage: postalCodeField.errorMessage,
      city: cityField.value,
      cityErrorMessage: cityField.errorMessage,
      birthdate: birthdateField.value,
      birthdateErrorMessage: birthdateField.errorMessage,
      canton: cantonField.value,
      cantonErrorMessage: cantonField.errorMessage,
      checkbox: checkboxField.value,
      checkboxErrorMessage: checkboxField.errorMessage,
      isCommentDisabled,
      comment: commentField.value,
      commentErrorMessage: commentField.errorMessage,
    }
  },
})
</script>
