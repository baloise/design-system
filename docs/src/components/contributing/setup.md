# Project Setup

Baloise Design System is divided into multiple NPM packages. Development for all of the packages happens inside one mono repository.

## Packages

| Library                                                                              | Status                                                                         | Description                                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [Components](https://design.baloise.dev/components/)                                 | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components)         | Core package build with web components and global styling.             |
| [Components Angular](https://design.baloise.dev/components/getting-started/angular/) | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-angular) | Angular component proxies based on the the core package.               |
| [Components Vue](https://design.baloise.dev/components/getting-started/vue/)         | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-vue)     | Vue component proxies based on the the core package.                   |
| [Components React](https://design.baloise.dev/components/getting-started/react/)     | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-react)   | React component proxies based on the the core package.                 |
| [Components Table](https://design.baloise.dev/components/components/bal-table.html)  | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-table)   | Integration library for AG-Grid with styles and renderer functions     |
| [Icons](https://design.baloise.dev/design/icons.html#all-icons)                      | ![npm](https://img.shields.io/npm/v/@baloise/design-system-icons)              | SVG icons of the design system.                                        |
| [Fonts](https://design.baloise.dev/design/typography.html)                           | ![npm](https://img.shields.io/npm/v/@baloise/design-system-fonts)              | Web-Font of the design system.                                         |
| [Testing](https://design.baloise.dev/components/tooling/testing.html)                | ![npm](https://img.shields.io/npm/v/@baloise/design-system-testing)            | Testing package with custom and overriden commands for each component. |

## Architecture

Have a look at the [architecture](/about-us/architecture.html).

## CI & CD

For our CI & CD task we use [Github Actions](https://github.com/baloise/design-system/tree/master/.github/workflows). The following actions are in the folder `.github/workflows`:

- `continuous.yml`

  - The continuous action gets executed with each commit and verfies that the build and the tests are successful.

- `release.yml`

  - The release action gets executed after a merge to the master branch. So after a merged pull-request. It builds the packages, determine the new version out of the commit messages and releases the packages to the npm regestry.

- `documentation.yml`

  - The documentation action gets executed after the release action. It builds the documentation and deploys it under `design.baloise.dev`.

## Folder Structure

```bash
.
├── .github # github related configurations and templates
│  ├── ISSUE_TEMPLATE # templates for the github issues like feature request
│  └── .workflows # github action
│
├── .scripts # node-scripts to generate documentation and code parts
├── docs # documentation
├── examples # example applications with Angular, Vue and React
├── packages # published npm packages
├── resources # static resources for the documentation
├── Dockerfile # config for the documentation
└── lerna.json # config of the mono-repo
```

### /docs

```bash
.
├── .scripts # node-scripts to generate documentation and code parts
├── public # static assets like images and fonts
└── src
   ├──.vuepress #
   └── .<pages> # docu pages written in markdown
```

::: tip
More documentation to the folder structure for vuepress can be found [here](https://vuepress.vuejs.org/guide/directory-structure.html).
:::

### /packages

#### /components

```bash
.
├── .scripts # node-scripts to generate documentation and code parts
├── src
│  ├── assets
│  ├── components
│  │  └── bal-<component>
│  │        ├── bal-<component>.e2e.ts # E2E test file
│  │        ├── bal-<component>.scss # Specific component style
│  │        ├── bal-<component>.tsx # Component logic
│  │        ├── index.html # Examples for the component. Is also shown in the documentation
│  │        └── readme.md # Generated Readme file
│  │
│  ├── constants #
│  ├── helpers #
│  ├── styles #
│  ├── types #
│  ├── global.ts #
│  └── config.ts #
│
└──  stencil.*.config.ts # stencil output configurations
```
