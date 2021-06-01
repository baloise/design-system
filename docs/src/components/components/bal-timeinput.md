# bal-timeinput

<!-- START: human documentation top -->

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-timeinput-107></docs-demo-bal-timeinput-107></ClientOnly>


## Inverted style

<ClientOnly><docs-demo-bal-timeinput-108></docs-demo-bal-timeinput-108></ClientOnly>


## Min and max time

<ClientOnly><docs-demo-bal-timeinput-109></docs-demo-bal-timeinput-109></ClientOnly>


## Disabled

<ClientOnly><docs-demo-bal-timeinput-110></docs-demo-bal-timeinput-110></ClientOnly>



## API

### bal-timeinput

#### Properties

| Attribute    | Description                                             | Type      | Default |
| :----------- | :------------------------------------------------------ | :-------- | :------ |
| **disabled** | If `true` the button is disabled                        | `boolean` | `false` |
| **inverted** | If `true` the timeinput can be used on blue background. | `boolean` | `false` |
| **max-time** | Latest date available for selection                     | `string`  | `''`    |
| **min-time** | Earliest date available for selection                   | `string`  | `''`    |
| **value**    | The value of the datepicker with the format `hh:mm`.    | `string`  | `''`    |

#### Events

| Event         | Description                                                                                                                                                    | Type         |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **balBlur**   | Emitted when either the hour or minute input field loses focus.                                                                                                | `FocusEvent` |
| **balChange** | Emitted when either the hour or the minute input has changed.
It will not be triggert if either hour or time input has never been set (i.e. "--" is selected). | `string`     |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-timeinput.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-timeinput)
