### bal-hint
 
#### Properties

| Property     | Attribute     | Description                                      | Type                    | Default     |
| ------------ | ------------- | ------------------------------------------------ | ----------------------- | ----------- |
| `closeLabel` | `close-label` | Text for the close button.                       | `string `, ` undefined` | `undefined` |
| `small`      | `small`       | Disables the close button for tablet and desktop | `boolean`               | `false`     |


#### Methods

| Method    | Description           | Type                         |
| --------- | --------------------- | ---------------------------- |
| `dismiss` | Closes the hint box.  | `dismiss() => Promise<void>` |
| `present` | Opens the hint box.   | `present() => Promise<void>` |
| `toggle`  | Toggles the hint box. | `toggle() => Promise<void>`  |
 