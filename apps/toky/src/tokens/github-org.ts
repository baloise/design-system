import { REPO_OWNER, encodeGithubUrlSegment, requireGithubOrgToken } from './github'

// GET /orgs/{org}/members/{username} — 204 means the user is a member, 404
// means they aren't (or the org check requires org-member read the bot PAT
// doesn't have — see docs/adr/0003). Any other status is unexpected.
export async function isOrgMember(username: string): Promise<boolean> {
  const url = `https://api.github.com/orgs/${REPO_OWNER}/members/${encodeGithubUrlSegment(username)}`

  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${requireGithubOrgToken()}`,
      Accept: 'application/vnd.github+json',
    },
  })

  if (response.status === 204) return true
  if (response.status === 404) return false

  const body = await response.text()
  throw new Error(
    `Failed to check ${REPO_OWNER} org membership for ${username}: ${response.status} ${response.statusText} — ${body}`,
  )
}
