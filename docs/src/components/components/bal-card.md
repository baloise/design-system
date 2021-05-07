# bal-card

<!-- START: human documentation top -->

The card component is a versatile component that can be combined easily wiht other componets.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-card-15></docs-demo-bal-card-15></ClientOnly>

```html
<bal-card>
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

  <bal-card-content> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </bal-card-content>

  <bal-card-actions>
    <bal-button>Action</bal-button>
    <bal-button>Action 2</bal-button>
  </bal-card-actions>
</bal-card>
```

## Inverted style

<ClientOnly>  <docs-demo-bal-card-16></docs-demo-bal-card-16></ClientOnly>

```html
<bal-card color="info" inverted>
  <bal-card-title inverted>BaloiseCombi</bal-card-title>
  <bal-card-subtitle inverted>Police number 70/2.937.458</bal-card-subtitle>

  <bal-card-content inverted>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </bal-card-content>

  <bal-card-actions right>
    <bal-button inverted>Action</bal-button>
    <bal-button inverted>Action 2</bal-button>
  </bal-card-actions>
</bal-card>
```

## With accordion

<ClientOnly>  <docs-demo-bal-card-17></docs-demo-bal-card-17></ClientOnly>

```html
<bal-card>
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>

  <bal-accordion card>
    <p class="has-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </bal-accordion>
</bal-card>
```

## With list

The position the action buttons to the right side just add the attribute `right` to the component `bal-card-actions`.

<ClientOnly>  <docs-demo-bal-card-18></docs-demo-bal-card-18></ClientOnly>

```html
<bal-card>
  <bal-card-title>News</bal-card-title>

  <bal-card-content>
    <bal-list border>
      <bal-list-item>
        <bal-list-item-content>
          <bal-list-item-title>News A</bal-list-item-title>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-large"></bal-icon>
        </bal-list-item-icon>
      </bal-list-item>
      <bal-list-item>
        <bal-list-item-content>
          <bal-list-item-title>News B</bal-list-item-title>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-large"></bal-icon>
        </bal-list-item-icon>
      </bal-list-item>
    </bal-list>
  </bal-card-content>

  <bal-card-actions right>
    <bal-button type="is-link">More</bal-button>
  </bal-card-actions>
</bal-card>
```

## Summary card

<ClientOnly>  <docs-demo-bal-card-19></docs-demo-bal-card-19></ClientOnly>

```html
<bal-card border flat>
  <bal-card-heading>Insured vehicle</bal-card-heading>
  <bal-card-title>Cupra Ateca</bal-card-title>
  <bal-card-subtitle>Running time: 21.07.2019 - 21.07.2021</bal-card-subtitle>

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

  <bal-card-button icon="edit">Edit</bal-card-button>
</bal-card>
```

## Service card

<ClientOnly>  <docs-demo-bal-card-20></docs-demo-bal-card-20></ClientOnly>

```html
<bal-card>
  <bal-card-head>
    <img src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
    <div>
      <h4 class="title is-size-4">Baustein Parkschaden <small class="is-hidden-touch">(+ CHF 11.30)</small></h4>
      <h5 class="subtitle is-size-5 is-hidden-desktop">+ CHF 11.30</h5>
      <p class="has-text-blue-light-text is-hidden-touch">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</p>
    </div>
    <bal-checkbox checked interface="switch"></bal-checkbox>
  </bal-card-head>

  <bal-card-content class="is-hidden-desktop">
    <p class="has-text-blue-light-text">Schäden am parkierten Fahrzeug durch unbekannte Dritte.</p>
  </bal-card-content>

  <bal-accordion card open-label="Details einblenden" close-label="Details ausblenden">
    <p class="has-padding has-text-blue-light-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
  </bal-accordion>
</bal-card>
```

## Colors

<ClientOnly>  <docs-demo-bal-card-21></docs-demo-bal-card-21></ClientOnly>

```html
<bal-card>
  <bal-card-content>Default</bal-card-content>
</bal-card>
<br>
<bal-card inverted color="primary">
  <bal-card-content>Primary</bal-card-content>
</bal-card>
<br>
<bal-card inverted color="info">
  <bal-card-content>Info</bal-card-content>
</bal-card>
<br>
<bal-card inverted color="success">
  <bal-card-content>Success</bal-card-content>
</bal-card>
<br>
<bal-card inverted color="warning">
  <bal-card-content>Warning</bal-card-content>
</bal-card>
<br>
<bal-card inverted color="danger">
  <bal-card-content>Danger</bal-card-content>
</bal-card>
```


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

| Attribute | Description                   | Type     | Default |
| :-------- | :---------------------------- | :------- | :------ |
| **icon**  | Name of the icon like `edit`. | `string` | `''`    |

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

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-card.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-card)
