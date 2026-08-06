import { XIcon } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { TokenDiffEntry, TokenDiffKind } from '@/src/tokens/edit'
import type { SyncStatus } from '@/src/tokens/github-write'
import { SidebarPanel } from './sidebar'

export const DIFF_KIND_LABEL: Record<TokenDiffKind, string> = {
  create: 'Created',
  update: 'Updated',
  delete: 'Deleted',
}

export const DIFF_KIND_VARIANT: Record<TokenDiffKind, 'default' | 'secondary' | 'destructive'> = {
  create: 'default',
  update: 'secondary',
  delete: 'destructive',
}

export type SubmitState = 'idle' | 'submitting' | 'success' | 'conflict' | 'error'

// A rename shows up as its own 'update' entry per renamed token, same as a
// value change, since computeDiff doesn't distinguish the two at the
// TokenDiffEntry level. `label` prefixes each row (e.g. a brand name) so a
// brand's overrides read distinctly from Base's own edits in the same list.
function DiffList({ diff, label }: { diff: TokenDiffEntry[]; label?: string }) {
  return (
    <ul className="space-y-1">
      {diff.map((entry, index) => (
        <li key={index} className="flex items-center justify-between gap-2 text-sm">
          <span className="min-w-0 truncate">
            {label && <span className="text-muted-foreground">{label} · </span>}
            {(entry.newPath ?? entry.oldPath)?.join('/')}
          </span>
          <Badge variant={DIFF_KIND_VARIANT[entry.kind]} className="shrink-0">
            {label
              ? { create: 'Overridden', update: 'Overridden', delete: 'Reverted' }[entry.kind]
              : DIFF_KIND_LABEL[entry.kind]}
          </Badge>
        </li>
      ))}
    </ul>
  )
}

// A brand override's diff is computed against that brand's own (usually
// near-empty) sparse file, so a 'create' entry there just means "this token
// wasn't overridden before" — "Overridden" reads better than "Created" for
// both create and update kinds in that context.
function BrandDiffLists({ brandDiffs }: { brandDiffs: Record<string, TokenDiffEntry[]> }) {
  const names = Object.keys(brandDiffs).sort((a, b) => a.localeCompare(b))
  if (names.length === 0) return null
  return (
    <div className="space-y-1 border-b border-border pb-1">
      {names.map(name => (
        <DiffList key={name} diff={brandDiffs[name]} label={name} />
      ))}
    </div>
  )
}

// A pending "create brand" isn't a token diff (a whole new file, not an
// edit to Base.tokens.json) — kept out of the undo/redo history that
// `working` gets, so it needs its own un-stage control instead of Ctrl+Z.
function PendingBrandList({
  pendingBrands,
  onUnstageBrand,
}: {
  pendingBrands: string[]
  onUnstageBrand: (name: string) => void
}) {
  return (
    <ul className="space-y-1 border-b border-border pb-1">
      {pendingBrands.map(name => (
        <li key={name} className="flex items-center justify-between gap-2 text-sm">
          <span className="min-w-0 truncate">New brand: {name}</span>
          <div className="flex shrink-0 items-center gap-1.5">
            <Badge variant="default">Created</Badge>
            <button
              type="button"
              aria-label={`Remove staged brand ${name}`}
              onClick={() => onUnstageBrand(name)}
              className="text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function StagedChangesSidebar({
  diff,
  pendingBrands,
  onUnstageBrand,
  brandDiffs,
  width,
  onWidthChange,
  syncStatus,
  description,
  onDescriptionChange,
  targetBranch,
  onTargetBranchChange,
  defaultBranch,
  branches,
  problemCount,
  onViewProblems,
  canSubmit,
  submitState,
  submitMessage,
  onSubmit,
}: {
  diff: TokenDiffEntry[]
  pendingBrands: string[]
  onUnstageBrand: (name: string) => void
  brandDiffs: Record<string, TokenDiffEntry[]>
  width: number
  onWidthChange: (width: number) => void
  syncStatus: SyncStatus
  description: string
  onDescriptionChange: (value: string) => void
  targetBranch: string
  onTargetBranchChange: (value: string) => void
  defaultBranch: string
  branches: string[]
  problemCount: number
  onViewProblems: () => void
  canSubmit: boolean
  submitState: SubmitState
  submitMessage: string | null
  onSubmit: () => void
}) {
  const brandDiffCount = Object.values(brandDiffs).reduce((sum, d) => sum + d.length, 0)
  const totalCount = diff.length + pendingBrands.length + brandDiffCount

  return (
    <SidebarPanel
      title="Staged changes"
      count={totalCount}
      width={width}
      onWidthChange={onWidthChange}
      syncStatus={syncStatus}
      toolbar={
        <>
          <Textarea
            aria-label="Describe this change (goes in the pull request)"
            placeholder="Describe this change (goes in the pull request)…"
            rows={3}
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            disabled={submitState === 'submitting'}
          />
          <Select
            value={targetBranch}
            onValueChange={value => onTargetBranchChange(value ?? '')}
            disabled={submitState === 'submitting'}
          >
            <SelectTrigger aria-label="Target branch" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {/* branches from GitHub might not (yet) include the currently
                  selected/default one, e.g. right after this same submit
                  created it — union it in so the trigger never shows blank. */}
              {[...new Set([defaultBranch, targetBranch, ...branches])].map(branch => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                  {branch === defaultBranch && ' (default)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" className="w-full" disabled={!canSubmit} onClick={onSubmit}>
            {submitState === 'submitting' ? 'Submitting…' : `Submit ${totalCount} change${totalCount === 1 ? '' : 's'}`}
          </Button>

          {problemCount > 0 && (
            <button
              type="button"
              onClick={onViewProblems}
              className="text-xs text-destructive underline underline-offset-2"
            >
              Fix {problemCount} problem{problemCount === 1 ? '' : 's'} before submitting
            </button>
          )}
          {submitState === 'success' && submitMessage && (
            <Alert role="status">
              <AlertDescription>
                Submitted for review — <a href={submitMessage}>view your change</a>.
              </AlertDescription>
            </Alert>
          )}
          {(submitState === 'conflict' || submitState === 'error') && submitMessage && (
            <Alert variant="destructive">
              <AlertDescription>{submitMessage}</AlertDescription>
            </Alert>
          )}
        </>
      }
    >
      {totalCount === 0 ? (
        <p className="text-sm text-muted-foreground">No changes yet.</p>
      ) : (
        <div className="space-y-2">
          {pendingBrands.length > 0 && (
            <PendingBrandList pendingBrands={pendingBrands} onUnstageBrand={onUnstageBrand} />
          )}
          <BrandDiffLists brandDiffs={brandDiffs} />
          {diff.length > 0 && <DiffList diff={diff} />}
        </div>
      )}
    </SidebarPanel>
  )
}
