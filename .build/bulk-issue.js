/**
 * utils - create bulk issues
 * --------------------------------------
 * This script clones a base image into component issues.
 */

const { Octokit } = require('@octokit/core')
const log = require('./utils/log')
const tags = require('./data/tags.json')

const OWNER = 'baloise'
const REPO = 'design-system'
const API_VERSION = '2022-11-28'

async function main() {
  log.title('Create bulk issue')

  function formatArg(argList){
    return argList[0].split('=')[1].trim()
  }

  const issueNumberList = process.argv.filter(arg => arg.startsWith('issue'))
  if(issueNumberList.length < 1) {
    log.error('issue argument is not provided')
    return process.exit(1)
  }
  const issueNumber = formatArg(issueNumberList)
  log.info(`issue number is ${issueNumber}`);

  const tokenList = process.argv.filter(arg => arg.startsWith('token'))
  if(tokenList.length < 1) {
    log.error('token argument is not provided')
    return process.exit(1)
  }
  const token = formatArg(tokenList)
  log.info(`token is set`);

  const octokit = new Octokit({
    auth: token
  })

  let issueResponse = {}
  try {
    issueResponse = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: OWNER,
      repo: REPO,
      issue_number: issueNumber,
      headers: {
        'X-GitHub-Api-Version': API_VERSION
      }
    })
  } catch(error){
    log.error('could not find base issue to clone from!')
    return process.exit(1)
  }

  if(issueResponse.status !== 200){
    log.error('could not find base issue to clone from!')
    return process.exit(1)
  }
  log.info('found base image to clone from')

  // for (let index = 0; index < tags.length; index++) {
  //   const tag = tags[index];
  //   let response = {}
  //   try {
  //     response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
  //       owner: OWNER,
  //       repo: REPO,
  //       headers: {
  //         'X-GitHub-Api-Version': API_VERSION
  //       },
  //       title: issueResponse.data.title.replace('{component}', tag),
  //       labels: issueResponse.data.labels.map(label => label.name),
  //       milestone: issueResponse.data.milestone.number,
  //       body: issueResponse.data.body,
  //     })
  //   } catch(error) {
  //     log.error(`could not create issue for ${tag}`)
  //     return process.exit(1)
  //   }

  //   if(response.status !== 201){
  //     log.error(`could not create issue for ${tag}`)
  //     return process.exit(1)
  //   }
  //   log.list(`${tag} issue created`)
  // }
}

main()
