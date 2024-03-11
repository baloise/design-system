### bal-tooltip
 
#### Properties

| Property       | Attribute       | Description                                                              | Type                                           | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------ | ---------------------------------------------- | ----------- |
| `contentWidth` | `content-width` | Defines the width of the content                                         | `number `, ` undefined`                        | `undefined` |
| `offset`       | `offset`        | Offset form trigger to tooltip.                                          | `number`                                       | `0`         |
| `placement`    | `placement`     | If set it turns a tooltip into a fullscreen or a drawer on touch devices | `"bottom" `, ` "left" `, ` "right" `, ` "top"` | `'bottom'`  |
| `reference`    | `reference`     | Id of the reference element default is the trigger element.              | `string`                                       | `''`        |


#### Events

| Event            | Description                              | Type                   |
| ---------------- | ---------------------------------------- | ---------------------- |
| `balDidAnimate`  | Emitted after the animation has finished | `CustomEvent<boolean>` |
| `balWillAnimate` | Emitted before the animation starts      | `CustomEvent<boolean>` |


 