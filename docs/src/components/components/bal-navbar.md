# bal-navbar

<!-- START: human documentation top -->

A responsive horizontal navbar that can support images, links, buttons, and dropdowns.

::: tip
Logos and images of Baloise can be found [here](https://www.baloise.com/de/home/ueber-uns/wer-wir-sind/bilder-logos.html)
:::

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-navbar-67></docs-demo-bal-navbar-67></ClientOnly>


## Light

<ClientOnly><docs-demo-bal-navbar-68></docs-demo-bal-navbar-68></ClientOnly>



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

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-navbar.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-navbar)
