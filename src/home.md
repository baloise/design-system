# Get Started

UI-Libary is an open source library for building amazing web applications that follow the Baloise corporate style guidelines.
No design skills required.

- [Why UI-Library](docs/introduction/why.md)
- [Architecture](docs/introduction/architecture.md)

## Release Notes

Latest stable version: <a href="https://badge.fury.io/js/%40baloise%2Fui-library"><img src="https://badge.fury.io/js/%40baloise%2Fui-library.svg" alt="npm version" height="18"></a>

Detailed release notes for each version are available on [GitHub](https://github.com/baloise/ui-library/releases).

## NPM

This project is published to the npm regestry. Just run the below command inside of your repository the install it.

```bash
npm install @baloise/ui-library --save
```

## Sass

Instead of the above css import you can use the sass files directly. Just put the below import into your main sass file.

```scss
@import "node_modules/ui-library/src/scss/ui-library.scss";
```

## Direct `<script>` Include

Put the below script tag in the head of your index.html.
Then you can use the element anywhere in your template, JSX, html etc

<!-- The snippet.plugin looks for the html lang, so to avoid that we use xml here -->

```xml
<script src="https://baloise-ui-library.now.sh/build/ui-library.js"></script>
```

Put the below style reference in the head of your index.html.

<!-- The snippet.plugin looks for the html lang, so to avoid that we use xml here -->

```xml
<link rel="stylesheet" href="https://baloise-ui-library.now.sh/build/ui-library.css" />
```

## Vue.js

Follow this [Guide](https://stenciljs.com/docs/vue)

## Angular

Follow this [Guide](https://stenciljs.com/docs/angular)
