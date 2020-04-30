# Quick Start

## Installation

This project is published to the npm registry. Just run the below command inside of your repository the install it.

```bash
npm install @baloise/ui-library --save
```

### Integration

To add the components to your project you can follow this [Guide](https://stenciljs.com/docs/overview).

#### Vue.js

Follow this [Guide](https://stenciljs.com/docs/vue)

#### Angular

Follow this [Guide](https://stenciljs.com/docs/angular)

#### Styles

Just put the below import into your main sass file.

```scss
@import "node_modules/ui-library/src/scss/ui-library.scss";
```

> Use the variables of the UI-Library for your own project components by using the `node_modules/ui-library/src/scss/utilities/all.scss` file.

#### Direct Integration

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
