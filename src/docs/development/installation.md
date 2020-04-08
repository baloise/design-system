# Installation

## NodeJS

To work with this project a recent LTS version of NodeJS and npm is required. Make sure you've installed and/or updated [Node](https://nodejs.org/en/) before continuing.

!> Note that you will need to use npm 6 or higher.

## Sematic Release

It is important to follow the git commit message rules of the [sematic-release](https://semantic-release.gitbook.io) project. This tool will autogenerate the changelog from our git commit messages.

!> Note that the semantic-release uses the commit messages to determine the type of changes in the codebase.

The CLI [semantic-git-commit-cli](https://github.com/JPeer264/node-semantic-git-commit-cli) can be used to help enforce valid commit messages.

```bash
npm i -g semantic-git-commit-cli
```

### Usage

```bash
sgc
```

### Commit Messages

Here is an example of the release type that will be done based on a commit messages:

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

## Setup Project

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/baloise/ui-library.git ui-library
cd ui-library
```

and run:

```bash
npm install
npm run serve
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```
