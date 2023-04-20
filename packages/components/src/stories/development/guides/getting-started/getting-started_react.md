## Prerequisite

Before we can add the Baloise Design System we need to setup the basics with [React Create App CLI](https://create-react-app.dev/)

> **Recommendation**
>
> - We recommend to use Typescript and SASS

Lets scaffold a Typescript React app.

```
npx create-react-app my-app --template typescript
```

Now navigate into the root folder.

```
cd my-app
```

## Installation

This section describes how to setup the Baloise Design System with an basic React applications.

### Install Design System

Install the Design System and his dependencies.

```
npm install @baloise/design-system-components-react
```

> **Use SASS**
>
> - Install SASS `npm install sass --save-dev`
> - Change the _.css files to _.scss and adjust the import as well.

### Import Styles

Import the necessary CSS styles into your `index.tsx` file.

```typescript
// Resets CSS for all browser
import '@baloise/design-system-css/css/normalize.css'
import '@baloise/design-system-css/css/structure.css'

// Custom font faces
import '@baloise/design-system-css/css/font.css'

// Core CSS, always required
import '@baloise/design-system-css/css/core.css'

// CSS utilities classes (optional)
import '@baloise/design-system-css/css/border.css'
import '@baloise/design-system-css/css/color.css'
import '@baloise/design-system-css/css/display.css'
import '@baloise/design-system-css/css/flex.css'
import '@baloise/design-system-css/css/grid.css'
import '@baloise/design-system-css/css/opacity.css'
import '@baloise/design-system-css/css/radius.css'
import '@baloise/design-system-css/css/shadow.css'
import '@baloise/design-system-css/css/spacing.css'
import '@baloise/design-system-css/css/typography.css'
```

#### Import Sass Styles

```scss
// SASS mixins and variables (optional)
@import '@baloise/design-system-css/sass/mixins';

// Resets CSS for all browser
@import '@baloise/design-system-css/css/normalize';
@import '@baloise/design-system-css/css/structure';

// Custom font faces
@import '@baloise/design-system-css/sass/font';

// Core CSS, always required
@import '@baloise/design-system-css/css/core';

// Deprecated styles will be removed with the next breaking version (optional)
@import '@baloise/design-system-css/sass/legacy';

// CSS utilities classes (optional)
@import '@baloise/design-system-css/css/border';
@import '@baloise/design-system-css/css/color';
@import '@baloise/design-system-css/css/display';
@import '@baloise/design-system-css/css/flex';
@import '@baloise/design-system-css/css/grid';
@import '@baloise/design-system-css/css/opacity';
@import '@baloise/design-system-css/css/radius';
@import '@baloise/design-system-css/css/shadow';
@import '@baloise/design-system-css/css/spacing';
@import '@baloise/design-system-css/css/typography';
```

> **TIP**
>
> - The CSS Framework provides CSS files and SASS files, just change the root folder `/css/` to `/sass/`.
> - Import `@baloise/design-system-css/sass/baloise-design-system` to use the whole CSS Framework.
> - Use `@import '@baloise/design-system-css/sass/mixins';` in the component stylesheets to use our provided SASS mixins.

### HTML Structure

Add the `BalApp` to your root element. Within this component we are able to use the defined css classes.

```typescript
import './App.scss'
import {
  useBaloiseDesignSystem,
  BalApp,
  BalHeading,
  BalButton,
  BalFooter,
} from '@baloise/design-system-components-react'

function App() {
  useBaloiseDesignSystem()

  return (
    <BalApp className="has-sticky-footer">
      <header></header>
      <main className="container">
        <BalHeading>Hello World!</BalHeading>
        <BalButton>Button</BalButton>
      </main>
      <BalFooter></BalFooter>
    </BalApp>
  )
}

export default App
```

> **Internationalization**
>
> To run the Design System in a different region then `CH` or to change the language to `fr` follow this [documentation](https://baloise-design-system.vercel.app/?path=/docs/development-guides-internationalization--page).

## Start the app

Now everything is ready to be used. Add some Baloise components and start the app with:

```bash
npm start
```

> **TIP**
>
> Your app gets served under [http://localhost:3000](http://localhost:3000).

## Provide the assets

The Design System provides custom fonts and favicons.

To add them to your application follow those guides:

- [Font Installation](../?path=/docs/foundation-typography-development--heading-and-display#installation)
- [Favicons Installation](../?path=/docs/foundation-brand-assets-development--logo#favicons)
