# bal-button

Buttons provide a clickable element, which can be used in forms, or anywhere that needs simple, standard button functionality. They may display text, icons, or both. Buttons can be styled with several attributes to look a specific way.

## Basic

<ClientOnly>  <docs-demo-bal-button-4></docs-demo-bal-button-4></ClientOnly>

```html
<bal-button color="primary" data-test-id="primary-button">Primary</bal-button>
<bal-button color="info">Info</bal-button>
<bal-button color="link">Link</bal-button>
```

## Outlined

<ClientOnly>  <docs-demo-bal-button-5></docs-demo-bal-button-5></ClientOnly>

```html
<bal-button color="info" outlined>Info</bal-button>
```

## Inverted

<ClientOnly>  <docs-demo-bal-button-6></docs-demo-bal-button-6></ClientOnly>

```html
<div class="has-background-info has-padding">
  <bal-button color="primary" inverted>Primary</bal-button>
  <bal-button color="info" inverted>Info</bal-button>
  <bal-button color="info" inverted outlined>Info Outlined</bal-button>
</div>
<div class="has-background-primary has-padding">
  <bal-button color="primary" inverted outlined>Primary Outlined</bal-button>
</div>
<div class="has-background-success has-padding">
  <bal-button color="success" inverted outlined>Success Outlined</bal-button>
</div>
<div class="has-background-warning has-padding">
  <bal-button color="warning" inverted outlined>Warning Outlined</bal-button>
</div>
<div class="has-background-danger has-padding">
  <bal-button color="danger" inverted outlined>Danger Outlined</bal-button>
</div>
```

## Other colors

<ClientOnly>  <docs-demo-bal-button-7></docs-demo-bal-button-7></ClientOnly>

```html
<bal-button color="primary-light" icon="edit">Primary Light</bal-button>
<bal-button color="info-light" icon="edit">Info Light</bal-button>
<bal-button color="success">Success</bal-button>
<bal-button color="warning">Warning</bal-button>
<bal-button color="danger">Danger</bal-button>
```

## Disabled

<ClientOnly>  <docs-demo-bal-button-8></docs-demo-bal-button-8></ClientOnly>

```html
<bal-button color="primary" disabled data-test-id="primary-button-disabled">Primary</bal-button>
<bal-button color="info" disabled>Info</bal-button>
<bal-button color="link" disabled>Link</bal-button>
```

## Loading

<ClientOnly>  <docs-demo-bal-button-9></docs-demo-bal-button-9></ClientOnly>

```html
<bal-button color="primary" loading>Primary</bal-button>
<bal-button color="info" loading>Info</bal-button>
<bal-button color="link" loading>Info</bal-button>
<bal-button color="primary" loading outlined>Info</bal-button>
```

## Expanded

<ClientOnly>  <docs-demo-bal-button-10></docs-demo-bal-button-10></ClientOnly>

```html
<bal-button color="primary" expanded>Primary</bal-button>
<br>
<bal-button color="info" expanded>Info</bal-button>
```

## With icons

<ClientOnly>  <docs-demo-bal-button-11></docs-demo-bal-button-11></ClientOnly>

```html
<bal-button color="info" outlined icon="edit">Left Icon</bal-button>
<bal-button color="info" outlined icon-right="edit">Right Icon</bal-button>
```

## Small buttons

<ClientOnly>  <docs-demo-bal-button-12></docs-demo-bal-button-12></ClientOnly>

```html
<bal-button color="primary" size="small"> Primary </bal-button>
<bal-button color="info" size="small"> Info </bal-button>
```

## Square buttons

<ClientOnly>  <docs-demo-bal-button-13></docs-demo-bal-button-13></ClientOnly>

```html
<bal-button color="info" icon="edit" square outlined></bal-button>
<bal-button color="info" size="small" icon="edit" square outlined></bal-button>
```

## Button Link

<ClientOnly>  <docs-demo-bal-button-14></docs-demo-bal-button-14></ClientOnly>

```html
<bal-button link href="https://github.com/baloise/ui-library" target="_blank">GitHub</bal-button>
```


## API

### bal-button

#### Properties

| Attribute          | Description                                                                                                                                                                                                                                                                               | Type                                                                                              | Default     |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :---------- |
| **bottom-rounded** | If `true` the bottom corners get rounded                                                                                                                                                                                                                                                  | `boolean`                                                                                         | `false`     |
| **color**          | The color to use from your application's color palette.                                                                                                                                                                                                                                   | `"danger" , "info" , "info-light" , "link" , "primary" , "primary-light" , "success" , "warning"` | `'primary'` |
| **disabled**       | If `true`, the user cannot interact with the button.                                                                                                                                                                                                                                      | `boolean`                                                                                         | `false`     |
| **download**       | This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). | `string , undefined`                                                                              |             |
| **expanded**       | If `true` the button has a full width                                                                                                                                                                                                                                                     | `boolean`                                                                                         | `false`     |
| **href**           | Specifies the URL of the page the link goes to                                                                                                                                                                                                                                            | `string , undefined`                                                                              |             |
| **icon**           | Name of the left button icon                                                                                                                                                                                                                                                              | `string`                                                                                          | `''`        |
| **icon-position**  | Size of the button                                                                                                                                                                                                                                                                        | `"left" , "right"`                                                                                | `'left'`    |
| **icon-right**     | Name of the right button icon                                                                                                                                                                                                                                                             | `string`                                                                                          | `''`        |
| **inverted**       | If `true` the button is inverted                                                                                                                                                                                                                                                          | `boolean`                                                                                         | `false`     |
| **is-active**      | If `true` the button has a active theme                                                                                                                                                                                                                                                   | `boolean`                                                                                         | `false`     |
| **link**           | Turn the button in to a link.                                                                                                                                                                                                                                                             | `boolean`                                                                                         | `false`     |
| **loading**        | If `true` the label is hidden and a loading spinner is shown instead.                                                                                                                                                                                                                     | `boolean`                                                                                         | `false`     |
| **name**           | The name of the button, which is submitted with the form data.                                                                                                                                                                                                                            | `string , undefined`                                                                              | `''`        |
| **outlined**       | If `true` the button is outlined                                                                                                                                                                                                                                                          | `boolean`                                                                                         | `false`     |
| **rel**            | Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).                                                                                                    | `string , undefined`                                                                              |             |
| **size**           | Size of the button                                                                                                                                                                                                                                                                        | `"" , "small"`                                                                                    | `''`        |
| **square**         | If `true` the width of the buttons is limited                                                                                                                                                                                                                                             | `boolean`                                                                                         | `false`     |
| **target**         | Specifies where to display the linked URL. Only applies when an `href` is provided.                                                                                                                                                                                                       | `" _parent" , "_blank" , "_self" , "_top"`                                                        | `'_self'`   |
| **top-rounded**    | If `true` the top corners get rounded                                                                                                                                                                                                                                                     | `boolean`                                                                                         | `false`     |
| **type**           | The type of button.                                                                                                                                                                                                                                                                       | `"button" , "reset" , "submit"`                                                                   | `'button'`  |
| **value**          | The value of the button, which is submitted with the form data.                                                                                                                                                                                                                           | `number , string , undefined`                                                                     | `''`        |

#### Events

| Event            | Description                                 | Type         |
| :--------------- | :------------------------------------------ | :----------- |
| **balBlur**      | Emitted when the button loses focus.        | `void`       |
| **balDidRender** | Emitted when the button has been  rendered. | `void`       |
| **balFocus**     | Emitted when the button has focus.          | `void`       |
| **balNavigate**  | Emitted when the link element has clicked.  | `MouseEvent` |

## Testing

### ButtonAccessor

ButtonAccessor is a helper object for E-2-E testing.
It maps the button behaviour to the `bal-button` ui component.

```typescript
import { dataTestSelector, ButtonAccessor } from '@baloise/ui-library-testing'

describe('Button', () => {
  it('should ...', () => {
     const button = ButtonAccessor(dataTestSelector('button-id')).get()
     button.click()
     button.assertIsEnabled()
     button.contains('Label')
 })
})
```

#### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **contains**               | Check the content of the label element                                                                             | `content: string`                                        |
| **assertIsDisabled**       | Asserts that button is disabled                                                                                    |                                                          |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
| **assertVisible**          | Assert that the component is visible for the user                                                                  |                                                          |
| **assertNotVisible**       | Assert that the component is not visible for the user                                                              |                                                          |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |




## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-button)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/button.accessor.ts)
