# Architecture

UI-Libary is an open source library for building amazing Baloise applications. No design skills required.

The architecture is based on web standards and best practices. Moreover, we tried to keep it as simple as possible for our contributers and users.
For those reasons we decided to use Web Components, which are integrated in the modern browsers. The project fully supports [TypeScript](https://www.typescriptlang.org/).

## Libraries

Under the hood, UI-Libary uses [Bulma](https://bulma.io/) a clean css framework and [Stencil](https://stenciljs.com/) as our Web Components Compiler. At the end everything will be compiled in a clean web component without any framework specific code.

> The best part is that we depend on only two libraries, which do not depend on each other and at the end we have only one simple UI Library for our users!

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

<br>

#### SWOT analyse of Bulma

<br>
<table class="docs-swot-table">
    <tr>
        <th></th>
        <th class="green">
            <strong>Helpful</strong><br>
            <small>to achieving the objective</small>
        </th>
        <th class="red">
            <strong>Harmful</strong><br>
            <small>to achieving the objective</small>
        </th>
    </tr>
    <tr>
        <th class="yellow rotate">
            <div>
                <strong>Internal origin</strong><br>
                <small>(product/company attributes)</small>
            </div>
        </th>
        <td>
            <strong>Strengths</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
        <td>
            <strong>Weakness</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
    </tr>    
    <tr>
        <th class="blue rotate">
            <div>
                <strong>External origin</strong><br>
                <small>(environment/market attributes)</small>
            </div>
        </th>
        <td>
            <strong>Opportunity</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
        </td>
        <td>
            <strong>Threat</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
        </td>
    </tr>
</table>

<br />
<h3 id="stencil">
    <img width=240 src="https://mhartington.io/stenciljs/img/stencil-logo.svg" alt="Stencil Logo" />
</h3>

This is not another framework. It is a compiler that generates standards-based [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) (more specifically, Custom Elements). They can be used without any framework, because there are just [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

With Stencil we are able to develop universal, framework and library agnostic UI elements that can be shared among different projects.

#### Here are some advantages

##### Future Friendly

We do know the next big framework on the horizon, but with Stencil we do not have to care. Stencil does not depend on frameworks. Like we mentioned above it is a compiler to generate standards-based [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), which can be used with any framework.

##### TypeScript Support

TypeScript helps maintaining the code. Additionally, it adds types to your own project.

##### Browser Support

For the small minority of browsers that do not support modern browser features and APIs, Stencil will automatically polyfill them on-demand.
Out-of-the-box browser support includes IE11 and up ([Browser Support](https://stenciljs.com/docs/browser-support)).

##### Easy to learn

Their tiny API and concepts, which are based on the web standards, are familiar to the big frameworks like React, Vue and Angular. So it is really simple to get started. There goal is not to create yet-another-framework, but rather provide tooling for developers to generate future-friendly components using APIs already baked within the browser.

##### Needs no dependencies on runtime

The code generated by Stencil does not rely on Stencil, but rather it generates highly-optimized, framework-free, stand-alone code which runs natively in the browser.

<br>

#### SWOT analyse of Stencil

<br>
<table class="docs-swot-table">
    <tr>
        <th></th>
        <th class="green">
            <strong>Helpful</strong><br>
            <small>to achieving the objective</small>
        </th>
        <th class="red">
            <strong>Harmful</strong><br>
            <small>to achieving the objective</small>
        </th>
    </tr>
    <tr>
        <th class="yellow rotate">
            <div>
                <strong>Internal origin</strong><br>
                <small>(product/company attributes)</small>
            </div>
        </th>
        <td>
            <strong>Strengths</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
        <td>
            <strong>Weakness</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
    </tr>    
    <tr>
        <th class="blue rotate">
            <div>
                <strong>External origin</strong><br>
                <small>(environment/market attributes)</small>
            </div>
        </th>
        <td>
            <strong>Opportunity</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
        </td>
        <td>
            <strong>Threat</strong>
            <ul>
                <li>Item bla</li>
                <li>Item bla</li>
            </ul>
        </td>
        </td>
    </tr>
</table>

## CI & CD

> We use opensource tooling to make our processes simpler

We use Github as our software development platform, which is the leading platform for open-spource project in the world.
For new features or fixes we develop theme in seperate branches which will result in pull-request. Travis our CI tool listens on those Git hooks and starts building & testing our application in a seperate container. Moreover, our deployment platform Now listens also and deploys the code of the pull request to a preview environment. All this is shown in the open pull request on Github. So other developers and UX specialist can easly review, comment, approve or decline the new changes.

After a pull request was approved, it will be merged in to the master branch, which is our default branch. Travis reacts on the merge action and starts his configured workflow. There is slide diffrence to the other builds, which is the release part. The release process is fully automated with sematic release.
Based on the commit messages since the last release, it detects the release type (major, minor or patch).

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

After detecting the new version, it also publishes the library to npm. Afterthat, it releases it also on github with a nice changelog, which is generated of the commit messages. Finally, it gets deployed to the now on the main url.

<br>

![ci-cd](../assets/ci-cd.svg)

<br />

| Tool                                                                    | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Github](https://github.com/)                                           | Is the world's leading software development platform.                   |
| [Travis CI](https://travis-ci.com/)                                     | Our Continuous Integration platform.                                    |
| [NPM](https://www.npmjs.com/)                                           | Software Registry of all the JavaScript & TypeScript packages.          |
| [Now](https://zeit.co/)                                                 | ZEIT Now is a cloud platform for static sites and Serverless Functions. |
| [Sematic Release](https://github.com/semantic-release/semantic-release) | Fully automated version management and package publishing.              |
