---
sidebarDepth: 0
---

# Button


<!-- START: human documentation top -->

Buttons provide a clickable element, which can be used in forms, or anywhere that needs simple, standard button functionality. They may display text, icons, or both. Buttons can be styled with several attributes to look a specific way.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-button-6></docs-demo-bal-button-6></ClientOnly>


### Links

<ClientOnly><docs-demo-bal-button-7></docs-demo-bal-button-7></ClientOnly>


### Info

<ClientOnly><docs-demo-bal-button-8></docs-demo-bal-button-8></ClientOnly>


### Inverted

<ClientOnly><docs-demo-bal-button-9></docs-demo-bal-button-9></ClientOnly>


### Other colors

<ClientOnly><docs-demo-bal-button-10></docs-demo-bal-button-10></ClientOnly>


### Disabled

<ClientOnly><docs-demo-bal-button-11></docs-demo-bal-button-11></ClientOnly>


### Loading

<ClientOnly><docs-demo-bal-button-12></docs-demo-bal-button-12></ClientOnly>


### Expanded

<ClientOnly><docs-demo-bal-button-13></docs-demo-bal-button-13></ClientOnly>


### With icons

<ClientOnly><docs-demo-bal-button-14></docs-demo-bal-button-14></ClientOnly>


### Small buttons

<ClientOnly><docs-demo-bal-button-15></docs-demo-bal-button-15></ClientOnly>


### Square buttons

<ClientOnly><docs-demo-bal-button-16></docs-demo-bal-button-16></ClientOnly>


### Button Link

<ClientOnly><docs-demo-bal-button-17></docs-demo-bal-button-17></ClientOnly>


### Button Group

The .bal-buttons css class helps to place button groups together. The buttons stretche on mobile devices according to their css class like .is-full , .is-half , .is-one-third or .is-two-thirds .

<ClientOnly><docs-demo-bal-button-18></docs-demo-bal-button-18></ClientOnly>



## Code



### Properties


| Attribute          | Description                                                                                                                                                                                                                                                                               | Type                                                                                                         | Default                |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------- |
| **bottom-rounded** | If `true` the bottom corners get rounded                                                                                                                                                                                                                                                  | <code>boolean</code>                                                                                         | <code>false</code>     |
| **color**          | The color to use from your application's color palette.                                                                                                                                                                                                                                   | <code>"danger" , "info" , "info-light" , "link" , "primary" , "primary-light" , "success" , "warning"</code> | <code>'primary'</code> |
| **disabled**       | If `true`, the user cannot interact with the button.                                                                                                                                                                                                                                      | <code>boolean</code>                                                                                         | <code>false</code>     |
| **download**       | This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). | <code>string , undefined</code>                                                                              |                        |
| **expanded**       | If `true` the button has a full width                                                                                                                                                                                                                                                     | <code>boolean</code>                                                                                         | <code>false</code>     |
| **href**           | Specifies the URL of the page the link goes to                                                                                                                                                                                                                                            | <code>string , undefined</code>                                                                              |                        |
| **icon**           | Name of the left button icon                                                                                                                                                                                                                                                              | <code>string</code>                                                                                          | <code>''</code>        |
| **icon-position**  | Size of the button                                                                                                                                                                                                                                                                        | <code>"left" , "right"</code>                                                                                | <code>'left'</code>    |
| **icon-right**     | Name of the right button icon                                                                                                                                                                                                                                                             | <code>string</code>                                                                                          | <code>''</code>        |
| **inverted**       | If `true` the button is inverted                                                                                                                                                                                                                                                          | <code>boolean</code>                                                                                         | <code>false</code>     |
| **is-active**      | If `true` the button has a active theme                                                                                                                                                                                                                                                   | <code>boolean</code>                                                                                         | <code>false</code>     |
| **link**           | Turn the button in to a link.                                                                                                                                                                                                                                                             | <code>boolean</code>                                                                                         | <code>false</code>     |
| **loading**        | If `true` the label is hidden and a loading spinner is shown instead.                                                                                                                                                                                                                     | <code>boolean</code>                                                                                         | <code>false</code>     |
| **name**           | The name of the button, which is submitted with the form data.                                                                                                                                                                                                                            | <code>string , undefined</code>                                                                              | <code>''</code>        |
| **outlined**       | If `true` the button is outlined                                                                                                                                                                                                                                                          | <code>boolean</code>                                                                                         | <code>false</code>     |
| **rel**            | Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).                                                                                                    | <code>string , undefined</code>                                                                              |                        |
| **size**           | Size of the button                                                                                                                                                                                                                                                                        | <code>"" , "small"</code>                                                                                    | <code>''</code>        |
| **square**         | If `true` the width of the buttons is limited                                                                                                                                                                                                                                             | <code>boolean</code>                                                                                         | <code>false</code>     |
| **target**         | Specifies where to display the linked URL. Only applies when an `href` is provided.                                                                                                                                                                                                       | <code>" _parent" , "_blank" , "_self" , "_top"</code>                                                        | <code>'_self'</code>   |
| **top-rounded**    | If `true` the top corners get rounded                                                                                                                                                                                                                                                     | <code>boolean</code>                                                                                         | <code>false</code>     |
| **type**           | The type of button.                                                                                                                                                                                                                                                                       | <code>"button" , "reset" , "submit"</code>                                                                   | <code>'button'</code>  |
| **value**          | The value of the button, which is submitted with the form data.                                                                                                                                                                                                                           | <code>number , string , undefined</code>                                                                     | <code>''</code>        |

### Events


| Event            | Description                                 | Type                    |
| :--------------- | :------------------------------------------ | :---------------------- |
| **balBlur**      | Emitted when the button loses focus.        | <code>void</code>       |
| **balDidRender** | Emitted when the button has been  rendered. | <code>void</code>       |
| **balFocus**     | Emitted when the button has focus.          | <code>void</code>       |
| **balNavigate**  | Emitted when the link element has clicked.  | <code>MouseEvent</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Button', () => {
  const button = dataTestSelector('my-button') // [data-test-id="my-button"]
  it('should ...', () => {
    cy.get(button)
      .contains('Label')
      .click()
      .should('not.be.disabled')
  })
})
```

<!-- END: human documentation testing -->



## Usage

<!-- START: human documentation usage -->

WIP

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-button.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-button)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

