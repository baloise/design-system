### bal-form
 
#### Properties

| Property     | Attribute    | Description                                                            | Type      | Default |
| ------------ | ------------ | ---------------------------------------------------------------------- | --------- | ------- |
| `native`     | `native`     | If `true` a native form element is added as a wrapper of the slot.     | `boolean` | `false` |
| `novalidate` | `novalidate` | If `true` it adds the novalidate attribute to the native form element. | `boolean` | `false` |


#### Methods

| Method                      | Description                                                    | Type                                           |
| --------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `scrollToFirstInvalidField` | Scrolls to the first invalid field inside this form component. | `scrollToFirstInvalidField() => Promise<void>` |
 