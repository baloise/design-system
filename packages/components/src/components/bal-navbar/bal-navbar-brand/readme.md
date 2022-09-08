### bal-navbar-brand
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property     | Attribute     | Description                                                                                                                                                                          | Type                    | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ----------- |
| `href`       | `href`        | Link of the logo / title.                                                                                                                                                            | `string `, ` undefined` | `undefined` |
| `linkTarget` | `link-target` | Link target                                                                                                                                                                          | `string`                | `'_blank'`  |
| `logo`       | `logo`        | Src to display a logo -> replaces the default Baloise Logo                                                                                                                           | `string `, ` undefined` | `undefined` |
| `simple`     | `simple`      | <span style="color:red">**[DEPRECATED]**</span> Use interface on bal-navbar instead. If `true` the navbar does not have a mobil version. Only shows logo and an app title.<br/><br/> | `boolean`               | `false`     |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                               | Type                      |
| ------------- | ----------------------------------------- | ------------------------- |
| `balNavigate` | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |


 