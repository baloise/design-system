# Navbar

A responsive horizontal navbar that can support images, links, buttons, and dropdowns 

## Usage

```html
<bal-navbar>
    <span slot="navbar-brand">
        App Name
    </span>
</bal-navbar>

<bal-navbar light>
    <span slot="navbar-brand">
        App Name
    </span>
</bal-navbar>
```

```html
<bal-navbar>
    <span slot="navbar-brand">
        <img src="docs/assets/logo-dark.png" />
    </span>
</bal-navbar>
```

### Light mode

```html
<bal-navbar light>
    <span slot="navbar-brand">
        <img src="docs/assets/logo.png" />
    </span>
</bal-navbar>
```

### Actions

```html
<bal-navbar>
    <span slot="navbar-brand">
        App Name
    </span>
    <a slot="navbar-start" class="navbar-item">
        Home
    </a>
    <div slot="navbar-end" class="navbar-item">
        <bal-button inverted>Action</bal-button>
    </div>
</bal-navbar>
<br>
<bal-navbar light logo-src="docs/assets/logo.png">
    <span slot="navbar-brand">
        App Name
    </span>
    <div slot="navbar-end" class="navbar-item">
        <bal-button inverted>Action</bal-button>
    </div>
</bal-navbar>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type      | Default              |
| ---------- | ----------- | ----------- | --------- | -------------------- |
| `light`    | `light`     |             | `boolean` | `false`              |
| `logoHref` | `logo-href` |             | `string`  | `"https://bulma.io"` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
