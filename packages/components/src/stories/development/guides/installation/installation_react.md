<bal-doc-lead>
This section describes how to setup the Baloise Design System with an basic React applications.
</bal-doc-lead>

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

## Install Design System

Install the Design System and his dependencies.

```
npm install @baloise/design-system-components-react sass copyfiles
```

> **Hint**
>
> - Change the _.css files to _.scss and adjust the import as well.

### Import Fonts

The font package is included in the `@baloise/design-system-components-react` package.

Next step is to provide the fonts to our web application.
To do so we recommend the tool copyfiles to copy the font files into your assets folder.

Define the copy command in our **package.json** file.
Add a new script called **copy:fonts** and adjust the second path to your application.

```json
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

To copy the fonts run the following command.

```
npm run copy:fonts
```

> **TIP**
>
> - Add the generated files to the `.gitignore` file.

### Import Styles

Import the `global.sass` Sass file into the main `index.scss` file of your application.

```scss
// change variable before the import
$font-path: '../../../../public/assets/fonts';

@import '@baloise/design-system-components/src/styles/global';

// add custom styles below
```

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
