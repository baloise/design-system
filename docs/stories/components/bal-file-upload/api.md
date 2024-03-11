### bal-file-upload
 
#### Properties

| Property         | Attribute          | Description                                                                                                                                                              | Type                                      | Default                      |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------------------------- |
| `accept`         | `accept`           | Accepted MIME-Types like `image/png,image/jpeg`.                                                                                                                         | `string `, ` undefined`                   | `undefined`                  |
| `autoInvalidOff` | `auto-invalid-off` | If `true`, in Angular reactive forms the control will not be set invalid                                                                                                 | `boolean`                                 | `false`                      |
| `disabled`       | `disabled`         | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean`                                 | `false`                      |
| `hasFileList`    | `has-file-list`    | If `true` below the drop-down area it generates a file list.                                                                                                             | `boolean`                                 | `true`                       |
| `invalid`        | `invalid`          | If `true` the component gets a invalid style.                                                                                                                            | `boolean`                                 | `false`                      |
| `label`          | `label`            | Label of the drop area.                                                                                                                                                  | `string`                                  | `'Choose or drop a file...'` |
| `loading`        | `loading`          | If `true` the file upload is disabled and shows a spinner                                                                                                                | `boolean`                                 | `false`                      |
| `maxBundleSize`  | `max-bundle-size`  | Allowed max bundle size in bytes.                                                                                                                                        | `number `, ` undefined`                   | `undefined`                  |
| `maxFileSize`    | `max-file-size`    | Allowed max file size in bytes.                                                                                                                                          | `number `, ` undefined`                   | `undefined`                  |
| `maxFiles`       | `max-files`        | Allowed number of files in the bundle.                                                                                                                                   | `number `, ` undefined`                   | `undefined`                  |
| `multiple`       | `multiple`         | If `true` multiple file upload is possible.                                                                                                                              | `boolean`                                 | `true`                       |
| `name`           | `name`             | The name of the control, which is submitted with the form data.                                                                                                          | `string`                                  | `this.fileUploadId`          |
| `readonly`       | `readonly`         | If `true` the element can not mutated, meaning the user can not edit the control.                                                                                        | `boolean`                                 | `false`                      |
| `required`       | `required`         | If `true`, the user must fill in a value before submitting a form.                                                                                                       | `boolean`                                 | `false`                      |
| `subTitle`       | --                 | Overrides the default subtitle file size                                                                                                                                 | `((file: File) => string) `, ` undefined` | `undefined`                  |
| `value`          | --                 | Input value.                                                                                                                                                             | `File[]`                                  | `[]`                         |


#### Events

| Event             | Description                                                              | Type                                  |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| `balBlur`         | Emitted when the input loses focus.                                      | `CustomEvent<FocusEvent>`             |
| `balChange`       | Triggers when a file is added or removed.                                | `CustomEvent<File[]>`                 |
| `balFilesAdded`   | Triggers when a file is added.                                           | `CustomEvent<File[]>`                 |
| `balFilesRemoved` | Triggers when a file is removed.                                         | `CustomEvent<File[]>`                 |
| `balFocus`        | Emitted when the input has focus.                                        | `CustomEvent<FocusEvent>`             |
| `balInputClick`   | Emitted when the input has clicked.                                      | `CustomEvent<MouseEvent>`             |
| `balRejectedFile` | Triggers when a file is rejected due to not allowed MIME-Type and so on. | `CustomEvent<FileUploadRejectedFile>` |


#### Methods

| Method            | Description                                                                              | Type                                                          |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `clear`           | Sets the file list to an empty list                                                      | `clear() => Promise<void>`                                    |
| `getInputElement` | Returns the native `<input>` element used under the hood.                                | `getInputElement() => Promise<HTMLInputElement \| undefined>` |
| `setFocus`        | Sets focus on the native `input`. Use this method instead of the global `input.focus()`. | `setFocus() => Promise<void>`                                 |
 