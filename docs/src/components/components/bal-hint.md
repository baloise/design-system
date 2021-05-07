# bal-hint

<!-- START: human documentation top -->

A hint hides content with some additional description and shows it by clicking the icon.
It can easily combined with the `bal-data` or `bal-field` component.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-hint-46></docs-demo-bal-hint-46></ClientOnly>

```html
<bal-hint>
  <bal-hint-title>Spider-Man</bal-hint-title>
  <bal-hint-text>
    Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15
    (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies, television shows, and
    video game adaptations set in the Marvel Universe.
  </bal-hint-text>
</bal-hint>
```

## Field

<ClientOnly>  <docs-demo-bal-hint-47></docs-demo-bal-hint-47></ClientOnly>

```html
<bal-field expanded>
  <bal-field-label required>Firstname</bal-field-label>
  <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
  <bal-field-control>
    <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
  </bal-field-control>
  <bal-field-message color="danger">Required Field</bal-field-message>
</bal-field>
```


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

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-hint.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-hint)
