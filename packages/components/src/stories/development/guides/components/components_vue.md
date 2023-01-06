## Component Usage

After importing the Baloise Design System Vue components, the components can be used inside the `BalApp` component.

**App.vue**

```html
<script setup lang="ts">
  import { BalApp, BalHeading } from '@baloise/design-system-components-vue'
</script>

<template>
  <BalApp>
    <main class="container">
      <BalHeading>Hello World</BalHeading>
    <main>
  </BalApp>
</template>
```

Import the components that are used inside the template and that is it.

## Properties

Properties are custom attributes/properties exposed publicly on an HTML element. They allow developers to pass data to
a component to render or otherwise use. Like to set a value for a input or change the color of a button.

To demonstrate how to interact with properties we try to change the color property of the button component.

<bal-app>
  <bal-button color="info">My info button</bal-button>
</bal-app>

```html
<!-- with color info -->
<bal-button color="info">My info button</bal-button>
```

If the property is of type `boolean` it is enough to just set the property without a value:

<bal-app>
  <bal-button disabled>My disabled button</bal-button>
</bal-app>

```html
<!-- disabled button -->
<bal-button disabled>My disabled button</bal-button>
```

### Bind properties

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { BalButton } from '@baloise/design-system-components-vue'

  const buttonColor = ref('info')
</script>

<template>
  <BalButton color="info">My info button</BalButton>

  <!-- To bind a value use the : before the prop -->
  <BalButton :color="buttonColor">My info button</BalButton>
</template>
```

## Events

The most of the Baloise Design System components can emit data and events using the Custom events.

To demonstrate how to interact with events we try to listen to the input event of an input component.

<bal-app>
  <bal-input placeholder="Tell us your name"></bal-input>
</bal-app>

```html
<!-- simple text input -->
<bal-input placeholder="Tell us your name"></bal-input>
```

In Vue the the events are written with the `@` simple similar to Angular.
`$event` returns the main value of the event.

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { BalInput, BalText } from '@baloise/design-system-components-vue'

  const myName = ref<string | undefined>()

  function updateName(value?: string) {
    myName.value = value
  }
</script>

<template>
  <BalInput placeholder="Tell us your name" :value="myName" @balInput="updateName($event)"></BalInput>
  <BalText>My name is {{ myName }}</BalText>
</template>
```

## Methods

Some of the Baloise Design System components offering methods to setFocus or returning native HTML elements.

To demonstrate the usage of the methods we try to set the value of the bal-select to tennis.

<bal-app>
  <bal-select placeholder="Choose your hobby">
    <bal-select-option label="Tennis" value="tennis">
      Tennis
    </bal-select-option>
    <bal-select-option label="Soccer" value="soccer">
      Soccer
    </bal-select-option>
    <bal-select-option label="Other" value="other">
      Other
    </bal-select-option>
  </bal-select>
</bal-app>

To access the components use the [Template Refs](https://vuejs.org/guide/essentials/template-refs.html) of Vue.js.
First define the reference and than mark it with the property/attribute `ref`.
After that the methods of the components can be used directly.

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { ProxyComponent, BalSelect, BalSelectOption, BalButton } from '@baloise/design-system-components-vue'
  import { Components } from '@baloise/design-system-components'

  const mySelect = ref<ProxyComponent<Components.BalSelect>>()

  function chooseTennis() {
    mySelect.value?.$el.select('tennis')
  }
</script>

<template>
  <BalSelect ref="mySelect" placeholder="Choose your hobby">
    <BalSelectOption label="Tennis" value="tennis">Tennis</BalSelectOption>
    <BalSelectOption label="Soccer" value="soccer">Soccer</BalSelectOption>
    <BalSelectOption label="Other" value="other">Other</BalSelectOption>
  </BalSelect>
  <BalButton class="mt-normal" @click="chooseTennis()">Choose Tennis</BalButton>
</template>
```