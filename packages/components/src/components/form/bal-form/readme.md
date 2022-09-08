### bal-form
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property     | Attribute    | Description                                                            | Type      | Default |
| ------------ | ------------ | ---------------------------------------------------------------------- | --------- | ------- |
| `native`     | `native`     | If `true` a native form element is added as a wrapper of the slot.     | `boolean` | `false` |
| `novalidate` | `novalidate` | If `true` it adds the novalidate attribute to the native form element. | `boolean` | `false` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `scrollToFirstInvalidField() => Promise<void>`

Scrolls to the first invalid field inside this form component.

###### Returns

Type: `Promise<void>`




 