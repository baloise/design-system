# bal-dropdown

<!-- START: human documentation top -->

A dropdown shows and hides content close to the trigger element.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-dropdown-39></docs-demo-bal-dropdown-39></ClientOnly>

```html
<bal-dropdown id="bal-dropdown-1" is-active="false" data-test-id="dropdown">
  <bal-dropdown-trigger>
    <bal-button id="bal-dropdown-1-trigger" aria-haspopup="true" aria-controls="dropdown-menu" color="is-info" outlined>
      <span id="bal-dropdown-1-trigger-label">Trigger</span>
    </bal-button>
  </bal-dropdown-trigger>
  <bal-dropdown-menu scrollable="100">
    <div style="padding: 0 15px 15px">
      <h5 class="title is-size-3" style="margin-top: 0px">Title</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo
        dolor aperiam perferendis mollitia facilis harum vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque
        error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero.
      </p>
    </div>
  </bal-dropdown-menu>
</bal-dropdown>
```

## Input

<ClientOnly>  <docs-demo-bal-dropdown-40></docs-demo-bal-dropdown-40></ClientOnly>

```html
<bal-dropdown id="bal-dropdown-2" scrollable="200" expanded>
  <bal-dropdown-trigger>
    <div class="control has-icons-right">
      <input type="text" class="input clickable" placeholder="Click me" readonly id="bal-dropdown-2-trigger" >
      <bal-icon name="caret-down" color="info" size="xsmall" ></bal-icon>
    </div>
  </bal-dropdown-trigger>
  <bal-dropdown-menu>
    <div style="padding: 0 15px 15px">
      <h5 class="title is-size-3" style="margin-top: 0px">Some Content</h5>
      <p>Some text</p>
    </div>
  </bal-dropdown-menu>
</bal-dropdown>
```


## API

### bal-dropdown

#### Properties

| Attribute               | Description                                      | Type      | Default |
| :---------------------- | :----------------------------------------------- | :-------- | :------ |
| **expanded**            | If `true` the field spans over the whole width.  | `boolean` | `false` |
| **fixed-content-width** | If `true` the dropdown content has a fixed width | `boolean` | `false` |
| **is-active**           | If `true` the dropdown content is open.          | `boolean` | `false` |

#### Events

| Event                  | Description                                                                     | Type      |
| :--------------------- | :------------------------------------------------------------------------------ | :-------- |
| **balCollapse**        | Listen when the dropdown opens or closes. Returns the current `isActive` value. | `boolean` |
| **balDropdownPrepare** | *Internal* - Use this to close unuesed dropdowns.                               | `string`  |

#### Methods

| Method                  | Description                                         | Signature                                            |
| :---------------------- | :-------------------------------------------------- | :--------------------------------------------------- |
| **`close`**             | Closes the dropdown menu.                           | `close() => Promise<void>`                           |
| **`getContentElement`** | Returns the `HTMLDivElement` of the content element | `getContentElement() => Promise<HTMLElement | null>` |
| **`open`**              | Open the dropdown menu.                             | `open() => Promise<void>`                            |
| **`toggle`**            | Open or closes the dropdown.                        | `toggle() => Promise<void>`                          |

### bal-dropdown-menu


# bal-dropdown-menu

`bal-dropdown-menu` is a child component of `bal-dropdown` that defines the value of the data.

#### Properties

| Attribute      | Description                                                         | Type     | Default |
| :------------- | :------------------------------------------------------------------ | :------- | :------ |
| **scrollable** | Limit the height of the dropdown content. Pass the amount of pixel. | `number` | `0`     |

### bal-dropdown-trigger


# bal-dropdown-trigger

`bal-dropdown-trigger` is a child component of `bal-dropdown` that defines the value of the data.


## Testing

### DropdownAccessor

DropdownAccessor is a helper object for E-2-E testing.
It maps the dropdown behaviour to the `bal-dropdown` ui component.

```typescript
import { dataTestSelector, DropdownAccessor } from '@baloise/ui-library-testing'

describe('Dropdown', () => {
  it('should ...', () => {
     const dropdown = DropdownAccessor(dataTestSelector('dropdown-id')).get()
     dropdown.click()
 })
})
```

#### Methods

| Method    | Description         | Arguments                                 |
| :-------- | :------------------ | :---------------------------------------- |
| **click** | Clicks the dropdown | `options?: Partial<Cypress.ClickOptions>` |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-dropdown.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-dropdown)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/dropdown.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balDropdown"></docs-component-script>
</ClientOnly>
