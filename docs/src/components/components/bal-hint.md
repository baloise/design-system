# bal-hint

<!-- START: human documentation top -->

A hint hides content with some additional description and shows it by clicking the icon.
It can easily combined with the `bal-data` or `bal-field` component.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-hint-50></docs-demo-bal-hint-50></ClientOnly>


## Field

<ClientOnly><docs-demo-bal-hint-51></docs-demo-bal-hint-51></ClientOnly>



## API

### bal-hint

#### Properties

| Attribute       | Description                                         | Type      | Default   |
| :-------------- | :-------------------------------------------------- | :-------- | :-------- |
| **close-label** | Text for the close button.                          | `string`  | `'Close'` |
| **disabled**    | If `true`, the user cannot interact with the input. | `boolean` | `false`   |

#### Methods

| Method       | Description           | Signature                   |
| :----------- | :-------------------- | :-------------------------- |
| **`close`**  | Closes the hint box.  | `close() => Promise<void>`  |
| **`open`**   | Opens the hint box.   | `open() => Promise<void>`   |
| **`toggle`** | Toggles the hint box. | `toggle() => Promise<void>` |

### bal-hint-text


# bal-hint-text

`bal-hint-text` is a child component of `bal-hint` that defines the text of the hint dialog.



### bal-hint-title


# bal-hint-title

`bal-hint-title` is a child component of `bal-hint` that defines the title of the hint dialog.





<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-hint.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-hint)
