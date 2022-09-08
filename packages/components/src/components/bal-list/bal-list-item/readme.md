### bal-list-item
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property           | Attribute            | Description                                                                  | Type                                                | Default   |
| ------------------ | -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- | --------- |
| `accordion`        | `accordion`          | If `true` the list item can be used as a accordion                           | `boolean`                                           | `false`   |
| `clickable`        | `clickable`          | If `true` the list item shows that it is clickable                           | `boolean`                                           | `false`   |
| `disabled`         | `disabled`           | If `true` the list item can be hovered                                       | `boolean`                                           | `false`   |
| `href`             | `href`               | Specifies the URL of the page the link goes to                               | `string`                                            | `''`      |
| `selected`         | `selected`           | If `true` the list item has a selected theme                                 | `boolean`                                           | `false`   |
| `subAccordionItem` | `sub-accordion-item` | If `true` the list item can be used as an accordion inside another accordion | `boolean`                                           | `false`   |
| `target`           | `target`             | Specifies where to open the linked document                                  | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"` | `'_self'` |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                               | Type                      |
| ------------- | ----------------------------------------- | ------------------------- |
| `balNavigate` | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |


 