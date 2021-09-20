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

## Apply styles

To apply the Baloise Design System styles and typography follow [the instruction on the page styling documentation](/components/getting-started/react/styles.html).

::: warning
Do not forget to apply the style, otherwise you components will not look like in this documentation ;-)
:::
