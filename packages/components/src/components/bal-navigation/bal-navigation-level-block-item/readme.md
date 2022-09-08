### bal-navigation-level-block-item
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property    | Attribute    | Description | Type                                                | Default                                          |
| ----------- | ------------ | ----------- | --------------------------------------------------- | ------------------------------------------------ |
| `label`     | `label`      |             | `string`                                            | `''`                                             |
| `link`      | `link`       |             | `string `, ` undefined`                             | `undefined`                                      |
| `linkLabel` | `link-label` |             | `string `, ` undefined`                             | `undefined`                                      |
| `target`    | `target`     |             | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"` | `'_self'`                                        |
| `value`     | `value`      |             | `string`                                            | ``block-value-${navigationLevelBlockItemIds++}`` |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event      | Description | Type                      |
| ---------- | ----------- | ------------------------- |
| `balClick` |             | `CustomEvent<MouseEvent>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `getLevelInfo() => Promise<LevelInfo>`



###### Returns

Type: `Promise<LevelInfo>`




 