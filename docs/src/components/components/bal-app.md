---
sidebarDepth: 0
---

# App


<!-- START: human documentation top -->

App is a container element for an Baloise Design System application. There should only be one `<bal-app>` element per project. An app can have many Design System components. The overlay components get appended to the `<bal-app>` when they are presented.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-app-6></docs-demo-bal-app-6></ClientOnly>



## Code



### Properties


| Attribute      | Description                                     | Type                 | Default            |
| :------------- | :---------------------------------------------- | :------------------- | :----------------- |
| **background** | If `true` it adds a light background to the app | <code>boolean</code> | <code>false</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-app.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-app)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

