/**
 * GitHub Git Data API client — atomic multi-file commits
 * (docs/adr/0014-git-data-api-atomic-commits.md). Re-derived here rather
 * than imported from apps/toky/src/tokens/github.ts, which uses the
 * simpler single-file Contents API for Toky's own PR-writes and doesn't
 * need this (docs/adr/0020-figma-sync-action-standalone-script.md).
 */
const REPO_OWNER = 'baloise'
const REPO_NAME = 'design-system'
const API_ROOT = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`

function authHeaders(token, extra) {
  return { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', ...extra }
}

async function assertOk(response, action) {
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Failed to ${action}: ${response.status} ${response.statusText} — ${body}`)
  }
}

export async function getRefSha(branch, token) {
  const response = await fetch(`${API_ROOT}/git/ref/heads/${branch}`, { headers: authHeaders(token) })
  await assertOk(response, `read ref heads/${branch}`)
  const json = await response.json()
  return json.object.sha
}

/** @returns {Promise<{ sha: string, content: string } | null>} null if the file doesn't exist at `ref` */
export async function getFileContent(path, ref, token) {
  const response = await fetch(`${API_ROOT}/contents/${path}?ref=${ref}`, { headers: authHeaders(token) })
  if (response.status === 404) return null
  await assertOk(response, `fetch ${path} at ${ref}`)
  const json = await response.json()
  return { sha: json.sha, content: Buffer.from(json.content, 'base64').toString('utf-8') }
}

/**
 * Creates one commit containing every file in `files` (each `{ path, content }`),
 * against `branch`'s current tip, then fast-forwards `branch` to it — one
 * atomic operation, or none at all (docs/adr/0014). Direct to `branch`, no
 * PR — the bot token needs branch-protection bypass rights for this call
 * to succeed (docs/adr/0017-direct-commit-variableid-backfill.md).
 */
export async function commitFiles({ branch, files, message, token }) {
  const baseSha = await getRefSha(branch, token)

  const commitResponse = await fetch(`${API_ROOT}/git/commits/${baseSha}`, { headers: authHeaders(token) })
  await assertOk(commitResponse, `read commit ${baseSha}`)
  const baseCommit = await commitResponse.json()

  const blobs = []
  for (const file of files) {
    const response = await fetch(`${API_ROOT}/git/blobs`, {
      method: 'POST',
      headers: authHeaders(token, { 'Content-Type': 'application/json' }),
      body: JSON.stringify({ content: file.content, encoding: 'utf-8' }),
    })
    await assertOk(response, `create blob for ${file.path}`)
    const blob = await response.json()
    blobs.push({ path: file.path, sha: blob.sha })
  }

  const treeResponse = await fetch(`${API_ROOT}/git/trees`, {
    method: 'POST',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: blobs.map(b => ({ path: b.path, mode: '100644', type: 'blob', sha: b.sha })),
    }),
  })
  await assertOk(treeResponse, 'create tree')
  const tree = await treeResponse.json()

  const newCommitResponse = await fetch(`${API_ROOT}/git/commits`, {
    method: 'POST',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ message, tree: tree.sha, parents: [baseSha] }),
  })
  await assertOk(newCommitResponse, 'create commit')
  const newCommit = await newCommitResponse.json()

  const refResponse = await fetch(`${API_ROOT}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ sha: newCommit.sha }),
  })
  await assertOk(refResponse, `fast-forward heads/${branch}`)

  return { sha: newCommit.sha }
}

/**
 * PRs are issues in the GitHub REST API — issue-comment endpoints work on
 * a PR number directly, no separate "PR comment" API exists.
 */
export async function listIssueComments(prNumber, token) {
  const response = await fetch(`${API_ROOT}/issues/${prNumber}/comments`, { headers: authHeaders(token) })
  await assertOk(response, `list comments on #${prNumber}`)
  return response.json()
}

export async function createIssueComment(prNumber, body, token) {
  const response = await fetch(`${API_ROOT}/issues/${prNumber}/comments`, {
    method: 'POST',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ body }),
  })
  await assertOk(response, `create comment on #${prNumber}`)
  return response.json()
}

export async function updateIssueComment(commentId, body, token) {
  const response = await fetch(`${API_ROOT}/issues/comments/${commentId}`, {
    method: 'PATCH',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ body }),
  })
  await assertOk(response, `update comment ${commentId}`)
  return response.json()
}

/**
 * Finds this check's own previous comment on the PR (by marker string), so
 * a re-run on a new push updates the existing comment instead of piling up
 * a new one every time.
 */
export async function findMarkedComment(prNumber, marker, token) {
  const comments = await listIssueComments(prNumber, token)
  return comments.find(c => c.body?.includes(marker)) ?? null
}
