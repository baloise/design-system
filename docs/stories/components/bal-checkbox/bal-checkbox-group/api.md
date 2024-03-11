### bal-checkbox-group
 
#### Properties

| Property           | Attribute            | Description                                                                                                                                                              | Type                                                           | Default        |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | -------------- |
| `autoInvalidOff`   | `auto-invalid-off`   | If `true`, in Angular reactive forms the control will not be set invalid                                                                                                 | `boolean`                                                      | `false`        |
| `columns`          | `columns`            | Defines the column size like the grid.                                                                                                                                   | `1 `, ` 2 `, ` 3 `, ` 4`                                       | `1`            |
| `columnsMobile`    | `columns-mobile`     | Defines the column size for mobile and bigger like the grid.                                                                                                             | `1 `, ` 2 `, ` 3 `, ` 4`                                       | `1`            |
| `columnsTablet`    | `columns-tablet`     | Defines the column size for tablet and bigger like the grid.                                                                                                             | `1 `, ` 2 `, ` 3 `, ` 4`                                       | `1`            |
| `control`          | `control`            | If `true` it acts as the main form control                                                                                                                               | `boolean`                                                      | `false`        |
| `disabled`         | `disabled`           | If `true`, the user cannot interact with the checkboxes.                                                                                                                 | `boolean `, ` undefined`                                       | `undefined`    |
| `expanded`         | `expanded`           | Uses the whole width                                                                                                                                                     | `boolean`                                                      | `false`        |
| `interface`        | `interface`          | Defines the layout of the checkbox button                                                                                                                                | `"checkbox" `, ` "select-button" `, ` "switch" `, ` undefined` | `undefined`    |
| `invalid`          | `invalid`            | If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. | `boolean `, ` undefined`                                       | `undefined`    |
| `name`             | `name`               | The name of the control, which is submitted with the form data.                                                                                                          | `string`                                                       | `this.inputId` |
| `options`          | --                   | Steps can be passed as a property or through HTML markup.                                                                                                                | `BalCheckboxOption[] `, ` undefined`                           | `undefined`    |
| `readonly`         | `readonly`           | If `true`, the user cannot interact with the checkboxes.                                                                                                                 | `boolean `, ` undefined`                                       | `undefined`    |
| `value`            | --                   | The value of the control.                                                                                                                                                | `any[]`                                                        | `[]`           |
| `vertical`         | `vertical`           | Displays the checkboxes vertically                                                                                                                                       | `boolean`                                                      | `false`        |
| `verticalOnMobile` | `vertical-on-mobile` | If `true`, the controls will be vertically on mobile devices.                                                                                                            | `boolean`                                                      | `false`        |


#### Events

| Event       | Description                                    | Type                      |
| ----------- | ---------------------------------------------- | ------------------------- |
| `balBlur`   | Emitted when the toggle loses focus.           | `CustomEvent<FocusEvent>` |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<any[]>`      |
| `balFocus`  | Emitted when the toggle has focus.             | `CustomEvent<FocusEvent>` |


#### Methods

| Method             | Description                              | Type                                                                         |
| ------------------ | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `getOptionByValue` | Find the options properties by its value | `getOptionByValue(value: string) => Promise<BalCheckboxOption \| undefined>` |
 