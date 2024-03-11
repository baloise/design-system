### bal-step-item
 
#### Properties

| Property    | Attribute   | Description                                                                         | Type                                                | Default   |
| ----------- | ----------- | ----------------------------------------------------------------------------------- | --------------------------------------------------- | --------- |
| `active`    | `active`    | Tells if this route is active and overrides the bal-tabs value property.            | `boolean`                                           | `false`   |
| `disabled`  | `disabled`  | If `true` the tab is disabled.                                                      | `boolean`                                           | `false`   |
| `done`      | `done`      | If `true` the step is marked as done.                                               | `boolean`                                           | `false`   |
| `failed`    | `failed`    | If `true` the step is marked as failed.                                             | `boolean`                                           | `false`   |
| `href`      | `href`      | Link to path.                                                                       | `string`                                            | `''`      |
| `invisible` | `invisible` | If `true` the step is hidden.                                                       | `boolean`                                           | `false`   |
| `label`     | `label`     | Label for the tab.                                                                  | `string`                                            | `''`      |
| `prevent`   | `prevent`   | Tell's if the linking is done by a router.                                          | `boolean`                                           | `false`   |
| `target`    | `target`    | Specifies where to display the linked URL. Only applies when an `href` is provided. | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"` | `'_self'` |
| `value`     | `value`     | This is the key of the tab.                                                         | `string`                                            | `''`      |


#### Events

| Event         | Description                               | Type                      |
| ------------- | ----------------------------------------- | ------------------------- |
| `balNavigate` | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |


#### Methods

| Method       | Description                               | Type                                          |
| ------------ | ----------------------------------------- | --------------------------------------------- |
| `getOptions` | Options of the tab like label, value etc. | `getOptions() => Promise<BalStepOption>`      |
| `setActive`  | Sets the tab active.                      | `setActive(active: boolean) => Promise<void>` |
 