import { REPO_OWNER, REPO_NAME, TOKEN_FILE_PATH, getGithubRef, requireGithubToken } from './github'

const API_ROOT = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`

function authHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    Authorization: `Bearer ${requireGithubToken()}`,
    Accept: 'application/vnd.github+json',
    ...extra,
  }
}

async function assertOk(response: Response, action: string): Promise<void> {
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Failed to ${action}: ${response.status} ${response.statusText} — ${body}`)
  }
}

export interface BaseTokensFileMeta {
  sha: string
  content: Record<string, unknown>
}

export async function getBaseTokensFileMeta(): Promise<BaseTokensFileMeta> {
  const ref = getGithubRef()
  const url = `${API_ROOT}/contents/${TOKEN_FILE_PATH}?ref=${ref}`

  const response = await fetch(url, { headers: authHeaders() })
  await assertOk(response, `fetch ${TOKEN_FILE_PATH} metadata`)

  const json = (await response.json()) as { sha: string; content: string }
  const decoded = Buffer.from(json.content, 'base64').toString('utf-8')

  return { sha: json.sha, content: JSON.parse(decoded) as Record<string, unknown> }
}

async function getRefSha(ref: string): Promise<string> {
  const url = `${API_ROOT}/git/ref/heads/${ref}`
  const response = await fetch(url, { headers: authHeaders() })
  await assertOk(response, `read ref heads/${ref}`)

  const json = (await response.json()) as { object: { sha: string } }
  return json.object.sha
}

export async function createBranch(branchName: string): Promise<void> {
  const baseSha = await getRefSha(getGithubRef())
  const url = `${API_ROOT}/git/refs`

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
  })
  await assertOk(response, `create branch ${branchName}`)
}

export async function updateFileOnBranch(
  branch: string,
  newContent: string,
  sha: string,
  message: string,
): Promise<void> {
  const url = `${API_ROOT}/contents/${TOKEN_FILE_PATH}`

  const response = await fetch(url, {
    method: 'PUT',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      message,
      content: Buffer.from(newContent, 'utf-8').toString('base64'),
      sha,
      branch,
    }),
  })
  await assertOk(response, `update ${TOKEN_FILE_PATH} on branch ${branch}`)
}

export interface OpenedPullRequest {
  url: string
  number: number
}

export async function openPullRequest(branch: string, title: string, body: string): Promise<OpenedPullRequest> {
  const url = `${API_ROOT}/pulls`

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ title, head: branch, base: getGithubRef(), body }),
  })
  await assertOk(response, `open pull request from ${branch}`)

  const json = (await response.json()) as { html_url: string; number: number }
  return { url: json.html_url, number: json.number }
}
