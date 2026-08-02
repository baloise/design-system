'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import {
  ChevronDownIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  HexagonIcon,
  Link2Icon,
  NetworkIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { computeDiff, describeChangeStatus, pathFor } from '@/src/tokens/edit'
import type { ChangeStatus, TokenDiffKind, WorkingToken } from '@/src/tokens/edit'
import { filterTokensByName } from '@/src/tokens/filter'
import { getColorHex, hexToColorValue } from '@/src/tokens/format'
import { getNextCell } from '@/src/tokens/keyboard'
import type { NavigationKey } from '@/src/tokens/keyboard'
import { validateWorkingTokens } from '@/src/tokens/validate'
import type { FlatToken, TokenLayer } from '@/src/tokens/types'
import { TokenGraph } from './token-graph'

const LAYERS: TokenLayer[] = ['Global', 'Alias', 'Component']
const LAYER_EMOJI: Record<TokenLayer, string> = { Global: '🌐', Alias: '🔗', Component: '🧩' }
// Matches the site header's h-16 — the table header sticks right below the
// subheader, which itself sticks right below the site header.
const SITE_HEADER_HEIGHT = 64
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

function leafNameFor(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx === -1 ? name : name.slice(idx + 1)
}

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

const DIFF_KIND_LABEL: Record<TokenDiffKind, string> = {
  create: 'Created',
  update: 'Updated',
  delete: 'Deleted',
}

const DIFF_KIND_VARIANT: Record<TokenDiffKind, 'default' | 'secondary' | 'destructive'> = {
  create: 'default',
  update: 'secondary',
  delete: 'destructive',
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

export function TokenEditor({ tokens }: { tokens: FlatToken[] }) {
  const [query, setQuery] = useState('')
  const [activeLayer, setActiveLayer] = useState<TokenLayer>('Global')
  const [working, setWorking] = useState<WorkingToken[]>(() =>
    tokens.map(token => ({ id: token.path.join('.'), token })),
  )
  const [malformed, setMalformed] = useState<Set<string>>(new Set())
  // What's currently typed in each row's Value cell — decoupled from the token's
  // committed `rawValue` so mid-typing invalid JSON (color values) doesn't get
  // stomped by re-deriving text from the last-known-good value on every keystroke.
  const [valueDraftText, setValueDraftText] = useState<Record<string, string>>({})
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [draftMalformed, setDraftMalformed] = useState(false)
  // Rows toggled to reference-search mode before a referenceTarget has been picked yet
  // (once one is picked, referenceTarget itself is enough to know the mode).
  const [referenceMode, setReferenceMode] = useState<Set<string>>(new Set())
  const [draftReferenceMode, setDraftReferenceMode] = useState(false)
  // Which row's (or 'draft') value/reference popover is open — at most one at a time.
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  // The group currently being batch-renamed (via its header's edit icon), and the
  // text of the in-progress edit — kept separate from `group` so typing doesn't
  // affect which rows are matched as members of the group until it's committed.
  const [editingGroup, setEditingGroup] = useState<{ group: string; text: string } | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'conflict' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [graphRootId, setGraphRootId] = useState<string | null>(null)
  const [searchExpanded, setSearchExpanded] = useState(false)

  const cellRefs = useRef(new Map<string, HTMLInputElement>())
  const focusSnapshot = useRef<{ id: string; col: number; value: string } | null>(null)

  // The table header sticks right below the subheader, so it needs the
  // subheader's actual rendered height (it wraps at narrow widths) rather
  // than a hardcoded guess.
  const subheaderRef = useRef<HTMLDivElement>(null)
  const [tableHeaderTop, setTableHeaderTop] = useState(SITE_HEADER_HEIGHT)

  useEffect(() => {
    const el = subheaderRef.current
    if (!el) return
    const updateOffset = () => setTableHeaderTop(SITE_HEADER_HEIGHT + el.getBoundingClientRect().height)
    updateOffset()
    const observer = new ResizeObserver(updateOffset)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
  const filteredWorking = useMemo(
    () => working.filter(w => matchedTokens.has(w.token) && w.token.layer === activeLayer),
    [working, matchedTokens, activeLayer],
  )
  const countByLayer = useMemo(() => {
    const counts = new Map<TokenLayer, number>()
    for (const layer of LAYERS) counts.set(layer, 0)
    for (const w of working) {
      if (matchedTokens.has(w.token)) counts.set(w.token.layer, (counts.get(w.token.layer) ?? 0) + 1)
    }
    return counts
  }, [working, matchedTokens])

  const visibleGroups = useMemo(() => {
    const groups = filteredWorking.map(w => groupPrefixFor(w.token.name)).filter(group => group !== '')
    return [...new Set(groups)]
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
  const errorsById = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const error of errors) {
      map.set(error.tokenKey, [...(map.get(error.tokenKey) ?? []), error.message])
    }
    return map
  }, [errors])

  const diff = useMemo(() => computeDiff(tokens, working), [tokens, working])

  function updateToken(id: string, updater: (token: FlatToken) => FlatToken) {
    setWorking(prev => prev.map(w => (w.id === id ? { ...w, token: updater(w.token) } : w)))
  }

  function handleNameChange(id: string, text: string) {
    updateToken(id, t => {
      const prefix = groupPrefixFor(t.name)
      return { ...t, name: prefix ? `${prefix}.${text}` : text }
    })
  }

  function handleReferenceChange(id: string, text: string) {
    updateToken(id, t => ({ ...t, referenceTarget: text.trim() === '' ? null : text.trim() }))
  }

  function modeFor(id: string, token: FlatToken): 'value' | 'reference' {
    return token.referenceTarget !== null || referenceMode.has(id) ? 'reference' : 'value'
  }

  function setRowMode(id: string, mode: 'value' | 'reference') {
    setReferenceMode(prev => {
      const next = new Set(prev)
      if (mode === 'reference') next.add(id)
      else next.delete(id)
      return next
    })
    if (mode === 'value') handleReferenceChange(id, '')
  }

  const draftMode: 'value' | 'reference' =
    draft.referenceTarget.trim() !== '' || draftReferenceMode ? 'reference' : 'value'

  function setDraftMode(mode: 'value' | 'reference') {
    setDraftReferenceMode(mode === 'reference')
    if (mode === 'value') setDraft(prev => ({ ...prev, referenceTarget: '' }))
  }

  function handleValueChange(id: string, text: string, type: string) {
    setValueDraftText(prev => ({ ...prev, [id]: text }))

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
    // was typed, via `valueDraftText` above, so the user isn't fighting a reverting field.
    if (!parsed.ok) return
    updateToken(id, t => ({ ...t, rawValue: parsed.value, referenceTarget: null }))
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
    setDraftReferenceMode(false)
    setCreateDialogOpen(false)
  }

  function handleCreateDialogOpenChange(open: boolean) {
    setCreateDialogOpen(open)
    if (!open) {
      setDraft(emptyDraft(activeLayer))
      setDraftMalformed(false)
      setDraftReferenceMode(false)
    }
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
    setEditingGroup({ group, text: group.split('.').join(' / ') })
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

    setWorking(prev =>
      prev.map(w =>
        groupPrefixFor(w.token.name) === group
          ? { ...w, token: { ...w.token, name: `${newGroup}.${leafNameFor(w.token.name)}` } }
          : w,
      ),
    )
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

  function focusCell(row: number, col: number) {
    cellRefs.current.get(`${row}-${col}`)?.focus()
  }

  const totalRows = filteredWorking.length

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

  // Renders the reference-search combobox shared by the color popover's "Reference"
  // tab and the plain-value types' reference popover. Picking an item closes the
  // popover; typing just keeps filtering (a "free solo" combobox — see ComboboxInput).
  function renderReferenceSearch(
    currentValue: string,
    onSelect: (value: string) => void,
    ariaLabel: string,
  ): ReactNode {
    return (
      <Combobox
        items={referenceOptions}
        value={currentValue}
        inputValue={currentValue}
        onValueChange={value => {
          onSelect(value ?? '')
          setOpenPopoverId(null)
        }}
        onInputValueChange={value => onSelect(value)}
      >
        <ComboboxInputGroup>
          <ComboboxInput aria-label={ariaLabel} placeholder="search tokens…" />
          {currentValue && <ComboboxClear aria-label="Clear reference" />}
        </ComboboxInputGroup>
        <ComboboxContent>
          <ComboboxEmpty>No matching tokens.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }

  function revertCell(id: string, col: number) {
    const snap = focusSnapshot.current
    if (!snap || snap.id !== id || snap.col !== col) return

    if (col === 0) handleNameChange(id, snap.value)
    else {
      const token = working.find(w => w.id === id)?.token
      if (token) handleValueChange(id, snap.value, token.type)
    }
  }

  function valueTextFor(id: string, token: FlatToken): string {
    return valueDraftText[id] ?? getEditableValueText(token)
  }

  async function handleSubmit() {
    setSubmitState('submitting')
    setSubmitMessage(null)
    try {
      const response = await fetch('/api/propose-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff, description }),
      })
      const json = await response.json()

      if (response.status === 200) {
        setSubmitState('success')
        setSubmitMessage(json.url)
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

  const canSubmit = diff.length > 0 && errors.length === 0 && submitState !== 'submitting'
  const draftHex = /^#[0-9a-fA-F]{6}$/.test(draft.value) ? draft.value : null

  return (
    <div className="w-full">
      <div
        ref={subheaderRef}
        className="sticky z-30 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background px-6"
        style={{ top: SITE_HEADER_HEIGHT }}
      >
        <Tabs value={activeLayer} onValueChange={value => setActiveLayer(value as TokenLayer)}>
          <TabsList variant="line" aria-label="Token layer">
            {LAYERS.map(layer => (
              <TabsTrigger key={layer} value={layer}>
                <span aria-hidden="true">{LAYER_EMOJI[layer]}</span> {layer}
                <Badge variant="secondary">{countByLayer.get(layer) ?? 0}</Badge>
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
          <Button
            type="button"
            variant="outline"
            disabled={diff.length === 0}
            onClick={() => setSubmitDialogOpen(true)}
          >
            Submit changes ({diff.length})
          </Button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="space-y-3">
          <Table>
            <TableCaption>
              {countByLayer.get(activeLayer) ?? 0} {activeLayer} tokens
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="col"
                  className="sticky z-20 bg-background shadow-[0_2px_0_0_#ffffff]"
                  style={{ top: tableHeaderTop }}
                >
                  Name
                </TableHead>
                <TableHead
                  scope="col"
                  className="sticky z-20 bg-background shadow-[0_2px_0_0_#ffffff]"
                  style={{ top: tableHeaderTop }}
                >
                  Base
                </TableHead>
                <TableHead
                  scope="col"
                  className="sticky z-20 bg-background text-right shadow-[0_2px_0_0_#ffffff]"
                  style={{ top: tableHeaderTop }}
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

                const group = groupPrefixFor(token.name)
                const previousGroup = row > 0 ? groupPrefixFor(filteredWorking[row - 1].token.name) : null
                const showGroupHeader = group !== '' && group !== previousGroup
                const isCollapsed = group !== '' && collapsedGroups.has(group)

                return (
                  <Fragment key={id}>
                    {showGroupHeader && (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={3} className="bg-muted/40 p-0 text-xs font-medium text-muted-foreground">
                          {editingGroup?.group === group ? (
                            <Input
                              autoFocus
                              aria-label={`Rename group ${group.split('.').join(' / ')}`}
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
                              className="h-8 rounded-none border-transparent bg-transparent px-2 text-xs font-medium text-foreground focus-visible:ring-0"
                            />
                          ) : (
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => toggleGroup(group)}
                                aria-expanded={!isCollapsed}
                                className="flex flex-1 items-center gap-1.5 px-2 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                              >
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className={cn('size-3.5 shrink-0 transition-transform', isCollapsed && '-rotate-90')}
                                />
                                {group.split('.').join(' / ')}
                              </button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Rename group ${group.split('.').join(' / ')}`}
                                className="mr-1 shrink-0"
                                onClick={() => startEditingGroup(group)}
                              >
                                <PencilIcon />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                    {!isCollapsed && (
                      <TableRow>
                        <TableCell className="p-0">
                          <div className="flex items-center gap-1">
                            <Input
                              ref={el => {
                                if (el) cellRefs.current.set(`${row}-0`, el)
                                else cellRefs.current.delete(`${row}-0`)
                              }}
                              aria-label={`Name for ${token.name || 'token'}`}
                              value={leafNameFor(token.name)}
                              onChange={e => handleNameChange(id, e.target.value)}
                              onFocus={e => (focusSnapshot.current = { id, col: 0, value: e.target.value })}
                              onKeyDown={e => handleCellKeyDown(e, row, 0, id)}
                              className="h-8 rounded-none"
                            />
                            {changeStatus && (
                              <Badge variant={CHANGE_STATUS_VARIANT[changeStatus]} className="mr-1 shrink-0">
                                {CHANGE_STATUS_LABEL[changeStatus]}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="p-0">
                          {token.type === 'color' ? (
                            <Popover
                              open={openPopoverId === id}
                              onOpenChange={open => setOpenPopoverId(open ? id : null)}
                            >
                              <PopoverTrigger
                                aria-invalid={isMalformed || cellErrors.length > 0}
                                render={
                                  <button
                                    type="button"
                                    aria-label={`Value for ${token.name || 'token'}`}
                                    className="flex h-8 w-full items-center gap-2 rounded-none border border-input bg-transparent px-2 text-sm outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                                  />
                                }
                              >
                                <span
                                  aria-hidden="true"
                                  className="size-5 shrink-0 rounded-sm border"
                                  style={hex ? { backgroundColor: hex } : undefined}
                                />
                                <span className="truncate">{token.referenceTarget ?? hex ?? '—'}</span>
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                <Tabs
                                  value={modeFor(id, token)}
                                  onValueChange={value => setRowMode(id, value as 'value' | 'reference')}
                                >
                                  <TabsList
                                    variant="line"
                                    aria-label={`Value mode for ${token.name || 'token'}`}
                                    className="mb-2 h-7"
                                  >
                                    <TabsTrigger value="value" className="h-6 px-2 text-xs">
                                      Color
                                    </TabsTrigger>
                                    <TabsTrigger value="reference" className="h-6 px-2 text-xs">
                                      Reference
                                    </TabsTrigger>
                                  </TabsList>
                                </Tabs>

                                {modeFor(id, token) === 'value' ? (
                                  <div className="space-y-2">
                                    <input
                                      type="color"
                                      aria-label={`Pick color for ${token.name || 'token'}`}
                                      className="h-9 w-full cursor-pointer rounded-md border"
                                      value={hex ?? '#000000'}
                                      onChange={e => handleValueChange(id, e.target.value, token.type)}
                                    />
                                    <Input
                                      aria-label={`Value for ${token.name || 'token'}`}
                                      aria-invalid={isMalformed || cellErrors.length > 0}
                                      placeholder="#RRGGBB"
                                      value={valueTextFor(id, token)}
                                      onChange={e => handleValueChange(id, e.target.value, token.type)}
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
                          ) : (
                            <div className="flex items-center gap-1">
                              {token.referenceTarget ? (
                                <div className="flex h-8 flex-1 items-center gap-1.5 overflow-hidden rounded-none border border-input px-2.5 text-sm text-muted-foreground">
                                  <Link2Icon className="size-3.5 shrink-0" />
                                  <span className="truncate">{token.referenceTarget}</span>
                                </div>
                              ) : (
                                <Input
                                  ref={el => {
                                    if (el) cellRefs.current.set(`${row}-1`, el)
                                    else cellRefs.current.delete(`${row}-1`)
                                  }}
                                  aria-label={`Value for ${token.name || 'token'}`}
                                  aria-invalid={cellErrors.length > 0}
                                  value={valueTextFor(id, token)}
                                  onChange={e => handleValueChange(id, e.target.value, token.type)}
                                  onFocus={e => (focusSnapshot.current = { id, col: 1, value: e.target.value })}
                                  onKeyDown={e => handleCellKeyDown(e, row, 1, id)}
                                  className="h-8 rounded-none"
                                />
                              )}
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
                                <PopoverContent className="w-64">
                                  {renderReferenceSearch(
                                    token.referenceTarget ?? '',
                                    value => handleReferenceChange(id, value),
                                    `Reference target for ${token.name || 'token'}`,
                                  )}
                                </PopoverContent>
                              </Popover>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="p-1">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              aria-label={`Show reference graph for ${token.name || 'token'}`}
                              onClick={() => setGraphRootId(id)}
                            >
                              <NetworkIcon />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon-sm"
                              aria-label={`Delete ${token.name || 'token'}`}
                              onClick={() => handleDeleteRow(id, token.name)}
                            >
                              <Trash2Icon />
                            </Button>
                          </div>
                          {cellErrors.length > 0 && (
                            <Alert variant="destructive" role="alert" className="mt-1.5">
                              <AlertDescription>{cellErrors.join(' ')}</AlertDescription>
                            </Alert>
                          )}
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
                          className="flex h-8 w-full items-center gap-2 rounded-lg border border-input bg-transparent px-2 text-sm outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
                    <PopoverContent className="w-64">
                      <Tabs value={draftMode} onValueChange={value => setDraftMode(value as 'value' | 'reference')}>
                        <TabsList variant="line" aria-label="Value mode for new token" className="mb-2 h-7">
                          <TabsTrigger value="value" className="h-6 px-2 text-xs">
                            Color
                          </TabsTrigger>
                          <TabsTrigger value="reference" className="h-6 px-2 text-xs">
                            Reference
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

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
                      <PopoverContent className="w-64">
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

        <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Submit changes</DialogTitle>
              <DialogDescription>
                {diff.length} change{diff.length === 1 ? '' : 's'} ready for review.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <ul className="max-h-64 space-y-1 overflow-y-auto rounded-lg border p-2">
                {diff.map((entry, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant={DIFF_KIND_VARIANT[entry.kind]} className="shrink-0">
                      {DIFF_KIND_LABEL[entry.kind]}
                    </Badge>
                    <span className="truncate">{(entry.newPath ?? entry.oldPath)?.join('.')}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-1.5">
                <Label htmlFor="change-description">Describe this change (goes in the pull request)</Label>
                <Textarea id="change-description" value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              {errors.length > 0 && (
                <Alert role="status">
                  <AlertDescription>
                    {errors.length} validation issue{errors.length === 1 ? '' : 's'} — fix these before submitting.
                  </AlertDescription>
                </Alert>
              )}
              {submitState === 'success' && submitMessage && (
                <Alert role="status">
                  <AlertDescription>
                    Submitted for review — <a href={submitMessage}>view your change</a>.
                  </AlertDescription>
                </Alert>
              )}
              {submitState === 'conflict' && submitMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{submitMessage}</AlertDescription>
                </Alert>
              )}
              {submitState === 'error' && submitMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{submitMessage}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
              <Button type="button" disabled={!canSubmit} onClick={handleSubmit}>
                {submitState === 'submitting' ? 'Submitting…' : 'Submit for review'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {graphRootId && <TokenGraph tokens={tokens} rootPath={graphRootId} onClose={() => setGraphRootId(null)} />}
      </div>
    </div>
  )
}
