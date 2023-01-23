<a href="https://baloise-design.vercel.app" target="blank">
    <img src="https://raw.githubusercontent.com/baloise-incubator/design-system/next/resources/images/banner.svg?sanitize=true" alt="Baloise Design System" />
</a>

<br>

[![Continuous](https://github.com/baloise-incubator/design-system/actions/workflows/continuous.yml/badge.svg?branch=next)](https://github.com/baloise/design-system/actions/workflows/continuous.yml)

![npm](https://img.shields.io/npm/v/@baloise/design-system-components)
![npm bundle size](https://img.shields.io/bundlephobia/min/@baloise/design-system-components)
![npm](https://img.shields.io/npm/dt/@baloise/design-system-components)
![GitHub](https://img.shields.io/github/license/baloise/design-system)
![GitHub issues](https://img.shields.io/github/issues/baloise-incubator/design-system)
[![Registred on webnamespaces.org](https://img.shields.io/static/v1?label=webnamespaces.org&color=blue&message=bal)](https://webnamespaces.org)
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

## About

The Baloise Design System consists of reusable components and a clearly defined visual style, that can be assembled together to build any number of applications.

Check out the [documentation](https://baloise-design.vercel.app).

## Packages

| Package                                          | Status                                                                              | Description                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Components](https://baloise-design.vercel.app)         | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components)         | Core package build with web components and global styling.              |
| [Components Angular](https://baloise-design.vercel.app) | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-angular) | Angular component proxies based on the the core package.                |
| [Components Vue](https://baloise-design.vercel.app)     | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-vue)     | Vue component proxies based on the the core package.                    |
| [Components React](https://baloise-design.vercel.app)   | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-react)   | React component proxies based on the the core package.                  |
| [Components Table](https://baloise-design.vercel.app)   | ![npm](https://img.shields.io/npm/v/@baloise/design-system-components-table)   | Integration library for AG-Grid with styles and renderer functions      |
| [Tokens](https://baloise-design.vercel.app)             | ![npm](https://img.shields.io/npm/v/@baloise/design-system-tokens)             | Design Tokens like color and spacing.                                   |
| [CSS](https://baloise-design.vercel.app)                | ![npm](https://img.shields.io/npm/v/@baloise/design-system-css)                | Basic CSS styles with utility classes.                                  |
| [Icons](https://baloise-design.vercel.app)              | ![npm](https://img.shields.io/npm/v/@baloise/design-system-icons)              | SVG icons of the design system.                                         |
| [Fonts](https://baloise-design.vercel.app)              | ![npm](https://img.shields.io/npm/v/@baloise/design-system-fonts)              | Web-Font of the design system.                                          |
| [Testing](https://baloise-design.vercel.app)            | ![npm](https://img.shields.io/npm/v/@baloise/design-system-testing)            | Testing package with custom and overridden commands for each component. |

```css
/* CSS one */
import '@baloise/desing-system-components/dist/desing-system-components/desing-system-components.css';
/* Main one */
import '@baloise/desing-system-components/src/styles/global.sass';
```

1. always from desing-system-css
2. you can have bundle with everything (not recommanded)
3. or you have parts

```css
import '@baloise/desing-system-css/sass/mixins.scss';
```

```css
import '@baloise/desing-system-css/css/bundle.css'; /* without legacy */
```

```css
/* Core CSS required for components to work properly */
import '@baloise/desing-system-css/css/core.css';
/* variables, typography, container */

/* Basic CSS for apps built with DS */
import '@baloise/desing-system-css/css/normalize.css';
import '@baloise/desing-system-css/css/font.css';
import '@baloise/desing-system-css/css/structure.css'; /* table, list */
import '@baloise/desing-system-css/css/legacy.css';

/* Optional CSS utils that can be commented out */
import '@baloise/desing-system-css/css/border.css';
import '@baloise/desing-system-css/css/radius.css';
import '@baloise/desing-system-css/css/color.css';
import '@baloise/desing-system-css/css/shadow.css';
import '@baloise/desing-system-css/css/typography.css';

import '@baloise/desing-system-css/css/display.css'; /* visibility */
import '@baloise/desing-system-css/css/flex.css';
import '@baloise/desing-system-css/css/grid.css';
import '@baloise/desing-system-css/css/opacity.css';
import '@baloise/desing-system-css/css/spacing.css';
```

- core
 - buttons
 - form
 - container
 - link
 - typography
- normalize
- structure
  - list
  - table
- legacy