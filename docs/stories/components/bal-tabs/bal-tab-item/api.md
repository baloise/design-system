### bal-tab-item
 
#### Properties

| Property    | Attribute   | Description                                                                         | Type                                                | Default     |
| ----------- | ----------- | ----------------------------------------------------------------------------------- | --------------------------------------------------- | ----------- |
| `active`    | `active`    | Tells if this route is active and overrides the bal-tabs value property.            | `boolean`                                           | `false`     |
| `bubble`    | `bubble`    | If `true` a small red bubble is added to the tab.                                   | `boolean `, ` string`                               | `false`     |
| `disabled`  | `disabled`  | If `true` the tab is disabled.                                                      | `boolean`                                           | `false`     |
| `href`      | `href`      | Link to path.                                                                       | `string`                                            | `''`        |
| `icon`      | `icon`      | Tab icon not available for the steps.                                               | `string `, ` undefined`                             | `undefined` |
| `invisible` | `invisible` | If `true` the step is hidden.                                                       | `boolean`                                           | `false`     |
| `label`     | `label`     | Label for the tab.                                                                  | `string`                                            | `''`        |
| `prevent`   | `prevent`   | Tell's if the linking is done by a router.                                          | `boolean`                                           | `false`     |
| `target`    | `target`    | Specifies where to display the linked URL. Only applies when an `href` is provided. | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"` | `'_self'`   |
| `value`     | `value`     | This is the key of the tab.                                                         | `string`                                            | `''`        |


#### Events

| Event         | Description                               | Type                      |
| ------------- | ----------------------------------------- | ------------------------- |
| `balNavigate` | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |


#### Methods

| Method       | Description                               | Type                                          |
| ------------ | ----------------------------------------- | --------------------------------------------- |
| `getOptions` | Options of the tab like label, value etc. | `getOptions() => Promise<BalTabOption>`       |
| `setActive`  | Sets the tab active.                      | `setActive(active: boolean) => Promise<void>` |
 