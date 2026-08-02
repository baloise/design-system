import { fetchBaseTokensFile } from '@/src/tokens/github'
import { parseTokenDocument } from '@/src/tokens/flatten'
import type { FlatToken } from '@/src/tokens/types'
import { Header } from './header'
import { TokenEditor } from './token-editor'

// Read on every request — the table must reflect what's on GitHub right now,
// not a snapshot frozen at the last build/deploy.
export const dynamic = 'force-dynamic'

async function loadTokens(): Promise<{ tokens: FlatToken[]; error: string | null }> {
  try {
    const raw = await fetchBaseTokensFile()
    const doc = JSON.parse(raw) as Record<string, unknown>
    return { tokens: parseTokenDocument(doc), error: null }
  } catch (err) {
    return { tokens: [], error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export default async function Home() {
  const { tokens, error } = await loadTokens()

  if (error) {
    return (
      <main>
        <Header />
        <p role="alert" className="p-6">
          Failed to load tokens: {error}
        </p>
      </main>
    )
  }

  return (
    <main>
      <Header />
      <TokenEditor tokens={tokens} />
    </main>
  )
}
