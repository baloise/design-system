const replace = require('replace-in-file');
const path = require('path');

const options = {
  files: path.join('./dist/**/*.js'),
  from: /\/\* webpackMode: "lazy" \*\//g,
  to: `/* webpackMode: "lazy" */
    /* @vite-ignore */`,
};

replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles
    .filter(f => f.hasChanged).map(f=> f.file).join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
