import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fetchBaseTokensFile, getGithubRef, TOKENS_DIR } from '@/src/tokens/github'
import { getBrandTokensFileMeta, listBranches, listTokenBrandFiles, resolveReadRef } from '@/src/tokens/github-write'
import type { SyncStatus } from '@/src/tokens/github-write'
import { flattenTokenDocument, parseTokenDocument } from '@/src/tokens/flatten'
import type { FlatToken } from '@/src/tokens/types'
import { TokenEditor } from './token-editor'

// Read on every request — the table must reflect what's on GitHub right now,
// not a snapshot frozen at the last build/deploy. (Unless TOKY_LOCAL_TOKENS
// is set — see loadTokensFromLocalDisk.)
export const dynamic = 'force-dynamic'

const DEFAULT_SYNC_STATUS: SyncStatus = { state: 'synced', prUrl: null, prNumber: null }

type LoadedTokens = {
  tokens: FlatToken[]
  error: string | null
  syncStatus: SyncStatus
  branches: string[]
  tokenBrands: string[]
  brandTokens: Record<string, FlatToken[]>
}

// Opt-in local-dev escape hatch (unset by default, including in every other
// local `pnpm dev` session) — reads Base.tokens.json and every sibling
// `*.tokens.json` brand file straight off disk instead of fetching from
// GitHub, so uncommitted token edits show up in the editor without a
// commit+push+PR round-trip. Read-only: the "Submit" flow (app/api/
// propose-change/route.ts) always independently re-fetches the current file
// from GitHub at submit time and diffs against that, so this can never cause
// a submission to silently target stale or wrong content — it only changes
// what the *page* initially shows.
async function loadTokensFromLocalDisk(): Promise<LoadedTokens> {
  // apps/toky is the Next.js server's cwd — TOKENS_DIR ('packages/tokens/tokens') is relative to
  // the monorepo root, two levels up.
  const localTokensDir = path.resolve(process.cwd(), '..', '..', TOKENS_DIR)

  const baseRaw = await readFile(path.join(localTokensDir, 'Base.tokens.json'), 'utf-8')
  const doc = JSON.parse(baseRaw) as Record<string, unknown>

  const entries = await readdir(localTokensDir)
  const tokenBrands = entries
    .filter(name => name.endsWith('.tokens.json') && name !== 'Base.tokens.json')
    .map(name => name.slice(0, -'.tokens.json'.length))
    .sort((a, b) => a.localeCompare(b))

  const brandEntries = await Promise.all(
    tokenBrands.map(async name => {
      const raw = await readFile(path.join(localTokensDir, `${name}.tokens.json`), 'utf-8')
      return [name, flattenTokenDocument(JSON.parse(raw) as Record<string, unknown>)] as const
    }),
  )

  return {
    tokens: parseTokenDocument(doc),
    error: null,
    syncStatus: DEFAULT_SYNC_STATUS,
    branches: [getGithubRef()],
    tokenBrands,
    brandTokens: Object.fromEntries(brandEntries),
  }
}

// Same safety pattern as isAuthDisabledLocally (src/auth/route-access.ts):
// requires `VERCEL` to be unset, so this can never take effect on any real
// deployment (including a preview build run with production env vars),
// even if TOKY_LOCAL_TOKENS is mistakenly set there.
function isLocalTokensModeEnabled(env: { vercel?: string; localTokens?: string }): boolean {
  return !env.vercel && env.localTokens === 'true'
}

async function loadTokens(): Promise<LoadedTokens> {
  if (isLocalTokensModeEnabled({ vercel: process.env.VERCEL, localTokens: process.env.TOKY_LOCAL_TOKENS })) {
    try {
      return await loadTokensFromLocalDisk()
    } catch (err) {
      return {
        tokens: [],
        error: err instanceof Error ? err.message : 'Unknown error reading local token files',
        syncStatus: DEFAULT_SYNC_STATUS,
        branches: [getGithubRef()],
        tokenBrands: [],
        brandTokens: {},
      }
    }
  }

  const base = getGithubRef()
  try {
    // If an earlier submit's PR for this base is still open, its branch
    // already has the latest proposed state — read from there instead of
    // `base` so the editor never shows a stale pre-PR snapshot. Same reason
    // the brand list reads from `ref`, not `base`: a brand created in that
    // same open PR should already show up. Branch/brand listing is
    // best-effort — the pickers just fall back to a minimal default if
    // either fails, rather than failing the whole page.
    const { ref, status } = await resolveReadRef(base)
    const [raw, branches, tokenBrands] = await Promise.all([
      fetchBaseTokensFile(ref),
      listBranches().catch(() => [base]),
      listTokenBrandFiles(ref).catch(() => []),
    ])
    const doc = JSON.parse(raw) as Record<string, unknown>

    // Fetched eagerly, not lazily on selection — brand count is small today,
    // and this keeps the "select a brand" interaction instant with no
    // per-selection loading state. Each brand file is sparse (only its
    // overrides), left un-reference-resolved here — the editor resolves
    // display values itself against the live-edited Base tree.
    const brandEntries = await Promise.all(
      tokenBrands.map(async name => {
        const meta = await getBrandTokensFileMeta(name, ref)
        return [name, flattenTokenDocument(meta.content)] as const
      }),
    )

    return {
      tokens: parseTokenDocument(doc),
      error: null,
      syncStatus: status,
      branches,
      tokenBrands,
      brandTokens: Object.fromEntries(brandEntries),
    }
  } catch (err) {
    return {
      tokens: [],
      error: err instanceof Error ? err.message : 'Unknown error',
      syncStatus: DEFAULT_SYNC_STATUS,
      branches: [base],
      tokenBrands: [],
      brandTokens: {},
    }
  }
}

export default async function Home() {
  const { tokens, error, syncStatus, branches, tokenBrands, brandTokens } = await loadTokens()

  if (error) {
    return (
      <main>
        <p role="alert" className="p-6">
          Failed to load tokens: {error}
        </p>
      </main>
    )
  }

  return (
    <main>
      <TokenEditor
        tokens={tokens}
        defaultBranch={getGithubRef()}
        branches={branches}
        tokenBrands={tokenBrands}
        brandTokens={brandTokens}
        syncStatus={syncStatus}
      />
    </main>
  )
}
