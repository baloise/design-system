---
'@baloise/design-system-favicons': minor
---

Providing favicons in 6 various colors

**Installation**

First install our favicons library

```bash
npm add -D @baloise/design-system-favicons
```

We need provide the favicons to our web application.
To do so we recommend the tool copyfiles to copy the favicons files into your assets folder.

```
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our **package.json** file.
Add a new script called **copy:favicons** and adjust the second path to your application.

```json
"scripts": {
  "postinstall": "npm run copy:favicons",
  "copy:favicons": "copyfiles --flat node_modules/@baloise/design-system-favicons/icons/primary/* src/assets/favicons"
}
```

Favicons are available in multiple colors (green, primary, purple, red, white, and yellow).
In this example we use primary, but you can pick one available by changing the folder name from the first path.

To copy the fonts run the following command.

```
npm run copy:favicons
```

The final step is to add the favicon to the index.html file of your application.

```
<link rel="icon" type="image/x-icon" href="./assets/favicons/primary/favicon.ico" />
```
