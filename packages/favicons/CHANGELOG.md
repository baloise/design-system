# @baloise/design-system-favicons

## 14.0.0

## 13.7.1

## 13.7.0

## 13.6.2

## 13.6.1

## 13.6.0

## 13.5.0

## 13.4.4

## 13.4.3

## 13.4.2

## 13.4.1

## 13.4.0

## 13.3.1

## 13.3.0

## 13.2.1

## 13.2.0

## 13.1.0

## 13.0.0

## 12.13.1

## 12.13.0

## 12.12.0

## 12.11.0

## 12.10.0

## 12.9.0

### Minor Changes

- [#989](https://github.com/baloise/design-system/pull/989) [`021727efd`](https://github.com/baloise/design-system/commit/021727efd8e6e841a6024917e6b1c8ad6ef127d5) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - Providing favicons in 6 various colors

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

## Previous Versions

- [Older versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_NEXT.md)
