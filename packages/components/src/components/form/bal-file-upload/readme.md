### bal-file-upload
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property        | Attribute         | Description                                                                                                                                                              | Type                                      | Default                      |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------------------------- |
| `accept`        | `accept`          | Accepted MIME-Types like `image/png,image/jpeg`.                                                                                                                         | `string`                                  | `''`                         |
| `disabled`      | `disabled`        | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`                                 | `false`                      |
| `hasFileList`   | `has-file-list`   | If `true` below the drop-down area it generates a file list.                                                                                                             | `boolean`                                 | `true`                       |
| `invalid`       | `invalid`         | If `true` the component gets a invalid style.                                                                                                                            | `boolean`                                 | `false`                      |
| `label`         | `label`           | Label of the drop area.                                                                                                                                                  | `string`                                  | `'Choose or drop a file...'` |
| `loading`       | `loading`         | If `true` the file upload is disabled and shows a spinner                                                                                                                | `boolean`                                 | `false`                      |
| `maxBundleSize` | `max-bundle-size` | Allowed max bundle size in bytes.                                                                                                                                        | `number `, ` undefined`                   | `undefined`                  |
| `maxFileSize`   | `max-file-size`   | Allowed max file size in bytes.                                                                                                                                          | `number `, ` undefined`                   | `undefined`                  |
| `maxFiles`      | `max-files`       | Allowed number of files in the bundle.                                                                                                                                   | `number `, ` undefined`                   | `undefined`                  |
| `multiple`      | `multiple`        | If `true` multiple file upload is possible.                                                                                                                              | `boolean`                                 | `true`                       |
| `name`          | `name`            | The name of the control, which is submitted with the form data.                                                                                                          | `string`                                  | `this.uploadId`              |
| `readonly`      | `readonly`        | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean`                                 | `false`                      |
| `required`      | `required`        | If `true`, the user must fill in a value before submitting a form.                                                                                                       | `boolean`                                 | `false`                      |
| `subTitle`      | --                | Overrides the default subtitle file size                                                                                                                                 | `((file: File) => string) `, ` undefined` | `undefined`                  |
| `value`         | --                | Input value.                                                                                                                                                             | `File[]`                                  | `[]`                         |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event             | Description                                                              | Type                                  |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| `balChange`       | Triggers when a file is added or removed.                                | `CustomEvent<File[]>`                 |
| `balFilesAdded`   | Triggers when a file is added.                                           | `CustomEvent<File[]>`                 |
| `balFilesRemoved` | Triggers when a file is removed.                                         | `CustomEvent<File[]>`                 |
| `balRejectedFile` | Triggers when a file is rejected due to not allowed MIME-Type and so on. | `CustomEvent<FileUploadRejectedFile>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `clear() => Promise<void>`

Sets the file list to an empty list

###### Returns

Type: `Promise<void>`




 