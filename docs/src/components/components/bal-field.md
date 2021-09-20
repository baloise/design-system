---
sidebarDepth: 0
---

# Field


<!-- START: human documentation top -->

A field wraps a form field like input. It provides a clear style structure of each control.

- [Form Documentation](/components/foundation/form.html)
- [Form Template with a contact form](/components/templates/contact-form.html)
- [Form Usage Angular](/components/getting-started/angular/usage.html#form-validation)
- [Form Usage Vue](/components/getting-started/vue/usage.html#form-validation)

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-field-43></docs-demo-bal-field-43></ClientOnly>


### Inverted

<ClientOnly><docs-demo-bal-field-44></docs-demo-bal-field-44></ClientOnly>


### Addons

<ClientOnly><docs-demo-bal-field-45></docs-demo-bal-field-45></ClientOnly>


### Form

<ClientOnly><docs-demo-bal-field-46></docs-demo-bal-field-46></ClientOnly>


### Validation for all fields

This is not a recommanded validation style. Only use this style if you do not have the possibility to use live validation.

<ClientOnly><docs-demo-bal-field-47></docs-demo-bal-field-47></ClientOnly>



## Code



### Properties


| Attribute    | Description                                                                                 | Type                 | Default            |
| :----------- | :------------------------------------------------------------------------------------------ | :------------------- | :----------------- |
| **disabled** | If `true` the field loses opacity                                                           | <code>boolean</code> | <code>false</code> |
| **expanded** | If `true` the component takes the whole width                                               | <code>boolean</code> | <code>false</code> |
| **invalid**  | If `true` the component gets a invalid style. Only use this if there is no live validation. | <code>boolean</code> | <code>false</code> |
| **inverted** | If `true` the field can be used on blue background.                                         | <code>boolean</code> | <code>false</code> |
| **loading**  | If `true` a loading spinner is visible at the end of the input                              | <code>boolean</code> | <code>false</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-field.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-field)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

