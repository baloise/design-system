# bal-list

A list present content in a way that makes it easy to identify a specific item in a collection.

## Basic

<ClientOnly>  <docs-demo-bal-list-56></docs-demo-bal-list-56></ClientOnly>

```html
<bal-card>
  <bal-card-content>
    <bal-list disabled>
      <bal-list-item>
        <bal-list-item-content>
          <bal-list-item-title>Single-line item</bal-list-item-title>
        </bal-list-item-content>
      </bal-list-item>
      <bal-list-item>
        <bal-list-item-content>
          <bal-list-item-title>Two-line item</bal-list-item-title>
          <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
        </bal-list-item-content>
      </bal-list-item>
    </bal-list>
  </bal-card-content>
</bal-card>
```

## With borders

<ClientOnly>  <docs-demo-bal-list-57></docs-demo-bal-list-57></ClientOnly>

```html
<bal-card>
  <bal-card-content>
    <bal-list border>
      <bal-list-item clickable>
        <bal-list-item-content>
          <bal-list-item-title>Single-line item</bal-list-item-title>
        </bal-list-item-content>
      </bal-list-item>
      <bal-list-item clickable selected>
        <bal-list-item-content>
          <bal-list-item-title>Selected item</bal-list-item-title>
        </bal-list-item-content>
      </bal-list-item>
      <bal-list-item disabled>
        <bal-list-item-content>
          <bal-list-item-title>Two-line item</bal-list-item-title>
          <bal-list-item-subtitle>Disabled item</bal-list-item-subtitle>
        </bal-list-item-content>
      </bal-list-item>
    </bal-list>
  </bal-card-content>
</bal-card>
```

## Inverted

<ClientOnly>  <docs-demo-bal-list-58></docs-demo-bal-list-58></ClientOnly>

```html
<bal-card inverted color="info">
  <bal-card-content>
    <bal-list inverted border>
      <bal-list-item>
        <bal-list-item-content>
          <bal-list-item-title>Two-line item</bal-list-item-title>
          <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
        </bal-list-item-content>
      </bal-list-item>
      <bal-list-item>
        <bal-list-item-content>
          <bal-list-item-title>Two-line item</bal-list-item-title>
          <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
        </bal-list-item-content>
      </bal-list-item>
    </bal-list>
  </bal-card-content>
</bal-card>
```

## With Icons

<ClientOnly>  <docs-demo-bal-list-59></docs-demo-bal-list-59></ClientOnly>

```html
<bal-card>
  <bal-card-content>
    <bal-list>
      <bal-list-item>
        <bal-list-item-icon>
          <bal-icon name="account"></bal-icon>
        </bal-list-item-icon>
        <bal-list-item-content>
          <bal-list-item-title>Tony Stark</bal-list-item-title>
          <bal-list-item-subtitle>Stark Industries</bal-list-item-subtitle>
        </bal-list-item-content>
      </bal-list-item>
      <bal-list-item>
        <bal-list-item-icon>
          <bal-icon name="check"></bal-icon>
        </bal-list-item-icon>
        <bal-list-item-content>
          <bal-list-item-title class="has-text-black">Avenger</bal-list-item-title>
        </bal-list-item-content>
      </bal-list-item>
      <bal-list-item>
        <bal-list-item-icon>
          <bal-icon name="document"></bal-icon>
        </bal-list-item-icon>
        <bal-list-item-content>
          <bal-list-item-title>Document.pdf</bal-list-item-title>
          <bal-list-item-subtitle>20.03.1998</bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="download"></bal-icon>
        </bal-list-item-icon>
      </bal-list-item>
    </bal-list>
  </bal-card-content>
</bal-card>
```

## Link

<ClientOnly>  <docs-demo-bal-list-60></docs-demo-bal-list-60></ClientOnly>

```html
<bal-card>
  <bal-card-content>
    <bal-list>
      <bal-list-item href="https://google.com" target="_blank">
        <bal-list-item-content>
          <bal-list-item-title>Link A</bal-list-item-title>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
        </bal-list-item-icon>
      </bal-list-item>
      <bal-list-item disabled>
        <bal-list-item-content>
          <bal-list-item-title>Disabled Link B</bal-list-item-title>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
        </bal-list-item-icon>
      </bal-list-item>
    </bal-list>
  </bal-card-content>
</bal-card>
```


## API

### bal-list

#### Properties

| Attribute    | Description                                        | Type      | Default |
| :----------- | :------------------------------------------------- | :-------- | :------ |
| **border**   | If `true` each list item has a bottom border       | `boolean` | `false` |
| **disabled** | If `true` the list item can be hovered             | `boolean` | `false` |
| **inverted** | If `true` the list can be used on a dark backround | `boolean` | `false` |

### bal-list-item


# bal-list-item


#### Properties

| Attribute     | Description                                        | Type                                       | Default   |
| :------------ | :------------------------------------------------- | :----------------------------------------- | :-------- |
| **clickable** | If `true` the list item shows that it is clickable | `boolean`                                  | `false`   |
| **disabled**  | If `true` the list item can be hovered             | `boolean`                                  | `false`   |
| **href**      | Specifies the URL of the page the link goes to     | `string`                                   | `''`      |
| **selected**  | If `true` the list item has a selected theme       | `boolean`                                  | `false`   |
| **target**    | Specifies where to open the linked document        | `" _parent" , "_blank" , "_self" , "_top"` | `'_self'` |

#### Events

| Event           | Description                               | Type         |
| :-------------- | :---------------------------------------- | :----------- |
| **balNavigate** | Emitted when the link element has clicked | `MouseEvent` |

### bal-list-item-content


# bal-list-item-content





### bal-list-item-icon


# bal-list-item-icon

`bal-list-item-subtitle` is a child component of `bal-list` that defines the subtitle list row element.

#### Properties

| Attribute | Description                                                                         | Type      | Default |
| :-------- | :---------------------------------------------------------------------------------- | :-------- | :------ |
| **right** | If `true` the icon is on the right side of the list item. Default is the left side. | `boolean` | `false` |

### bal-list-item-subtitle


# bal-list-item-subtitle

`bal-list-item-subtitle` is a child component of `bal-list` that defines the subtitle list row element.


### bal-list-item-title


# bal-list-item-title

`bal-list-item-title` is a child component of `bal-list` that defines the title list row element.


## Testing

### ListAccessor



#### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **select**                 | Selects the element from the list                                                                                  | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **assertVisible**          | Assert that the component is visible for the user                                                                  |                                                          |
| **assertNotVisible**       | Assert that the component is not visible for the user                                                              |                                                          |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |




## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-list)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/list.accessor.ts)
