### bal-navbar-brand
 
#### Properties

| Property   | Attribute   | Description                                                                                                                                                                          | Type                                                | Default     |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ----------- |
| `animated` | `animated`  | Defines if the logo animation should be active                                                                                                                                       | `boolean`                                           | `true`      |
| `href`     | `href`      | Link of the logo / title.                                                                                                                                                            | `string `, ` undefined`                             | `''`        |
| `logo`     | `logo`      | Src to display a logo -> replaces the default Baloise Logo                                                                                                                           | `string `, ` undefined`                             | `undefined` |
| `logoSize` | `logo-size` | Size of the logo SVG                                                                                                                                                                 | `"" `, ` "small"`                                   | `''`        |
| `simple`   | `simple`    | <span style="color:red">**[DEPRECATED]**</span> Use interface on bal-navbar instead. If `true` the navbar does not have a mobil version. Only shows logo and an app title.<br/><br/> | `boolean`                                           | `false`     |
| `target`   | `target`    | Specifies where to display the linked URL. Only applies when an `href` is provided.                                                                                                  | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"` | `'_self'`   |


#### Events

| Event            | Description                               | Type                      |
| ---------------- | ----------------------------------------- | ------------------------- |
| `balDidAnimate`  | Emitted after the animation has finished  | `CustomEvent<boolean>`    |
| `balNavigate`    | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |
| `balWillAnimate` | Emitted before the animation starts       | `CustomEvent<boolean>`    |


 