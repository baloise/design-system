# bal-list

<!-- START: human documentation top -->

A list present content in a way that makes it easy to identify a specific item in a collection.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-list-62></docs-demo-bal-list-62></ClientOnly>


## With borders

<ClientOnly><docs-demo-bal-list-63></docs-demo-bal-list-63></ClientOnly>


## Inverted

<ClientOnly><docs-demo-bal-list-64></docs-demo-bal-list-64></ClientOnly>


## With Icons

<ClientOnly><docs-demo-bal-list-65></docs-demo-bal-list-65></ClientOnly>


## Link

<ClientOnly><docs-demo-bal-list-66></docs-demo-bal-list-66></ClientOnly>



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

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-list.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-list)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/list.accessor.ts)
