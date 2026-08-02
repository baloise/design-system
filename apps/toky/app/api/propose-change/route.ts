import { NextResponse } from 'next/server'
import { applyDiffToDocument } from '@/src/tokens/edit'
import type { TokenDiffEntry } from '@/src/tokens/edit'
import { flattenTokenDocument } from '@/src/tokens/flatten'
import { createBranch, getBaseTokensFileMeta, openPullRequest, updateFileOnBranch } from '@/src/tokens/github-write'

interface ProposeChangeRequest {
  diff: TokenDiffEntry[]
  description: string
}

interface ConflictInfo {
  path: string
  reason: 'changed' | 'already-exists'
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown error'
}

function buildPrBody(diff: TokenDiffEntry[], description: string): string {
  const created = diff.filter(e => e.kind === 'create').map(e => e.newPath!.join('.'))
  const updated = diff.filter(e => e.kind === 'update').map(e => `${e.oldPath!.join('.')} → ${e.newPath!.join('.')}`)
  const deleted = diff.filter(e => e.kind === 'delete').map(e => e.oldPath!.join('.'))

  const lines = ["Submitted via the Toky web app — no signed-in identity yet, end-user auth isn't wired up.", '']
  if (description.trim()) lines.push(description.trim(), '')
  if (created.length) lines.push(`**Created:** ${created.join(', ')}`)
  if (updated.length) lines.push(`**Updated:** ${updated.join(', ')}`)
  if (deleted.length) lines.push(`**Deleted:** ${deleted.join(', ')}`)

  return lines.join('\n')
}

export async function POST(request: Request): Promise<Response> {
  let body: ProposeChangeRequest
  try {
    body = (await request.json()) as ProposeChangeRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { diff, description } = body
  if (!Array.isArray(diff) || diff.length === 0) {
    return NextResponse.json({ error: 'No changes to submit.' }, { status: 400 })
  }

  let meta
  try {
    meta = await getBaseTokensFileMeta()
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }

  const freshByPath = new Map(flattenTokenDocument(meta.content).map(t => [t.path.join('.'), t]))
  const conflicts: ConflictInfo[] = []

  for (const entry of diff) {
    if (entry.kind === 'create') {
      if (entry.newPath && freshByPath.has(entry.newPath.join('.'))) {
        conflicts.push({ path: entry.newPath.join('.'), reason: 'already-exists' })
      }
      continue
    }

    if (!entry.oldPath) continue
    const current = freshByPath.get(entry.oldPath.join('.'))
    const currentValue = current ? current.rawValue : undefined
    if (JSON.stringify(currentValue) !== JSON.stringify(entry.before)) {
      conflicts.push({ path: entry.oldPath.join('.'), reason: 'changed' })
    }
  }

  if (conflicts.length > 0) {
    return NextResponse.json({ error: 'conflict', conflicts }, { status: 409 })
  }

  const nextDoc = applyDiffToDocument(meta.content, diff)
  const branch = `toky/update-${Date.now()}`

  try {
    await createBranch(branch)
    await updateFileOnBranch(
      branch,
      `${JSON.stringify(nextDoc, null, 2)}\n`,
      meta.sha,
      'chore(tokens): update via Toky',
    )
    const pr = await openPullRequest(branch, '🎨 Update design tokens via Toky', buildPrBody(diff, description))
    return NextResponse.json({ url: pr.url, number: pr.number }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }
}
