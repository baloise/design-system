# bal-data

<!-- START: human documentation top -->

A data component display readonly form data.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-data-28></docs-demo-bal-data-28></ClientOnly>

```html
<bal-card>
  <bal-card-content>
    <bal-data border>
      <bal-data-item>
        <bal-data-label>Tony</bal-data-label>
        <bal-data-value>Stark</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label required>Steve</bal-data-label>
        <bal-data-value>Rogers</bal-data-value>
      </bal-data-item>
      <bal-data-item disabled>
        <bal-data-label>Nick</bal-data-label>
        <bal-data-value>Fury</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>
          Peter
          <bal-hint>
            <bal-hint-title>Spider-Man</bal-hint-title>
            <bal-hint-text>
              Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing
              Fantasy #15 (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies,
              television shows, and video game adaptations set in the Marvel Universe.
            </bal-hint-text>
          </bal-hint>
        </bal-data-label>
        <bal-data-value>Parker</bal-data-value>
      </bal-data-item>
    </bal-data>
  </bal-card-content>
</bal-card>
```

## Horizontal

<ClientOnly>  <docs-demo-bal-data-29></docs-demo-bal-data-29></ClientOnly>

```html
<bal-card>
  <bal-card-content>
    <bal-data horizontal>
      <bal-data-item>
        <bal-data-label>Tony</bal-data-label>
        <bal-data-value>Stark</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Steve</bal-data-label>
        <bal-data-value>Rogers</bal-data-value>
      </bal-data-item>
      <bal-data-item>
        <bal-data-label>Stephen</bal-data-label>
        <bal-data-value>Strange</bal-data-value>
      </bal-data-item>
    </bal-data>
  </bal-card-content>
</bal-card>
```


## API

### bal-data

#### Properties

| Attribute      | Description                                                | Type      | Default |
| :------------- | :--------------------------------------------------------- | :-------- | :------ |
| **border**     | If `true` a bottom border is added to the data-item.       | `boolean` | `false` |
| **horizontal** | If `true` the data list is horizontal instead of vertical. | `boolean` | `false` |

### bal-data-item


# bal-data-item

`bal-data-item` is a child component of `bal-data` that adds a new row item.


#### Properties

| Attribute    | Description                                   | Type      | Default |
| :----------- | :-------------------------------------------- | :-------- | :------ |
| **disabled** | If `true` the item gets a lighter font color. | `boolean` | `false` |

### bal-data-label


# bal-data-item-label

`bal-data-item` is a child component of `bal-data` that defines the label of the data.

#### Properties

| Attribute    | Description                                    | Type      | Default |
| :----------- | :--------------------------------------------- | :-------- | :------ |
| **required** | If `true` an asterix is added after the label. | `boolean` | `false` |

### bal-data-value


# bal-data-item-value

`bal-data-item` is a child component of `bal-data` that defines the value of the data.




<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-data.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-data)
