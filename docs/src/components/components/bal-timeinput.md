# bal-timeinput

<!-- START: human documentation top -->

<!-- END: human documentation top -->

## Basic

<ClientOnly> <docs-demo-bal-timeinput-101></docs-demo-bal-timeinput-101></ClientOnly>

```html
<bal-timeinput id="bal-timeinput-example" value="12:30"></bal-timeinput>
```

## Inverted style

<ClientOnly> <docs-demo-bal-timeinput-102></docs-demo-bal-timeinput-102></ClientOnly>

```html
<bal-timeinput id="bal-timeinput-example" value="12:30" inverted></bal-timeinput>
```

## Min and max time

<ClientOnly> <docs-demo-bal-timeinput-103></docs-demo-bal-timeinput-103></ClientOnly>

```html
<bal-timeinput value="12:30" min-time="09:30" max-time="18:00"></bal-timeinput>
```

## Disabled

<ClientOnly> <docs-demo-bal-timeinput-104></docs-demo-bal-timeinput-104></ClientOnly>

```html
<bal-timeinput value="23:10" disabled></bal-timeinput>
```

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

| Event                                                                                            | Description                                                     | Type         |
| :----------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :----------- |
| **balBlur**                                                                                      | Emitted when either the hour or minute input field loses focus. | `FocusEvent` |
| **balChange**                                                                                    | Emitted when either the hour or the minute input has changed.   |
| It will not be triggert if either hour or time input has never been set (i.e. "--" is selected). | `string`                                                        |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->

## Links

- [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-timeinput)
