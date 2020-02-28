# Navbar

A responsive horizontal navbar that can support images, links, buttons, and dropdowns 

## Usage

```html
<bal-navbar></bal-navbar>
```

```html
<bal-navbar>
    <span slot="navbar-brand">
        App Name
    </span>
</bal-navbar>
```

### Light mode

```html
<bal-navbar light logo-src="docs/assets/logo.png"></bal-navbar>
```

### Actions

```html
<bal-navbar>
    <a slot="navbar-start" class="navbar-item">
        Home
    </a>
    <div slot="navbar-end" class="navbar-item">
        <bal-button inverted>Action</bal-button>
    </div>
</bal-navbar>
<br>
<bal-navbar light logo-src="docs/assets/logo.png">
    <div slot="navbar-end" class="navbar-item">
        <bal-button inverted>Action</bal-button>
    </div>
</bal-navbar>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type      | Default                       |
| ---------- | ----------- | ----------- | --------- | ----------------------------- |
| `light`    | `light`     |             | `boolean` | `false`                       |
| `logoAlt`  | `logo-alt`  |             | `string`  | `""`                          |
| `logoHref` | `logo-href` |             | `string`  | `"https://bulma.io"`          |
| `logoSrc`  | `logo-src`  |             | `string`  | `"docs/assets/logo-dark.png"` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
