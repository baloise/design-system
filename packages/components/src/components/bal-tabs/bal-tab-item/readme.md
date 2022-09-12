### bal-tab-item
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property   | Attribute  | Description                                                              | Type                    | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------ | ----------------------- | ----------- |
| `active`   | `active`   | Tells if this route is active and overrides the bal-tabs value property. | `boolean`               | `false`     |
| `bubble`   | `bubble`   | If `true` a small red bubble is added to the tab.                        | `boolean `, ` string`   | `false`     |
| `disabled` | `disabled` | If `true` the tab is disabled.                                           | `boolean`               | `false`     |
| `done`     | `done`     | If `true` the step is marked as done.                                    | `boolean`               | `false`     |
| `failed`   | `failed`   | If `true` the step is marked as failed.                                  | `boolean`               | `false`     |
| `hidden`   | `hidden`   | If `true` the step is hidden.                                            | `boolean`               | `false`     |
| `href`     | `href`     | Link to path.                                                            | `string`                | `''`        |
| `icon`     | `icon`     | Tab icon not available for the steps.                                    | `string `, ` undefined` | `undefined` |
| `label`    | `label`    | Label for the tab.                                                       | `string`                | `''`        |
| `prevent`  | `prevent`  | Tell's if the linking is done by a router.                               | `boolean`               | `false`     |
| `value`    | `value`    | This is the key of the tab.                                              | `string`                | `''`        |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                               | Type                      |
| ------------- | ----------------------------------------- | ------------------------- |
| `balNavigate` | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `getOptions() => Promise<BalTabOption>`

Options of the tab like label, value etc.

###### Returns

Type: `Promise<BalTabOption>`



##### `setActive(active: boolean) => Promise<void>`

Sets the tab active.

###### Returns

Type: `Promise<void>`




 