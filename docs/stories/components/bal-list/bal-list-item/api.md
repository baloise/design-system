### bal-list-item
 
#### Properties

| Property           | Attribute            | Description                                                                                                                                                                                                                                                                               | Type                                                | Default     |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------- |
| `accordion`        | `accordion`          | If `true` the list item can be used as a accordion                                                                                                                                                                                                                                        | `boolean`                                           | `false`     |
| `clickable`        | `clickable`          | If `true` the list item shows that it is clickable                                                                                                                                                                                                                                        | `boolean`                                           | `false`     |
| `disabled`         | `disabled`           | If `true` the list item can be hovered                                                                                                                                                                                                                                                    | `boolean`                                           | `false`     |
| `download`         | `download`           | This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). | `string `, ` undefined`                             | `undefined` |
| `href`             | `href`               | Specifies the URL of the page the link goes to                                                                                                                                                                                                                                            | `string`                                            | `''`        |
| `selected`         | `selected`           | If `true` the list item has a selected theme                                                                                                                                                                                                                                              | `boolean`                                           | `false`     |
| `subAccordionItem` | `sub-accordion-item` | If `true` the list item can be used as an accordion inside another accordion                                                                                                                                                                                                              | `boolean`                                           | `false`     |
| `target`           | `target`             | Specifies where to open the linked document                                                                                                                                                                                                                                               | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"` | `'_self'`   |


#### Events

| Event                  | Description                                     | Type                      |
| ---------------------- | ----------------------------------------------- | ------------------------- |
| `balDidAnimate`        | Emitted after the animation has finished        | `CustomEvent<boolean>`    |
| `balGroupStateChanged` | Emitted when the state of the group is changing | `CustomEvent<MouseEvent>` |
| `balNavigate`          | Emitted when the link element has clicked       | `CustomEvent<MouseEvent>` |
| `balWillAnimate`       | Emitted before the animation starts             | `CustomEvent<boolean>`    |


#### Methods

| Method    | Description            | Type                                               |
| --------- | ---------------------- | -------------------------------------------------- |
| `dismiss` | Closes the accordion   | `dismiss(ignoreNested?: boolean) => Promise<void>` |
| `present` | Opens the accordion    | `present() => Promise<void>`                       |
| `toggle`  | Triggers the accordion | `toggle() => Promise<void>`                        |
 