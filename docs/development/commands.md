# Commands

## Global

### Install

Installs all the npm dependencies and bootstrap the lerna project with the symlinks.

```bash
npm install
```

### Build

Builds all packages in the correct order.

```bash
npm run build
```

### Build

Runs the the cypress e2e test against the example pages (bal-component/index.html) of the components.

```bash
npm run test
```

## Library

All the library project commands starts with the prefix `lib:`

### Build

Builds the stencil components into web-components and updates the two proxie packages angular and vue.

```bash
npm run lib:build
```

### Serve

This will start a dev server on `http://localhost:3333`.

```bash
npm run lib:serve
```

## Testing

### Serve

This opens the Cypress Test Runner. Just start your library server with `npm run lib:serve` first.

```bash
npm run testing:serve
```

### Run

Runs all the E2E test in the background. Just start your library server with `npm run lib:serve` first.

```bash
npm run testing:run
```

### Build

Builds the testing helper library with the accessors of our components.

```bash
npm run testing:build
```

## Documentation

### Build

This will generate the documentation of the stencil components and copy them to the documentation package. After that the examples (index.html) get included and the sidebar gets updated with the components.

```bash
npm run docs:build
```

> For more details look into the `packages/docs/build/main.build.js` file.

### Serve

This will start a dev server on `http://localhost:3000`.

```bash
npm run docs:serve
```

## Examples

We have examples for the framework `vue` and `angular` available.

### Serve

This will start a dev server on `http://localhost:8080`.

```bash
npm run vue:serve
# or
npm run ng:serve 
```