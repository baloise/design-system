'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  Code2Icon,
  EllipsisIcon,
  GitBranchIcon,
  HexagonIcon,
  Link2Icon,
  NetworkIcon,
  PencilIcon,
  PlusIcon,
  Redo2Icon,
  SearchIcon,
  SwatchBookIcon,
  Trash2Icon,
  TriangleAlertIcon,
  Undo2Icon,
  Unlink2Icon,
  XIcon,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { computeDiff, describeChangeStatus, effectiveValue, pathFor } from '@/src/tokens/edit'
import type { ChangeStatus, TokenDiffEntry, WorkingToken } from '@/src/tokens/edit'
import { filterTokensByName, normalizeSearchText } from '@/src/tokens/filter'
import { resolveReferences } from '@/src/tokens/flatten'
import { getColorHex, hexToColorValue, toSlashPath } from '@/src/tokens/format'
import codeUsageData from '@/src/tokens/code-usage.generated.json'
import { countDirectReferences } from '@/src/tokens/graph'
import { getNextCell } from '@/src/tokens/keyboard'
import type { NavigationKey } from '@/src/tokens/keyboard'
import type { SyncStatus } from '@/src/tokens/github-write'
import { validateWorkingTokens } from '@/src/tokens/validate'
import type { FlatToken, TokenLayer } from '@/src/tokens/types'
import { BrandsSidebar } from './brands-sidebar'
import { ProblemsSidebar } from './problems-sidebar'
import type { ProblemItem } from './problems-sidebar'
import { ACTIVITY_BAR_WIDTH, SIDEBAR_DEFAULT_WIDTH, SidebarActivityBar } from './sidebar'
import type { SidebarActivityItem } from './sidebar'
import { StagedChangesSidebar } from './staged-changes-sidebar'
import { useUndoableState } from './use-undoable-state'
import type { SubmitState } from './staged-changes-sidebar'
import { TokenGraph } from './token-graph'

const LAYERS: TokenLayer[] = ['Global', 'Alias', 'Component']
const LAYER_EMOJI: Record<TokenLayer, string> = { Global: '🌐', Alias: '🔗', Component: '🧩' }
// Name, Value — the two columns that participate in arrow-key navigation.
// The delete/graph buttons are reachable via Tab, same as any other
// focusable element, but sit outside this grid on purpose (arrow-nav only
// makes sense across uniform columns).
const COLUMN_COUNT = 2

let draftIdCounter = 0

interface Draft {
  name: string
  layer: TokenLayer
  type: string
  value: string
  referenceTarget: string
}

function emptyDraft(layer: TokenLayer = 'Global'): Draft {
  return { name: '', layer, type: 'string', value: '', referenceTarget: '' }
}

// Tokens are grouped for display by everything but the last dot-segment of their
// name (e.g. "Color.Danger.1" groups under "Color.Danger", displayed as leaf "1").
function groupPrefixFor(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx === -1 ? '' : name.slice(0, idx)
}

// The outer wrapper group — everything before the first dot (e.g. "Footer" for
// "Footer.Color.Link.1") — one level up from `groupPrefixFor`, mirroring
// Figma's top-level grouping by component name (Component layer) or subject
// (Global/Alias layers).
function outerGroupFor(name: string): string {
  const idx = name.indexOf('.')
  return idx === -1 ? '' : name.slice(0, idx)
}

function leafNameFor(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx === -1 ? name : name.slice(idx + 1)
}

// "White" -> "White copy", or "White copy 2", "White copy 3", ... if that's
// already taken — keeps the duplicate in the same group as its source.
function uniqueCopyName(layer: TokenLayer, name: string, working: WorkingToken[]): string {
  const prefix = groupPrefixFor(name)
  const leaf = leafNameFor(name)
  const taken = new Set(working.filter(w => w.token.layer === layer).map(w => w.token.name))

  let suffix = 'copy'
  let candidate = prefix ? `${prefix}.${leaf} ${suffix}` : `${leaf} ${suffix}`
  let n = 2
  while (taken.has(candidate)) {
    suffix = `copy ${n++}`
    candidate = prefix ? `${prefix}.${leaf} ${suffix}` : `${leaf} ${suffix}`
  }
  return candidate
}

// Table-cell fields read as plain cell content until interacted with — no
// border or background of their own — then pick up the normal input chrome
// on hover/focus so it's clear the cell became editable (Figma-style grid).
const CELL_FIELD_CLASS =
  'h-8 rounded-none border-transparent bg-transparent shadow-none hover:bg-muted/30 focus-visible:border-input focus-visible:bg-input/30 focus-visible:ring-3 focus-visible:ring-ring dark:bg-transparent dark:hover:bg-muted/30 dark:focus-visible:bg-input/30'

const CELL_TRIGGER_CLASS =
  'flex h-8 w-full items-center gap-2 rounded-none border border-transparent bg-transparent px-2 text-sm outline-none hover:bg-muted/30 focus-visible:border-input focus-visible:ring-3 focus-visible:ring-ring aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20'

// Alias/reference tags are just the normal outline Button — the same chip
// used everywhere else in the app (e.g. the toolbar's search button) —
// capped at 28px tall and left-aligning its swatch/text content.
const CELL_TAG_CLASS = 'h-7 max-h-7 justify-start gap-2 overflow-hidden px-2 font-normal'

interface CodeUsageLocation {
  package: 'core' | 'css'
  file: string
}

interface CodeUsageEntry {
  count: number
  locations: CodeUsageLocation[]
}

const CODE_USAGE = codeUsageData as Record<string, CodeUsageEntry>

const CHANGE_STATUS_LABEL: Record<ChangeStatus, string> = {
  created: 'Created',
  renamed: 'Renamed',
  value: 'Value changed',
}

const CHANGE_STATUS_VARIANT: Record<ChangeStatus, 'default' | 'secondary' | 'outline'> = {
  created: 'default',
  renamed: 'secondary',
  value: 'outline',
}

function getEditableValueText(token: FlatToken): string {
  if (token.referenceTarget) return ''
  if (token.type === 'color') return getColorHex(token.rawValue) ?? ''
  return token.rawValue === undefined || token.rawValue === null ? '' : String(token.rawValue)
}

type ParsedValue = { ok: true; value: unknown } | { ok: false }

// `previous` supplies the color's existing colorSpace/alpha so typing a hex
// value or picking one doesn't silently reset them.
function parseEditableValue(type: string, text: string, previous?: unknown): ParsedValue {
  if (type === 'color') {
    if (text.trim() === '') return { ok: true, value: '' }
    const color = hexToColorValue(text, previous)
    if (color) return { ok: true, value: color }
    try {
      return { ok: true, value: JSON.parse(text) }
    } catch {
      return { ok: false }
    }
  }
  if (type === 'number') {
    if (text.trim() === '') return { ok: true, value: '' }
    const n = Number(text)
    return Number.isNaN(n) ? { ok: false } : { ok: true, value: n }
  }
  return { ok: true, value: text }
}

// The reference-picker body shared by the color popover's "Reference" tab and
// the plain-value types' reference popover — a dedicated search field with an
// always-visible, independently scrollable results list underneath (rather
// than a floating combobox dropdown), matching Figma's reference panel. Kept
// as its own top-level component (not a nested function) so its local filter
// state — and the search input's focus — survives the parent re-rendering on
// every keystroke.
function ReferenceSearch({
  options,
  currentValue,
  onSelect,
  ariaLabel,
}: {
  options: string[]
  currentValue: string
  onSelect: (value: string) => void
  ariaLabel: string
}) {
  const [filter, setFilter] = useState('')
  const filtered = useMemo(() => {
    const query = normalizeSearchText(filter)
    if (!query) return options
    return options.filter(option => normalizeSearchText(option).includes(query))
  }, [options, filter])

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label={ariaLabel}
          placeholder="Search"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="h-64 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-2.5 py-2 text-sm text-muted-foreground">No matching tokens.</p>
        ) : (
          filtered.map(option => {
            const isActive = option === currentValue
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={cn(
                  'flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-sm outline-none',
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <span className="flex-1 truncate">{toSlashPath(option)}</span>
                {isActive && <CheckIcon className="size-4 shrink-0" />}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

export function TokenEditor({
  tokens,
  defaultBranch,
  branches,
  tokenBrands,
  brandTokens,
  syncStatus,
}: {
  tokens: FlatToken[]
  defaultBranch: string
  branches: string[]
  tokenBrands: string[]
  // Each real brand's own sparse override file, flattened but not
  // reference-resolved (resolution happens against the live-edited Base
  // tree — see brandMergedResolved below).
  brandTokens: Record<string, FlatToken[]>
  // Rendered at the top of whichever sidebar panel is open — the site header
  // that used to show it is gone (see SidebarPanel/SidebarActivityBar).
  syncStatus: SyncStatus
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeLayer, setActiveLayer] = useState<TokenLayer>('Global')
  const [working, setWorking, workingHistory] = useUndoableState<WorkingToken[]>(() =>
    tokens.map(token => ({ id: token.path.join('.'), token })),
  )
  const [malformed, setMalformed] = useState<Set<string>>(new Set())
  // What's currently typed in each row's Name/Value cell — decoupled from
  // `working` so keystrokes only update the input's own text, not `working`
  // itself (which would re-run the diff/validation/filtering over the whole
  // table on every keystroke). Committed to `working` on blur instead.
  const [nameDraftText, setNameDraftText] = useState<Record<string, string>>({})
  const [valueDraftText, setValueDraftText] = useState<Record<string, string>>({})
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [draftMalformed, setDraftMalformed] = useState(false)
  // Explicit Color/Reference tab picks — switching tabs is just a view choice,
  // never a data change, so a row can sit on "Color" while still holding a
  // referenceTarget (or vice versa) until the user actually edits a value or
  // picks a reference. Absent here, the mode falls back to whatever the data
  // says (has a referenceTarget → reference, otherwise → value).
  const [modeOverride, setModeOverride] = useState<Map<string, 'value' | 'reference'>>(new Map())
  const [draftModeOverride, setDraftModeOverride] = useState<'value' | 'reference' | null>(null)
  // Which row's (or 'draft') value/reference popover is open — at most one at a time.
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
  // Which row's code-usage locations popover is open — independent of openPopoverId.
  const [openCodeUsageId, setOpenCodeUsageId] = useState<string | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  // The group currently being batch-renamed (via its header's edit icon), and the
  // text of the in-progress edit — kept separate from `group` so typing doesn't
  // affect which rows are matched as members of the group until it's committed.
  const [editingGroup, setEditingGroup] = useState<{ group: string; text: string } | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [targetBranch, setTargetBranch] = useState(defaultBranch)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [graphRoot, setGraphRoot] = useState<{ paths: string[]; title: string } | null>(null)
  const [searchExpanded, setSearchExpanded] = useState(false)
  // Set right after Ctrl/Cmd+D inserts a duplicate row — picked up by an effect once
  // the new row has actually rendered (and its cellRef exists) so it can be focused.
  const [focusPendingId, setFocusPendingId] = useState<string | null>(null)
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH)
  const [activeSidebarTab, setActiveSidebarTab] = useState('changes')
  // Staged "create brand" entries — separate from `working`'s undo/redo
  // history since a brand isn't a token-level edit, just its own file.
  const [pendingBrands, setPendingBrands] = useState<string[]>([])
  // null = Base only. A real brand name, or a pendingBrands name not yet on
  // GitHub (brandTokens has no entry for it yet — treated as starting empty,
  // same as any other freshly created brand).
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  // Per-brand sparse override working copies, keyed by brand name — kept
  // independent of `working`'s undo/redo history (see the grilling decision:
  // no Ctrl+Z for brand edits in this pass). Only ever holds entries whose
  // value actually differs from Base's *current* value — see
  // upsertOrRemoveBrandEntry, which enforces that invariant on every commit
  // rather than leaving "no-op overrides" lying around.
  const [brandWorking, setBrandWorking] = useState<Record<string, WorkingToken[]>>(() =>
    Object.fromEntries(
      Object.entries(brandTokens).map(([name, list]) => [
        name,
        list.map(token => ({ id: token.path.join('.'), token })),
      ]),
    ),
  )
  const [brandValueDraftText, setBrandValueDraftText] = useState<Record<string, string>>({})
  const [brandMalformed, setBrandMalformed] = useState<Set<string>>(new Set())
  // Same explicit-tab-pick tracking as `modeOverride`, for the selected brand's column.
  const [brandModeOverride, setBrandModeOverride] = useState<Map<string, 'value' | 'reference'>>(new Map())
  // Clicking the rail icon for the panel that's already open collapses it
  // down to just the icon rail (more room for the table); clicking it again
  // (or any other icon) reopens it — same as VS Code's activity bar.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  // Set right before router.refresh() on a successful submit — picked up by
  // the effect below once the refreshed `tokens` prop actually arrives, so
  // `working` (and its diff) rebase onto the branch's new post-submit state
  // instead of re-diffing against the pre-submit snapshot with now-stale
  // synthetic ids for anything that was just created.
  const pendingResyncRef = useRef(false)

  function selectSidebarTab(id: string) {
    if (!sidebarCollapsed && id === activeSidebarTab) {
      setSidebarCollapsed(true)
      return
    }
    setActiveSidebarTab(id)
    setSidebarCollapsed(false)
  }

  const cellRefs = useRef(new Map<string, HTMLInputElement>())
  const focusSnapshot = useRef<{ id: string; col: number; value: string } | null>(null)

  useEffect(() => {
    if (!pendingResyncRef.current) return
    pendingResyncRef.current = false
    // Resets undo/redo history too — old entries reference synthetic ids
    // and pre-submit paths that no longer make sense against this baseline.
    workingHistory.replace(tokens.map(token => ({ id: token.path.join('.'), token })))
    setMalformed(new Set())
    setNameDraftText({})
    setValueDraftText({})
    setBrandWorking(
      Object.fromEntries(
        Object.entries(brandTokens).map(([name, list]) => [
          name,
          list.map(token => ({ id: token.path.join('.'), token })),
        ]),
      ),
    )
    setBrandValueDraftText({})
    setBrandMalformed(new Set())
  }, [tokens, brandTokens])

  const matchedTokens = useMemo(
    () =>
      new Set(
        filterTokensByName(
          working.map(w => w.token),
          query,
        ),
      ),
    [working, query],
  )
  const filteredWorking = useMemo(() => {
    const filtered = working.filter(w => matchedTokens.has(w.token) && w.token.layer === activeLayer)

    // Keep every group's tokens contiguous for display, regardless of where
    // they land in `working` — a newly created token (from the Create dialog,
    // Ctrl+D duplicate, or a token freshly loaded from GitHub) can end up
    // anywhere in the underlying array (e.g. GitHub's JSON stores new object
    // keys in insertion order, appended after existing sibling groups), which
    // would otherwise split its group into two separate header sections.
    // Bucketed twice — by outer group, then by inner group within it — so
    // both nesting levels stay contiguous for the render loop below.
    function bucketBy(items: WorkingToken[], keyFor: (w: WorkingToken) => string): WorkingToken[][] {
      const order: string[] = []
      const byKey = new Map<string, WorkingToken[]>()
      for (const w of items) {
        const key = keyFor(w)
        let bucket = byKey.get(key)
        if (!bucket) {
          bucket = []
          byKey.set(key, bucket)
          order.push(key)
        }
        bucket.push(w)
      }
      return order.map(key => byKey.get(key)!)
    }

    return bucketBy(filtered, w => outerGroupFor(w.token.name)).flatMap(outerBucket =>
      bucketBy(outerBucket, w => groupPrefixFor(w.token.name)).flat(),
    )
  }, [working, matchedTokens, activeLayer])
  const countByLayer = useMemo(() => {
    const counts = new Map<TokenLayer, number>()
    for (const layer of LAYERS) counts.set(layer, 0)
    for (const w of working) {
      if (matchedTokens.has(w.token)) counts.set(w.token.layer, (counts.get(w.token.layer) ?? 0) + 1)
    }
    return counts
  }, [working, matchedTokens])

  const referenceCounts = useMemo(() => countDirectReferences(working.map(w => w.token)), [working])

  const visibleGroups = useMemo(() => {
    const groups = filteredWorking.flatMap(w => [outerGroupFor(w.token.name), groupPrefixFor(w.token.name)])
    return [...new Set(groups.filter(group => group !== ''))]
  }, [filteredWorking])
  const allGroupsCollapsed = visibleGroups.length > 0 && visibleGroups.every(group => collapsedGroups.has(group))

  const originalById = useMemo(() => new Map(tokens.map(t => [t.path.join('.'), t])), [tokens])

  const referenceOptions = useMemo(() => {
    const paths = working
      .filter(w => w.token.name.trim() !== '')
      .map(w => pathFor(w.token.layer, w.token.name).join('.'))
    return [...new Set(paths)].sort()
  }, [working])

  const errors = useMemo(() => validateWorkingTokens(working), [working])
  const blockingErrors = useMemo(() => errors.filter(error => error.severity === 'error'), [errors])
  // Only blocking errors get the cell red-flagged inline — warnings (e.g. a
  // Component token aliasing Global directly) are advisory and surface
  // exclusively in the Problems tab, not as an in-table validation failure.
  const errorsById = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const error of blockingErrors) {
      map.set(error.tokenKey, [...(map.get(error.tokenKey) ?? []), error.message])
    }
    return map
  }, [blockingErrors])

  const diff = useMemo(() => computeDiff(tokens, working), [tokens, working])

  // One diff per brand that actually has staged edits — not just the
  // currently selected one, since brand edits persist independently of
  // which brand's column happens to be visible right now.
  const brandDiffs = useMemo(() => {
    const result: Record<string, TokenDiffEntry[]> = {}
    for (const [name, list] of Object.entries(brandWorking)) {
      const entryDiff = computeDiff(brandTokens[name] ?? [], list)
      if (entryDiff.length > 0) result[name] = entryDiff
    }
    return result
  }, [brandWorking, brandTokens])

  const totalBrandDiffCount = useMemo(
    () => Object.values(brandDiffs).reduce((sum, d) => sum + d.length, 0),
    [brandDiffs],
  )

  // The selected brand's values resolved for display: Base's current
  // (possibly locally-edited) tree with that brand's overrides layered on
  // top, then resolved the same way Base itself is — so a reference chain
  // that passes through an overridden token still resolves correctly.
  const brandResolvedByPath = useMemo(() => {
    if (!selectedBrand) return null
    const overrides = new Map((brandWorking[selectedBrand] ?? []).map(w => [w.id, w.token]))
    const merged = working.map(w => overrides.get(w.id) ?? w.token)
    return new Map(resolveReferences(merged).map(t => [t.path.join('.'), t]))
  }, [selectedBrand, working, brandWorking])

  const problems: ProblemItem[] = useMemo(
    () =>
      errors.map(error => {
        const name = working.find(w => w.id === error.tokenKey)?.token.name
        return {
          id: error.tokenKey,
          name: name ? toSlashPath(name) : '(unnamed token)',
          message: error.message,
          severity: error.severity,
        }
      }),
    [errors, working],
  )

  const sidebarItems: SidebarActivityItem[] = [
    {
      id: 'changes',
      label: 'Staged changes',
      icon: GitBranchIcon,
      badge: diff.length + pendingBrands.length + totalBrandDiffCount,
    },
    { id: 'problems', label: 'Problems', icon: TriangleAlertIcon, badge: problems.length },
    { id: 'brands', label: 'Brands', icon: SwatchBookIcon },
  ]

  const sidebarInset = ACTIVITY_BAR_WIDTH + (sidebarCollapsed ? 0 : sidebarWidth)

  function updateToken(id: string, updater: (token: FlatToken) => FlatToken) {
    setWorking(prev => prev.map(w => (w.id === id ? { ...w, token: updater(w.token) } : w)))
  }

  // Keystrokes only update the local draft — see commitName, called on blur.
  function handleNameInput(id: string, text: string) {
    setNameDraftText(prev => ({ ...prev, [id]: text }))
  }

  function commitName(id: string) {
    const text = nameDraftText[id]
    if (text === undefined) return // nothing pending — already committed (or reverted)

    // Renaming a token would otherwise silently break every other token
    // that references it by its old path — cascade the rename into their
    // referenceTarget too, in the same update so nothing else re-renders
    // in between with a dangling reference.
    setWorking(prev => {
      const current = prev.find(w => w.id === id)
      if (!current) return prev

      const prefix = groupPrefixFor(current.token.name)
      const newName = prefix ? `${prefix}.${text}` : text
      if (newName === current.token.name) return prev

      const oldPath = pathFor(current.token.layer, current.token.name).join('.')
      const newPath = pathFor(current.token.layer, newName).join('.')

      return prev.map(w => {
        if (w.id === id) return { ...w, token: { ...w.token, name: newName } }
        if (w.token.referenceTarget === oldPath) return { ...w, token: { ...w.token, referenceTarget: newPath } }
        return w
      })
    })

    setNameDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function nameTextFor(id: string, token: FlatToken): string {
    return nameDraftText[id] ?? leafNameFor(token.name)
  }

  function handleReferenceChange(id: string, text: string) {
    updateToken(id, t => ({ ...t, referenceTarget: text.trim() === '' ? null : text.trim() }))
  }

  function modeFor(id: string, token: FlatToken): 'value' | 'reference' {
    return modeOverride.get(id) ?? (token.referenceTarget !== null ? 'reference' : 'value')
  }

  function setRowMode(id: string, mode: 'value' | 'reference') {
    setModeOverride(prev => new Map(prev).set(id, mode))
  }

  const draftMode: 'value' | 'reference' =
    draftModeOverride ?? (draft.referenceTarget.trim() !== '' ? 'reference' : 'value')

  function setDraftMode(mode: 'value' | 'reference') {
    setDraftModeOverride(mode)
  }

  // Keystrokes only update the local draft — see commitValue, called on blur.
  // Bypassed by the native color-picker swatch, which commits immediately
  // via commitValueText since picking a color is already a discrete action,
  // not a stream of keystrokes.
  function handleValueInput(id: string, text: string) {
    setValueDraftText(prev => ({ ...prev, [id]: text }))
  }

  function commitValueText(id: string, type: string, text: string) {
    const previous = working.find(w => w.id === id)?.token.rawValue
    const parsed = parseEditableValue(type, text, previous)
    setMalformed(prev => {
      const next = new Set(prev)
      if (parsed.ok) next.delete(id)
      else next.add(id)
      return next
    })
    // On invalid JSON (color type only), `working`'s rawValue is deliberately left at its
    // last-valid value — `parsed.ok` is false, so this early-returns and nothing commits
    // until the text becomes valid JSON again. The input itself still shows exactly what
    // was typed, via `valueDraftText`, so the user isn't fighting a reverting field.
    if (!parsed.ok) {
      setValueDraftText(prev => ({ ...prev, [id]: text }))
      return
    }
    updateToken(id, t => ({ ...t, rawValue: parsed.value, referenceTarget: null }))
    setValueDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function commitValue(id: string, type: string) {
    const text = valueDraftText[id]
    if (text === undefined) return // nothing pending — already committed (or reverted)
    commitValueText(id, type, text)
  }

  function commitDraftIfReady() {
    const name = draft.name.trim()
    if (!name) return
    const parsed = parseEditableValue(draft.type, draft.value)
    if (!parsed.ok) {
      setDraftMalformed(true)
      return
    }
    const token: FlatToken = {
      path: [],
      name,
      layer: draft.layer,
      type: draft.type,
      rawValue: parsed.value,
      referenceTarget: draft.referenceTarget.trim() || null,
      resolvedValue: undefined,
      resolutionError: null,
      figmaId: null,
    }
    setWorking(prev => [...prev, { id: `new-${draftIdCounter++}`, token }])
    setDraft(emptyDraft())
    setDraftMalformed(false)
    setDraftModeOverride(null)
    setCreateDialogOpen(false)
  }

  function handleCreateDialogOpenChange(open: boolean) {
    setCreateDialogOpen(open)
    if (!open) {
      setDraft(emptyDraft(activeLayer))
      setDraftMalformed(false)
      setDraftModeOverride(null)
    }
  }

  // Every currently-visible row's id that falls under a given group header —
  // the roots fed into the group's "show reference graph" button.
  function tokenIdsInGroup(group: string, depth: number): string[] {
    const matches = depth === 0 ? outerGroupFor : groupPrefixFor
    return filteredWorking.filter(w => matches(w.token.name) === group).map(w => w.id)
  }

  function toggleGroup(group: string) {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  function toggleAllGroups() {
    setCollapsedGroups(allGroupsCollapsed ? new Set() : new Set(visibleGroups))
  }

  function startEditingGroup(group: string) {
    setEditingGroup({ group, text: group.split('.').join('/') })
  }

  function cancelGroupRename() {
    setEditingGroup(null)
  }

  function commitGroupRename() {
    if (!editingGroup) return
    const { group, text } = editingGroup
    const newGroup = text
      .split('/')
      .map(segment => segment.trim())
      .filter(Boolean)
      .join('.')
    setEditingGroup(null)
    if (!newGroup || newGroup === group) return

    // A group with no dot is only ever shown as an outer (component-level)
    // group in the UI — an inner subgroup at that same depth would collapse
    // into the outer header instead (see the render loop). So renaming it
    // needs to cascade to every descendant at any depth, not just direct
    // children, unlike an inner group's rename.
    const isOuterGroup = !group.includes('.')

    setWorking(prev => {
      // Every token in this group moves at once — track old→new path per
      // token so anything referencing one of them (from inside or outside
      // the group) gets cascaded too, same as a single-token rename.
      const renamed = new Map<string, string>()
      const renamedGroup = prev.map(w => {
        const name = w.token.name
        const matches = isOuterGroup ? name === group || name.startsWith(`${group}.`) : groupPrefixFor(name) === group
        if (!matches) return w
        const newName = isOuterGroup ? newGroup + name.slice(group.length) : `${newGroup}.${leafNameFor(name)}`
        renamed.set(pathFor(w.token.layer, name).join('.'), pathFor(w.token.layer, newName).join('.'))
        return { ...w, token: { ...w.token, name: newName } }
      })

      return renamedGroup.map(w => {
        const mapped = w.token.referenceTarget && renamed.get(w.token.referenceTarget)
        return mapped ? { ...w, token: { ...w.token, referenceTarget: mapped } } : w
      })
    })
  }

  function handleDeleteRow(id: string, name: string) {
    if (
      typeof window !== 'undefined' &&
      !window.confirm(`Delete "${name}"? Nothing happens until you submit and it's reviewed and merged.`)
    ) {
      return
    }
    setWorking(prev => prev.filter(w => w.id !== id))
  }

  // Inserts a copy of `id`'s token directly below it (same position in `working`,
  // not just appended) so it lands in the same group and the row order stays
  // predictable. Renaming is left to the user — the Name field gets focused next.
  function duplicateRow(id: string) {
    const newId = `new-${draftIdCounter++}`
    setWorking(prev => {
      const sourceIndex = prev.findIndex(w => w.id === id)
      if (sourceIndex === -1) return prev
      const source = prev[sourceIndex]
      const duplicateToken: FlatToken = {
        ...source.token,
        name: uniqueCopyName(source.token.layer, source.token.name, prev),
      }
      const next = [...prev]
      next.splice(sourceIndex + 1, 0, { id: newId, token: duplicateToken })
      return next
    })
    setFocusPendingId(newId)
  }

  function focusCell(row: number, col: number) {
    cellRefs.current.get(`${row}-${col}`)?.focus()
  }

  const totalRows = filteredWorking.length

  useEffect(() => {
    if (!focusPendingId) return
    const row = filteredWorking.findIndex(w => w.id === focusPendingId)
    if (row === -1) return
    const input = cellRefs.current.get(`${row}-0`)
    if (!input) return
    input.focus()
    input.select()
    setFocusPendingId(null)
  }, [focusPendingId, filteredWorking])

  // Ctrl/Cmd+D duplicates whichever row currently has focus anywhere inside it
  // (a cell input, the graph button, the delete button, ...).
  useEffect(() => {
    function handleDuplicateShortcut(e: globalThis.KeyboardEvent) {
      if (e.key.toLowerCase() !== 'd' || !(e.ctrlKey || e.metaKey)) return
      const active = document.activeElement
      if (!(active instanceof HTMLElement)) return
      const row = active.closest<HTMLElement>('tr[data-row-id]')
      const id = row?.dataset.rowId
      if (!id) return
      e.preventDefault()
      duplicateRow(id)
    }
    window.addEventListener('keydown', handleDuplicateShortcut)
    return () => window.removeEventListener('keydown', handleDuplicateShortcut)
  }, [working])

  // Ctrl/Cmd+Z / Ctrl/Cmd+Shift+Z undo/redo committed token edits — skipped
  // while focus is in a text field so the browser's native text-undo still
  // works there instead of getting hijacked. workingHistory.undo/redo only
  // close over useState setters (never `working` itself), so they're safe
  // to leave out of the dependency array — they behave identically no
  // matter which render's closure ends up registered.
  useEffect(() => {
    function handleUndoRedoShortcut(e: globalThis.KeyboardEvent) {
      if (e.key.toLowerCase() !== 'z' || !(e.ctrlKey || e.metaKey)) return
      const active = document.activeElement
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active as HTMLElement | null)?.isContentEditable
      ) {
        return
      }
      e.preventDefault()
      if (e.shiftKey) workingHistory.redo()
      else workingHistory.undo()
    }
    window.addEventListener('keydown', handleUndoRedoShortcut)
    return () => window.removeEventListener('keydown', handleUndoRedoShortcut)
  }, [])

  function handleCellKeyDown(e: KeyboardEvent<HTMLInputElement>, row: number, col: number, id: string) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = getNextCell({ row, col }, e.key as NavigationKey, totalRows, COLUMN_COUNT)
      if (next) focusCell(next.row, next.col)
      return
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const input = e.currentTarget
      const atStart = input.selectionStart === 0 && input.selectionEnd === 0
      const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length
      if ((e.key === 'ArrowLeft' && atStart) || (e.key === 'ArrowRight' && atEnd)) {
        const next = getNextCell({ row, col }, e.key as NavigationKey, totalRows, COLUMN_COUNT)
        if (next) {
          e.preventDefault()
          focusCell(next.row, next.col)
        }
      }
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const next = getNextCell({ row, col }, 'ArrowDown', totalRows, COLUMN_COUNT)
      if (next) focusCell(next.row, next.col)
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      revertCell(id, col)
    }
  }

  // Header shared by every value/reference popover — a small tab row styled
  // like the sidebar rail and the layer subheader (hover fill, primary
  // underline), plus a close button, then a full-bleed divider. When there's
  // only one mode (plain reference popovers), `onValueChange` is omitted and
  // the single tab renders as a static, non-interactive label.
  function renderPopoverHeader(
    tabs: { value: string; label: string }[],
    activeValue: string,
    onValueChange: ((value: string) => void) | null,
    ariaLabel: string,
  ): ReactNode {
    return (
      <div className="-mx-3 -mt-3 mb-2">
        <div className="flex h-8 items-stretch justify-between pl-1">
          <div role={onValueChange ? 'tablist' : undefined} aria-label={ariaLabel} className="flex items-stretch">
            {tabs.map(tab => {
              const isActive = tab.value === activeValue
              return (
                <button
                  key={tab.value}
                  type="button"
                  role={onValueChange ? 'tab' : undefined}
                  aria-selected={onValueChange ? isActive : undefined}
                  disabled={!onValueChange}
                  onClick={onValueChange ? () => onValueChange(tab.value) : undefined}
                  className={cn(
                    'relative flex items-center px-2 text-xs font-medium text-muted-foreground transition-colors',
                    onValueChange && 'hover:bg-muted/50 hover:text-foreground',
                    isActive &&
                      'text-foreground before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-primary',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Close"
            className="my-1 mr-1"
            onClick={() => setOpenPopoverId(null)}
          >
            <XIcon />
          </Button>
        </div>
        <div className="border-b border-border" />
      </div>
    )
  }

  // Renders the reference-search body shared by the color popover's "Reference"
  // tab and the plain-value types' reference popover. Picking an item commits
  // it and closes the popover.
  function renderReferenceSearch(
    currentValue: string,
    onSelect: (value: string) => void,
    ariaLabel: string,
  ): ReactNode {
    return (
      <ReferenceSearch
        options={referenceOptions}
        currentValue={currentValue}
        onSelect={value => {
          onSelect(value)
          setOpenPopoverId(null)
        }}
        ariaLabel={ariaLabel}
      />
    )
  }

  // The small unlink control that appears right after an alias tag on
  // hover/focus — breaks the reference and leaves the cell with an empty
  // value, mirroring Figma's "detach alias" affordance. Styled like every
  // other icon button in the table (e.g. the search button in the toolbar).
  function renderDetachButton(label: string, onDetach: () => void): ReactNode {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={label}
              onClick={onDetach}
              className="invisible shrink-0 group-hover/tag:visible focus-visible:visible"
            />
          }
        >
          <Unlink2Icon className="size-3.5" />
        </TooltipTrigger>
        <TooltipContent>Detach alias</TooltipContent>
      </Tooltip>
    )
  }

  // A collapsible group header row, shared by both nesting levels — the
  // outer (component/subject) group and, within it, the existing inner
  // subgroup — indented one step further per depth.
  function renderGroupHeaderRow(group: string, depth: number): ReactNode {
    const isCollapsed = collapsedGroups.has(group)
    const segments = group.split('.')
    const lastSegment = segments[segments.length - 1]
    const leadingLabel = segments.slice(0, -1).join('/')
    const isOuter = depth === 0
    return (
      <TableRow className="hover:bg-transparent">
        <TableCell
          colSpan={4}
          className={cn('bg-muted/50 p-0 font-medium text-muted-foreground', isOuter ? 'text-sm' : 'text-xs')}
          style={{ paddingLeft: depth * 16 }}
        >
          {editingGroup?.group === group ? (
            <Input
              autoFocus
              aria-label={`Rename group ${segments.join('/')}`}
              value={editingGroup.text}
              onChange={e => setEditingGroup({ group, text: e.target.value })}
              onBlur={commitGroupRename}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  commitGroupRename()
                } else if (e.key === 'Escape') {
                  e.preventDefault()
                  cancelGroupRename()
                }
              }}
              className={cn(
                'rounded-none border-transparent bg-transparent px-2 font-medium text-foreground focus-visible:ring-0',
                isOuter ? 'h-12 text-sm' : 'h-10 text-xs',
              )}
            />
          ) : (
            <div className={cn('flex items-center', isOuter ? 'h-12' : 'h-10')}>
              <button
                type="button"
                onClick={() => toggleGroup(group)}
                aria-expanded={!isCollapsed}
                className="flex flex-1 items-center gap-1.5 rounded-md px-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn('size-3.5 shrink-0 transition-transform', isCollapsed && '-rotate-90')}
                />
                {leadingLabel && <span>{leadingLabel}/</span>}
                <span className="font-bold text-foreground">{lastSegment}</span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${segments.join('/')}`}
                      className="mr-1 shrink-0 text-foreground hover:bg-white/20"
                    />
                  }
                >
                  <EllipsisIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setGraphRoot({ paths: tokenIdsInGroup(group, depth), title: segments.join('/') })}
                  >
                    <NetworkIcon />
                    Show reference graph
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => startEditingGroup(group)}>
                    <PencilIcon />
                    Rename
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </TableCell>
      </TableRow>
    )
  }

  // Escape reverts the field to what it showed on focus — nothing's been
  // committed to `working` yet at that point, so this only needs to reset
  // the local draft (and any live invalid-JSON flag) rather than touch it.
  function revertCell(id: string, col: number) {
    const snap = focusSnapshot.current
    if (!snap || snap.id !== id || snap.col !== col) return

    if (col === 0) {
      setNameDraftText(prev => ({ ...prev, [id]: snap.value }))
    } else {
      setValueDraftText(prev => ({ ...prev, [id]: snap.value }))
      setMalformed(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  function valueTextFor(id: string, token: FlatToken): string {
    return valueDraftText[id] ?? getEditableValueText(token)
  }

  // The token driving the brand column's editable cell for this row: the
  // brand's own override if one's already staged, otherwise Base's current
  // token (edits start from there, same as Figma showing Base's value until
  // you actually diverge a mode).
  function brandTokenFor(brand: string, id: string): FlatToken | undefined {
    return (brandWorking[brand] ?? []).find(w => w.id === id)?.token ?? working.find(w => w.id === id)?.token
  }

  // Enforces the sparse-override invariant: an entry only exists in
  // brandWorking when it actually differs from Base's current value. Equal
  // to Base -> no longer an override, so it's dropped (this is what lets
  // "type the same value Base has" cleanly un-override a token).
  function upsertOrRemoveBrandEntry(brand: string, id: string, candidateToken: FlatToken) {
    const baseToken = working.find(w => w.id === id)?.token
    if (!baseToken) return

    const isOverride =
      JSON.stringify(effectiveValue(candidateToken)) !== JSON.stringify(effectiveValue(baseToken)) ||
      candidateToken.type !== baseToken.type

    setBrandWorking(prev => {
      const list = prev[brand] ?? []
      const withoutId = list.filter(w => w.id !== id)
      const next = isOverride ? [...withoutId, { id, token: candidateToken }] : withoutId
      return { ...prev, [brand]: next }
    })
  }

  function handleBrandValueInput(id: string, text: string) {
    setBrandValueDraftText(prev => ({ ...prev, [id]: text }))
  }

  function commitBrandValueText(brand: string, id: string, type: string, text: string) {
    const current = brandTokenFor(brand, id)
    if (!current) return
    const parsed = parseEditableValue(type, text, current.rawValue)
    setBrandMalformed(prev => {
      const next = new Set(prev)
      if (parsed.ok) next.delete(id)
      else next.add(id)
      return next
    })
    if (!parsed.ok) {
      setBrandValueDraftText(prev => ({ ...prev, [id]: text }))
      return
    }
    upsertOrRemoveBrandEntry(brand, id, { ...current, rawValue: parsed.value, referenceTarget: null })
    setBrandValueDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function commitBrandValue(brand: string, id: string, type: string) {
    const text = brandValueDraftText[id]
    if (text === undefined) return
    commitBrandValueText(brand, id, type, text)
  }

  function handleBrandReferenceChange(brand: string, id: string, text: string) {
    const current = brandTokenFor(brand, id)
    if (!current) return
    upsertOrRemoveBrandEntry(brand, id, { ...current, referenceTarget: text.trim() === '' ? null : text.trim() })
  }

  function brandModeFor(brand: string, id: string): 'value' | 'reference' {
    const override = brandModeOverride.get(id)
    if (override) return override
    const token = brandTokenFor(brand, id)
    return token?.referenceTarget != null ? 'reference' : 'value'
  }

  function setBrandRowMode(id: string, mode: 'value' | 'reference') {
    setBrandModeOverride(prev => new Map(prev).set(id, mode))
  }

  function brandValueTextFor(brand: string, id: string): string {
    if (brandValueDraftText[id] !== undefined) return brandValueDraftText[id]
    const token = brandTokenFor(brand, id)
    return token ? getEditableValueText(token) : ''
  }

  function stageBrand(name: string) {
    setPendingBrands(prev => (prev.includes(name) ? prev : [...prev, name]))
  }

  function unstageBrand(name: string) {
    setPendingBrands(prev => prev.filter(brand => brand !== name))
  }

  async function handleSubmit() {
    setSubmitState('submitting')
    setSubmitMessage(null)
    try {
      const response = await fetch('/api/propose-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff, description, targetBranch, newBrands: pendingBrands, brandDiffs }),
      })
      const json = await response.json()

      if (response.status === 200) {
        setSubmitState('success')
        setSubmitMessage(json.url)
        setDescription('')
        setPendingBrands([])
        // The submit just created/updated the branch (and its PR) this base
        // now reads from — re-run the server component so the header's sync
        // status tag, PR link, the token list, and the brand list all pick
        // that up without a manual reload.
        pendingResyncRef.current = true
        router.refresh()
      } else if (response.status === 409) {
        setSubmitState('conflict')
        setSubmitMessage('This changed since you started editing — refresh and try again.')
      } else {
        setSubmitState('error')
        setSubmitMessage(json.error ?? 'Something went wrong submitting your change.')
      }
    } catch (err) {
      setSubmitState('error')
      setSubmitMessage(err instanceof Error ? err.message : 'Network error.')
    }
  }

  const canSubmit =
    (diff.length > 0 || pendingBrands.length > 0 || totalBrandDiffCount > 0) &&
    blockingErrors.length === 0 &&
    targetBranch.trim() !== '' &&
    submitState !== 'submitting'
  const draftHex = /^#[0-9a-fA-F]{6}$/.test(draft.value) ? draft.value : null

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="shrink-0 bg-background p-4" style={{ marginLeft: sidebarInset }}>
        <div className="flex h-14 items-center justify-between gap-4 rounded-[10px] border border-[color-mix(in_oklch,var(--border),var(--foreground)_20%)] px-4">
          <Tabs value={activeLayer} onValueChange={value => setActiveLayer(value as TokenLayer)}>
            <TabsList aria-label="Token layer">
              {LAYERS.map(layer => (
                <TabsTrigger key={layer} value={layer}>
                  <span aria-hidden="true">{LAYER_EMOJI[layer]}</span> {layer}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                'relative overflow-hidden transition-[width] duration-200 ease-out',
                searchExpanded ? 'w-64' : 'w-8',
              )}
            >
              {searchExpanded ? (
                <>
                  <Label htmlFor="token-search" className="sr-only">
                    Search tokens by name
                  </Label>
                  <SearchIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    autoFocus
                    id="token-search"
                    type="search"
                    placeholder="Search tokens…"
                    className="h-8 pl-8"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onBlur={() => {
                      if (!query) setSearchExpanded(false)
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') {
                        setQuery('')
                        setSearchExpanded(false)
                      }
                    }}
                  />
                </>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Search tokens"
                  onClick={() => setSearchExpanded(true)}
                >
                  <SearchIcon />
                </Button>
              )}
            </div>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Undo"
                    disabled={!workingHistory.canUndo}
                    onClick={() => workingHistory.undo()}
                  >
                    <Undo2Icon />
                  </Button>
                }
              />
              <TooltipContent>Undo (Ctrl/Cmd+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Redo"
                    disabled={!workingHistory.canRedo}
                    onClick={() => workingHistory.redo()}
                  >
                    <Redo2Icon />
                  </Button>
                }
              />
              <TooltipContent>Redo (Ctrl/Cmd+Shift+Z)</TooltipContent>
            </Tooltip>

            <Button
              type="button"
              onClick={() => {
                setDraft(emptyDraft(activeLayer))
                setCreateDialogOpen(true)
              }}
            >
              <PlusIcon />
              Create
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden" style={{ marginLeft: sidebarInset }}>
        <div className="h-full px-4">
          <Table>
            <TableCaption>
              {countByLayer.get(activeLayer) ?? 0} {activeLayer} tokens
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="col"
                  className="sticky top-0 z-20 rounded-tl-[10px] bg-background shadow-[0_2px_0_0_#ffffff]"
                >
                  Name
                </TableHead>
                <TableHead scope="col" className="sticky top-0 z-20 bg-background shadow-[0_2px_0_0_#ffffff]">
                  Base
                </TableHead>
                {selectedBrand && (
                  <TableHead scope="col" className="sticky top-0 z-20 bg-background shadow-[0_2px_0_0_#ffffff]">
                    {selectedBrand}
                  </TableHead>
                )}
                {!selectedBrand && (
                  <TableHead scope="col" className="sticky top-0 z-20 bg-background shadow-[0_2px_0_0_#ffffff]">
                    Used
                  </TableHead>
                )}
                <TableHead
                  scope="col"
                  className="sticky top-0 z-20 rounded-tr-[10px] bg-background text-right shadow-[0_2px_0_0_#ffffff]"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={visibleGroups.length === 0}
                    onClick={toggleAllGroups}
                  >
                    {allGroupsCollapsed ? <ChevronsUpDownIcon /> : <ChevronsDownUpIcon />}
                    {allGroupsCollapsed ? 'Expand all' : 'Collapse all'}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorking.map((item, row) => {
                const { id, token } = item
                const hex =
                  token.type === 'color'
                    ? getColorHex(token.referenceTarget ? token.resolvedValue : token.rawValue)
                    : null
                const cellErrors = errorsById.get(id) ?? []
                const isMalformed = malformed.has(id)
                const changeStatus = describeChangeStatus(originalById.get(id), token)

                // Two nesting levels: the outer (component/subject) group, and —
                // when the name goes one dot deeper — an inner subgroup shown
                // indented within it. When they'd be identical (a 2-segment
                // name, e.g. "Backdrop.Color") only the outer header renders,
                // so a group never appears to contain only itself.
                const outerGroup = outerGroupFor(token.name)
                const previousOuterGroup = row > 0 ? outerGroupFor(filteredWorking[row - 1].token.name) : null
                const showOuterHeader = outerGroup !== '' && outerGroup !== previousOuterGroup
                const isOuterCollapsed = outerGroup !== '' && collapsedGroups.has(outerGroup)

                const group = groupPrefixFor(token.name)
                const isNestedSubgroup = group !== '' && group !== outerGroup
                const previousGroup = row > 0 ? groupPrefixFor(filteredWorking[row - 1].token.name) : null
                const showGroupHeader = isNestedSubgroup && group !== previousGroup
                const isCollapsed = group !== '' && collapsedGroups.has(group)
                const hidden = isOuterCollapsed || isCollapsed
                // One indent step deeper than whichever header is the row's
                // immediate parent, so the name lines up under that header's
                // own text rather than its chevron.
                const depth = isNestedSubgroup ? 2 : outerGroup !== '' ? 1 : 0

                return (
                  <Fragment key={id}>
                    {showOuterHeader && renderGroupHeaderRow(outerGroup, 0)}
                    {!isOuterCollapsed && showGroupHeader && renderGroupHeaderRow(group, 1)}
                    {!hidden && (
                      <TableRow
                        data-row-id={id}
                        className={cn(cellErrors.length > 0 && 'bg-destructive/10 hover:bg-destructive/15')}
                      >
                        <TableCell className="p-0 focus-within:relative focus-within:z-40">
                          <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
                            <Input
                              ref={el => {
                                if (el) cellRefs.current.set(`${row}-0`, el)
                                else cellRefs.current.delete(`${row}-0`)
                              }}
                              aria-label={`Name for ${token.name || 'token'}`}
                              value={nameTextFor(id, token)}
                              onChange={e => handleNameInput(id, e.target.value)}
                              onBlur={() => commitName(id)}
                              onFocus={e => (focusSnapshot.current = { id, col: 0, value: e.target.value })}
                              onKeyDown={e => handleCellKeyDown(e, row, 0, id)}
                              readOnly={selectedBrand !== null}
                              title={selectedBrand !== null ? 'Rename from Base — deselect the brand first' : undefined}
                              className={CELL_FIELD_CLASS}
                            />
                            {changeStatus && (
                              <Badge variant={CHANGE_STATUS_VARIANT[changeStatus]} className="mr-1 shrink-0">
                                {CHANGE_STATUS_LABEL[changeStatus]}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="p-0 px-1">
                          {token.type === 'color' ? (
                            <div className="group/tag flex items-center gap-1">
                              <Popover
                                open={openPopoverId === id}
                                onOpenChange={open => setOpenPopoverId(open ? id : null)}
                              >
                                <PopoverTrigger
                                  aria-invalid={isMalformed || cellErrors.length > 0}
                                  render={
                                    token.referenceTarget ? (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        aria-label={`Value for ${token.name || 'token'}`}
                                        className={CELL_TAG_CLASS}
                                      />
                                    ) : (
                                      <button
                                        type="button"
                                        aria-label={`Value for ${token.name || 'token'}`}
                                        className={CELL_TRIGGER_CLASS}
                                      />
                                    )
                                  }
                                >
                                  <span
                                    aria-hidden="true"
                                    className="size-5 shrink-0 rounded-sm border"
                                    style={hex ? { backgroundColor: hex } : undefined}
                                  />
                                  <span className="truncate">
                                    {token.referenceTarget ? toSlashPath(token.referenceTarget) : (hex ?? '—')}
                                  </span>
                                </PopoverTrigger>
                                <PopoverContent className="w-128">
                                  {renderPopoverHeader(
                                    [
                                      { value: 'value', label: 'Color' },
                                      { value: 'reference', label: 'Reference' },
                                    ],
                                    modeFor(id, token),
                                    value => setRowMode(id, value as 'value' | 'reference'),
                                    `Value mode for ${token.name || 'token'}`,
                                  )}

                                  {modeFor(id, token) === 'value' ? (
                                    <div className="space-y-2">
                                      <input
                                        type="color"
                                        aria-label={`Pick color for ${token.name || 'token'}`}
                                        className="h-9 w-full cursor-pointer rounded-md border"
                                        value={hex ?? '#000000'}
                                        onChange={e => commitValueText(id, token.type, e.target.value)}
                                      />
                                      <Input
                                        aria-label={`Value for ${token.name || 'token'}`}
                                        aria-invalid={isMalformed || cellErrors.length > 0}
                                        placeholder="#RRGGBB"
                                        value={valueTextFor(id, token)}
                                        onChange={e => handleValueInput(id, e.target.value)}
                                        onBlur={() => commitValue(id, token.type)}
                                      />
                                      {isMalformed && (
                                        <Alert variant="destructive">
                                          <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                                        </Alert>
                                      )}
                                    </div>
                                  ) : (
                                    renderReferenceSearch(
                                      token.referenceTarget ?? '',
                                      value => handleReferenceChange(id, value),
                                      `Reference target for ${token.name || 'token'}`,
                                    )
                                  )}
                                </PopoverContent>
                              </Popover>
                              {token.referenceTarget &&
                                renderDetachButton(`Detach alias for ${token.name || 'token'}`, () =>
                                  handleReferenceChange(id, ''),
                                )}
                            </div>
                          ) : (
                            <div className="group/tag flex items-center gap-1">
                              {token.referenceTarget ? (
                                <>
                                  <Popover
                                    open={openPopoverId === id}
                                    onOpenChange={open => setOpenPopoverId(open ? id : null)}
                                  >
                                    <PopoverTrigger
                                      aria-label={`Value for ${token.name || 'token'}`}
                                      render={<Button type="button" variant="outline" className={CELL_TAG_CLASS} />}
                                    >
                                      <Link2Icon className="size-3.5 shrink-0" />
                                      <span className="truncate">{toSlashPath(token.referenceTarget)}</span>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-128">
                                      {renderPopoverHeader(
                                        [{ value: 'reference', label: 'Reference' }],
                                        'reference',
                                        null,
                                        `Value mode for ${token.name || 'token'}`,
                                      )}
                                      {renderReferenceSearch(
                                        token.referenceTarget ?? '',
                                        value => handleReferenceChange(id, value),
                                        `Reference target for ${token.name || 'token'}`,
                                      )}
                                    </PopoverContent>
                                  </Popover>
                                  {renderDetachButton(`Detach alias for ${token.name || 'token'}`, () =>
                                    handleReferenceChange(id, ''),
                                  )}
                                </>
                              ) : (
                                <>
                                  <Input
                                    ref={el => {
                                      if (el) cellRefs.current.set(`${row}-1`, el)
                                      else cellRefs.current.delete(`${row}-1`)
                                    }}
                                    aria-label={`Value for ${token.name || 'token'}`}
                                    aria-invalid={cellErrors.length > 0}
                                    value={valueTextFor(id, token)}
                                    onChange={e => handleValueInput(id, e.target.value)}
                                    onBlur={() => commitValue(id, token.type)}
                                    onFocus={e => (focusSnapshot.current = { id, col: 1, value: e.target.value })}
                                    onKeyDown={e => handleCellKeyDown(e, row, 1, id)}
                                    className={CELL_FIELD_CLASS}
                                  />
                                  <Popover
                                    open={openPopoverId === id}
                                    onOpenChange={open => setOpenPopoverId(open ? id : null)}
                                  >
                                    <PopoverTrigger
                                      render={
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="icon-sm"
                                          className="mr-1 shrink-0 rounded-none"
                                          aria-label={`Reference for ${token.name || 'token'}`}
                                        />
                                      }
                                    >
                                      <HexagonIcon className="size-4" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-128">
                                      {renderPopoverHeader(
                                        [{ value: 'reference', label: 'Reference' }],
                                        'reference',
                                        null,
                                        `Value mode for ${token.name || 'token'}`,
                                      )}
                                      {renderReferenceSearch(
                                        token.referenceTarget ?? '',
                                        value => handleReferenceChange(id, value),
                                        `Reference target for ${token.name || 'token'}`,
                                      )}
                                    </PopoverContent>
                                  </Popover>
                                </>
                              )}
                            </div>
                          )}
                        </TableCell>
                        {!selectedBrand && (
                          <TableCell className="p-0 px-1 text-muted-foreground">
                            <div className="flex items-center gap-1">
                              {(() => {
                                const usageCount = referenceCounts.get(token.path.join('.')) ?? 0
                                return (
                                  usageCount > 0 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-auto gap-1 px-1.5 py-0.5"
                                      onClick={() => setGraphRoot({ paths: [id], title: toSlashPath(token.name) })}
                                    >
                                      <NetworkIcon className="size-3.5" />
                                      {usageCount} {usageCount === 1 ? 'use' : 'uses'}
                                    </Button>
                                  )
                                )
                              })()}
                              {(() => {
                                const codeUsage = CODE_USAGE[token.path.join('.')]
                                if (!codeUsage || codeUsage.count === 0) return null
                                return (
                                  <Popover
                                    open={openCodeUsageId === id}
                                    onOpenChange={open => setOpenCodeUsageId(open ? id : null)}
                                  >
                                    <PopoverTrigger
                                      render={
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-auto gap-1 px-1.5 py-0.5"
                                          aria-label={`Code usage for ${token.name || 'token'}`}
                                        />
                                      }
                                    >
                                      <Code2Icon className="size-3.5" />
                                      {codeUsage.count} {codeUsage.count === 1 ? 'file' : 'files'}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-96">
                                      <p className="mb-2 text-sm font-medium">Used in code</p>
                                      <ul className="space-y-1 text-sm text-muted-foreground">
                                        {codeUsage.locations.map(location => (
                                          <li key={`${location.package}/${location.file}`} className="flex gap-2">
                                            <Badge variant="outline" className="shrink-0">
                                              {location.package}
                                            </Badge>
                                            <span className="truncate">{location.file}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </PopoverContent>
                                  </Popover>
                                )
                              })()}
                            </div>
                          </TableCell>
                        )}
                        {selectedBrand &&
                          (() => {
                            const brand = selectedBrand
                            const brandToken = brandTokenFor(brand, id)
                            if (!brandToken) return <TableCell className="p-0" />

                            const brandResolved = brandResolvedByPath?.get(id)
                            const brandHex =
                              brandToken.type === 'color'
                                ? getColorHex(
                                    brandToken.referenceTarget ? brandResolved?.resolvedValue : brandToken.rawValue,
                                  )
                                : null
                            const brandCellId = `brand:${id}`
                            const isOverridden = (brandWorking[brand] ?? []).some(w => w.id === id)

                            return (
                              <TableCell className="p-0 px-1">
                                <div className="flex items-center gap-1">
                                  {brandToken.type === 'color' ? (
                                    <div className="group/tag flex items-center gap-1">
                                      <Popover
                                        open={openPopoverId === brandCellId}
                                        onOpenChange={open => setOpenPopoverId(open ? brandCellId : null)}
                                      >
                                        <PopoverTrigger
                                          aria-invalid={brandMalformed.has(id)}
                                          render={
                                            brandToken.referenceTarget ? (
                                              <Button
                                                type="button"
                                                variant="outline"
                                                aria-label={`${brand} value for ${token.name || 'token'}`}
                                                className={CELL_TAG_CLASS}
                                              />
                                            ) : (
                                              <button
                                                type="button"
                                                aria-label={`${brand} value for ${token.name || 'token'}`}
                                                className={CELL_TRIGGER_CLASS}
                                              />
                                            )
                                          }
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="size-5 shrink-0 rounded-sm border"
                                            style={brandHex ? { backgroundColor: brandHex } : undefined}
                                          />
                                          <span className="truncate">
                                            {brandToken.referenceTarget
                                              ? toSlashPath(brandToken.referenceTarget)
                                              : (brandHex ?? '—')}
                                          </span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-128">
                                          {renderPopoverHeader(
                                            [
                                              { value: 'value', label: 'Color' },
                                              { value: 'reference', label: 'Reference' },
                                            ],
                                            brandModeFor(brand, id),
                                            value => setBrandRowMode(id, value as 'value' | 'reference'),
                                            `${brand} value mode for ${token.name || 'token'}`,
                                          )}

                                          {brandModeFor(brand, id) === 'value' ? (
                                            <div className="space-y-2">
                                              <input
                                                type="color"
                                                aria-label={`Pick ${brand} color for ${token.name || 'token'}`}
                                                className="h-9 w-full cursor-pointer rounded-md border"
                                                value={brandHex ?? '#000000'}
                                                onChange={e =>
                                                  commitBrandValueText(brand, id, brandToken.type, e.target.value)
                                                }
                                              />
                                              <Input
                                                aria-label={`${brand} value for ${token.name || 'token'}`}
                                                aria-invalid={brandMalformed.has(id)}
                                                placeholder="#RRGGBB"
                                                value={brandValueTextFor(brand, id)}
                                                onChange={e => handleBrandValueInput(id, e.target.value)}
                                                onBlur={() => commitBrandValue(brand, id, brandToken.type)}
                                              />
                                              {brandMalformed.has(id) && (
                                                <Alert variant="destructive">
                                                  <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                                                </Alert>
                                              )}
                                            </div>
                                          ) : (
                                            renderReferenceSearch(
                                              brandToken.referenceTarget ?? '',
                                              value => handleBrandReferenceChange(brand, id, value),
                                              `${brand} reference target for ${token.name || 'token'}`,
                                            )
                                          )}
                                        </PopoverContent>
                                      </Popover>
                                      {brandToken.referenceTarget &&
                                        renderDetachButton(`Detach ${brand} alias for ${token.name || 'token'}`, () =>
                                          handleBrandReferenceChange(brand, id, ''),
                                        )}
                                    </div>
                                  ) : (
                                    <div className="group/tag flex items-center gap-1">
                                      {brandToken.referenceTarget ? (
                                        <>
                                          <Popover
                                            open={openPopoverId === brandCellId}
                                            onOpenChange={open => setOpenPopoverId(open ? brandCellId : null)}
                                          >
                                            <PopoverTrigger
                                              aria-label={`${brand} value for ${token.name || 'token'}`}
                                              render={
                                                <Button type="button" variant="outline" className={CELL_TAG_CLASS} />
                                              }
                                            >
                                              <Link2Icon className="size-3.5 shrink-0" />
                                              <span className="truncate">
                                                {toSlashPath(brandToken.referenceTarget)}
                                              </span>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-128">
                                              {renderPopoverHeader(
                                                [{ value: 'reference', label: 'Reference' }],
                                                'reference',
                                                null,
                                                `${brand} value mode for ${token.name || 'token'}`,
                                              )}
                                              {renderReferenceSearch(
                                                brandToken.referenceTarget ?? '',
                                                value => handleBrandReferenceChange(brand, id, value),
                                                `${brand} reference target for ${token.name || 'token'}`,
                                              )}
                                            </PopoverContent>
                                          </Popover>
                                          {renderDetachButton(
                                            `Detach ${brand} alias for ${token.name || 'token'}`,
                                            () => handleBrandReferenceChange(brand, id, ''),
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <Input
                                            aria-label={`${brand} value for ${token.name || 'token'}`}
                                            value={brandValueTextFor(brand, id)}
                                            onChange={e => handleBrandValueInput(id, e.target.value)}
                                            onBlur={() => commitBrandValue(brand, id, brandToken.type)}
                                            className={CELL_FIELD_CLASS}
                                          />
                                          <Popover
                                            open={openPopoverId === brandCellId}
                                            onOpenChange={open => setOpenPopoverId(open ? brandCellId : null)}
                                          >
                                            <PopoverTrigger
                                              render={
                                                <Button
                                                  type="button"
                                                  variant="outline"
                                                  size="icon-sm"
                                                  className="mr-1 shrink-0 rounded-none"
                                                  aria-label={`${brand} reference for ${token.name || 'token'}`}
                                                />
                                              }
                                            >
                                              <HexagonIcon className="size-4" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-128">
                                              {renderPopoverHeader(
                                                [{ value: 'reference', label: 'Reference' }],
                                                'reference',
                                                null,
                                                `${brand} value mode for ${token.name || 'token'}`,
                                              )}
                                              {renderReferenceSearch(
                                                brandToken.referenceTarget ?? '',
                                                value => handleBrandReferenceChange(brand, id, value),
                                                `${brand} reference target for ${token.name || 'token'}`,
                                              )}
                                            </PopoverContent>
                                          </Popover>
                                        </>
                                      )}
                                    </div>
                                  )}
                                  {isOverridden && (
                                    <Badge variant="outline" className="mr-1 shrink-0">
                                      Overridden
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                            )
                          })()}
                        <TableCell className="p-1">
                          <div className="flex items-center justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label={`Actions for ${token.name || 'token'}`}
                                    className="text-foreground hover:bg-white/20"
                                  />
                                }
                              >
                                <EllipsisIcon />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => setGraphRoot({ paths: [id], title: toSlashPath(token.name) })}
                                >
                                  <NetworkIcon />
                                  Show reference graph
                                </DropdownMenuItem>
                                <DropdownMenuItem variant="destructive" onClick={() => handleDeleteRow(id, token.name)}>
                                  <Trash2Icon />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {!hidden && cellErrors.length > 0 && (
                      <TableRow className="bg-destructive/10 hover:bg-destructive/15">
                        <TableCell colSpan={4} className="p-0">
                          <Alert
                            variant="destructive"
                            role="alert"
                            className="rounded-none border-0 border-t bg-transparent"
                          >
                            <AlertDescription>{cellErrors.join(' ')}</AlertDescription>
                          </Alert>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <Dialog open={createDialogOpen} onOpenChange={handleCreateDialogOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create token</DialogTitle>
              <DialogDescription>
                Add a new {draft.layer} token. Nothing happens until you submit and it&apos;s reviewed and merged.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-token-layer">Layer</Label>
                <Select
                  value={draft.layer}
                  onValueChange={value => setDraft(prev => ({ ...prev, layer: (value as TokenLayer) ?? prev.layer }))}
                >
                  <SelectTrigger id="new-token-layer" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LAYERS.map(layer => (
                      <SelectItem key={layer} value={layer}>
                        <span aria-hidden="true">{LAYER_EMOJI[layer]}</span> {layer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-token-name">Name</Label>
                <Input
                  id="new-token-name"
                  placeholder="e.g. Color.Danger.7"
                  value={draft.name}
                  onChange={e => setDraft(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-token-type">Type</Label>
                <Select
                  value={draft.type}
                  onValueChange={value => setDraft(prev => ({ ...prev, type: value ?? prev.type }))}
                >
                  <SelectTrigger id="new-token-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">string</SelectItem>
                    <SelectItem value="number">number</SelectItem>
                    <SelectItem value="color">color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Value</Label>

                {draft.type === 'color' ? (
                  <Popover
                    open={openPopoverId === 'draft'}
                    onOpenChange={open => setOpenPopoverId(open ? 'draft' : null)}
                  >
                    <PopoverTrigger
                      render={
                        <button
                          type="button"
                          aria-label="Value for new token"
                          className="flex h-8 w-full items-center gap-2 rounded-lg border border-input bg-transparent px-2 text-sm outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring"
                        />
                      }
                    >
                      <span
                        aria-hidden="true"
                        className="size-5 shrink-0 rounded-sm border"
                        style={draftHex ? { backgroundColor: draftHex } : undefined}
                      />
                      <span className="truncate">{draft.referenceTarget || draftHex || '—'}</span>
                    </PopoverTrigger>
                    <PopoverContent className="w-128">
                      {renderPopoverHeader(
                        [
                          { value: 'value', label: 'Color' },
                          { value: 'reference', label: 'Reference' },
                        ],
                        draftMode,
                        value => setDraftMode(value as 'value' | 'reference'),
                        'Value mode for new token',
                      )}

                      {draftMode === 'value' ? (
                        <div className="space-y-2">
                          <input
                            type="color"
                            aria-label="Pick color for new token"
                            className="h-9 w-full cursor-pointer rounded-md border"
                            value={draftHex ?? '#000000'}
                            onChange={e => {
                              setDraft(prev => ({ ...prev, value: e.target.value }))
                              setDraftMalformed(false)
                            }}
                          />
                          <Input
                            aria-label="Value for new token"
                            placeholder="#RRGGBB"
                            value={draft.value}
                            onChange={e => {
                              setDraft(prev => ({ ...prev, value: e.target.value }))
                              setDraftMalformed(false)
                            }}
                          />
                          {draftMalformed && (
                            <Alert variant="destructive">
                              <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ) : (
                        renderReferenceSearch(
                          draft.referenceTarget,
                          value => setDraft(prev => ({ ...prev, referenceTarget: value })),
                          'Reference target for new token',
                        )
                      )}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <div className="flex items-center gap-1.5">
                    {draft.referenceTarget ? (
                      <div className="flex h-8 flex-1 items-center gap-1.5 overflow-hidden rounded-lg border border-input px-2.5 text-sm text-muted-foreground">
                        <Link2Icon className="size-3.5 shrink-0" />
                        <span className="truncate">{draft.referenceTarget}</span>
                      </div>
                    ) : (
                      <Input
                        aria-label="Value for new token"
                        placeholder="value…"
                        value={draft.value}
                        onChange={e => {
                          setDraft(prev => ({ ...prev, value: e.target.value }))
                          setDraftMalformed(false)
                        }}
                      />
                    )}
                    <Popover
                      open={openPopoverId === 'draft'}
                      onOpenChange={open => setOpenPopoverId(open ? 'draft' : null)}
                    >
                      <PopoverTrigger
                        render={
                          <Button type="button" variant="outline" size="icon-sm" aria-label="Reference for new token" />
                        }
                      >
                        <HexagonIcon className="size-4" />
                      </PopoverTrigger>
                      <PopoverContent className="w-128">
                        {renderPopoverHeader(
                          [{ value: 'reference', label: 'Reference' }],
                          'reference',
                          null,
                          'Value mode for new token',
                        )}
                        {renderReferenceSearch(
                          draft.referenceTarget,
                          value => setDraft(prev => ({ ...prev, referenceTarget: value })),
                          'Reference target for new token',
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {draftMalformed && draft.type !== 'color' && (
                  <Alert variant="destructive">
                    <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
              <Button type="button" disabled={!draft.name.trim()} onClick={commitDraftIfReady}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {graphRoot && (
          <TokenGraph
            tokens={tokens}
            rootPaths={graphRoot.paths}
            title={graphRoot.title}
            onClose={() => setGraphRoot(null)}
          />
        )}
      </div>

      {!sidebarCollapsed && activeSidebarTab === 'changes' && (
        <StagedChangesSidebar
          diff={diff}
          pendingBrands={pendingBrands}
          onUnstageBrand={unstageBrand}
          brandDiffs={brandDiffs}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
          syncStatus={syncStatus}
          description={description}
          onDescriptionChange={setDescription}
          targetBranch={targetBranch}
          onTargetBranchChange={setTargetBranch}
          defaultBranch={defaultBranch}
          branches={branches}
          problemCount={blockingErrors.length}
          onViewProblems={() => selectSidebarTab('problems')}
          canSubmit={canSubmit}
          submitState={submitState}
          submitMessage={submitMessage}
          onSubmit={handleSubmit}
        />
      )}
      {!sidebarCollapsed && activeSidebarTab === 'problems' && (
        <ProblemsSidebar
          problems={problems}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
          syncStatus={syncStatus}
        />
      )}
      {!sidebarCollapsed && activeSidebarTab === 'brands' && (
        <BrandsSidebar
          realBrands={tokenBrands}
          pendingBrands={pendingBrands}
          onStageBrand={stageBrand}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
          syncStatus={syncStatus}
        />
      )}
      <SidebarActivityBar items={sidebarItems} activeId={activeSidebarTab} onSelect={selectSidebarTab} />
    </div>
  )
}
