# bal-field

<!-- START: human documentation top -->

A field wrappes a form field like input. It provides a clear style structure of each control.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-field-42></docs-demo-bal-field-42></ClientOnly>


## Inverted

<ClientOnly><docs-demo-bal-field-43></docs-demo-bal-field-43></ClientOnly>


## Form

<ClientOnly><docs-demo-bal-field-44></docs-demo-bal-field-44></ClientOnly>


## Validation for all fields

This is not a recommanded validation style. Only use this style if you do not have the possibility to use live validation.

<ClientOnly><docs-demo-bal-field-45></docs-demo-bal-field-45></ClientOnly>



## API

### bal-field

#### Properties

| Attribute    | Description                                                                                 | Type      | Default |
| :----------- | :------------------------------------------------------------------------------------------ | :-------- | :------ |
| **disabled** | If `true` the field loses opacity                                                           | `boolean` | `false` |
| **expanded** | If `true` the component takes the whole width                                               | `boolean` | `false` |
| **invalid**  | If `true` the component gets a invalid style. Only use this if there is no live validation. | `boolean` | `false` |
| **inverted** | If `true` the field can be used on blue background.                                         | `boolean` | `false` |
| **loading**  | If `true` a loading spinner is visible at the end of the input                              | `boolean` | `false` |

### bal-field-control


# bal-field-control

`bal-field-control` is a child component of `bal-field`.


#### Properties

| Attribute      | Description                                                    | Type      | Default |
| :------------- | :------------------------------------------------------------- | :-------- | :------ |
| **icon-left**  | Baloise icon for the left side of the input                    | `string`  | `''`    |
| **icon-right** | Baloise icon for the right side of the input                   | `string`  | `''`    |
| **inverted**   | If `true` the field can be used on blue background.            | `boolean` | `false` |
| **loading**    | If `true` a loading spinner is visible at the end of the input | `boolean` | `false` |

### bal-field-hint


# bal-field-hint

`bal-field-hint` is a child component of `bal-field`.

#### Properties

| Attribute   | Description              | Type     | Default |
| :---------- | :----------------------- | :------- | :------ |
| **subject** | Text of the inputs label | `string` | `''`    |

### bal-field-label


# bal-field-label

`bal-field-label` is a child component of `bal-field`.


#### Properties

| Attribute    | Description                                        | Type      | Default |
| :----------- | :------------------------------------------------- | :-------- | :------ |
| **required** | If `true` a asterix (*) is added to the label text | `boolean` | `false` |

### bal-field-message


# bal-field-message

`bal-field-message` is a child component of `bal-field`.


#### Properties

| Attribute | Description                       | Type                                    | Default |
| :-------- | :-------------------------------- | :-------------------------------------- | :------ |
| **color** | Defines the color of the message. | `"" , "danger" , "success" , "warning"` | `''`    |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-field.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-field)
