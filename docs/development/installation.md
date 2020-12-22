# Installation

## NodeJS

To work with this project a recent LTS version of NodeJS and npm is required. Make sure you've installed and/or updated [Node](https://nodejs.org/en/) before continuing.

!> Note that you will need to use npm 6 or higher.

## Run Baloise Ui-Library on local

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/baloise/ui-library.git ui-library
cd ui-library
```

- Run `npm install` to install library’s dependencies
- Run `npm run build` to build the library
- Run `npm run lib:serve` to serve UI library demo page

> The demo page will be served at http://localhost:3333/ by default. You can check effect of your changes immediately on this demo page.

For more commands visit [Commands](./commands.md)

## Release

It is important to follow the [conventional commits](#Conventional_Commits) rules of the sematic versioning.

!> Note that the lerna release uses the commit messages to determine the type of changes in the codebase.

### Usage

```bash
sgc
```

### Conventional Commits

Here is an example of the release type that will be done based on a commit messages:

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |
