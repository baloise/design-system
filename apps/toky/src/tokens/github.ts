export const REPO_OWNER = 'baloise'
export const REPO_NAME = 'design-system'
export const TOKENS_DIR = 'packages/tokens/tokens'
export const TOKEN_FILE_PATH = `${TOKENS_DIR}/Base.tokens.json`
export const BRANDS_INDEX_PATH = 'packages/tokens/src/index.ts'

export function brandFilePath(name: string): string {
  return `${TOKENS_DIR}/${name}.tokens.json`
}

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

export async function fetchBaseTokensFile(ref: string = getGithubRef()): Promise<string> {
  const token = requireGithubToken()
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TOKEN_FILE_PATH}?ref=${ref}`

  const response = await fetch(url, {
    // Next.js caches server-side fetches by default — this must always hit
    // GitHub fresh, or a just-opened PR's branch content (or the lack of one)
    // can keep showing a stale snapshot from before it existed.
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.raw+json',
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `Failed to fetch ${TOKEN_FILE_PATH} from GitHub: ${response.status} ${response.statusText} — ${body}`,
    )
  }

  return response.text()
}
