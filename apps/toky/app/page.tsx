import { fetchBaseTokensFile, getGithubRef } from '@/src/tokens/github'
import { getBrandTokensFileMeta, listBranches, listTokenBrandFiles, resolveReadRef } from '@/src/tokens/github-write'
import type { SyncStatus } from '@/src/tokens/github-write'
import { flattenTokenDocument, parseTokenDocument } from '@/src/tokens/flatten'
import type { FlatToken } from '@/src/tokens/types'
import { TokenEditor } from './token-editor'

// Read on every request — the table must reflect what's on GitHub right now,
// not a snapshot frozen at the last build/deploy.
export const dynamic = 'force-dynamic'

const DEFAULT_SYNC_STATUS: SyncStatus = { state: 'synced', prUrl: null, prNumber: null }

async function loadTokens(): Promise<{
  tokens: FlatToken[]
  error: string | null
  syncStatus: SyncStatus
  branches: string[]
  tokenBrands: string[]
  brandTokens: Record<string, FlatToken[]>
}> {
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
