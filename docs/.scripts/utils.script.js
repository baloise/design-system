const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const filterLib = require('../../packages/utils/.scripts/utils.lib')
const path = require('path')
const { NEWLINE, GENERATED_TAG } = require('./utils/constants')

const run = async () => {
  log.title('docs : utils')

  const filters = await filterLib.filters()

  const filterDocs = filters.map(f =>
    [
      `<table>`,
      `  <thead>`,
      `    <tr>`,
      `      <th colspan="2" style="text-align: left;">`,
      `        <h2 id="${f.name}">`,
      `          <a href="#/utilities/filters?id=${f.name}" data-id="${f.name}" class="anchor">`,
      `            <span>${f.name}</span>`,
      `          </a>`,
      `        </h2>`,
      `      </th>`,
      `    </tr>`,
      `  </thead>`,
      `  <tbody>`,
      `    <tr>`,
      `      <td width="100px"><b>Description</b></td>`,
      `      <td>${f.description}</td>`,
      `    </tr>`,
      `    <tr>`,
      `      <td width="100px"><b>Signature</b></td>`,
      `      <td><code style="padding-left: 0; padding-right: 0;">${f.signature}</code></td>`,
      `    </tr>`,
      `    <tr>`,
      `      <td width="100px"><b>Example</b></td>`,
      `      <td>${f.example}</td>`,
      `    </tr>`,
      `  </tbody>`,
      `</table>`,
    ].join(NEWLINE),
  )

  const content = [GENERATED_TAG, `# Filters`, '', ...filterDocs, ''].join(NEWLINE)

  await file.save(path.join(__dirname, '../utilities/filters.md'), content)
}

run()
