# bal-file-upload

<!-- START: human documentation top -->

The `bal-file-upload` is all in one component. It supports drag&drop and the normal file upload dialog of the browser.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-file-upload-46></docs-demo-bal-file-upload-46></ClientOnly>



## API

### bal-file-upload

#### Properties

| Attribute           | Description                                      | Type                 | Default                      |
| :------------------ | :----------------------------------------------- | :------------------- | :--------------------------- |
| **accept**          | Accepted MIME-Types like `image/png,image/jpeg`. | `string`             | `''`                         |
| **disabled**        | If `true` the button is disabled                 | `boolean`            | `false`                      |
| **label**           | Label of the drop area.                          | `string`             | `'Choose or drop a file...'` |
| **max-bundle-size** | Allowed max bundle size in bytes.                | `number , undefined` | `undefined`                  |
| **max-file-size**   | Allowed max file size in bytes.                  | `number , undefined` | `undefined`                  |
| **max-files**       | Allowed number of files in the bundle.           | `number , undefined` | `undefined`                  |
| **multiple**        | If `true` multiple file upload is possible.      | `boolean`            | `true`                       |

#### Events

| Event               | Description                                                              | Type                     |
| :------------------ | :----------------------------------------------------------------------- | :----------------------- |
| **balChange**       | Triggers when a file is added or removed.                                | `File[]`                 |
| **balRejectedFile** | Triggers when a file is rejected due to not allowed MIME-Type and so on. | `FileUploadRejectedFile` |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-file-upload.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-file-upload)

<ClientOnly>
  <docs-component-script tag="balFileUpload"></docs-component-script>
</ClientOnly>
