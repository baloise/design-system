import { DownloadIcon, Link2Icon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FigmaPullResult, PullPlan } from '@/src/tokens/figma-pull'
import { pullEntryKey } from '@/src/tokens/figma-pull'
import { formatValue, getColorHex, toSlashPath } from '@/src/tokens/format'
import type { SyncStatus } from '@/src/tokens/github-write'
import type { FlatToken } from '@/src/tokens/types'
import { SidebarPanel } from './sidebar'

// Small inline "swatch + text" rendering for one side of a value diff —
// shared by the reference case (a token pointing elsewhere) and the literal
// case (color swatch + hex, or plain formatted value).
function ValueChip({ referenceTarget, rawValue }: { referenceTarget: string | null; rawValue: unknown }) {
  if (referenceTarget) {
    return (
      <span className="inline-flex min-w-0 items-center gap-1">
        <Link2Icon className="size-3 shrink-0" />
        <span className="truncate">{toSlashPath(referenceTarget)}</span>
      </span>
    )
  }
  const hex = getColorHex(rawValue)
  return (
    <span className="inline-flex min-w-0 items-center gap-1">
      {hex && (
        <span aria-hidden="true" className="size-3 shrink-0 rounded-sm border" style={{ backgroundColor: hex }} />
      )}
      <span className="truncate">{formatValue(rawValue)}</span>
    </span>
  )
}

function PullPlanSection({
  label,
  scope,
  plan,
  beforeFor,
  selection,
  onToggleSelection,
}: {
  label: string
  scope: string
  plan: PullPlan
  beforeFor: (path: string[]) => FlatToken | undefined
  selection: Set<string>
  onToggleSelection: (key: string) => void
}) {
  const items = [
    ...plan.creates.map(e => ({ entry: e, badge: 'Created', variant: 'default' as const })),
    ...plan.updates.map(e => ({ entry: e, badge: 'Updated', variant: 'secondary' as const })),
    ...plan.deletes.map(e => ({ entry: e, badge: 'Deleted', variant: 'destructive' as const })),
  ]
  if (items.length === 0 && plan.skipped.length === 0) return null

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {items.length > 0 && (
        <ul className="space-y-1">
          {items.map(({ entry, badge, variant }) => {
            const before = beforeFor(entry.path)
            const key = pullEntryKey(scope, entry.path)
            return (
              <li
                key={`${entry.kind}-${entry.path.join('.')}`}
                className="flex items-center gap-3 rounded-md border border-border/60 px-2.5 py-1.5 text-sm"
              >
                <input
                  type="checkbox"
                  aria-label={`Include ${entry.path.join('/')} in this pull`}
                  checked={selection.has(key)}
                  onChange={() => onToggleSelection(key)}
                  className="size-4 shrink-0 accent-primary"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate">{entry.path.join('/')}</p>
                  <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    {entry.kind !== 'create' && before && (
                      <span className={cn('min-w-0', entry.kind === 'delete' && 'line-through')}>
                        <ValueChip referenceTarget={before.referenceTarget} rawValue={before.rawValue} />
                      </span>
                    )}
                    {entry.kind === 'update' && <span className="shrink-0">→</span>}
                    {entry.kind !== 'delete' && (
                      <span className="min-w-0 text-foreground">
                        <ValueChip referenceTarget={entry.referenceTarget} rawValue={entry.rawValue} />
                      </span>
                    )}
                  </p>
                </div>
                <Badge variant={variant} className="shrink-0">
                  {badge}
                </Badge>
              </li>
            )
          })}
        </ul>
      )}
      {plan.skipped.length > 0 && (
        <ul className="space-y-1">
          {plan.skipped.map(s => (
            <li key={s.variableId} className="flex items-start gap-2 text-xs text-muted-foreground">
              <TriangleAlertIcon
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-amber-500 dark:text-amber-400"
              />
              <span>
                {s.name}: {s.reason}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function FigmaPullSidebar({
  width,
  onWidthChange,
  syncStatus,
  loading,
  error,
  plan,
  selection,
  selectableCount,
  hasNothingToApply,
  onPull,
  onToggleSelection,
  onSelectAll,
  onSelectNone,
  onApply,
  onCancel,
  beforeForBase,
  beforeForBrand,
}: {
  width: number
  onWidthChange: (width: number) => void
  syncStatus: SyncStatus
  loading: boolean
  error: string | null
  plan: FigmaPullResult | null
  selection: Set<string>
  selectableCount: number
  hasNothingToApply: boolean
  onPull: () => void
  onToggleSelection: (key: string) => void
  onSelectAll: () => void
  onSelectNone: () => void
  onApply: () => void
  onCancel: () => void
  beforeForBase: (path: string[]) => FlatToken | undefined
  beforeForBrand: (brand: string) => (path: string[]) => FlatToken | undefined
}) {
  const plans = plan ? [plan.base, ...Object.values(plan.brands)] : []
  const totalCount = plans.reduce(
    (sum, p) => sum + p.creates.length + p.updates.length + p.deletes.length + p.conflicts.length,
    0,
  )
  const isEmptyResult = plan !== null && totalCount === 0

  return (
    <SidebarPanel
      title="Pull from Figma"
      count={totalCount}
      width={width}
      onWidthChange={onWidthChange}
      syncStatus={syncStatus}
      toolbar={
        <>
          <Button type="button" variant="outline" className="w-full" disabled={loading} onClick={onPull}>
            <DownloadIcon />
            {loading ? 'Pulling…' : plan ? 'Pull again' : 'Pull from Figma'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {selectableCount > 0 && (
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span>
                {selection.size} of {selectableCount} selected
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="underline underline-offset-2 hover:text-foreground"
                  onClick={onSelectAll}
                >
                  All
                </button>
                <button
                  type="button"
                  className="underline underline-offset-2 hover:text-foreground"
                  onClick={onSelectNone}
                >
                  None
                </button>
              </div>
            </div>
          )}

          {plan && !isEmptyResult && (
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                Discard
              </Button>
              <Button type="button" className="flex-1" disabled={hasNothingToApply} onClick={onApply}>
                Apply{selection.size > 0 ? ` ${selection.size}` : ''}
              </Button>
            </div>
          )}
        </>
      }
    >
      {!plan ? (
        <p className="text-sm text-muted-foreground">
          {loading
            ? 'Reading variables from Figma…'
            : 'Pull to see what changed in Figma since your tokens were last loaded.'}
        </p>
      ) : isEmptyResult ? (
        <p className="text-sm text-muted-foreground">No changes — Figma matches your current tokens.</p>
      ) : (
        <div className="space-y-3">
          <PullPlanSection
            label="Base"
            scope="base"
            plan={plan.base}
            beforeFor={beforeForBase}
            selection={selection}
            onToggleSelection={onToggleSelection}
          />
          {Object.entries(plan.brands).map(([brand, brandPlan]) => (
            <PullPlanSection
              key={brand}
              label={brand}
              scope={brand}
              plan={brandPlan}
              beforeFor={beforeForBrand(brand)}
              selection={selection}
              onToggleSelection={onToggleSelection}
            />
          ))}
        </div>
      )}
    </SidebarPanel>
  )
}
