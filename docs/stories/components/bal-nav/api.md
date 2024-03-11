### bal-nav
 
#### Properties

| Property  | Attribute | Description           | Type                            | Default     |
| --------- | --------- | --------------------- | ------------------------------- | ----------- |
| `buttons` | --        | Link level structure. | `BalNavMetaButton[]`            | `[]`        |
| `logo`    | --        | Link level structure. | `BalNavLogoLink `, ` undefined` | `undefined` |
| `options` | --        | Link level structure. | `BalNavMetaLinkItem[]`          | `[]`        |


#### Events

| Event             | Description                                                                          | Type                             |
| ----------------- | ------------------------------------------------------------------------------------ | -------------------------------- |
| `balNavItemClick` | Emitted when a nav link item is clicked. This event can be used to add data tracking | `CustomEvent<BalNavClickedItem>` |


 