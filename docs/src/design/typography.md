# Typography

Typography can help create clear hierarchies, organize information, and guide users through a product or experience.

## Typestyles

### Headlines

| Typestyle                                                         | Weight           | Size | Line |
| ----------------------------------------------------------------- | ---------------- | ---- | ---- |
| <div class="bal-app"><h1 class="title is-size-1">H1</h1></div>    | Regular (400)    | 44px | 52px |
| <div class="bal-app"><h2 class="title is-size-2">H2</h2></div>    | Regular (400)    | 36px | 44px |
| <div class="bal-app"><h3 class="title is-size-3">H3</h3></div>    | **Medium (700)** | 28px | 36px |
| <div class="bal-app"><h3 class="subtitle is-size-3">H3</h3></div> | Regular (400)    | 28px | 36px |
| <div class="bal-app"><h4 class="title is-size-4">H4</h4></div>    | **Medium (700)** | 20px | 28px |
| <div class="bal-app"><h4 class="subtitle is-size-4">H4</h4></div> | Regular (400)    | 20px | 28px | `subtitle is-size-4` |
| <div class="bal-app"><h5 class="title is-size-5">H5</h5></div>    | **Medium (700)** | 16px | 20px |
| <div class="bal-app"><h5 class="subtitle is-size-5">H5</h5></div> | Regular (400)    | 16px | 20px |

### Body Text

| Typestyle                                                                          | Weight           | Size | Line |
| ---------------------------------------------------------------------------------- | ---------------- | ---- | ---- |
| <div class="bal-app"><p>Paragraph</p></div>                                        | Regular (400)    | 16px | 24px |
| <div class="bal-app"><p class="is-bold">Paragraph Bold</p></div>                   | **Medium (700)** | 16px | 24px |
| <div class="bal-app"><a class="is-link" href="">Link cyan</a></div>                | Regular (400)    | 16px | 24px |
| <div class="bal-app"><p class="is-small">Small Paragraph</p></div>                 | Regular (400)    | 14px | 24px |
| <div class="bal-app"><p class="is-bold is-small">Small Paragraph Bold</p></div>    | **Medium (700)** | 14px | 24px |
| <div class="bal-app"><a class="is-link is-small" href="">Small Link cyan</a></div> | Regular (400)    | 14px | 24px |

## Download

Download our font for print usage below. For web development please continue reading.

<ClientOnly>
<docs-link-box title="fonts.zip" subtitle="Our typography files" link="/assets/download/fonts.zip" ></docs-link-box>
</ClientOnly>

## Install web font

Our fonts are provide as a [NPM package](https://www.npmjs.com/package/@baloise/design-system-fonts). Besides the font files the according css and sass file are delivered aswell.

:::tip
The font package is included in the `@baloise/design-system-components` package and also in the proxy libraries.
:::

To install it direktly to your project run the following command.

```bash
npm install @baloise/design-system-fonts
```

### Usage

Next step is to provide the fonts to our web application. To do so we recommand the tool [copyfiles](https://www.npmjs.com/package/copyfiles) to copy the font files into your asset folder.

```bash
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our **package.json** file. Add a new script called `copy:fonts` and adjust the second path to your application.

Place the downloaded fonts into a folder in the public area. Configure the path with the Sass variable `$font-path` or use the default `assets/fonts`.

```scss
$font-path: 'assets/fonts';

@import 'node_modules/@baloise/design-system-components/src/styles/global.scss';
```

:::tip
For angular apps the default path would be **src/assets/fonts** instead of **public/assets/fonts**
:::

::: warning
**Relative path**

To serve the fonts from a relative path inside a Angular application adjust `$font-path` variable to `'~assets/fonts'`.

```scss
$font-path: '~assets/fonts';

@import 'node_modules/@baloise/design-system-components/src/styles/global.scss';
```

:::

```json{2}
"scripts": {
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

Then we add the defined script `copy:fonts` in our `postinstall` script. Every time we install dependencies the `copy:fonts` script gets executed at the end.

```json{2}
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

:::tip
It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.
:::

### CDN

Configure the fonts in a css file.

The package `@baloise/design-system-fonts` also delivers a css file with the config for the typography. Add the `fonts.css` into the `head` of the webpage.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/design-system-fonts/lib/fonts.css" />
```

Next [download the font](/design/typography.html#download) to use it with the CDN setup and put them into the path `/assets/fonts` of the webpage.

### Webpack

Import the css directly into your main TypeScript or JavaScript file.

```typescript
import '@baloise/design-system-components/dist/design-system-fonts/lib/fonts.css'
```
