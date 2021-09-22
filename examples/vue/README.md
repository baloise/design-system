<p align="center"><img width="160" src="./logo.svg" alt="Vue logo"></p>

<h1 align="center">
  Baloise - Vue Starter Kit
  <br />
  <small>(Vue 3 + Typescript + Webpack)</small>
</h1>

We have 3 starter kits:

- [Vue 3 + Typescript + Webpack](https://github.com/baloise/vue-starter-kit)
  - Vue 3 + Stable
- [Vue 3 + Typescript + Vite](https://github.com/baloise/vue-starter-kit/tree/vite)
  - Experimental with ES-Modules
- [Vue 2 + Typescript + Webpack](https://github.com/baloise/vue-starter-kit/tree/vue-2)
  - Stable + IE 11 Support

This template should help get you started developing with Vue 3 and Typescript in Webpack.

## Plugins

- Component library: [Baloise Design System](https://design.baloise.dev/)
- Router: [Vue Router](https://next.router.vuejs.org/)
- Form Validation: [VeeValidate](https://vee-validate.logaretm.com/v4/)
- Internationalization: [Vue i18n](https://vue-i18n.intlify.dev/)
- Http client: [Axios](https://www.npmjs.com/package/axios)
- E2E Testing: [Cypress](https://www.cypress.io/)
- Linting: [ESlint](https://eslint.org/)
- Formatting: [Prettier](https://prettier.io/)

## Recommended Utilities

- JavaScript utility library: [Lodash](https://lodash.com/)
- JavaScript date library: [date-fns](https://date-fns.org/)

## Recommended IDE Setup

- Install the IDE [VSCode](https://code.visualstudio.com/).
- Install all recommanded extensions.

## Recommended Documentations

- [Vue 3](https://v3.vuejs.org/)
- Learing Platform: [Vue Mastery](https://www.vuemastery.com/)

## Getting started

To get stared clone the vue-starter-kit repository to you machine. Then navigate into the root folder of the project and install the npm dependencies.

```bash
git clone git@github.com:baloise/vue-starter-kit.git
cd vue-starter-kit
npm install
```

After setting up the project we can serve our application with:

```bash
npm run serve
```

The development sever runs at `http://localhost:3000/`.

## NPM Scripts

### install

Installs all the dependencies, which are listed in the `package.json`.

```bash
npm install
```

### serve

Serves the application on the development server, which runs at `http://localhost:3000/`.

```bash
npm run serve
```

### test

Starts the development server and runs the cypress E2E test againts it.

```bash
npm run test
```

### build

Build the application for production release. The builed application will be in the `dist` folder.

```bash
npm run build
```

### lint

Lints the whole src folder. Linting is also executed before the build.

```bash
npm run lint
```

### format

With the help of the tool prettier we format all our source files.

```bash
npm run format
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## License

Apache-2.0 Licensed | Copyright © 2021-present Gery Hirschfeld & Contributors
