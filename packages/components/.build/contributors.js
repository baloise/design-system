const fetch = require('node-fetch')
const path = require('path')
const file = require('../../../.build/file')

async function main() {
  const res = await fetch('https://api.github.com/repos/baloise/design-system/contributors')
  const json = await res.json()
  const users = json
    .filter(c => c.type === 'User')
    .map(u => ({
      url: u.html_url,
      name: u.login,
      avatar: u.avatar_url,
    }))

  await file.save(path.join(__dirname, '../docs/contributors.json'), JSON.stringify(users))
}

main()
