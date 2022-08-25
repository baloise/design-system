/**
 * contributors
 * --------------------------------------
 * This script loads all the contributors from the GitHub API for the documentation
 */

const fetch = require('node-fetch')
const path = require('path')
const file = require('./file')
const log = require('./log')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/components");

async function main() {
  await log.title('contributors : fetching')

  const filePath = path.join(PACKAGE, 'src/stories/assets/data/contributors.json')
  try {
    const res = await fetch('https://api.github.com/repos/baloise/design-system/contributors')
    const json = await res.json()
    const contributors = json
      .filter(c => c.type === 'User')
      .map(u => ({
        url: u.html_url,
        name: u.login,
        avatar: u.avatar_url,
      }))

    log.info(`Found ${contributors.length} contributors`)
    await file.save(filePath, JSON.stringify(contributors))
  }catch(_){
    await file.save(filePath, JSON.stringify([]))
  }

}

main()
