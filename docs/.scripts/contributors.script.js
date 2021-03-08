const fetch = require('node-fetch')
const path = require('path')
const file = require('../../.scripts/file')
const { NEWLINE } = require('../../.scripts/constants')

async function main() {
  const res = await fetch('https://api.github.com/repos/baloise/ui-library/contributors')
  const json = await res.json()
  const users = json
    .filter(c => c.type === 'User')
    .map(u => ({
      url: u.html_url,
      name: u.login,
      avatar: u.avatar_url,
    }))

  const scriptContent = [
    '// generated file by .scripts/contributors.script.js',
    'export const contributors = [',
    users.map(u => JSON.stringify(u)).join(`,${NEWLINE}`),
    ']',
  ]
  await file.makeDir(path.join(__dirname, '../src/.vuepress/generated'))
  await file.save(
    path.join(__dirname, '../src/.vuepress/generated/contributors.js'),
    scriptContent.filter(c => c).join(NEWLINE),
  )
}

main()
