### bal-carousel
 
#### Properties

| Property           | Attribute           | Description                                                                                                            | Type                                                         | Default   |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------- |
| `aspectRatio`      | `aspect-ratio`      | Defines the image aspect ratio. Should be combined with the interface `product`                                        | `"16by9" `, ` "1by1" `, ` "3by2" `, ` "4by3" `, ` undefined` | `'16by9'` |
| `border`           | `border`            | If `true` a light border is shown at the bottom.                                                                       | `boolean`                                                    | `false`   |
| `controls`         | `controls`          | Defines the layout of the navigation controls.                                                                         | `"dots" `, ` "large" `, ` "none" `, ` "small" `, ` "tabs"`   | `'none'`  |
| `controlsOverflow` | `controls-overflow` | If `true` items move under the controls, instead of having a gap                                                       | `boolean`                                                    | `false`   |
| `controlsSticky`   | `controls-sticky`   | If `true` the controls will be sticky to the top.                                                                      | `boolean`                                                    | `false`   |
| `fullHeight`       | `full-height`       | If `true` the carousel uses the full height                                                                            | `boolean`                                                    | `false`   |
| `interface`        | `interface`         | Defines special looks.                                                                                                 | `"" `, ` "card" `, ` "image" `, ` "product"`                 | `''`      |
| `inverted`         | `inverted`          | If `true` the carousel can be used on dark background                                                                  | `boolean`                                                    | `false`   |
| `itemsPerView`     | `items-per-view`    | Defines how many slides are visible in the container for the user. `auto` will use the size of the actual item content | `"auto" `, ` 1 `, ` 2 `, ` 3 `, ` 4`                         | `1`       |
| `scrollY`          | `scroll-y`          | If `true` vertical scrolling on mobile is enabled.                                                                     | `boolean`                                                    | `true`    |
| `steps`            | `steps`             | When how many slides are moved when going forward or backward.                                                         | `number`                                                     | `1`       |
| `value`            | `value`             | Defines the active slide index.                                                                                        | `number`                                                     | `0`       |


#### Events

| Event       | Description                         | Type                               |
| ----------- | ----------------------------------- | ---------------------------------- |
| `balChange` | Emitted when a option got selected. | `CustomEvent<number \| undefined>` |


#### Methods

| Method     | Description                                                           | Type                                        |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------- |
| `next`     |                                                                       | `next(steps?: number) => Promise<void>`     |
| `previous` | PUBLIC METHODS ------------------------------------------------------ | `previous(steps?: number) => Promise<void>` |
 