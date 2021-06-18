# bal-card

<!-- START: human documentation top -->

Cards contain content and actions about a single subject and can be combined with other components.  

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-card-16></docs-demo-bal-card-16></ClientOnly>


## Inverted style

<ClientOnly><docs-demo-bal-card-17></docs-demo-bal-card-17></ClientOnly>


## With accordion

<ClientOnly><docs-demo-bal-card-18></docs-demo-bal-card-18></ClientOnly>


## With list

The position the action buttons to the right side just add the attribute `right` to the component `bal-card-actions`.

<ClientOnly><docs-demo-bal-card-19></docs-demo-bal-card-19></ClientOnly>


## Summary card

<ClientOnly><docs-demo-bal-card-20></docs-demo-bal-card-20></ClientOnly>


## Service card

<ClientOnly><docs-demo-bal-card-21></docs-demo-bal-card-21></ClientOnly>


## Colors

<ClientOnly><docs-demo-bal-card-22></docs-demo-bal-card-22></ClientOnly>



## API

### bal-card

#### Properties

| Attribute       | Description                                         | Type                                                         | Default |
| :-------------- | :-------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **border**      | If `true` a light blue border is added to the card. | `boolean`                                                    | `false` |
| **color**       | Defines the color of the card.                      | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **flat**        | If `true` the card loses its shadow.                | `boolean`                                                    | `false` |
| **flat-mobile** | If `true` a card will not have a shadow on mobile.  | `boolean`                                                    | `false` |
| **inverted**    | If `true` the card background color becomes blue.   | `boolean`                                                    | `false` |
| **padded**      |                                                     | `boolean`                                                    | `false` |
| **padding**     | Defines the size of the padding grid                | `"" , "form" , "pure"`                                       | `''`    |
| **square**      | If `true` the card loses its border radius.         | `boolean`                                                    | `false` |
| **teaser**      | If `true` the card has a limited width on desktop.  | `boolean`                                                    | `false` |

### bal-card-actions


# bal-card-actions

`bal-card-actions` is a child component of `bal-card` that sets the buttons to the right place.

#### Properties

| Attribute | Description                                     | Type      | Default |
| :-------- | :---------------------------------------------- | :-------- | :------ |
| **right** | If `true` the buttons start form right to left. | `boolean` | `false` |

### bal-card-button


# bal-card-button

`bal-card-button` is a child component of `bal-card` that sets a block button at the end of the card. Good to use for edit functionality.

#### Properties

| Attribute      | Description                                                                         | Type                                       | Default    |
| :------------- | :---------------------------------------------------------------------------------- | :----------------------------------------- | :--------- |
| **disabled**   | If `true`, the user cannot interact with the button.                                | `boolean`                                  | `false`    |
| **href**       | Specifies the URL of the page the link goes to                                      | `string , undefined`                       |            |
| **icon**       | Name of the icon like `edit`.                                                       | `string`                                   | `''`       |
| **icon-right** | Name of the right button icon                                                       | `string`                                   | `''`       |
| **loading**    | If `true` the label is hidden and a loading spinner is shown instead.               | `boolean`                                  | `false`    |
| **target**     | Specifies where to display the linked URL. Only applies when an `href` is provided. | `" _parent" , "_blank" , "_self" , "_top"` | `'_self'`  |
| **type**       | The type of button.                                                                 | `"button" , "reset" , "submit"`            | `'button'` |

### bal-card-content


# bal-card-content

`bal-card-content` is a child component of `bal-card`. It is recommended that any text content for a card should be placed in a `bal-card-content`.


#### Properties

| Attribute    | Description                                  | Type      | Default |
| :----------- | :------------------------------------------- | :-------- | :------ |
| **inverted** | If `true` the card text color becomes white. | `boolean` | `false` |

### bal-card-head


# bal-card-head

`bal-card-head` is a child component of `bal-card` that adds a head element for the service card style.


### bal-card-heading


# bal-card-heading

`bal-card-heading` is a child component of `bal-card` that adds a small heading to the card. It is recommended to use this before the `bal-card-title` component.


### bal-card-steps


# bal-card-steps

`bal-card-steps` is a child component of `bal-card` that adds a wrapper for the bal-tabs.


### bal-card-subtitle


# bal-card-subtitle

`bal-card-subtitle` is a child component of `bal-card` that adds a small subtile below the title. It is recommended to use this after the `bal-card-title` component.

#### Properties

| Attribute    | Description                                  | Type      | Default |
| :----------- | :------------------------------------------- | :-------- | :------ |
| **inverted** | If `true` the card text color becomes white. | `boolean` | `false` |

### bal-card-title


# bal-card-title

`bal-card-title` is a child component of `bal-card` that adds a title to card.

#### Properties

| Attribute    | Description                                  | Type      | Default |
| :----------- | :------------------------------------------- | :-------- | :------ |
| **inverted** | If `true` the card text color becomes white. | `boolean` | `false` |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-card.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-card)
