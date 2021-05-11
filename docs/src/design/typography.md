# Typography

Typography can help create clear hierarchies, organize information, and guide users through a product or experience.

## Typestyles

| Typestyle                                                                          | Weight           | Size | Line | CSS                  |
| ---------------------------------------------------------------------------------- | ---------------- | ---- | ---- | -------------------- |
| <div class="bal-app"><h1 class="title is-size-1">H1</h1></div>                     | Regular (400)    | 44px | 50px | `title is-size-1`    |
| <div class="bal-app"><h2 class="title is-size-2">H2</h2></div>                     | Regular (400)    | 33px | 38px | `title is-size-2`    |
| <div class="bal-app"><h3 class="title is-size-3">H3</h3></div>                     | **Medium (700)** | 22px | 25px | `title is-size-3`    |
| <div class="bal-app"><h3 class="subtitle is-size-3">H3</h3></div>                  | Regular (400)    | 22px | 25px | `subtitle is-size-3` |
| <div class="bal-app"><h4 class="title is-size-4">H4</h4></div>                     | **Medium (700)** | 18px | 20px | `title is-size-4`    |
| <div class="bal-app"><h4 class="subtitle is-size-4">H4</h4></div>                  | Regular (400)    | 18px | 20px | `subtitle is-size-4` |
| <div class="bal-app"><p>Paragraph</p></div>                                        | Regular (400)    | 16px | 20px | ---                  |
| <div class="bal-app"><p class="is-bold">Paragraph Bold</p></div>                   | **Medium (700)** | 16px | 20px | `is-bold`            |
| <div class="bal-app"><a class="is-link" href="">Link cyan</a></div>                | Regular (400)    | 16px | 20px | `is-link`            |
| <div class="bal-app"><p class="is-small">Small Paragraph</p></div>                 | Regular (400)    | 14px | 16px | `is-small`           |
| <div class="bal-app"><p class="is-bold is-small">Small Paragraph Bold</p></div>    | **Medium (700)** | 14px | 16px | `is-small is-bold`   |
| <div class="bal-app"><a class="is-link is-small" href="">Small Link cyan</a></div> | Regular (400)    | 14px | 16px | `is-small is-link`   |

## Download

Download our font for print usage below. For web development please continue reading.

<docs-link-box title="fonts.zip" subtitle="Our typography files" link="/assets/download/fonts.zip" ></docs-link-box>

## Install web font

Our fonts are provide as a [NPM package](https://www.npmjs.com/package/@baloise/design-system-fonts). Besides the font files the according css and sass file are delivered aswell.

To install it to your project run the following command.

```bash
npm install @baloise/design-system-fonts
```

### Usage

Next step is to provide the fonts to our web application. To do so we recommand the tool [copyfiles](https://www.npmjs.com/package/copyfiles) to copy the font files into your asset folder.

```bash
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our **package.json** file. Add a new script called `copy:fonts` and adjust the second path to your application.

:::tip
For angular apps the default path would be **src/assets/fonts** instead of **public/assets/fonts**
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
