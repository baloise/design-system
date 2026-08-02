export const REPO_OWNER = 'baloise'
export const REPO_NAME = 'design-system'
export const TOKEN_FILE_PATH = 'packages/tokens/tokens/Base.tokens.json'

export function requireGithubToken(): string {
  const token = process.env.TOKY_GITHUB_TOKEN
  if (!token) {
    throw new Error('TOKY_GITHUB_TOKEN is not set — a GitHub token is required to read tokens from GitHub.')
  }
  return token
}

export function getGithubRef(): string {
  return process.env.TOKY_GITHUB_REF ?? 'next'
}

export async function fetchBaseTokensFile(): Promise<string> {
  const token = requireGithubToken()
  const ref = getGithubRef()
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TOKEN_FILE_PATH}?ref=${ref}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.raw+json',
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Failed to fetch ${TOKEN_FILE_PATH} from GitHub: ${response.status} ${response.statusText} — ${body}`)
  }

  return response.text()
}
