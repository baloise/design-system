# Architecture

UI-Libary is an open source library for building amazing Baloise applications. No design skills required.

The architecture is based on web standards and best practices. Moreover, we tried to keep it as simple as possible for our contributers and users.
For those reasons we decided to use Web Components, which are integrated in the modern browsers. The project fully supports [TypeScript](https://www.typescriptlang.org/).

## Libraries

Under the hood, UI-Libary uses [Bulma](https://bulma.io/) a clean css framework and [Stencil](https://stenciljs.com/) as our Web Components Compiler. At the end everything will be compiled in a clean web component without any framework specific code.

![tooling](../assets/tooling.svg)

<br />

| Libary                                                       | Description                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Web Components](https://www.webcomponents.org/introduction) | Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML. |
| [Bulma](https://bulma.io/)                                   | The Bulma framework is a free CSS solution based on the Flexbox layout. With Bulma, the extensive range of built-in features means faster turnaround and less CSS code writing.                                                                                                                                                            |
| [Stencil](https://stenciljs.com/)                            | A Web Component compiler for building fast, reusable UI components and Progressive Web Apps.                                                                                                                                                                                                                                               |

<br />
<h3 id="bulma">
    <img width=240 src="https://bulma.io/images/bulma-logo.png" alt="Bulma Logo" />
</h3>

Bulma is fully open-source lightweight CSS (Cascading Style Sheets) solution based on the Flexbox layout.

#### Here are some advantages

##### Easy to learn

Bulmas components are well-documented and have simplified css classes. Every class name is human readable. Moreover, they provide some really good starter templates.

##### CSS only

At the end Bulma is just one CSS file (bulma.css). However, if you just want to use a part of it import the individual .sass source files.

##### Responsive

Bulma is designed as a mobile-first CSS framework, offering optimum site responsiveness. So build a site once and watch it work across any device.

##### Well documented

The [Documentation](https://bulma.io/documentation/) helps you to get the most out of this framework. There are a lot examples to each component.

##### Modular

Bulma is not a all in one framework. It is modular, which means you can use only those compontes you like. For that juse import the individual sass file.

##### Themeable

Of cource, not everyone likes the theme of bulma. No problem, just import the variables.scss file and change the colors. Each component has his own sass variables, which can be easily changed to design a new theme.

<br />
<h3 id="stencil">
    <img width=240 src="https://mhartington.io/stenciljs/img/stencil-logo.svg" alt="Stencil Logo" />
</h3>

TODO

## CI & CD

TODO

> How we use opensource tooling to make it simpler

![ci-cd](../assets/ci-cd.svg)

<br />

| Tool                                                                    | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Github](https://github.com/)                                           | Is the world's leading software development platform.                   |
| [Travis CI](https://travis-ci.com/)                                     | Our Continuous Integration platform.                                    |
| [NPM](https://www.npmjs.com/)                                           | Software Registry of all the JavaScript & TypeScript packages.          |
| [Now](https://zeit.co/)                                                 | ZEIT Now is a cloud platform for static sites and Serverless Functions. |
| [Sematic Release](https://github.com/semantic-release/semantic-release) | Fully automated version management and package publishing.              |
