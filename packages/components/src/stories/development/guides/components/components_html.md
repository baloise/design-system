## Component Usage

```html
<bal-app>
  <main class="container">
    <bal-heading>Hello World</bal-heading>
  <main>
</bal-app>
```

### When is the component ready

The [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) interface provides methods for registering custom elements and
querying registered elements. To get an instance of it, use the window.customElements property.

The [whenDefined](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) method of the CustomElementRegistry interface returns a Promise that
resolves when the named element is defined.

```js
window.customElements.whenDefined('bal-button').then(() => {
  console.log('Baloise Design System Button is defined!')
})
```

The `whenDefined()` tells when the component is added to the browser.
Additionally to know when the component has fully rendered ou could use `componentOnReady()` that our components provide.

```js
await customElements.whenDefined('bal-button')
await document.querySelector('bal-button').componentOnReady()
```

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

### Bind properties

```html
<bal-button color="info">My info button</bal-button>
<bal-button id="my-info-button">My info button</bal-button>

<script>
  const buttonElement = document.querySelector('#my-info-button')
  buttonElement.color = 'info'
</script>
```

If the property is of type `boolean` it is enough to just set the property without a value:

<bal-app>
  <bal-button disabled>My disabled button</bal-button>
</bal-app>

```html
<!-- disabled button -->
<bal-button disabled>My disabled button</bal-button>
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

Since our components are using [dom events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
we can easily listen to them with `addEventListener`.

```html
<bal-input id="my-input" placeholder="Tell us your name"></bal-input>
<bal-text id="my-name"></bal-text>

<script>
  const myInput = document.getElementById('my-input')
  const myName = document.getElementById('my-name')

  myInput.addEventListener('balInput', event => {
    myName.textNode = event.detail
  })
</script>
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

```js
;(async () => {
  await customElements.whenDefined('bal-select')
  const todoListElement = document.querySelector('bal-select')
  await todoListElement.select('tennis')
})()
```
