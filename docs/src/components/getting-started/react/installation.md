# Installation

## Prerequisite

### Setup React Project

Create an React project with the [React Create App CLI](https://create-react-app.dev/) and set Sass as default.

```bash
npx create-react-app bal-app --template typescript
cd bal-app
npm install -D sass
```

Rename the `.css` files to `.scss` and adjust there import statement.

::: tip

- Choose **SASS** as the stylesheet format, because it gives access to the internal Baloise Design System variables like colors and much more.

:::

## Install Baloise Design System

Use npm to install the React proxy library.

```bash
npm install @baloise/design-system-components-react
```

## Install Typography

To apply the Baloise Design System typography follow [the instruction on the page typography documentation](/design/typography.html#install-web-font).

## Install Theming / Styles

To apply the Baloise Design System theming follow [the instruction on the page styling documentation](/components/getting-started/theming.html).

::: warning
Do not forget to apply the style, otherwise you components will not look like in this documentation ;-)
:::

## HTML Structure

Add the `BalApp` to your root element. Within this component we are able to use the defined css classes.

```typescript
import React from 'react'
import { BalApp, BalButton, BalCard, BalCardContent } from '@baloise/design-system-components-react'
import './App.scss'

function App() {
  return (
    <BalApp background>
      <main className="container">...</main>
    </BalApp>
  )
}
```
