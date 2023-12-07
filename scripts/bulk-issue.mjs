/**
 * utils - create bulk issues
 * --------------------------------------
 * This script clones a base image into component issues.
 */

import Octokit from '@octokit/core'
import tags from '../resources/data/tags.json'
import { logger } from './utils.mjs'

const OWNER = 'baloise'
const REPO = 'design-system'
const API_VERSION = '2022-11-28'

async function main() {
  const log = logger('create bulk issues')
  log.start()

  function formatArg(argList) {
    return argList[0].split('=')[1].trim()
  }

  const issueNumberList = process.argv.filter(arg => arg.startsWith('issue'))
  if (issueNumberList.length < 1) {
    return log.fail('issue argument is not provided')
  }
  const issueNumber = formatArg(issueNumberList)
  log.info(`issue number is ${issueNumber}`)

  const tokenList = process.argv.filter(arg => arg.startsWith('token'))
  if (tokenList.length < 1) {
    return log.fail('token argument is not provided')
  }
  const token = formatArg(tokenList)
  log.info(`token is set`)

  const octokit = new Octokit({
    auth: token,
  })

  let issueResponse = {}
  try {
    issueResponse = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: OWNER,
      repo: REPO,
      issue_number: issueNumber,
      headers: {
        'X-GitHub-Api-Version': API_VERSION,
      },
    })
  } catch (error) {
    return log.fail('could not find base issue to clone from!')
  }

  if (issueResponse.status !== 200) {
    return log.fail('could not find base issue to clone from!')
  }
  log.info('found base image to clone from')

  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index]
    let response = {}
    try {
      response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: OWNER,
        repo: REPO,
        headers: {
          'X-GitHub-Api-Version': API_VERSION,
        },
        title: issueResponse.data.title.replace('{component}', tag),
        labels: issueResponse.data.labels.map(label => label.name),
        milestone: issueResponse.data.milestone.number,
        body: issueResponse.data.body,
      })
    } catch (error) {
      return log.fail(`could not create issue for ${tag}`)
    }

    if (response.status !== 201) {
      return log.fail(`could not create issue for ${tag}`)
    }
    log.list(`${tag} issue created`)
  }

  log.succeed()
}

main()
