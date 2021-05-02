# bal-navbar

<!-- START: human documentation top -->

A responsive horizontal navbar that can support images, links, buttons, and dropdowns.

::: tip
Logos and images of Baloise can be found [here](https://www.baloise.com/de/home/ueber-uns/wer-wir-sind/bilder-logos.html)
:::

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-navbar-64></docs-demo-bal-navbar-64></ClientOnly>

```html
<bal-navbar>
  <bal-navbar-brand>
    <bal-icon name="logo" inverted size="large"></bal-icon>
    <bal-text style="margin-left: 15px"><strong>App</strong> Title</bal-text>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <a class="navbar-item"><bal-text>Home</bal-text></a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"><bal-text>Language</bal-text></a>
        <div class="navbar-dropdown">
          <a class="navbar-item"><bal-text>English</bal-text></a>
          <a class="navbar-item"><bal-text>German</bal-text></a>
          <a class="navbar-item"><bal-text>French</bal-text></a>
          <hr class="navbar-divider" >
          <a class="navbar-item"><bal-text>Support</bal-text></a>
        </div>
      </div>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button inverted>Logout</bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>
```

## Light

<ClientOnly>  <docs-demo-bal-navbar-65></docs-demo-bal-navbar-65></ClientOnly>

```html
<bal-navbar light>
  <bal-navbar-brand>
    <img src="https://github.com/baloise/ui-library/raw/master/resources/images/logo.svg" >
    <bal-text style="margin-left: 15px"><strong>App</strong> Title</bal-text>
  </bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
      <a class="navbar-item"><bal-text>Home</bal-text></a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"><bal-text>Language</bal-text></a>
        <div class="navbar-dropdown">
          <a class="navbar-item"><bal-text>English</bal-text></a>
          <a class="navbar-item"><bal-text>German</bal-text></a>
          <a class="navbar-item"><bal-text>French</bal-text></a>
          <hr class="navbar-divider" >
          <a class="navbar-item"><bal-text>Support</bal-text></a>
        </div>
      </div>
    </bal-navbar-menu-start>
    <bal-navbar-menu-end>
      <bal-button>Logout</bal-button>
    </bal-navbar-menu-end>
  </bal-navbar-menu>
</bal-navbar>
```


## API

### bal-navbar

#### Properties

| Attribute     | Description                                  | Type      | Default |
| :------------ | :------------------------------------------- | :-------- | :------ |
| **expanded**  | It `true` the component uses the whole width | `boolean` | `false` |
| **light**     | It `true` the navbar has a white background  | `boolean` | `false` |
| **no-burger** | It `true` the burger button is hidden        | `boolean` | `false` |

### bal-navbar-brand


# bal-navbar-brand 

`bal-navbar-brand` is a child component of `bal-navbar` that defines the area in the navbar where the logo or the title of the applications is.


#### Properties

| Attribute | Description               | Type     | Default |
| :-------- | :------------------------ | :------- | :------ |
| **href**  | Link of the logo / title. | `string` | `'/'`   |

#### Events

| Event           | Description                               | Type         |
| :-------------- | :---------------------------------------- | :----------- |
| **balNavigate** | Emitted when the link element has clicked | `MouseEvent` |

### bal-navbar-menu


# bal-navbar-menu 

`bal-navbar-menu` is a child component of `bal-navbar` that defines the area in the navbar where links and actions are.



#### Methods

| Method       | Description                                                             | Signature                                        |
| :----------- | :---------------------------------------------------------------------- | :----------------------------------------------- |
| **`toggle`** | *Internal* - If the menu is open it closes it and the other way around. | `toggle(isMenuActive: boolean) => Promise<void>` |

### bal-navbar-menu-end


# bal-navbar-menu-start 

`bal-navbar-menu-start` is a child component of `bal-navbar` which is the left side of the navbar.



### bal-navbar-menu-start


# bal-navbar-menu-end 

`bal-navbar-menu-end` is a child component of `bal-navbar` which is the right side of the navbar.





<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-navbar.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-navbar)
