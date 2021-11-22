# Dev Setup

Baloise Design System is divided into multiple NPM packages. Development for all of the packages happens inside one mono repository. Follow the below steps to get the dev environment up and running.

## Prerequisite - NodeJS

To work with this project a recent LTS version of NodeJS and npm is required. Make sure you've installed and/or updated [Node](https://nodejs.org/en/) before continuing.

::: warning
Note that you will need to use npm 6 or higher.
:::

## Components

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/baloise/design-system.git design-system
cd design-system
```

- Run `npm install` in the root directory to install library’s dependencies and its packages
- Run `npm run build` to build the packages
- Run `npm run lib:serve` to serve Design System demo page

> The demo page will be served at http://localhost:3333/ by default

For more commands visit [Commands](/guide/development/commands.html)

::: tip
All Baloise Design System packages and their respective code can be found under /packages/. For example components live in /packages/components/.
:::

## Documentation

To create the documentation out of the written code and comments run the following commands:

- Run `npm install` in the root directory to install library’s dependencies and its packages
- Run `npm run docs:build` to generate documentation content and prepare the packages
- Run `npm run docs:serve` to serve documentation page

> The documentation page will be served at http://localhost:8080/ by default

For more commands visit [Commands](/guide/development/commands.html)

::: tip
Documentation that is shown on [design.baloise.dev](https://design.baloise.dev/) can be found from /docs/. Changes to it are automatically deployed if tagged with deploy and merged to master brach.
:::
