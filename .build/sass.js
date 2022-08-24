/**
 * sass
 * --------------------------------------
 * This script transforms the sass files into css files
 */

const path = require("path");
const sass = require("sass");
const fs = require("fs");

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/css");

async function compileSass({ style }) {
  const result = await sass.compileAsync(
    path.join(PACKAGE, "scss/baloise-design-system.sass"),
    {
      sourceMap: true,
      style,
    }
  );
  return result;
}

async function main() {
  const folderName = path.join(PACKAGE, "dist");
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }

  const sassMinified = await compileSass({ style: "compressed" });
  fs.writeFileSync(
    path.join(PACKAGE, "dist/baloise-design-system.min.css"),
    sassMinified.css
  );
  fs.writeFileSync(
    path.join(PACKAGE, "dist/baloise-design-system.min.css.map"),
    JSON.stringify(sassMinified.sourceMap)
  );

  const sassExpanded = await compileSass({ style: "expanded" });
  fs.writeFileSync(
    path.join(PACKAGE, "dist/baloise-design-system.css"),
    sassExpanded.css
  );
  fs.writeFileSync(
    path.join(PACKAGE, "dist/baloise-design-system.css.map"),
    JSON.stringify(sassExpanded.sourceMap)
  );
}

main();
