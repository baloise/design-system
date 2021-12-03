## Install Fonts

The font package is included in the `@baloise/design-system-components` package and also in the proxy libraries.

Next step is to provide the fonts to our web application. To do so we recommand the tool [copyfiles](https://www.npmjs.com/package/copyfiles) (opens new window)to copy the font files into your asset folder.

```bash
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our package.json file. Add a new script called copy:fonts and adjust the second path to your application.

Place the downloaded fonts into a folder in the public area. Configure the path with the Sass variable $font-path or use the default assets/fonts.

```scss
$font-path: 'assets/fonts';

@import 'node_modules/@baloise/design-system-components/src/styles/global.scss';
```

> **TIP**
> For angular apps the default path would be `src/assets/` fonts instead of `public/assets/fonts`

Then we add the defined script copy:fonts in our postinstall script. Every time we install dependencies the copy:fonts script gets executed at the end.

```json
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

> **TIP**
> It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.
