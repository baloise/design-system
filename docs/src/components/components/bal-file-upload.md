---
sidebarDepth: 0
---

# File Upload


<!-- START: human documentation top -->

The `bal-file-upload` is all in one component. It supports drag&drop and the normal file upload dialog of the browser.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-file-upload-50></docs-demo-bal-file-upload-50></ClientOnly>



## Code



### Properties


| Attribute         | Description                                      | Type                            | Default                                 |
| :---------------- | :----------------------------------------------- | :------------------------------ | :-------------------------------------- |
| **accept**        | Accepted MIME-Types like `image/png,image/jpeg`. | <code>string</code>             | <code>''</code>                         |
| **disabled**      | If `true` the button is disabled                 | <code>boolean</code>            | <code>false</code>                      |
| **label**         | Label of the drop area.                          | <code>string</code>             | <code>'Choose or drop a file...'</code> |
| **maxBundleSize** | Allowed max bundle size in bytes.                | <code>number , undefined</code> | <code>undefined</code>                  |
| **maxFileSize**   | Allowed max file size in bytes.                  | <code>number , undefined</code> | <code>undefined</code>                  |
| **maxFiles**      | Allowed number of files in the bundle.           | <code>number , undefined</code> | <code>undefined</code>                  |
| **multiple**      | If `true` multiple file upload is possible.      | <code>boolean</code>            | <code>true</code>                       |

### Events


| Event               | Description                                                              | Type                                |
| :------------------ | :----------------------------------------------------------------------- | :---------------------------------- |
| **balChange**       | Triggers when a file is added or removed.                                | <code>File[]</code>                 |
| **balRejectedFile** | Triggers when a file is rejected due to not allowed MIME-Type and so on. | <code>FileUploadRejectedFile</code> |

### Methods


| Method    | Description                         | Signature                                         |
| :-------- | :---------------------------------- | :------------------------------------------------ |
| **clear** | Sets the file list to an empty list | <code>clear() =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-file-upload.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-file-upload)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balFileUpload"></docs-component-script>
</ClientOnly>
