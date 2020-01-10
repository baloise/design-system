# Get Started

## Release Notes

Latest stable version: <a href="https://badge.fury.io/js/bal-ui-library"><img src="https://badge.fury.io/js/bal-ui-library.svg" alt="npm version" height="18"></a>

Detailed release notes for each version are available on [GitHub](https://github.com/hirsch88/bal-ui-library/releases).

## NPM

This project is published to the npm regestry. Just run the below command inside of your repository the install it.

```bash
npm install bal-ui-library --save
```

## Direct `<script>` Include

Put the below script tag in the head of your index.html.
Then you can use the element anywhere in your template, JSX, html etc

<!-- The snippet.plugin looks for the html lang, so to avoid that we use xml here -->

```xml
<script src='node_modules/bal-ui-library/dist/bal-ui-library.js'></script>
```

Put the below style reference in the head of your index.html.

<!-- The snippet.plugin looks for the html lang, so to avoid that we use xml here -->

```xml
<link rel="stylesheet" href="node_modules/bal-ui-library/dist/bal-ui-library/bal-ui-library.css" />
```

## Sass

Instead of the above css import you can use the sass files directly. Just put the below import into your main sass file.

```scss
@import "node_modules/bal-ui-library/src/scss/bal-ui-library.scss";
```

## Vue.js

Follow this [Guide](https://stenciljs.com/docs/vue)

## Angular

Follow this [Guide](https://stenciljs.com/docs/angular)
