# Commands

## Global

| Command           | Description                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `npm install`     | Installs all the npm dependencies and bootstrap the lerna project with the symlinks.                                 |
| `npm run build`   | Builds all packages in the correct order.                                                                            |
| `npm run test`    | Runs the the cypress e2e test against the example pages (bal-component/index.html) of the components and unit tests. |
| `npm run release` | Starts the release process of lerna & npm.                                                                           |

## Library

All the library project commands starts with the prefix `lib:`

| Command                | Description                                              |
| :--------------------- | :------------------------------------------------------- |
| `npm run lib:build`    | Builds the stencil components into web-components.       |
| `npm run lib:serve`    | This will start a dev server on `http://localhost:3333`. |
| `npm run lib:generate` | Generates a new component.                               |

## Vue

All the library project commands starts with the prefix `vue:`

| Command             | Description                                                 |
| :------------------ | :---------------------------------------------------------- |
| `npm run vue:build` | Builds the wrapper library with the components and filters. |

## Angular

All the library project commands starts with the prefix `angular:`

| Command                 | Description                                                 |
| :---------------------- | :---------------------------------------------------------- |
| `npm run angular:build` | Builds the wrapper library with the components and filters. |

## Testing

All the library project commands starts with the prefix `testing:`

| Command                 | Description                                                                                        |
| :---------------------- | :------------------------------------------------------------------------------------------------- |
| `npm run testing:build` | Builds the testing helper library with the accessors of our components.                            |
| `npm run testing:test`  | Runs all the E2E test in the background.                                                           |
| `npm run testing:serve` | This opens the Cypress Test Runner. Just start your library server with `npm run lib:serve` first. |

## Documentation

All the library project commands starts with the prefix `docs:`

| Command                | Description                                                                                                                                                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run docs:install` | Installs all the dependencies of the documentation.                                                                                                                                                                            |
| `npm run docs:build`   | This will generate the documentation out of the stencil components and copy them to the documentation package. After that the examples (index.html) get included and the sidebar gets updated with the components and filters. |
| `npm run docs:serve`   | This will start a dev server on `http://localhost:3000`.                                                                                                                                                                       |
