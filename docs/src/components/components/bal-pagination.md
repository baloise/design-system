# bal-pagination

<!-- START: human documentation top -->

A pagination is used with large amount of content to distribute it over multpile pages.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-pagination-70></docs-demo-bal-pagination-70></ClientOnly>

```html
<bal-pagination value="2" page-range="3" total-pages="20"></bal-pagination>
```


## API

### bal-pagination

#### Properties

| Attribute       | Description                                                      | Type      | Default |
| :-------------- | :--------------------------------------------------------------- | :-------- | :------ |
| **disabled**    | Disables component                                               | `boolean` | `false` |
| **page-range**  | Specify the max visible pages before and after the selected page | `number`  | `2`     |
| **total-pages** | The total amount of pages                                        | `number`  | `1`     |
| **value**       | Current selected page                                            | `number`  | `1`     |

#### Events

| Event         | Description                         | Type     |
| :------------ | :---------------------------------- | :------- |
| **balChange** | Triggers when a page change happens | `number` |

#### Methods

| Method         | Description            | Signature                     |
| :------------- | :--------------------- | :---------------------------- |
| **`next`**     | Go to the next page    | `next() => Promise<void>`     |
| **`previous`** | Go to the prvious page | `previous() => Promise<void>` |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-pagination.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-pagination)
