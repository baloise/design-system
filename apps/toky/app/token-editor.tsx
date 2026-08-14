'use client'

import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  ChevronDownIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  Code2Icon,
  CopyIcon,
  EllipsisIcon,
  GitBranchIcon,
  HashIcon,
  HexagonIcon,
  LayersIcon,
  Link2Icon,
  NetworkIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  Redo2Icon,
  SearchIcon,
  SwatchBookIcon,
  ToggleLeftIcon,
  Trash2Icon,
  TriangleAlertIcon,
  TypeIcon,
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { computeDiff, describeChangeStatus, effectiveValue, pathFor } from '@/src/tokens/edit'
import type { ChangeStatus, TokenDiffEntry, WorkingToken } from '@/src/tokens/edit'
import { computeBrandPreviewTokens, computePreviewTokens } from '@/src/tokens/css-preview'
import { filterTokensByName } from '@/src/tokens/filter'
import { resolveReferences } from '@/src/tokens/flatten'
import { allPullEntryKeys, buildFigmaPullPlan, filterPlanBySelection } from '@/src/tokens/figma-pull'
import type { FigmaPullResult, PullConflict, PulledEntry, PullPlan } from '@/src/tokens/figma-pull'
import { FigmaPullSidebar } from './figma-pull-sidebar'
import { FigmaIcon } from '@/components/icons/figma-icon'
import { getColorAlpha, getColorHex, hexToColorValue, toSlashPath, withAlphaPercent } from '@/src/tokens/format'
import { parseTokenPath, resolveGroupSegments, sanitizePathInput } from '@/src/tokens/path'
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
import { PreviewSidebar, PREVIEW_TAB_ICON } from './preview-sidebar'
import { SearchSelect } from './search-select'
import { ACTIVITY_BAR_WIDTH, SIDEBAR_DEFAULT_WIDTH, SidebarActivityBar } from './sidebar'
import type { SidebarActivityItem } from './sidebar'
import { StagedChangesSidebar } from './staged-changes-sidebar'
import { useUndoableState } from './use-undoable-state'
import type { SubmitState } from './staged-changes-sidebar'
import { TokenGraph } from './token-graph'

const LAYERS: TokenLayer[] = ['Global', 'Alias', 'Component']
const LAYER_EMOJI: Record<TokenLayer, string> = { Global: '🌐', Alias: '🔗', Component: '🧩' }
// Each layer's accordion-head tint at layer depth (0) only — the same
// amber/sky/emerald used as each layer's node border color in the
// reference graph (see LAYER_BORDER_COLOR in token-graph.tsx). This row is
// sticky (see renderGroupHeaderRow), so the tint has to be opaque —
// color-mix against --background, not a translucent hex-alpha color,
// otherwise scrolled-past rows show through it while it's pinned (same
// reason --border-solid exists in globals.css).
const LAYER_BG_TINT: Record<TokenLayer, string> = {
  Global:
    'bg-[color-mix(in_oklch,#f59e0b_15%,var(--background))] hover:bg-[color-mix(in_oklch,#f59e0b_15%,var(--background))]', // amber
  Alias:
    'bg-[color-mix(in_oklch,#38bdf8_15%,var(--background))] hover:bg-[color-mix(in_oklch,#38bdf8_15%,var(--background))]', // sky
  Component:
    'bg-[color-mix(in_oklch,#34d399_15%,var(--background))] hover:bg-[color-mix(in_oklch,#34d399_15%,var(--background))]', // emerald
}
// Name, Value — the two columns that participate in arrow-key navigation.
// The delete/graph buttons are reachable via Tab, same as any other
// focusable element, but sit outside this grid on purpose (arrow-nav only
// makes sense across uniform columns).
const COLUMN_COUNT = 2
// Fixed row height (px) of every accordion group header — layer, outer,
// and inner alike (see renderGroupHeaderRow's h-8/max-h-8) — used to stack
// their sticky `top` offsets under the column header.
const HEADER_ROW_HEIGHT = 32

let draftIdCounter = 0

// A conflict from a brand's plan can share the same tokenId/path as a Base
// conflict (brand overrides mirror Base's path) — `scope` says which
// working tree (Base, or which brand) "Use Figma value" should write into.
interface ScopedPullConflict {
  scope: 'base' | string
  conflict: PullConflict
}

interface Draft {
  name: string
  layer: TokenLayer
  type: string
  value: string
  alpha: number
  unit: DimensionValue['unit']
  referenceTarget: string
}

function emptyDraft(layer: TokenLayer = 'Global'): Draft {
  return { name: '', layer, type: 'string', value: '', alpha: 100, unit: 'rem', referenceTarget: '' }
}

// A brand's value/reference text within the Edit-token dialog — kept
// separate from `brandWorking` until Apply, same reason `editDraft` itself
// is kept separate from `working`.
interface EditBrandDraft {
  value: string
  alpha: number
  unit: DimensionValue['unit']
  referenceTarget: string
  malformed: boolean
}

interface EditDraftState {
  id: string
  type: string
  name: string
  value: string
  alpha: number
  unit: DimensionValue['unit']
  referenceTarget: string
  malformed: boolean
  brands: Record<string, EditBrandDraft>
}

// Tokens are grouped for display by every dot-segment but the last — each
// one gets its own accordion level, however deep a name goes (e.g.
// "Color.Danger.7" groups under "Color" then "Color.Danger", leaf "7";
// "Color.Primary.Background.Base" groups under "Color", "Color.Primary",
// then "Color.Primary.Background", leaf "Base"). No cap: unlike an
// earlier version of this grouping, nothing gets folded into the leaf —
// every ancestor segment renders as its own header.

// The dot-segment group at a given depth (1 = outer/component-level group,
// mirroring Figma's top-level grouping by component name (Component layer)
// or subject (Global/Alias layers); 2+ = progressively nested within it) —
// only when the name goes at least one dot deeper than that depth, so a
// group never appears to contain only itself.
function groupAtDepth(name: string, depth: number): string {
  const parts = name.split('.')
  return parts.length > depth ? parts.slice(0, depth).join('.') : ''
}

// The group a token's row actually sits under — everything but its last
// dot-segment, else '' for an ungrouped (single-segment) name. Used to
// split a full name into "group" + "leaf" and back again (renaming,
// duplicating).
function groupOf(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx === -1 ? '' : name.slice(0, idx)
}

// The row's Name cell content — the name's last dot-segment (its group,
// however many levels deep, is all rendered as accordion headers instead).
function leafPathFor(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx === -1 ? name : name.slice(idx + 1)
}

// Layer is now the outermost accordion level, sitting above the existing
// outer/inner name-based groups — collapse/rename state for those two
// still keys off the dotted group path alone, which would collide across
// layers (e.g. a "Color" group in both Global and Component). These give
// every group header a layer-scoped key while `group` itself stays the
// plain dotted path used for display and for matching token names.
function layerKey(layer: TokenLayer): string {
  return `layer:${layer}`
}

function groupKey(layer: TokenLayer, group: string): string {
  return `${layer}::${group}`
}

// "White" -> "White copy", or "White copy 2", "White copy 3", ... if that's
// already taken — keeps the duplicate in the same group as its source.
function uniqueCopyName(layer: TokenLayer, name: string, working: WorkingToken[]): string {
  const prefix = groupOf(name)
  const leaf = leafPathFor(name)
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
// md:text-xs overrides Input's own md:text-sm default — twMerge can't drop
// that for us since a bare text-xs and a md:-prefixed text-sm sit in
// different variant groups, so without it the name/value fields would
// still render at 14px on any normal (>=768px) desktop viewport.
const CELL_FIELD_CLASS =
  'h-8 rounded-none border-transparent bg-transparent text-xs md:text-xs shadow-none hover:bg-muted/30 focus-visible:border-input focus-visible:bg-input/30 focus-visible:ring-3 focus-visible:ring-ring dark:bg-transparent dark:hover:bg-muted/30 dark:focus-visible:bg-input/30'

const CELL_TRIGGER_CLASS =
  'flex h-8 w-full items-center gap-2 rounded-none border border-transparent bg-transparent px-2 text-xs outline-none hover:bg-muted/30 focus-visible:border-input focus-visible:ring-3 focus-visible:ring-ring aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20'

// Alias/reference tags are just the normal outline Button — the same chip
// used everywhere else in the app (e.g. the toolbar's search button) —
// capped at 28px tall and left-aligning its swatch/text content.
const CELL_TAG_CLASS = 'h-7 max-h-7 justify-start gap-2 overflow-hidden px-2 text-xs font-normal'

// Shared "no errors" fallback for a row's cellErrors — a stable reference
// (unlike a fresh `[]` literal on every lookup) so a row without errors
// doesn't get a new array identity, and thus a wasted re-render, on every
// unrelated render of the table.
const EMPTY_ERRORS: string[] = []

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

interface DimensionValue {
  value: number
  unit: 'px' | 'rem'
}

function isDimensionValue(value: unknown): value is DimensionValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { value?: unknown }).value === 'number' &&
    ((value as { unit?: unknown }).unit === 'px' || (value as { unit?: unknown }).unit === 'rem')
  )
}

function getEditableValueText(token: FlatToken): string {
  if (token.referenceTarget) return ''
  if (token.type === 'color') return getColorHex(token.rawValue) ?? ''
  if (token.type === 'fontFamily') return Array.isArray(token.rawValue) ? token.rawValue.join(', ') : ''
  if (token.type === 'dimension') return isDimensionValue(token.rawValue) ? String(token.rawValue.value) : ''
  return token.rawValue === undefined || token.rawValue === null ? '' : String(token.rawValue)
}

// The dimension unit backing a row/dialog's value right now — the token's own current unit if it
// already has one, else 'rem'. The adjacent unit <Select> is always the source of truth for a
// dimension's unit (not the value text, which is just the bare number — see getEditableValueText).
function dimensionUnitFor(rawValue: unknown): DimensionValue['unit'] {
  return isDimensionValue(rawValue) ? rawValue.unit : 'rem'
}

type ParsedValue = { ok: true; value: unknown } | { ok: false }

// `previous` supplies the color's existing colorSpace/alpha (or the dimension's existing unit)
// so typing a hex value / a bare number doesn't silently reset them.
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
  if (type === 'number' || type === 'fontWeight') {
    if (text.trim() === '') return { ok: true, value: '' }
    const n = Number(text)
    return Number.isNaN(n) ? { ok: false } : { ok: true, value: n }
  }
  if (type === 'fontFamily') {
    const names = text
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)
    return { ok: true, value: names.length > 0 ? names : '' }
  }
  if (type === 'dimension') {
    if (text.trim() === '') return { ok: true, value: '' }
    const n = Number(text)
    if (Number.isNaN(n)) return { ok: false }
    return { ok: true, value: { value: n, unit: dimensionUnitFor(previous) } }
  }
  return { ok: true, value: text }
}

// The 2 DTCG-legal dimension units (https://www.designtokens.org/tr/drafts/format/#dimension) —
// fixed, not derived from anything, since this is the entire universe of valid units, not a set
// of references to pick from (see docs/plans/dimension-token-type-plan.md).
const DIMENSION_UNIT_OPTIONS: { value: DimensionValue['unit']; label: string }[] = [
  { value: 'px', label: 'px' },
  { value: 'rem', label: 'rem' },
]

const PX_PER_REM = 16

// Switching a dimension token's unit converts the number to preserve its physical size (a
// representation change, never a silent resize) — 1.5rem -> 24px, not 1.5rem -> 1.5px.
function convertDimensionUnit(current: DimensionValue, unit: DimensionValue['unit']): DimensionValue {
  if (current.unit === unit) return current
  const value = unit === 'px' ? current.value * PX_PER_REM : current.value / PX_PER_REM
  return { value, unit }
}

// The 10 DTCG-legal font-weight values, first-listed keyword synonym per
// weight (https://www.designtokens.org/tr/drafts/format/#font-weight) —
// mirrors Global.🔤 Font.Weight in Base.tokens.json. Fixed, not derived from
// whatever Global tokens happen to exist, since this is the universe of
// valid values a fontWeight token may hold, not a set of references to pick
// from (see docs/plans/font-weight-token-type-plan.md).
const FONT_WEIGHT_OPTIONS: { value: number; label: string }[] = [
  { value: 100, label: '100 — Thin' },
  { value: 200, label: '200 — Extra-Light' },
  { value: 300, label: '300 — Light' },
  { value: 400, label: '400 — Regular' },
  { value: 500, label: '500 — Medium' },
  { value: 600, label: '600 — Semi-Bold' },
  { value: 700, label: '700 — Bold' },
  { value: 800, label: '800 — Extra-Bold' },
  { value: 900, label: '900 — Black' },
  { value: 950, label: '950 — Extra-Black' },
]

// A single DTCG shadow layer, as it lives in a shadow token's rawValue —
// see docs/plans/shadow-token-type-plan.md. `inset` is preserved across
// edits but has no dedicated control in this editor (not part of the
// mockup this plan implements against).
interface ShadowLayerValue {
  offsetX: DimensionValue
  offsetY: DimensionValue
  blur: DimensionValue
  spread: DimensionValue
  color: unknown
  inset?: boolean
}

function isShadowLayerValue(value: unknown): value is ShadowLayerValue {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    isDimensionValue(v.offsetX) && isDimensionValue(v.offsetY) && isDimensionValue(v.blur) && isDimensionValue(v.spread)
  )
}

// A shadow token's rawValue is a bare layer object (single-layer), an array
// of layers (multi-layer), or `[]` ("none") — see decision #3 in the plan.
// This always returns a flat list, regardless of which shape is currently
// stored, so the editor below never has to branch on it.
function shadowLayersOf(value: unknown): ShadowLayerValue[] {
  if (Array.isArray(value)) return value.filter(isShadowLayerValue)
  return isShadowLayerValue(value) ? [value] : []
}

// The inverse of shadowLayersOf — collapses back to the bare-object/array/[]
// shape the DTCG data and shadowValueToCss both expect.
function shadowValueFromLayers(layers: ShadowLayerValue[]): unknown {
  if (layers.length === 0) return []
  if (layers.length === 1) return layers[0]
  return layers
}

function defaultShadowLayer(): ShadowLayerValue {
  return {
    offsetX: { value: 0, unit: 'rem' },
    offsetY: { value: 0, unit: 'rem' },
    blur: { value: 0, unit: 'rem' },
    spread: { value: 0, unit: 'rem' },
    color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 0.25, hex: '#000000' },
  }
}

function shadowSummaryText(value: unknown): string {
  const layers = shadowLayersOf(value)
  if (layers.length === 0) return 'None'
  return layers.length === 1 ? '1 layer' : `${layers.length} layers`
}

// One X/Y/Blur/Spread field within a shadow layer — a number + its own
// px/rem <Select> (decision #6: 4 independent unit pickers per layer, not
// one shared unit for the whole shadow). Keeps its own draft text, same
// "commit on blur" discipline as the table's dimension cell (see
// commitDimensionUnit) — otherwise every keystroke here would push its own
// undo step (useUndoableState has no debounce/coalescing).
function ShadowDimensionField({
  id,
  label,
  dimension,
  onCommit,
}: {
  id: string
  label: string
  dimension: DimensionValue
  onCommit: (next: DimensionValue) => void
}): ReactNode {
  const [text, setText] = useState(String(dimension.value))

  useEffect(() => {
    setText(String(dimension.value))
  }, [dimension.value])

  function commitText() {
    const n = Number(text)
    if (Number.isNaN(n)) {
      setText(String(dimension.value))
      return
    }
    onCommit({ ...dimension, value: n })
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="flex gap-1">
        <Input
          id={id}
          aria-label={label}
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={commitText}
          className="w-full"
        />
        <Select
          value={dimension.unit}
          onValueChange={unit => (unit === 'px' || unit === 'rem') && onCommit(convertDimensionUnit(dimension, unit))}
        >
          <SelectTrigger aria-label={`Unit — ${label}`} className="h-8 w-18 shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DIMENSION_UNIT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// A shadow layer's color field — same hex+opacity-% markup as the color
// type's own popover (see the `token.type === 'color'` branch below), just
// reused standalone against one layer's `color` sub-value instead of a
// whole token's rawValue.
function ShadowColorField({
  idPrefix,
  color,
  onCommit,
}: {
  idPrefix: string
  color: unknown
  onCommit: (next: unknown) => void
}): ReactNode {
  const [hexText, setHexText] = useState(getColorHex(color) ?? '')
  const [alphaText, setAlphaText] = useState(String(alphaPercentFor(color)))

  useEffect(() => {
    setHexText(getColorHex(color) ?? '')
    setAlphaText(String(alphaPercentFor(color)))
  }, [color])

  function commitHex() {
    const next = hexToColorValue(hexText, color)
    if (!next) {
      setHexText(getColorHex(color) ?? '')
      return
    }
    onCommit(withAlphaPercent(next, Number(alphaText) || 100))
  }

  function commitAlpha() {
    const percent = Number(alphaText)
    if (Number.isNaN(percent)) {
      setAlphaText(String(alphaPercentFor(color)))
      return
    }
    onCommit(withAlphaPercent(color, percent))
  }

  return (
    <div className="flex gap-2">
      <div className="basis-2/3 space-y-1">
        <Label htmlFor={`${idPrefix}-hex`} className="text-xs text-muted-foreground">
          Color
        </Label>
        <Input
          id={`${idPrefix}-hex`}
          placeholder="#RRGGBB"
          value={hexText}
          onChange={e => setHexText(e.target.value)}
          onBlur={commitHex}
        />
      </div>
      <div className="basis-1/3 space-y-1">
        <Label htmlFor={`${idPrefix}-opacity`} className="text-xs text-muted-foreground">
          Opacity
        </Label>
        <div className="relative">
          <Input
            id={`${idPrefix}-opacity`}
            type="number"
            min={0}
            max={100}
            step={1}
            value={alphaText}
            onChange={e => setAlphaText(e.target.value)}
            onBlur={commitAlpha}
            className="pr-6"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-muted-foreground"
          >
            %
          </span>
        </div>
      </div>
    </div>
  )
}

// One layer's full field set (X/Y/Blur/Spread + color), plus its remove
// button. `onUpdate` always receives the layer's full next state — the
// parent (ShadowEditor) owns the layer array itself, this only edits one
// entry in place.
function ShadowLayerEditor({
  idPrefix,
  index,
  layer,
  onUpdate,
  onRemove,
}: {
  idPrefix: string
  index: number
  layer: ShadowLayerValue
  onUpdate: (next: ShadowLayerValue) => void
  onRemove: () => void
}): ReactNode {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Layer {index + 1}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Remove layer ${index + 1}`}
          onClick={onRemove}
        >
          <Trash2Icon className="size-3.5" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ShadowDimensionField
          id={`${idPrefix}-x`}
          label="X"
          dimension={layer.offsetX}
          onCommit={offsetX => onUpdate({ ...layer, offsetX })}
        />
        <ShadowDimensionField
          id={`${idPrefix}-y`}
          label="Y"
          dimension={layer.offsetY}
          onCommit={offsetY => onUpdate({ ...layer, offsetY })}
        />
        <ShadowDimensionField
          id={`${idPrefix}-blur`}
          label="Blur"
          dimension={layer.blur}
          onCommit={blur => onUpdate({ ...layer, blur })}
        />
        <ShadowDimensionField
          id={`${idPrefix}-spread`}
          label="Spread"
          dimension={layer.spread}
          onCommit={spread => onUpdate({ ...layer, spread })}
        />
      </div>
      <ShadowColorField
        idPrefix={`${idPrefix}-color`}
        color={layer.color}
        onCommit={color => onUpdate({ ...layer, color })}
      />
    </div>
  )
}

// The full shadow popup: stacked layers (single-layer shadows show just
// one), each independently editable, plus add/remove — removing the last
// layer reaches `$value: []` ("none"), same as Font.Shadow.0/
// Elevation.Shadow.0 today (decision #2/#6).
function ShadowEditor({
  idPrefix,
  value,
  onChange,
}: {
  idPrefix: string
  value: unknown
  onChange: (next: unknown) => void
}): ReactNode {
  const layers = shadowLayersOf(value)

  return (
    <div className="space-y-2">
      {layers.length === 0 ? (
        <p className="text-sm text-muted-foreground">No shadow — renders as &quot;none&quot;.</p>
      ) : (
        layers.map((layer, index) => (
          <ShadowLayerEditor
            key={index}
            idPrefix={`${idPrefix}-${index}`}
            index={index}
            layer={layer}
            onUpdate={next => onChange(shadowValueFromLayers(layers.map((l, i) => (i === index ? next : l))))}
            onRemove={() => onChange(shadowValueFromLayers(layers.filter((_, i) => i !== index)))}
          />
        ))
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={() => onChange(shadowValueFromLayers([...layers, defaultShadowLayer()]))}
      >
        <PlusIcon className="size-3.5" />
        Add layer
      </Button>
    </div>
  )
}

// The small unlink control that appears right after an alias tag on
// hover/focus — breaks the reference and leaves the cell with an empty
// value, mirroring Figma's "detach alias" affordance. Styled like every
// other icon button in the table (e.g. the search button in the toolbar).
// A pure function of its own arguments (no closure over TokenEditor's
// state) — kept at module scope so it's a stable reference, not recreated
// every render, since it's called from within the memoized TokenRow.
// Maps a DTCG $type (e.g. 'color', 'number') to the icon shown before the
// token name, so the value's type is scannable without opening the row.
// Falls back to null for types we don't have a dedicated icon for yet.
const TOKEN_TYPE_ICON: Record<string, typeof PaletteIcon> = {
  color: PaletteIcon,
  number: HashIcon,
  string: TypeIcon,
  boolean: ToggleLeftIcon,
  fontWeight: HashIcon,
  fontFamily: TypeIcon,
  dimension: HashIcon,
  shadow: LayersIcon,
}

// Opaque (100%) is the sensible default for anything that isn't yet a real
// color value object — getColorAlpha already defaults to 1 there, but this
// also guards against a stray NaN (e.g. mid-edit) rendering as 0%.
function alphaPercentFor(rawValue: unknown): number {
  const percent = Math.round(getColorAlpha(rawValue) * 100)
  return Number.isFinite(percent) ? percent : 100
}

// Classic two-tone checkerboard used to visualize transparency — tiled
// small enough to read as a texture, not as individual squares, at the
// size the swatch renders.
const CHECKERBOARD_STYLE: CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
  backgroundSize: '6px 6px',
  backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
  backgroundColor: '#fff',
}

// Left half: the color at full opacity, so the hue itself is always
// legible. Right half: the color at its actual alpha over a checkerboard,
// so transparency is visible without having to open the popover.
function renderColorSwatch(hex: string | null, alphaPercent: number): ReactNode {
  return (
    <span aria-hidden="true" className="relative size-5 shrink-0 overflow-hidden rounded-sm border">
      <span className="absolute inset-y-0 left-0 w-1/2" style={hex ? { backgroundColor: hex } : undefined} />
      <span className="absolute inset-y-0 right-0 w-1/2" style={CHECKERBOARD_STYLE} />
      <span
        className="absolute inset-y-0 right-0 w-1/2"
        style={hex ? { backgroundColor: hex, opacity: alphaPercent / 100 } : undefined}
      />
    </span>
  )
}

function renderTokenTypeIcon(type: string): ReactNode {
  const Icon = TOKEN_TYPE_ICON[type]
  if (!Icon) return null
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="flex shrink-0 items-center text-muted-foreground" />}>
        <Icon className="size-3.5" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>{type}</TooltipContent>
    </Tooltip>
  )
}

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

interface TokenRowBrandInfo {
  brand: string
  token: FlatToken
  hex: string | null
  mode: 'value' | 'reference'
  valueText: string
  alphaText: string
  swatchAlphaPercent: number | null
  isOverridden: boolean
  isMalformed: boolean
  isPopoverOpen: boolean
}

interface TokenRowHandlers {
  onNameChange: (id: string, text: string) => void
  onNameBlur: (id: string) => void
  onCellKeyDown: (e: KeyboardEvent<HTMLInputElement>, row: number, col: number, id: string) => void
  onValueChange: (id: string, text: string) => void
  onValueBlur: (id: string, type: string) => void
  onColorPick: (id: string, type: string, text: string) => void
  onLiteralValueSelect: (id: string, type: string, text: string) => void
  onDimensionUnitChange: (id: string, unit: 'px' | 'rem') => void
  onShadowChange: (id: string, rawValue: unknown) => void
  onAlphaChange: (id: string, text: string) => void
  onAlphaBlur: (id: string) => void
  onReferenceChange: (id: string, text: string) => void
  onSetMode: (id: string, mode: 'value' | 'reference') => void
  onPopoverOpenChange: (id: string, open: boolean) => void
  onCodeUsageOpenChange: (id: string, open: boolean) => void
  onShowGraph: (id: string, title: string) => void
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string, token: FlatToken) => void
  onBrandValueChange: (id: string, text: string) => void
  onBrandValueBlur: (brand: string, id: string, type: string) => void
  onBrandColorPick: (brand: string, id: string, type: string, text: string) => void
  onBrandDimensionUnitChange: (brand: string, id: string, unit: 'px' | 'rem') => void
  onBrandShadowChange: (brand: string, id: string, rawValue: unknown) => void
  onBrandAlphaChange: (brand: string, id: string, text: string) => void
  onBrandAlphaBlur: (brand: string, id: string) => void
  onBrandReferenceChange: (brand: string, id: string, text: string) => void
  onSetBrandMode: (id: string, mode: 'value' | 'reference') => void
  renderPopoverHeader: (
    tabs: { value: string; label: string }[],
    activeValue: string,
    onValueChange: ((value: string) => void) | null,
    ariaLabel: string,
  ) => ReactNode
  renderReferenceSearch: (currentValue: string, onSelect: (value: string) => void, ariaLabel: string) => ReactNode
}

interface TokenRowProps {
  id: string
  token: FlatToken
  row: number
  headerNodes: ReactNode[]
  hidden: boolean
  anyHeaderShown: boolean
  depth: number
  hex: string | null
  cellErrors: string[]
  isMalformed: boolean
  changeStatus: ChangeStatus | null
  nameText: string
  valueText: string
  alphaText: string
  swatchAlphaPercent: number | null
  mode: 'value' | 'reference'
  isPopoverOpen: boolean
  isCodeUsageOpen: boolean
  usageCount: number
  brandInfo: TokenRowBrandInfo | null
  cellRefs: { current: Map<string, HTMLInputElement> }
  focusSnapshot: { current: { id: string; col: number; value: string } | null }
  handlers: TokenRowHandlers
}

// One token row (plus whichever group headers immediately precede it) —
// wrapped in React.memo so a search keystroke that doesn't change this
// row's own props (see rowEntries/the per-row prop precomputation in
// TokenEditor) skips re-rendering it entirely, instead of every row in a
// 1500+ row table re-diffing on every keystroke.
const TokenRow = memo(function TokenRow({
  id,
  token,
  row,
  headerNodes,
  hidden,
  anyHeaderShown,
  depth,
  hex,
  cellErrors,
  isMalformed,
  changeStatus,
  nameText,
  valueText,
  alphaText,
  swatchAlphaPercent,
  mode,
  isPopoverOpen,
  isCodeUsageOpen,
  usageCount,
  brandInfo,
  cellRefs,
  focusSnapshot,
  handlers,
}: TokenRowProps) {
  const codeUsage = CODE_USAGE[token.path.join('.')]

  return (
    <>
      {headerNodes}
      {!hidden && (
        <TableRow
          data-row-id={id}
          // A plain border-t, not a shadow — this row isn't sticky, so it
          // doesn't have the stacking/paint-order problems that motivated
          // the header rows' shadow-based border (see renderGroupHeaderRow).
          // Only drawn when a header rendered directly above this row (i.e.
          // it's the first row under that header) — that boundary would
          // otherwise have no line at all, since the header's own border is
          // top-edge-only and doesn't cover its bottom.
          className={cn(
            anyHeaderShown && 'border-t border-border',
            cellErrors.length > 0 && 'bg-destructive/10 hover:bg-destructive/15',
          )}
        >
          <TableCell className="max-h-8 p-0 focus-within:relative focus-within:z-40">
            <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
              {renderTokenTypeIcon(token.type)}
              <Input
                ref={el => {
                  if (el) cellRefs.current.set(`${row}-0`, el)
                  else cellRefs.current.delete(`${row}-0`)
                }}
                aria-label={`Name for ${token.name || 'token'}`}
                value={nameText}
                onChange={e => handlers.onNameChange(id, e.target.value)}
                onBlur={() => handlers.onNameBlur(id)}
                onFocus={e => (focusSnapshot.current = { id, col: 0, value: e.target.value })}
                onKeyDown={e => handlers.onCellKeyDown(e, row, 0, id)}
                className={CELL_FIELD_CLASS}
              />
              {changeStatus && (
                <Badge variant={CHANGE_STATUS_VARIANT[changeStatus]} className="mr-1 shrink-0">
                  {CHANGE_STATUS_LABEL[changeStatus]}
                </Badge>
              )}
            </div>
          </TableCell>
          <TableCell className="max-h-8 p-0 px-1">
            {token.type === 'color' ? (
              <div className="group/tag flex items-center gap-1">
                <Popover open={isPopoverOpen} onOpenChange={open => handlers.onPopoverOpenChange(id, open)}>
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
                    {renderColorSwatch(hex, swatchAlphaPercent ?? 100)}
                    <span className="w-fit">
                      {token.referenceTarget ? toSlashPath(token.referenceTarget) : (hex ?? '—')}
                    </span>
                    {swatchAlphaPercent !== null && swatchAlphaPercent !== 100 && (
                      <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                        <span aria-hidden="true" className="h-4 w-px bg-border" />
                        {swatchAlphaPercent}%
                      </span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-128">
                    {handlers.renderPopoverHeader(
                      [
                        { value: 'value', label: 'Color' },
                        { value: 'reference', label: 'Reference' },
                      ],
                      mode,
                      value => handlers.onSetMode(id, value as 'value' | 'reference'),
                      `Value mode for ${token.name || 'token'}`,
                    )}

                    {mode === 'value' ? (
                      <div className="space-y-2">
                        <input
                          type="color"
                          aria-label={`Pick color for ${token.name || 'token'}`}
                          className="h-9 w-full cursor-pointer rounded-md border"
                          defaultValue={hex ?? '#000000'}
                          // Native `change` (not React's onChange, which is
                          // bound to the continuous `input` event) — fires
                          // once when the picker closes, so dragging inside
                          // it doesn't flood `working` with an update per
                          // pixel of drag. Uncontrolled (defaultValue) so
                          // React never fights the swatch's own live
                          // preview while the picker is open; synced back
                          // imperatively below if `hex` changes for some
                          // other reason (undo, detaching a reference).
                          ref={el => {
                            if (!el) return
                            const current = hex ?? '#000000'
                            if (el.value !== current) el.value = current
                            el.onchange = e =>
                              handlers.onColorPick(id, token.type, (e.target as HTMLInputElement).value)
                          }}
                        />
                        <div className="flex gap-2">
                          <div className="basis-2/3 space-y-1">
                            <Label htmlFor={`${row}-hex`} className="text-xs text-muted-foreground">
                              Hex
                            </Label>
                            <Input
                              id={`${row}-hex`}
                              aria-label={`Value for ${token.name || 'token'}`}
                              aria-invalid={isMalformed || cellErrors.length > 0}
                              placeholder="#RRGGBB"
                              value={valueText}
                              onChange={e => handlers.onValueChange(id, e.target.value)}
                              onBlur={() => handlers.onValueBlur(id, token.type)}
                            />
                          </div>
                          <div className="basis-1/3 space-y-1">
                            <Label htmlFor={`${row}-opacity`} className="text-xs text-muted-foreground">
                              Opacity
                            </Label>
                            <div className="relative">
                              <Input
                                id={`${row}-opacity`}
                                type="number"
                                min={0}
                                max={100}
                                step={1}
                                aria-label={`Opacity for ${token.name || 'token'}`}
                                value={alphaText}
                                onChange={e => handlers.onAlphaChange(id, e.target.value)}
                                onBlur={() => handlers.onAlphaBlur(id)}
                                className="pr-6"
                              />
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-muted-foreground"
                              >
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                        {isMalformed && (
                          <Alert variant="destructive">
                            <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ) : (
                      handlers.renderReferenceSearch(
                        token.referenceTarget ?? '',
                        value => handlers.onReferenceChange(id, value),
                        `Reference target for ${token.name || 'token'}`,
                      )
                    )}
                  </PopoverContent>
                </Popover>
                {token.referenceTarget &&
                  renderDetachButton(`Detach alias for ${token.name || 'token'}`, () =>
                    handlers.onReferenceChange(id, ''),
                  )}
              </div>
            ) : token.type === 'shadow' ? (
              <div className="group/tag flex items-center gap-1">
                <Popover open={isPopoverOpen} onOpenChange={open => handlers.onPopoverOpenChange(id, open)}>
                  <PopoverTrigger
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
                    <LayersIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="w-fit">
                      {token.referenceTarget ? toSlashPath(token.referenceTarget) : shadowSummaryText(token.rawValue)}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-128">
                    {handlers.renderPopoverHeader(
                      [
                        { value: 'value', label: 'Shadow' },
                        { value: 'reference', label: 'Reference' },
                      ],
                      mode,
                      value => handlers.onSetMode(id, value as 'value' | 'reference'),
                      `Value mode for ${token.name || 'token'}`,
                    )}
                    {mode === 'value' ? (
                      <ShadowEditor
                        idPrefix={`shadow-${row}`}
                        value={token.rawValue}
                        onChange={next => handlers.onShadowChange(id, next)}
                      />
                    ) : (
                      handlers.renderReferenceSearch(
                        token.referenceTarget ?? '',
                        value => handlers.onReferenceChange(id, value),
                        `Reference target for ${token.name || 'token'}`,
                      )
                    )}
                  </PopoverContent>
                </Popover>
                {token.referenceTarget &&
                  renderDetachButton(`Detach alias for ${token.name || 'token'}`, () =>
                    handlers.onReferenceChange(id, ''),
                  )}
              </div>
            ) : (
              <div className="group/tag flex items-center gap-1">
                {token.referenceTarget ? (
                  <>
                    <Popover open={isPopoverOpen} onOpenChange={open => handlers.onPopoverOpenChange(id, open)}>
                      <PopoverTrigger
                        aria-label={`Value for ${token.name || 'token'}`}
                        render={<Button type="button" variant="outline" className={CELL_TAG_CLASS} />}
                      >
                        <Link2Icon className="size-3.5 shrink-0" />
                        <span className="truncate">{toSlashPath(token.referenceTarget)}</span>
                      </PopoverTrigger>
                      <PopoverContent className="w-128">
                        {handlers.renderPopoverHeader(
                          [{ value: 'reference', label: 'Reference' }],
                          'reference',
                          null,
                          `Value mode for ${token.name || 'token'}`,
                        )}
                        {handlers.renderReferenceSearch(
                          token.referenceTarget ?? '',
                          value => handlers.onReferenceChange(id, value),
                          `Reference target for ${token.name || 'token'}`,
                        )}
                      </PopoverContent>
                    </Popover>
                    {renderDetachButton(`Detach alias for ${token.name || 'token'}`, () =>
                      handlers.onReferenceChange(id, ''),
                    )}
                  </>
                ) : (
                  <>
                    {token.type === 'dimension' ? (
                      <>
                        <Input
                          ref={el => {
                            if (el) cellRefs.current.set(`${row}-1`, el)
                            else cellRefs.current.delete(`${row}-1`)
                          }}
                          aria-label={`Value for ${token.name || 'token'}`}
                          aria-invalid={cellErrors.length > 0}
                          value={valueText}
                          onChange={e => handlers.onValueChange(id, e.target.value)}
                          onBlur={() => handlers.onValueBlur(id, token.type)}
                          onFocus={e => (focusSnapshot.current = { id, col: 1, value: e.target.value })}
                          onKeyDown={e => handlers.onCellKeyDown(e, row, 1, id)}
                          className={CELL_FIELD_CLASS}
                        />
                        <Select
                          value={isDimensionValue(token.rawValue) ? token.rawValue.unit : 'rem'}
                          onValueChange={value =>
                            (value === 'px' || value === 'rem') && handlers.onDimensionUnitChange(id, value)
                          }
                        >
                          <SelectTrigger aria-label={`Unit for ${token.name || 'token'}`} className="h-8 w-18 shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DIMENSION_UNIT_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    ) : token.type === 'fontWeight' ? (
                      <Select
                        value={valueText}
                        onValueChange={value => value !== null && handlers.onLiteralValueSelect(id, token.type, value)}
                      >
                        <SelectTrigger
                          aria-label={`Value for ${token.name || 'token'}`}
                          aria-invalid={cellErrors.length > 0}
                          className={cn(CELL_FIELD_CLASS, 'h-8')}
                        >
                          <SelectValue placeholder="Select a weight" />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_WEIGHT_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={String(option.value)}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        ref={el => {
                          if (el) cellRefs.current.set(`${row}-1`, el)
                          else cellRefs.current.delete(`${row}-1`)
                        }}
                        aria-label={`Value for ${token.name || 'token'}`}
                        aria-invalid={cellErrors.length > 0}
                        value={valueText}
                        onChange={e => handlers.onValueChange(id, e.target.value)}
                        onBlur={() => handlers.onValueBlur(id, token.type)}
                        onFocus={e => (focusSnapshot.current = { id, col: 1, value: e.target.value })}
                        onKeyDown={e => handlers.onCellKeyDown(e, row, 1, id)}
                        className={CELL_FIELD_CLASS}
                      />
                    )}
                    <Popover open={isPopoverOpen} onOpenChange={open => handlers.onPopoverOpenChange(id, open)}>
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
                        {handlers.renderPopoverHeader(
                          [{ value: 'reference', label: 'Reference' }],
                          'reference',
                          null,
                          `Value mode for ${token.name || 'token'}`,
                        )}
                        {handlers.renderReferenceSearch(
                          token.referenceTarget ?? '',
                          value => handlers.onReferenceChange(id, value),
                          `Reference target for ${token.name || 'token'}`,
                        )}
                      </PopoverContent>
                    </Popover>
                  </>
                )}
              </div>
            )}
          </TableCell>
          {!brandInfo && (
            <TableCell className="max-h-8 p-0 px-1 text-muted-foreground">
              <div className="flex items-center gap-1">
                {usageCount > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto gap-1 px-1.5 py-0.5"
                    onClick={() => handlers.onShowGraph(id, toSlashPath(token.name))}
                  >
                    <NetworkIcon className="size-3.5" />
                    {usageCount} {usageCount === 1 ? 'use' : 'uses'}
                  </Button>
                )}
                {codeUsage && codeUsage.count > 0 && (
                  <Popover open={isCodeUsageOpen} onOpenChange={open => handlers.onCodeUsageOpenChange(id, open)}>
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
                )}
              </div>
            </TableCell>
          )}
          {brandInfo &&
            (() => {
              const {
                brand,
                token: brandToken,
                hex: brandHex,
                mode: brandMode,
                valueText: brandValueText,
                alphaText: brandAlphaText,
                swatchAlphaPercent: brandSwatchAlphaPercent,
              } = brandInfo
              const brandCellId = `brand:${id}`
              return (
                <TableCell className="max-h-8 p-0 px-1">
                  <div className="flex items-center gap-1">
                    {brandToken.type === 'color' ? (
                      <div className="group/tag flex items-center gap-1">
                        <Popover
                          open={brandInfo.isPopoverOpen}
                          onOpenChange={open => handlers.onPopoverOpenChange(brandCellId, open)}
                        >
                          <PopoverTrigger
                            aria-invalid={brandInfo.isMalformed}
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
                            {renderColorSwatch(brandHex, brandSwatchAlphaPercent ?? 100)}
                            <span className="w-fit">
                              {brandToken.referenceTarget ? toSlashPath(brandToken.referenceTarget) : (brandHex ?? '—')}
                            </span>
                            {brandSwatchAlphaPercent !== null && brandSwatchAlphaPercent !== 100 && (
                              <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                                <span aria-hidden="true" className="h-4 w-px bg-border" />
                                {brandSwatchAlphaPercent}%
                              </span>
                            )}
                          </PopoverTrigger>
                          <PopoverContent className="w-128">
                            {handlers.renderPopoverHeader(
                              [
                                { value: 'value', label: 'Color' },
                                { value: 'reference', label: 'Reference' },
                              ],
                              brandMode,
                              value => handlers.onSetBrandMode(id, value as 'value' | 'reference'),
                              `${brand} value mode for ${token.name || 'token'}`,
                            )}

                            {brandMode === 'value' ? (
                              <div className="space-y-2">
                                <input
                                  type="color"
                                  aria-label={`Pick ${brand} color for ${token.name || 'token'}`}
                                  className="h-9 w-full cursor-pointer rounded-md border"
                                  defaultValue={brandHex ?? '#000000'}
                                  // See the Base color picker above — native
                                  // `change`, uncontrolled, so a drag inside
                                  // the picker doesn't flood brandWorking
                                  // with an update per pixel.
                                  ref={el => {
                                    if (!el) return
                                    const current = brandHex ?? '#000000'
                                    if (el.value !== current) el.value = current
                                    el.onchange = e =>
                                      handlers.onBrandColorPick(
                                        brand,
                                        id,
                                        brandToken.type,
                                        (e.target as HTMLInputElement).value,
                                      )
                                  }}
                                />
                                <div className="flex gap-2">
                                  <div className="basis-2/3 space-y-1">
                                    <Label htmlFor={`${brandCellId}-hex`} className="text-xs text-muted-foreground">
                                      Hex
                                    </Label>
                                    <Input
                                      id={`${brandCellId}-hex`}
                                      aria-label={`${brand} value for ${token.name || 'token'}`}
                                      aria-invalid={brandInfo.isMalformed}
                                      placeholder="#RRGGBB"
                                      value={brandValueText}
                                      onChange={e => handlers.onBrandValueChange(id, e.target.value)}
                                      onBlur={() => handlers.onBrandValueBlur(brand, id, brandToken.type)}
                                    />
                                  </div>
                                  <div className="basis-1/3 space-y-1">
                                    <Label htmlFor={`${brandCellId}-opacity`} className="text-xs text-muted-foreground">
                                      Opacity
                                    </Label>
                                    <div className="relative">
                                      <Input
                                        id={`${brandCellId}-opacity`}
                                        type="number"
                                        min={0}
                                        max={100}
                                        step={1}
                                        aria-label={`${brand} opacity for ${token.name || 'token'}`}
                                        value={brandAlphaText}
                                        onChange={e => handlers.onBrandAlphaChange(brand, id, e.target.value)}
                                        onBlur={() => handlers.onBrandAlphaBlur(brand, id)}
                                        className="pr-6"
                                      />
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-muted-foreground"
                                      >
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {brandInfo.isMalformed && (
                                  <Alert variant="destructive">
                                    <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            ) : (
                              handlers.renderReferenceSearch(
                                brandToken.referenceTarget ?? '',
                                value => handlers.onBrandReferenceChange(brand, id, value),
                                `${brand} reference target for ${token.name || 'token'}`,
                              )
                            )}
                          </PopoverContent>
                        </Popover>
                        {brandToken.referenceTarget &&
                          renderDetachButton(`Detach ${brand} alias for ${token.name || 'token'}`, () =>
                            handlers.onBrandReferenceChange(brand, id, ''),
                          )}
                      </div>
                    ) : brandToken.type === 'shadow' ? (
                      <div className="group/tag flex items-center gap-1">
                        <Popover
                          open={brandInfo.isPopoverOpen}
                          onOpenChange={open => handlers.onPopoverOpenChange(brandCellId, open)}
                        >
                          <PopoverTrigger
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
                            <LayersIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                            <span className="w-fit">
                              {brandToken.referenceTarget
                                ? toSlashPath(brandToken.referenceTarget)
                                : shadowSummaryText(brandToken.rawValue)}
                            </span>
                          </PopoverTrigger>
                          <PopoverContent className="w-128">
                            {handlers.renderPopoverHeader(
                              [
                                { value: 'value', label: 'Shadow' },
                                { value: 'reference', label: 'Reference' },
                              ],
                              brandMode,
                              value => handlers.onSetBrandMode(id, value as 'value' | 'reference'),
                              `${brand} value mode for ${token.name || 'token'}`,
                            )}
                            {brandMode === 'value' ? (
                              <ShadowEditor
                                idPrefix={`shadow-brand-${brand}-${id}`}
                                value={brandToken.rawValue}
                                onChange={next => handlers.onBrandShadowChange(brand, id, next)}
                              />
                            ) : (
                              handlers.renderReferenceSearch(
                                brandToken.referenceTarget ?? '',
                                value => handlers.onBrandReferenceChange(brand, id, value),
                                `${brand} reference target for ${token.name || 'token'}`,
                              )
                            )}
                          </PopoverContent>
                        </Popover>
                        {brandToken.referenceTarget &&
                          renderDetachButton(`Detach ${brand} alias for ${token.name || 'token'}`, () =>
                            handlers.onBrandReferenceChange(brand, id, ''),
                          )}
                      </div>
                    ) : (
                      <div className="group/tag flex items-center gap-1">
                        {brandToken.referenceTarget ? (
                          <>
                            <Popover
                              open={brandInfo.isPopoverOpen}
                              onOpenChange={open => handlers.onPopoverOpenChange(brandCellId, open)}
                            >
                              <PopoverTrigger
                                aria-label={`${brand} value for ${token.name || 'token'}`}
                                render={<Button type="button" variant="outline" className={CELL_TAG_CLASS} />}
                              >
                                <Link2Icon className="size-3.5 shrink-0" />
                                <span className="truncate">{toSlashPath(brandToken.referenceTarget)}</span>
                              </PopoverTrigger>
                              <PopoverContent className="w-128">
                                {handlers.renderPopoverHeader(
                                  [{ value: 'reference', label: 'Reference' }],
                                  'reference',
                                  null,
                                  `${brand} value mode for ${token.name || 'token'}`,
                                )}
                                {handlers.renderReferenceSearch(
                                  brandToken.referenceTarget ?? '',
                                  value => handlers.onBrandReferenceChange(brand, id, value),
                                  `${brand} reference target for ${token.name || 'token'}`,
                                )}
                              </PopoverContent>
                            </Popover>
                            {renderDetachButton(`Detach ${brand} alias for ${token.name || 'token'}`, () =>
                              handlers.onBrandReferenceChange(brand, id, ''),
                            )}
                          </>
                        ) : (
                          <>
                            {brandToken.type === 'dimension' ? (
                              <>
                                <Input
                                  aria-label={`${brand} value for ${token.name || 'token'}`}
                                  value={brandValueText}
                                  onChange={e => handlers.onBrandValueChange(id, e.target.value)}
                                  onBlur={() => handlers.onBrandValueBlur(brand, id, brandToken.type)}
                                  className={CELL_FIELD_CLASS}
                                />
                                <Select
                                  value={isDimensionValue(brandToken.rawValue) ? brandToken.rawValue.unit : 'rem'}
                                  onValueChange={value =>
                                    (value === 'px' || value === 'rem') &&
                                    handlers.onBrandDimensionUnitChange(brand, id, value)
                                  }
                                >
                                  <SelectTrigger
                                    aria-label={`${brand} unit for ${token.name || 'token'}`}
                                    className="h-8 w-18 shrink-0"
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {DIMENSION_UNIT_OPTIONS.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </>
                            ) : brandToken.type === 'fontWeight' ? (
                              <Select
                                value={brandValueText}
                                onValueChange={value =>
                                  value !== null && handlers.onBrandColorPick(brand, id, brandToken.type, value)
                                }
                              >
                                <SelectTrigger
                                  aria-label={`${brand} value for ${token.name || 'token'}`}
                                  className={cn(CELL_FIELD_CLASS, 'h-8')}
                                >
                                  <SelectValue placeholder="Select a weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FONT_WEIGHT_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={String(option.value)}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                aria-label={`${brand} value for ${token.name || 'token'}`}
                                value={brandValueText}
                                onChange={e => handlers.onBrandValueChange(id, e.target.value)}
                                onBlur={() => handlers.onBrandValueBlur(brand, id, brandToken.type)}
                                className={CELL_FIELD_CLASS}
                              />
                            )}
                            <Popover
                              open={brandInfo.isPopoverOpen}
                              onOpenChange={open => handlers.onPopoverOpenChange(brandCellId, open)}
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
                                {handlers.renderPopoverHeader(
                                  [{ value: 'reference', label: 'Reference' }],
                                  'reference',
                                  null,
                                  `${brand} value mode for ${token.name || 'token'}`,
                                )}
                                {handlers.renderReferenceSearch(
                                  brandToken.referenceTarget ?? '',
                                  value => handlers.onBrandReferenceChange(brand, id, value),
                                  `${brand} reference target for ${token.name || 'token'}`,
                                )}
                              </PopoverContent>
                            </Popover>
                          </>
                        )}
                      </div>
                    )}
                    {brandInfo.isOverridden && (
                      <Badge variant="outline" className="mr-1 shrink-0">
                        Overridden
                      </Badge>
                    )}
                  </div>
                </TableCell>
              )
            })()}
          <TableCell className="max-h-8 p-1">
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
                  <DropdownMenuItem onClick={() => handlers.onEdit(id)}>
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlers.onShowGraph(id, toSlashPath(token.name))}>
                    <NetworkIcon />
                    Show reference graph
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlers.onDuplicate(id)}>
                    <CopyIcon />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={() => handlers.onDelete(id, token)}>
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
            <Alert variant="destructive" role="alert" className="rounded-none border-0 border-t bg-transparent">
              <AlertDescription>{cellErrors.join(' ')}</AlertDescription>
            </Alert>
          </TableCell>
        </TableRow>
      )}
    </>
  )
})

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
  const { data: session } = useSession()
  // searchText is what the input actually shows (updates every keystroke,
  // so typing stays responsive); query is what the filtering below reacts
  // to — re-filtering/re-grouping the whole table is the expensive part,
  // not the input itself. useDeferredValue lets React finish that keystroke's
  // render first and only pick up the new query once it's not blocking
  // input — so a heavy regroup pass never makes typing itself feel stuck.
  // Under 3 characters, the table just isn't searched at all (query stays
  // '') — a 1-2 character query matches too broadly to be a useful filter
  // anyway, so there's no point paying for it.
  const [searchText, setSearchText] = useState('')
  const deferredSearchText = useDeferredValue(searchText)
  const query = deferredSearchText.length >= 3 ? deferredSearchText : ''
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
  // Same reasoning as valueDraftText — the opacity field commits (and
  // triggers the reference-resolve pass) on blur, not per keystroke.
  const [alphaDraftText, setAlphaDraftText] = useState<Record<string, string>>({})
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
  const [editingGroup, setEditingGroup] = useState<{ layer: TokenLayer; group: string; text: string } | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  // The row currently open in the Edit-token dialog — null when closed.
  // Nothing in `working`/`brandWorking` changes until Apply; Cancel just
  // discards this draft (same staged-until-submit pattern as `draft` above).
  const [editDraft, setEditDraft] = useState<EditDraftState | null>(null)
  const [editModeOverride, setEditModeOverride] = useState<'value' | 'reference' | null>(null)
  const [editBrandModeOverride, setEditBrandModeOverride] = useState<Record<string, 'value' | 'reference'>>({})
  // The row staged for deletion in the Delete-token dialog — null when closed.
  // Nothing is removed from `working` until the typed confirmation matches
  // `name` exactly (see confirmDeleteToken).
  const [deleteDraft, setDeleteDraft] = useState<{
    id: string
    name: string
    figmaLinked: boolean
    usageCount: number
  } | null>(null)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [description, setDescription] = useState('')
  const [targetBranch, setTargetBranch] = useState(defaultBranch)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [graphRoot, setGraphRoot] = useState<{ paths: string[]; title: string } | null>(null)
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
  const [brandAlphaDraftText, setBrandAlphaDraftText] = useState<Record<string, string>>({})
  const [brandMalformed, setBrandMalformed] = useState<Set<string>>(new Set())
  // Same explicit-tab-pick tracking as `modeOverride`, for the selected brand's column.
  const [brandModeOverride, setBrandModeOverride] = useState<Map<string, 'value' | 'reference'>>(new Map())
  // Pull (from Figma) — see docs/adr/0002. `pullPlan` is the pending-review
  // snapshot shown in the sidebar's "figma" tab (Apply/Discard gate);
  // nothing in it touches working changes until Apply. `pullConflicts`
  // persists past Apply until each is explicitly resolved, and blocks
  // Submit while any remain. `pulledTokenIds` is provenance (Figma vs.
  // manual), kept outside `working`'s undo history like `pendingBrands`
  // already is.
  const [figmaPullLoading, setFigmaPullLoading] = useState(false)
  const [figmaPullError, setFigmaPullError] = useState<string | null>(null)
  const [pullPlan, setPullPlan] = useState<FigmaPullResult | null>(null)
  const [pullConflicts, setPullConflicts] = useState<ScopedPullConflict[]>([])
  const [pullConflictsDialogOpen, setPullConflictsDialogOpen] = useState(false)
  const [pulledTokenIds, setPulledTokenIds] = useState<Set<string>>(new Set())
  // Which pending creates/updates/deletes the user wants to actually apply —
  // keyed by pullEntryKey(scope, path). Defaults to "everything" on a fresh
  // pull; conflicts/skipped aren't selectable (conflicts always need
  // explicit resolution, skipped can't be applied at all).
  const [pullSelection, setPullSelection] = useState<Set<string>>(new Set())
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
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  // Measured (not assumed) height of the sticky column-header row — the
  // sticky outer/inner group headers stack directly below it, and its
  // rendered height doesn't reliably match its h-12 utility class (table
  // rows only treat `height` as a floor), so a guessed offset leaves a gap
  // showing scrolled-past content underneath.
  const tableHeaderRowRef = useRef<HTMLTableRowElement | null>(null)
  const [tableHeaderHeight, setTableHeaderHeight] = useState(0)

  useEffect(() => {
    if (!pendingResyncRef.current) return
    pendingResyncRef.current = false
    // Resets undo/redo history too — old entries reference synthetic ids
    // and pre-submit paths that no longer make sense against this baseline.
    workingHistory.replace(tokens.map(token => ({ id: token.path.join('.'), token })))
    setMalformed(new Set())
    setNameDraftText({})
    setValueDraftText({})
    setAlphaDraftText({})
    setBrandWorking(
      Object.fromEntries(
        Object.entries(brandTokens).map(([name, list]) => [
          name,
          list.map(token => ({ id: token.path.join('.'), token })),
        ]),
      ),
    )
    setBrandValueDraftText({})
    setBrandAlphaDraftText({})
    setBrandMalformed(new Set())
    // Provenance and any leftover conflicts are meaningless once `working`
    // has been rebased onto a fresh server snapshot post-submit.
    setPulledTokenIds(new Set())
    setPullConflicts([])
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
    const filtered = working.filter(w => matchedTokens.has(w.token))

    // Keep every group's tokens contiguous for display, regardless of where
    // they land in `working` — a newly created token (from the Create dialog,
    // Ctrl+D duplicate, or a token freshly loaded from GitHub) can end up
    // anywhere in the underlying array (e.g. GitHub's JSON stores new object
    // keys in insertion order, appended after existing sibling groups), which
    // would otherwise split its group into two separate header sections.
    // Bucketed once per name-group depth (1..however deep names actually
    // go — see maxDepth below), each pass further subdividing every bucket
    // from the last, so every nesting level stays contiguous for the
    // render loop below.
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
      order.sort((a, b) => a.localeCompare(b))
      return order.map(key => byKey.get(key)!)
    }

    // Layer is the outermost level, ahead of the name-group depths — fixed
    // to LAYERS' order (not alphabetical, unlike the name-based groups) so
    // Global/Alias/Component always appear in that order. Bucketed as many
    // times as the deepest name actually goes (no fixed cap — see the
    // grouping functions above) rather than a fixed depth, so a bucketing
    // pass over already-fully-subdivided buckets (a no-op once every
    // group key comes back '') doesn't run any more than it has to.
    return LAYERS.flatMap(layer => {
      const layerItems = filtered.filter(w => w.token.layer === layer)
      const maxDepth = layerItems.reduce((max, w) => Math.max(max, w.token.name.split('.').length - 1), 0)
      let buckets = [layerItems]
      for (let depth = 1; depth <= maxDepth; depth++) {
        buckets = buckets.flatMap(bucket => bucketBy(bucket, w => groupAtDepth(w.token.name, depth)))
      }
      return buckets.flatMap(bucket =>
        [...bucket].sort((a, b) => leafPathFor(a.token.name).localeCompare(leafPathFor(b.token.name))),
      )
    })
  }, [working, matchedTokens])

  const referenceCounts = useMemo(() => countDirectReferences(working.map(w => w.token)), [working])

  // Every collapsible header's key, at every level — layer plus one per
  // dot-segment but the last — used to gate "collapse all"/"expand all".
  const visibleGroups = useMemo(() => {
    const keys = new Set<string>()
    for (const w of filteredWorking) {
      keys.add(layerKey(w.token.layer))
      const segmentCount = w.token.name.split('.').length
      for (let depth = 1; depth < segmentCount; depth++) {
        keys.add(groupKey(w.token.layer, groupAtDepth(w.token.name, depth)))
      }
    }
    return [...keys]
  }, [filteredWorking])
  const allGroupsCollapsed = visibleGroups.length > 0 && visibleGroups.every(group => collapsedGroups.has(group))

  // Header derivation, layered on top of the bucketing/sorting pass above —
  // kept as its own memo (rather than folded into filteredWorking, or
  // computed inline per row at render time by comparing to the previous
  // row) so each row's header info is a self-contained record a memoized
  // row component can read without needing its neighbor. Only recomputes
  // when the grouping, collapse state, or an in-progress group rename
  // actually changes — never on a search keystroke that doesn't change
  // filteredWorking (under the 3-char threshold, or when the query still
  // matches the same set of tokens).
  const rowEntries = useMemo(() => {
    return filteredWorking.map((item, row) => {
      const { token } = item
      const layer = token.layer
      const previousLayer = row > 0 ? filteredWorking[row - 1].token.layer : null
      const showLayerHeader = layer !== previousLayer
      const isLayerCollapsed = collapsedGroups.has(layerKey(layer))

      const segmentCount = token.name.split('.').length
      const previousName = row > 0 ? filteredWorking[row - 1].token.name : null
      let ancestorCollapsed = isLayerCollapsed
      let anyHeaderShown = showLayerHeader
      const headerNodes: ReactNode[] = []
      if (showLayerHeader) headerNodes.push(renderGroupHeaderRow(layer, '', 0))
      for (let depth = 1; depth < segmentCount; depth++) {
        const depthGroup = groupAtDepth(token.name, depth)
        const previousDepthGroup = previousName ? groupAtDepth(previousName, depth) : null
        const show = depthGroup !== previousDepthGroup || layer !== previousLayer
        if (!ancestorCollapsed && show) {
          headerNodes.push(renderGroupHeaderRow(layer, depthGroup, depth))
          anyHeaderShown = true
        }
        if (collapsedGroups.has(groupKey(layer, depthGroup))) ancestorCollapsed = true
      }

      return {
        id: item.id,
        token,
        row,
        headerNodes,
        hidden: ancestorCollapsed,
        anyHeaderShown,
        // One indent step deeper than whichever header is the row's
        // immediate parent, so the name lines up under that header's own
        // text rather than its chevron. +1 for the layer level every row
        // sits under, on top of one per name-group depth.
        depth: segmentCount,
      }
    })
  }, [filteredWorking, collapsedGroups, editingGroup, tableHeaderHeight])

  const originalById = useMemo(() => new Map(tokens.map(t => [t.path.join('.'), t])), [tokens])

  const referenceOptions = useMemo(() => {
    const paths = working
      .filter(w => w.token.name.trim() !== '')
      .map(w => pathFor(w.token.layer, w.token.name).join('.'))
    return [...new Set(paths)].sort()
  }, [working])

  // Swatch preview for the Reference picker — only color-typed tokens get an entry, so
  // SearchSelect can render a swatch purely by checking whether a path has one.
  const referenceColorByPath = useMemo(() => {
    const map = new Map<string, string>()
    for (const w of working) {
      if (w.token.type !== 'color' || w.token.name.trim() === '') continue
      const hex = getColorHex(w.token.referenceTarget ? w.token.resolvedValue : w.token.rawValue)
      if (hex) map.set(pathFor(w.token.layer, w.token.name).join('.'), hex)
    }
    return map
  }, [working])

  const referenceSearchOptions = useMemo(
    () =>
      referenceOptions.map(option => ({
        value: option,
        label: toSlashPath(option),
        swatch: referenceColorByPath.get(option),
      })),
    [referenceOptions, referenceColorByPath],
  )

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

  // The selected brand's values resolved for display: Base's current (possibly locally-edited)
  // tree with that brand's overrides layered on top, then resolved the same way Base itself is —
  // so a reference chain that passes through an overridden token still resolves correctly. Kept
  // both by path (table display) and by id (Live Preview — brandDiffs entries carry `id`, not a
  // recomputed path, since a brand override never renames anything).
  const { brandResolvedByPath, brandResolvedById } = useMemo(() => {
    if (!selectedBrand) return { brandResolvedByPath: null, brandResolvedById: null }
    const overrides = new Map((brandWorking[selectedBrand] ?? []).map(w => [w.id, w.token]))
    const merged = working.map(w => ({ id: w.id, token: overrides.get(w.id) ?? w.token }))
    const resolved = resolveReferences(merged.map(m => m.token))
    return {
      brandResolvedByPath: new Map(resolved.map(t => [t.path.join('.'), t])),
      brandResolvedById: new Map(merged.map((m, index) => [m.id, resolved[index]])),
    }
  }, [selectedBrand, working, brandWorking])

  // Live Preview sidebar payload — see apps/toky/CONTEXT.md's "Live Preview" entry and ADR-0021.
  // Includes the selected brand's own diff too (not just Base's) — otherwise an in-progress brand
  // edit wouldn't show up in the preview at all until it's actually built into that brand's CSS.
  const previewTokens = useMemo(() => {
    const baseTokens = computePreviewTokens(diff, working)
    if (!selectedBrand || !brandResolvedById) return baseTokens
    const brandPreviewTokens = computeBrandPreviewTokens(brandDiffs[selectedBrand] ?? [], brandResolvedById)
    return [...baseTokens, ...brandPreviewTokens]
  }, [diff, working, selectedBrand, brandDiffs, brandResolvedById])

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

  const pullPlanCounts = pullPlan
    ? [pullPlan.base, ...Object.values(pullPlan.brands)].reduce(
        (totals, plan) => ({
          creates: totals.creates + plan.creates.length,
          updates: totals.updates + plan.updates.length,
          deletes: totals.deletes + plan.deletes.length,
          conflicts: totals.conflicts + plan.conflicts.length,
          skipped: totals.skipped + plan.skipped.length,
        }),
        { creates: 0, updates: 0, deletes: 0, conflicts: 0, skipped: 0 },
      )
    : null
  const pullSelectableCount = pullPlanCounts
    ? pullPlanCounts.creates + pullPlanCounts.updates + pullPlanCounts.deletes
    : 0
  // Nothing happens on Apply only if there's neither a selected change nor a
  // conflict to hand off to the conflicts dialog — conflicts aren't gated by
  // the checkbox selection (see filterPlanBySelection).
  const pullHasNothingToApply = pullSelection.size === 0 && (pullPlanCounts?.conflicts ?? 0) === 0
  // Everything Figma found for this pull, whether or not it's checked —
  // the rail badge should reflect "how much did the pull find," not
  // "how much is currently selected."
  const pullBadgeCount = pullPlanCounts
    ? pullPlanCounts.creates + pullPlanCounts.updates + pullPlanCounts.deletes + pullPlanCounts.conflicts
    : 0

  const sidebarItems: SidebarActivityItem[] = [
    {
      id: 'changes',
      label: 'Staged changes',
      icon: GitBranchIcon,
      badge: diff.length + pendingBrands.length + totalBrandDiffCount,
    },
    { id: 'problems', label: 'Problems', icon: TriangleAlertIcon, badge: problems.length },
    { id: 'brands', label: 'Brands', icon: SwatchBookIcon, badge: selectedBrand?.slice(0, 4) },
    { id: 'figma', label: 'Pull from Figma', icon: FigmaIcon, badge: pullBadgeCount },
    { id: 'preview', label: 'Preview', icon: PREVIEW_TAB_ICON },
  ]

  const sidebarInset = ACTIVITY_BAR_WIDTH + (sidebarCollapsed ? 0 : sidebarWidth)

  // Shared by every `working` mutation that can change what a token resolves to — for itself (a
  // new referenceTarget/rawValue) or for anything downstream that references it — so
  // resolvedValue is recomputed for the whole array, not just the touched token, otherwise cells
  // relying on resolvedValue (e.g. the color swatch) keep showing the value from before the edit.
  function setWorkingResolved(updater: (prev: WorkingToken[]) => WorkingToken[]) {
    setWorking(prev => {
      const updated = updater(prev)
      const resolved = resolveReferences(updated.map(w => w.token))
      return updated.map((w, index) => ({ ...w, token: resolved[index] }))
    })
  }

  function updateToken(id: string, updater: (token: FlatToken) => FlatToken) {
    setWorkingResolved(prev => prev.map(w => (w.id === id ? { ...w, token: updater(w.token) } : w)))
  }

  // Reverts a single staged change back to its pre-edit state — the "discard" X next to a row in
  // the Staged Changes sidebar. A no-op if the entry has no id (only computeDiff-produced entries
  // do) or its original can't be found (shouldn't happen for a live diff entry, but a stale one
  // from a since-refreshed baseline shouldn't crash).
  function discardChange(entry: TokenDiffEntry) {
    const id = entry.id
    if (!id) return

    if (entry.kind === 'create') {
      setWorkingResolved(prev => prev.filter(w => w.id !== id))
      return
    }

    const original = originalById.get(id)
    if (!original) return

    if (entry.kind === 'update') {
      setWorkingResolved(prev => prev.map(w => (w.id === id ? { ...w, token: original } : w)))
    } else {
      // 'delete' — the working row was removed entirely; put it back.
      setWorkingResolved(prev => [...prev, { id, token: original }])
    }
  }

  // Same as discardChange, but against a brand's own sparse override baseline
  // (brandTokens[brand]) instead of Base's `tokens` — see upsertOrRemoveBrandEntry's sparse
  // invariant: a brand 'create' entry means "no prior override" (discard = just remove it, same
  // as discardChange), while 'update'/'delete' need the brand's own original override restored.
  function discardBrandChange(brand: string, entry: TokenDiffEntry) {
    const id = entry.id
    if (!id) return

    if (entry.kind === 'create') {
      setBrandWorking(prev => ({ ...prev, [brand]: (prev[brand] ?? []).filter(w => w.id !== id) }))
      return
    }

    const original = (brandTokens[brand] ?? []).find(w => w.path.join('.') === id)
    if (!original) return

    setBrandWorking(prev => {
      const withoutId = (prev[brand] ?? []).filter(w => w.id !== id)
      return { ...prev, [brand]: [...withoutId, { id, token: original }] }
    })
  }

  // Keystrokes only update the local draft — see commitName, called on blur.
  // '/' (or '.') is allowed here, unlike a plain group rename — the leaf
  // can itself be a multi-segment path once the name goes deeper than the
  // 3-level accordion cap (see leafPathFor), and typing one further only
  // extends the leaf, never reparents into a different group.
  function handleNameInput(id: string, text: string) {
    setNameDraftText(prev => ({ ...prev, [id]: sanitizePathInput(text) }))
  }

  function commitName(id: string) {
    const text = nameDraftText[id]
    if (text === undefined) return // nothing pending — already committed (or reverted)

    const current = working.find(w => w.id === id)
    if (current) {
      const prefix = groupOf(current.token.name)
      const leaf = parseTokenPath(text).join('.')
      const newName = prefix ? `${prefix}.${leaf}` : leaf

      if (newName !== current.token.name) {
        const oldPath = pathFor(current.token.layer, current.token.name).join('.')
        const newPath = pathFor(current.token.layer, newName).join('.')

        // Renaming a token would otherwise silently break every other token that references it by
        // its old path — cascade the rename into their referenceTarget too, in the same update so
        // nothing else re-renders in between with a dangling reference.
        setWorking(prev =>
          prev.map(w => {
            if (w.id === id) return { ...w, token: { ...w.token, name: newName } }
            if (w.token.referenceTarget === oldPath) return { ...w, token: { ...w.token, referenceTarget: newPath } }
            return w
          }),
        )

        // A brand override can reference the renamed Base token too (referenceTarget is a path
        // string, not the stable `id` brand overrides are keyed by) — cascade the same rename
        // into every brand's working copy, the same reason renaming no longer needs to be
        // blocked just because a brand happens to be selected.
        setBrandWorking(prev =>
          Object.fromEntries(
            Object.entries(prev).map(([brand, list]) => [
              brand,
              list.map(w =>
                w.token.referenceTarget === oldPath ? { ...w, token: { ...w.token, referenceTarget: newPath } } : w,
              ),
            ]),
          ),
        )
      }
    }

    setNameDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function nameTextFor(id: string, token: FlatToken): string {
    return nameDraftText[id] ?? leafPathFor(token.name)
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

  // Switching a dimension token's unit Select — a discrete pick, not a stream of keystrokes, so
  // it commits immediately (mirrors onColorPick/onLiteralValueSelect). Reads whatever number is
  // currently live (an in-progress edit in the input takes precedence over the last-committed
  // value, so switching units doesn't discard an unblurred keystroke), converts it to preserve
  // physical size, and commits the whole {value, unit} object directly — bypassing
  // parseEditableValue/commitValueText, since this isn't text entry.
  function commitDimensionUnit(id: string, unit: DimensionValue['unit']) {
    const current = working.find(w => w.id === id)?.token.rawValue
    if (!isDimensionValue(current)) return
    const draftText = valueDraftText[id]
    const draftNumber = draftText !== undefined ? Number(draftText) : NaN
    const value = draftText !== undefined && !Number.isNaN(draftNumber) ? draftNumber : current.value
    const converted = convertDimensionUnit({ value, unit: current.unit }, unit)
    updateToken(id, t => ({ ...t, rawValue: converted, referenceTarget: null }))
    setValueDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  // Shadow bypasses valueDraftText/parseEditableValue entirely — the popup
  // (ShadowEditor) already commits a fully-formed rawValue per field on its
  // own blur/select, mirroring commitDimensionUnit's "discrete action,
  // commit immediately" reasoning above rather than the keystroke-draft
  // path (see docs/plans/shadow-token-type-plan.md §7).
  function commitShadowValue(id: string, rawValue: unknown) {
    updateToken(id, t => ({ ...t, rawValue, referenceTarget: null }))
  }

  // Keystrokes only update the local draft — see commitAlpha, called on
  // blur. Mirrors handleValueInput/commitValue for the same reason: without
  // this, every keystroke in the opacity field would run a full
  // resolveReferences pass over every token.
  function handleAlphaChange(id: string, text: string) {
    setAlphaDraftText(prev => ({ ...prev, [id]: text }))
  }

  function commitAlpha(id: string) {
    const text = alphaDraftText[id]
    if (text === undefined) return // nothing pending — already committed (or reverted)
    const percent = Number(text)
    if (!Number.isNaN(percent)) {
      updateToken(id, t => ({ ...t, rawValue: withAlphaPercent(t.rawValue, percent) }))
    }
    setAlphaDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function commitDraftIfReady() {
    const typedSegments = parseTokenPath(draft.name)
    if (typedSegments.length === 0) return
    const existingPaths = working.filter(w => w.token.layer === draft.layer).map(w => w.token.name.split('.'))
    const name = resolveGroupSegments(typedSegments, existingPaths).join('.')
    const previous = draft.type === 'dimension' ? { value: 0, unit: draft.unit } : undefined
    const parsed = parseEditableValue(draft.type, draft.value, previous)
    if (!parsed.ok) {
      setDraftMalformed(true)
      return
    }
    const rawValue = draft.type === 'color' ? withAlphaPercent(parsed.value, draft.alpha) : parsed.value
    const token: FlatToken = {
      path: [],
      name,
      layer: draft.layer,
      type: draft.type,
      rawValue,
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
      setDraft(emptyDraft())
      setDraftMalformed(false)
      setDraftModeOverride(null)
    }
  }

  // Every currently-visible row's id that falls under a given group header —
  // the roots fed into the group's "show reference graph" button. depth: 0 =
  // layer, 1 = outer group, 2 = inner group.
  function tokenIdsInGroup(layer: TokenLayer, group: string, depth: number): string[] {
    if (depth === 0) return filteredWorking.filter(w => w.token.layer === layer).map(w => w.id)
    return filteredWorking
      .filter(w => w.token.layer === layer && groupAtDepth(w.token.name, depth) === group)
      .map(w => w.id)
  }

  function toggleGroup(key: string) {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function toggleAllGroups() {
    setCollapsedGroups(allGroupsCollapsed ? new Set() : new Set(visibleGroups))
  }

  function startEditingGroup(layer: TokenLayer, group: string) {
    setEditingGroup({ layer, group, text: group.split('.').join('/') })
  }

  function cancelGroupRename() {
    setEditingGroup(null)
  }

  function commitGroupRename() {
    if (!editingGroup) return
    const { layer, group, text } = editingGroup
    const newGroup = parseTokenPath(text).join('.')
    setEditingGroup(null)
    if (!newGroup || newGroup === group) return

    setWorking(prev => {
      // Every token in this group moves at once — track old→new path per
      // token so anything referencing one of them (from inside or outside
      // the group) gets cascaded too, same as a single-token rename. Scoped
      // to `layer` too — otherwise a same-named group in another layer
      // (e.g. "Color" in both Global and Component) would get renamed too.
      // A group is always a dot-prefix of every name under it, at any
      // depth, so this same startsWith test cascades the rename to every
      // descendant regardless of how many more levels it goes.
      const renamed = new Map<string, string>()
      const renamedGroup = prev.map(w => {
        if (w.token.layer !== layer) return w
        const name = w.token.name
        const matches = name === group || name.startsWith(`${group}.`)
        if (!matches) return w
        // Works for both branches: `name` always starts with `group` when
        // matched, so replacing that prefix with `newGroup` and keeping
        // everything after it (the leading '.' included) preserves any
        // depth beyond the renamed group untouched.
        const newName = newGroup + name.slice(group.length)
        renamed.set(pathFor(w.token.layer, name).join('.'), pathFor(w.token.layer, newName).join('.'))
        return { ...w, token: { ...w.token, name: newName } }
      })

      return renamedGroup.map(w => {
        const mapped = w.token.referenceTarget && renamed.get(w.token.referenceTarget)
        return mapped ? { ...w, token: { ...w.token, referenceTarget: mapped } } : w
      })
    })
  }

  function openDeleteDialog(id: string, token: FlatToken) {
    setDeleteDraft({
      id,
      name: toSlashPath(token.name),
      figmaLinked: Boolean(token.figmaId),
      usageCount: referenceCounts.get(token.path.join('.')) ?? 0,
    })
    setDeleteConfirmText('')
  }

  function closeDeleteDialog() {
    setDeleteDraft(null)
    setDeleteConfirmText('')
  }

  function confirmDeleteToken() {
    if (!deleteDraft || deleteDraft.usageCount > 0 || deleteConfirmText !== deleteDraft.name) return
    setWorking(prev => prev.filter(w => w.id !== deleteDraft.id))
    closeDeleteDialog()
  }

  function editMode(): 'value' | 'reference' {
    return editModeOverride ?? (editDraft && editDraft.referenceTarget.trim() !== '' ? 'reference' : 'value')
  }

  function setEditMode(mode: 'value' | 'reference') {
    setEditModeOverride(mode)
  }

  function editBrandMode(brand: string): 'value' | 'reference' {
    const override = editBrandModeOverride[brand]
    if (override) return override
    return editDraft?.brands[brand]?.referenceTarget.trim() ? 'reference' : 'value'
  }

  function setEditBrandMode(brand: string, mode: 'value' | 'reference') {
    setEditBrandModeOverride(prev => ({ ...prev, [brand]: mode }))
  }

  // Opens the Edit-token dialog for `id`, seeding its draft from the current
  // Base value plus every brand's current value (its own override if staged,
  // otherwise Base's — same fallback brandTokenFor already uses for the
  // table's brand column).
  function openEditDialog(id: string) {
    const token = working.find(w => w.id === id)?.token
    if (!token) return
    const brands: Record<string, EditBrandDraft> = {}
    for (const brand of tokenBrands) {
      const brandToken = brandTokenFor(brand, id)
      brands[brand] = {
        value: brandToken ? getEditableValueText(brandToken) : '',
        alpha: alphaPercentFor(brandToken?.rawValue),
        unit: dimensionUnitFor(brandToken?.rawValue),
        referenceTarget: brandToken?.referenceTarget ?? '',
        malformed: false,
      }
    }
    setEditDraft({
      id,
      type: token.type,
      name: toSlashPath(token.name),
      value: getEditableValueText(token),
      alpha: alphaPercentFor(token.rawValue),
      unit: dimensionUnitFor(token.rawValue),
      referenceTarget: token.referenceTarget ?? '',
      malformed: false,
      brands,
    })
    setEditModeOverride(null)
    setEditBrandModeOverride({})
  }

  function closeEditDialog() {
    setEditDraft(null)
    setEditModeOverride(null)
    setEditBrandModeOverride({})
    setOpenPopoverId(null)
  }

  // Resets one brand's draft in the dialog back to whatever Base's draft
  // currently shows — not necessarily brand's *original* value, since Base's
  // own value may have just been edited earlier in this same dialog session.
  function resetEditBrandToBase(brand: string) {
    setEditDraft(prev =>
      prev
        ? {
            ...prev,
            brands: {
              ...prev.brands,
              [brand]: {
                value: prev.value,
                alpha: prev.alpha,
                unit: prev.unit,
                referenceTarget: prev.referenceTarget,
                malformed: false,
              },
            },
          }
        : prev,
    )
    setEditBrandModeOverride(prev => ({ ...prev, [brand]: editMode() }))
  }

  // Commits everything staged in the Edit-token dialog at once: the rename
  // (cascaded into every reference to it, Base and brand alike — same as
  // commitName), Base's value/reference, and each brand's value/reference
  // (via upsertOrRemoveBrandEntry, so a brand edit that now matches Base
  // again cleanly drops back out of that brand's sparse overrides).
  function applyEditDialog() {
    if (!editDraft) return
    const { id, type } = editDraft
    const current = working.find(w => w.id === id)?.token
    if (!current) {
      closeEditDialog()
      return
    }

    const mode = editMode()
    // The dialog shows/edits the name slash-joined (see toSlashPath), but also
    // accepts '.' as a separator — convert back to the dot-joined form
    // everything else (paths, referenceTarget) uses. Group segments are
    // resolved against existing groups the same way a new token's are (see
    // commitDraftIfReady) so retyping a group without its icon still lands
    // in the existing, icon-bearing group instead of splitting off a
    // duplicate.
    const existingPaths = working
      .filter(w => w.id !== id && w.token.layer === current.layer)
      .map(w => w.token.name.split('.'))
    const name = resolveGroupSegments(parseTokenPath(editDraft.name), existingPaths).join('.')

    let parsedValue: unknown = current.rawValue
    // Shadow's value isn't editable from this dialog at all (see
    // renderEditValueEditor's 'shadow' branch) — editDraft.value for a
    // shadow token is only ever the display-only text getEditableValueText
    // falls back to, never something parseEditableValue should write back
    // over the real nested value. Skipping this block leaves parsedValue at
    // current.rawValue, untouched.
    if (mode === 'value' && type !== 'shadow') {
      // For dimension, the dialog's own unit Select (editDraft.unit) is the source of truth, not
      // current.rawValue's unit — the two can disagree if the unit was switched mid-edit without
      // otherwise touching the token yet.
      const previous = type === 'dimension' ? { value: 0, unit: editDraft.unit } : current.rawValue
      const parsed = parseEditableValue(type, editDraft.value, previous)
      if (!parsed.ok) {
        setEditDraft(prev => (prev ? { ...prev, malformed: true } : prev))
        return
      }
      parsedValue = type === 'color' ? withAlphaPercent(parsed.value, editDraft.alpha) : parsed.value
    }

    const brandCandidates: Record<string, FlatToken> = {}
    for (const brand of tokenBrands) {
      const brandDraft = editDraft.brands[brand]
      if (!brandDraft) continue
      const baseForBrand = brandTokenFor(brand, id)
      if (!baseForBrand) continue

      if (editBrandMode(brand) === 'reference') {
        brandCandidates[brand] = { ...baseForBrand, referenceTarget: brandDraft.referenceTarget.trim() || null }
        continue
      }

      // Same reasoning as the base value above — shadow isn't editable here, leave this brand
      // untouched rather than writing back the display-only fallback text.
      if (type === 'shadow') continue

      const brandPrevious = type === 'dimension' ? { value: 0, unit: brandDraft.unit } : baseForBrand.rawValue
      const parsed = parseEditableValue(type, brandDraft.value, brandPrevious)
      if (!parsed.ok) {
        setEditDraft(prev =>
          prev ? { ...prev, brands: { ...prev.brands, [brand]: { ...prev.brands[brand], malformed: true } } } : prev,
        )
        return
      }
      const brandRawValue = type === 'color' ? withAlphaPercent(parsed.value, brandDraft.alpha) : parsed.value
      brandCandidates[brand] = { ...baseForBrand, rawValue: brandRawValue, referenceTarget: null }
    }

    if (name && name !== current.name) {
      const oldPath = pathFor(current.layer, current.name).join('.')
      const newPath = pathFor(current.layer, name).join('.')

      setWorking(prev =>
        prev.map(w => {
          if (w.id === id) return { ...w, token: { ...w.token, name } }
          if (w.token.referenceTarget === oldPath) return { ...w, token: { ...w.token, referenceTarget: newPath } }
          return w
        }),
      )
      setBrandWorking(prev =>
        Object.fromEntries(
          Object.entries(prev).map(([brand, list]) => [
            brand,
            list.map(w =>
              w.token.referenceTarget === oldPath ? { ...w, token: { ...w.token, referenceTarget: newPath } } : w,
            ),
          ]),
        ),
      )
    }

    setWorkingResolved(prev =>
      prev.map(w =>
        w.id === id
          ? {
              ...w,
              token:
                mode === 'value'
                  ? { ...w.token, rawValue: parsedValue, referenceTarget: null }
                  : { ...w.token, referenceTarget: editDraft.referenceTarget.trim() || null },
            }
          : w,
      ),
    )

    for (const [brand, candidate] of Object.entries(brandCandidates)) {
      upsertOrRemoveBrandEntry(brand, id, candidate)
    }

    closeEditDialog()
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
        // A Figma variableId identifies one specific Figma variable — a
        // duplicate is a new token, not that variable's second copy, so it
        // must start unlinked and let a Pull (from Figma) create its own.
        figmaId: null,
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

  // Ctrl/Cmd+F focuses (and selects) the search field, taking over the
  // browser's native find-in-page the same way Ctrl/Cmd+D already takes
  // over its default bookmark shortcut.
  useEffect(() => {
    function handleSearchShortcut(e: globalThis.KeyboardEvent) {
      if (e.key.toLowerCase() !== 'f' || !(e.ctrlKey || e.metaKey)) return
      e.preventDefault()
      searchInputRef.current?.focus()
      searchInputRef.current?.select()
    }
    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [])

  // Keeps tableHeaderHeight in sync with the column header row's actual
  // rendered height (see the ref's declaration) — observed rather than
  // read once, since it can change (e.g. the layer tabs wrapping at a
  // narrow width doesn't affect it, but a future header edit might).
  // Rounded up: getBoundingClientRect can return a fractional height (e.g.
  // at non-100% browser zoom), and rounding down would leave a sub-pixel
  // gap under the header for scrolled-past content to peek through —
  // rounding up instead makes the group header below it start flush or
  // 1px early, which is invisible against its own opaque background.
  useEffect(() => {
    const row = tableHeaderRowRef.current
    if (!row) return
    const observer = new ResizeObserver(([entry]) =>
      setTableHeaderHeight(Math.ceil(entry.target.getBoundingClientRect().height)),
    )
    observer.observe(row)
    return () => observer.disconnect()
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
  const renderPopoverHeader = useCallback(
    (
      tabs: { value: string; label: string }[],
      activeValue: string,
      onValueChange: ((value: string) => void) | null,
      ariaLabel: string,
    ): ReactNode => (
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
    ),
    [],
  )

  // Renders the reference-search body shared by the color popover's "Reference"
  // tab and the plain-value types' reference popover. Picking an item commits
  // it and closes the popover.
  const renderReferenceSearch = useCallback(
    (currentValue: string, onSelect: (value: string) => void, ariaLabel: string): ReactNode => (
      <SearchSelect
        options={referenceSearchOptions}
        currentValue={currentValue}
        onSelect={value => {
          onSelect(value)
          setOpenPopoverId(null)
        }}
        ariaLabel={ariaLabel}
        emptyMessage="No matching tokens."
      />
    ),
    [referenceSearchOptions],
  )

  // Value/reference editor for the Edit-token dialog — one instance for Base,
  // one per brand. Mirrors the same color-picker/reference-search/detach
  // affordances the table cells and the Create dialog already use, just
  // parameterized so it isn't tied to `working`/`brandWorking` directly (the
  // dialog stages everything in `editDraft` until Apply).
  function renderEditValueEditor(opts: {
    popoverKey: string
    type: string
    ariaLabel: string
    mode: 'value' | 'reference'
    value: string
    alpha: number
    unit: DimensionValue['unit']
    referenceTarget: string
    malformed: boolean
    onModeChange: (mode: 'value' | 'reference') => void
    onValueChange: (value: string) => void
    onAlphaChange: (percent: number) => void
    onUnitChange: (unit: DimensionValue['unit']) => void
    onReferenceChange: (value: string) => void
  }): ReactNode {
    const {
      popoverKey,
      type,
      ariaLabel,
      mode,
      value,
      alpha,
      unit,
      referenceTarget,
      malformed,
      onModeChange,
      onValueChange,
      onAlphaChange,
      onUnitChange,
      onReferenceChange,
    } = opts
    const hex = type === 'color' && /^#[0-9a-fA-F]{6}$/.test(value) ? value : null

    if (type === 'color') {
      return (
        <Popover open={openPopoverId === popoverKey} onOpenChange={open => setOpenPopoverId(open ? popoverKey : null)}>
          <PopoverTrigger
            render={
              <button
                type="button"
                aria-label={ariaLabel}
                className="flex h-8 w-full items-center gap-2 rounded-lg border border-input bg-transparent px-2 text-sm outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring"
              />
            }
          >
            {renderColorSwatch(hex, alpha)}
            <span className="truncate">{referenceTarget || hex || '—'}</span>
          </PopoverTrigger>
          <PopoverContent className="w-128">
            {renderPopoverHeader(
              [
                { value: 'value', label: 'Color' },
                { value: 'reference', label: 'Reference' },
              ],
              mode,
              value => onModeChange(value as 'value' | 'reference'),
              ariaLabel,
            )}
            {mode === 'value' ? (
              <div className="space-y-2">
                <input
                  type="color"
                  aria-label={`Pick color — ${ariaLabel}`}
                  className="h-9 w-full cursor-pointer rounded-md border"
                  value={hex ?? '#000000'}
                  onChange={e => onValueChange(e.target.value)}
                />
                <div className="flex gap-2">
                  <div className="basis-2/3 space-y-1">
                    <Label htmlFor={`${popoverKey}-hex`} className="text-xs text-muted-foreground">
                      Hex
                    </Label>
                    <Input
                      id={`${popoverKey}-hex`}
                      aria-label={ariaLabel}
                      placeholder="#RRGGBB"
                      value={value}
                      onChange={e => onValueChange(e.target.value)}
                    />
                  </div>
                  <div className="basis-1/3 space-y-1">
                    <Label htmlFor={`${popoverKey}-opacity`} className="text-xs text-muted-foreground">
                      Opacity
                    </Label>
                    <div className="relative">
                      <Input
                        id={`${popoverKey}-opacity`}
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        aria-label={`Opacity — ${ariaLabel}`}
                        value={alpha}
                        onChange={e => onAlphaChange(Number(e.target.value))}
                        className="pr-6"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-muted-foreground"
                      >
                        %
                      </span>
                    </div>
                  </div>
                </div>
                {malformed && (
                  <Alert variant="destructive">
                    <AlertDescription>Invalid JSON for a color value.</AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              renderReferenceSearch(referenceTarget, onReferenceChange, ariaLabel)
            )}
          </PopoverContent>
        </Popover>
      )
    }

    if (mode === 'reference') {
      return (
        <div className="flex items-center gap-1.5">
          <div className="flex h-8 flex-1 items-center gap-1.5 overflow-hidden rounded-lg border border-input px-2.5 text-sm text-muted-foreground">
            <Link2Icon className="size-3.5 shrink-0" />
            <span className="truncate">{referenceTarget}</span>
          </div>
          <Popover
            open={openPopoverId === popoverKey}
            onOpenChange={open => setOpenPopoverId(open ? popoverKey : null)}
          >
            <PopoverTrigger
              render={<Button type="button" variant="outline" size="icon-sm" aria-label={`Reference — ${ariaLabel}`} />}
            >
              <HexagonIcon className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-128">
              {renderPopoverHeader([{ value: 'reference', label: 'Reference' }], 'reference', null, ariaLabel)}
              {renderReferenceSearch(referenceTarget, onReferenceChange, ariaLabel)}
            </PopoverContent>
          </Popover>
          {renderDetachButton(`Detach — ${ariaLabel}`, () => {
            onReferenceChange('')
            onModeChange('value')
          })}
        </div>
      )
    }

    if (type === 'fontWeight') {
      return (
        <div className="flex items-center gap-1.5">
          <Select value={value} onValueChange={next => next !== null && onValueChange(next)}>
            <SelectTrigger aria-label={ariaLabel} aria-invalid={malformed} className="h-8 w-full">
              <SelectValue placeholder="Select a weight" />
            </SelectTrigger>
            <SelectContent>
              {FONT_WEIGHT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover
            open={openPopoverId === popoverKey}
            onOpenChange={open => setOpenPopoverId(open ? popoverKey : null)}
          >
            <PopoverTrigger
              render={<Button type="button" variant="outline" size="icon-sm" aria-label={`Reference — ${ariaLabel}`} />}
            >
              <HexagonIcon className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-128">
              {renderPopoverHeader([{ value: 'reference', label: 'Reference' }], 'reference', null, ariaLabel)}
              {renderReferenceSearch(referenceTarget, onReferenceChange, ariaLabel)}
            </PopoverContent>
          </Popover>
        </div>
      )
    }

    if (type === 'dimension') {
      return (
        <div className="flex items-center gap-1.5">
          <Input
            aria-label={ariaLabel}
            aria-invalid={malformed}
            placeholder="value…"
            value={value}
            onChange={e => onValueChange(e.target.value)}
          />
          <Select
            value={unit}
            onValueChange={newUnit => {
              if (newUnit !== 'px' && newUnit !== 'rem') return
              const n = Number(value)
              if (Number.isNaN(n)) {
                onUnitChange(newUnit)
                return
              }
              const converted = convertDimensionUnit({ value: n, unit }, newUnit)
              onValueChange(String(converted.value))
              onUnitChange(converted.unit)
            }}
          >
            <SelectTrigger aria-label={`Unit — ${ariaLabel}`} className="h-8 w-18 shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIMENSION_UNIT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover
            open={openPopoverId === popoverKey}
            onOpenChange={open => setOpenPopoverId(open ? popoverKey : null)}
          >
            <PopoverTrigger
              render={<Button type="button" variant="outline" size="icon-sm" aria-label={`Reference — ${ariaLabel}`} />}
            >
              <HexagonIcon className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-128">
              {renderPopoverHeader([{ value: 'reference', label: 'Reference' }], 'reference', null, ariaLabel)}
              {renderReferenceSearch(referenceTarget, onReferenceChange, ariaLabel)}
            </PopoverContent>
          </Popover>
        </div>
      )
    }

    if (type === 'shadow') {
      // A shadow's value is nested (layers of X/Y/blur/spread/color) and has no plain-text
      // representation worth round-tripping through this dialog's flat editDraft.value string —
      // its dedicated editor only exists on the table's own Value cell (see the ShadowEditor
      // popup rendered there). applyEditDialog knows to leave the value untouched when type is
      // 'shadow', so this is purely informational, not a dead-end.
      return <p className="text-sm text-muted-foreground">Edit this shadow from its Value cell in the table.</p>
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Input
            aria-label={ariaLabel}
            aria-invalid={malformed}
            placeholder="value…"
            value={value}
            onChange={e => onValueChange(e.target.value)}
          />
          <Popover
            open={openPopoverId === popoverKey}
            onOpenChange={open => setOpenPopoverId(open ? popoverKey : null)}
          >
            <PopoverTrigger
              render={<Button type="button" variant="outline" size="icon-sm" aria-label={`Reference — ${ariaLabel}`} />}
            >
              <HexagonIcon className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-128">
              {renderPopoverHeader([{ value: 'reference', label: 'Reference' }], 'reference', null, ariaLabel)}
              {renderReferenceSearch(referenceTarget, onReferenceChange, ariaLabel)}
            </PopoverContent>
          </Popover>
        </div>
        {malformed && (
          <Alert variant="destructive">
            <AlertDescription>Invalid value for this type.</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  // A collapsible group header row, shared by all three nesting levels —
  // the layer itself (depth 0), the outer (component/subject) group within
  // it (depth 1), and the existing inner subgroup within that (depth 2) —
  // indented one step further per depth. `group` is the dotted name-based
  // group path and is unused/empty at depth 0, where the layer's own name
  // is the label instead.
  function renderGroupHeaderRow(layer: TokenLayer, group: string, depth: number): ReactNode {
    const key = depth === 0 ? layerKey(layer) : groupKey(layer, group)
    const isCollapsed = collapsedGroups.has(key)
    const segments = depth === 0 ? [layer] : group.split('.')
    const lastSegment = depth === 0 ? `${LAYER_EMOJI[layer]} ${layer}` : segments[segments.length - 1]
    // Every level's immediate parent header (directly above it) already
    // shows the rest of the chain, so each level only ever needs its own
    // last segment — no leading label repeating what's already visible
    // one row up, no matter how deep the nesting goes.
    // Text shrinks one step per depth — 16px/14px, then 12px from depth 2
    // on — even though every level shares the same 32px row height (see
    // HEADER_ROW_HEIGHT).
    const textSizeClass = depth === 0 ? 'text-base' : depth === 1 ? 'text-sm' : 'text-xs'
    const isEditing = depth !== 0 && editingGroup?.layer === layer && editingGroup?.group === group
    return (
      // sticky (and its bg/top) live on the row, not the cell — a sticky
      // *cell* stays pinned visually, but the <tr> around it doesn't move
      // with it, so a border on the row would keep rendering at its
      // static, unstuck position and scroll away instead of following the
      // cell. Putting sticky on the <tr> itself fixes that half of it.
      // The other half: TableRow's own border-b is a real `border`, and
      // real borders on sticky elements are notoriously unreliable —
      // adjacent content (or, here, the next stuck header stacked right
      // below it) can clip/cover them during scroll. box-shadow instead
      // sidesteps that: it isn't part of border-collapse/box layout, just
      // paint. Only on the *top* edge, and only here — not on the column
      // header, not as a bottom-edge shadow too: this row always paints
      // after (i.e. "in front of") whatever's directly above it (thead,
      // or the header/data row one level up), so its own top edge is the
      // one guaranteed-visible place to draw this boundary. Uses
      // --border-solid, not --border — table row/cell painting doesn't
      // reliably follow simple "later DOM wins" stacking, so two of these
      // shadows can still end up painted on the very same pixel; --border
      // itself is semi-transparent (see globals.css), so if that happens
      // the two translucent lines alpha-composite into a visibly brighter
      // one, which --border-solid (an opaque, pre-flattened equivalent)
      // can't. The boundary between the last header in a stack and the
      // first real data row below it gets a plain border-t there instead
      // (see the render loop), which doesn't have this problem since it's
      // not sticky-stacked.
      <TableRow
        key={key}
        className={cn(
          'sticky z-10 border-b-0 shadow-[0_-1px_0_0_var(--border-solid)]',
          depth === 0
            ? LAYER_BG_TINT[layer]
            : 'bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)] hover:bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)]',
        )}
        style={{ top: tableHeaderHeight + depth * HEADER_ROW_HEIGHT }}
      >
        <TableCell
          colSpan={4}
          className={cn('p-0 font-medium text-muted-foreground', textSizeClass)}
          style={{ paddingLeft: depth * 16 }}
        >
          {isEditing ? (
            <Input
              autoFocus
              aria-label={`Rename group ${segments.join('/')}`}
              value={editingGroup.text}
              onChange={e => setEditingGroup({ layer, group, text: sanitizePathInput(e.target.value) })}
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
                'h-8 max-h-8 rounded-none border-transparent bg-transparent px-2 font-medium text-foreground focus-visible:ring-0',
                textSizeClass,
              )}
            />
          ) : (
            <div className="flex h-8 max-h-8 items-center">
              <button
                type="button"
                onClick={() => toggleGroup(key)}
                aria-expanded={!isCollapsed}
                className="flex flex-1 items-center gap-1.5 rounded-md px-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn('size-3.5 shrink-0 transition-transform', isCollapsed && '-rotate-90')}
                />
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
                    onClick={() =>
                      setGraphRoot({ paths: tokenIdsInGroup(layer, group, depth), title: segments.join('/') })
                    }
                  >
                    <NetworkIcon />
                    Show reference graph
                  </DropdownMenuItem>
                  {depth !== 0 && (
                    <DropdownMenuItem onClick={() => startEditingGroup(layer, group)}>
                      <PencilIcon />
                      Rename
                    </DropdownMenuItem>
                  )}
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

  function alphaTextFor(id: string, token: FlatToken): string {
    return alphaDraftText[id] ?? String(alphaPercentFor(token.rawValue))
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

  // Brand-scoped mirror of commitDimensionUnit — see its comment for why this
  // commits immediately and bypasses parseEditableValue.
  function commitBrandDimensionUnit(brand: string, id: string, unit: DimensionValue['unit']) {
    const current = brandTokenFor(brand, id)
    if (!current || !isDimensionValue(current.rawValue)) return
    const draftText = brandValueDraftText[id]
    const draftNumber = draftText !== undefined ? Number(draftText) : NaN
    const value = draftText !== undefined && !Number.isNaN(draftNumber) ? draftNumber : current.rawValue.value
    const converted = convertDimensionUnit({ value, unit: current.rawValue.unit }, unit)
    upsertOrRemoveBrandEntry(brand, id, { ...current, rawValue: converted, referenceTarget: null })
    setBrandValueDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  // Brand-scoped mirror of commitShadowValue — see its comment.
  function commitBrandShadowValue(brand: string, id: string, rawValue: unknown) {
    const current = brandTokenFor(brand, id)
    if (!current) return
    upsertOrRemoveBrandEntry(brand, id, { ...current, rawValue, referenceTarget: null })
  }

  function handleBrandAlphaChange(_brand: string, id: string, text: string) {
    setBrandAlphaDraftText(prev => ({ ...prev, [id]: text }))
  }

  function commitBrandAlpha(brand: string, id: string) {
    const text = brandAlphaDraftText[id]
    if (text === undefined) return
    const percent = Number(text)
    const current = brandTokenFor(brand, id)
    if (current && !Number.isNaN(percent)) {
      upsertOrRemoveBrandEntry(brand, id, { ...current, rawValue: withAlphaPercent(current.rawValue, percent) })
    }
    setBrandAlphaDraftText(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
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

  function brandAlphaTextFor(brand: string, id: string): string {
    if (brandAlphaDraftText[id] !== undefined) return brandAlphaDraftText[id]
    const token = brandTokenFor(brand, id)
    return String(alphaPercentFor(token?.rawValue))
  }

  function setRowPopoverOpen(id: string, open: boolean) {
    setOpenPopoverId(open ? id : null)
  }
  function setRowCodeUsageOpen(id: string, open: boolean) {
    setOpenCodeUsageId(open ? id : null)
  }
  function showReferenceGraph(id: string, title: string) {
    setGraphRoot({ paths: [id], title })
  }

  // Every callback/render-helper a table row needs, bundled behind one
  // object so TokenRow can take it as a single prop. None of the individual
  // functions above are themselves referentially stable (they're plain
  // closures, recreated every render) — so instead of rebuilding this
  // object every render (which would bust TokenRow's memoization on every
  // keystroke), the *same* object is mutated in place. Its identity never
  // changes; only its fields are refreshed each render to point at the
  // current closures, so every row always calls into current state despite
  // the bundle prop never looking "different" to React.memo.
  const rowHandlersRef = useRef<TokenRowHandlers | null>(null)
  // Created once (mount) and never replaced — only its fields are
  // overwritten below, every render, so the object's own identity is
  // permanently stable for the lifetime of this component.
  if (!rowHandlersRef.current) rowHandlersRef.current = {} as TokenRowHandlers
  Object.assign(rowHandlersRef.current, {
    onNameChange: handleNameInput,
    onNameBlur: commitName,
    onCellKeyDown: handleCellKeyDown,
    onValueChange: handleValueInput,
    onValueBlur: commitValue,
    onColorPick: commitValueText,
    onLiteralValueSelect: commitValueText,
    onDimensionUnitChange: commitDimensionUnit,
    onShadowChange: commitShadowValue,
    onAlphaChange: handleAlphaChange,
    onAlphaBlur: commitAlpha,
    onReferenceChange: handleReferenceChange,
    onSetMode: setRowMode,
    onPopoverOpenChange: setRowPopoverOpen,
    onCodeUsageOpenChange: setRowCodeUsageOpen,
    onShowGraph: showReferenceGraph,
    onEdit: openEditDialog,
    onDuplicate: duplicateRow,
    onDelete: openDeleteDialog,
    onBrandValueChange: handleBrandValueInput,
    onBrandValueBlur: commitBrandValue,
    onBrandColorPick: commitBrandValueText,
    onBrandDimensionUnitChange: commitBrandDimensionUnit,
    onBrandShadowChange: commitBrandShadowValue,
    onBrandAlphaChange: handleBrandAlphaChange,
    onBrandAlphaBlur: commitBrandAlpha,
    onBrandReferenceChange: handleBrandReferenceChange,
    onSetBrandMode: setBrandRowMode,
    renderPopoverHeader,
    renderReferenceSearch,
  } satisfies TokenRowHandlers)
  const rowHandlers = rowHandlersRef.current

  function stageBrand(name: string) {
    setPendingBrands(prev => (prev.includes(name) ? prev : [...prev, name]))
  }

  function unstageBrand(name: string) {
    setPendingBrands(prev => prev.filter(brand => brand !== name))
  }

  function flatTokenFromPulledEntry(entry: PulledEntry): FlatToken {
    return {
      path: entry.path,
      name: entry.path.slice(1).join('.'),
      layer: entry.layer,
      type: entry.type,
      rawValue: entry.rawValue,
      referenceTarget: entry.referenceTarget,
      resolvedValue: undefined,
      resolutionError: null,
      figmaId: entry.figmaId,
    }
  }

  function togglePullSelection(key: string) {
    setPullSelection(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function selectAllPullEntries() {
    if (pullPlan) setPullSelection(allPullEntryKeys(pullPlan))
  }

  function selectNoPullEntries() {
    setPullSelection(new Set())
  }

  async function handlePullFromFigma() {
    setFigmaPullLoading(true)
    setFigmaPullError(null)
    try {
      const response = await fetch('/api/figma-pull')
      const json = await response.json()
      if (!response.ok) {
        setFigmaPullError(json.error ?? 'Failed to read Figma variables.')
        return
      }
      const plan = buildFigmaPullPlan({
        original: tokens,
        working,
        // Only real (already-synced) brands have a Figma mode to read from —
        // a not-yet-created pendingBrands entry has no mode yet.
        brandNames: tokenBrands,
        brandOriginal: brandTokens,
        brandWorking,
        figmaMeta: json,
      })
      setPullPlan(plan)
      setPullSelection(allPullEntryKeys(plan))
    } catch (err) {
      setFigmaPullError(err instanceof Error ? err.message : 'Network error.')
    } finally {
      setFigmaPullLoading(false)
    }
  }

  // One setWorking call = one atomic undo step, regardless of how many
  // tokens the pull touched (use-undoable-state.ts).
  function applyBasePlan(plan: PullPlan): Set<string> {
    const { creates, updates, deletes } = plan
    const touchedIds = new Set<string>()
    if (creates.length + updates.length + deletes.length === 0) return touchedIds

    const deleteIds = new Set(deletes.map(e => e.path.join('.')))
    const updateById = new Map(updates.map(e => [e.path.join('.'), e]))
    for (const id of deleteIds) touchedIds.add(id)
    for (const id of updateById.keys()) touchedIds.add(id)
    for (const entry of creates) touchedIds.add(entry.path.join('.'))

    setWorking(prev => {
      const next = prev
        .filter(w => !deleteIds.has(w.id))
        .map(w => {
          const update = updateById.get(w.id)
          return update ? { ...w, token: flatTokenFromPulledEntry(update) } : w
        })
      for (const entry of creates) {
        const token = flatTokenFromPulledEntry(entry)
        next.push({ id: token.path.join('.'), token })
      }
      return next
    })

    return touchedIds
  }

  // Brand overrides aren't part of `working`'s undo history (matching how
  // manual brand edits already behave) — a delete here means "no override",
  // reverting the brand to inheriting Base, same invariant
  // upsertOrRemoveBrandEntry already enforces for manual brand edits.
  function applyBrandPlan(brand: string, plan: PullPlan): Set<string> {
    const { creates, updates, deletes } = plan
    const touchedIds = new Set<string>()
    if (creates.length + updates.length + deletes.length === 0) return touchedIds

    const upserts = [...creates, ...updates]
    const deleteIds = new Set(deletes.map(e => e.path.join('.')))
    for (const id of deleteIds) touchedIds.add(id)
    for (const entry of upserts) touchedIds.add(entry.path.join('.'))

    setBrandWorking(prev => {
      const list = prev[brand] ?? []
      const byId = new Map(list.map(w => [w.id, w]))
      for (const entry of upserts) {
        const token = flatTokenFromPulledEntry(entry)
        const id = token.path.join('.')
        byId.set(id, { id, token })
      }
      for (const id of deleteIds) byId.delete(id)
      return { ...prev, [brand]: [...byId.values()] }
    })

    return touchedIds
  }

  function handleApplyPull() {
    if (!pullPlan) return
    const touched = applyBasePlan(filterPlanBySelection('base', pullPlan.base, pullSelection))
    for (const [brand, plan] of Object.entries(pullPlan.brands)) {
      for (const id of applyBrandPlan(brand, filterPlanBySelection(brand, plan, pullSelection))) touched.add(id)
    }
    setPulledTokenIds(prev => new Set([...prev, ...touched]))

    // Conflicts always need explicit resolution regardless of the checkbox
    // selection above (there's nothing to "apply" for one yet — that's what
    // the conflicts dialog is for).
    const allConflicts: ScopedPullConflict[] = [
      ...pullPlan.base.conflicts.map(conflict => ({ scope: 'base' as const, conflict })),
      ...Object.entries(pullPlan.brands).flatMap(([brand, plan]) =>
        plan.conflicts.map(conflict => ({ scope: brand, conflict })),
      ),
    ]
    if (allConflicts.length > 0) {
      setPullConflicts(prev => [...prev, ...allConflicts])
    }

    setPullPlan(null)
    setPullSelection(new Set())
  }

  function handleCancelPull() {
    setPullPlan(null)
    setPullSelection(new Set())
  }

  function resolveConflictKeepWorking(index: number) {
    setPullConflicts(prev => prev.filter((_, i) => i !== index))
  }

  function resolveConflictUseFigma(index: number) {
    const entry = pullConflicts[index]
    if (!entry) return
    const { scope, conflict } = entry
    const nextToken = (token: FlatToken): FlatToken => ({
      ...token,
      type: conflict.figma.type,
      rawValue: conflict.figma.rawValue,
      referenceTarget: conflict.figma.referenceTarget,
    })

    if (scope === 'base') {
      setWorking(prev => prev.map(w => (w.id === conflict.tokenId ? { ...w, token: nextToken(w.token) } : w)))
    } else {
      setBrandWorking(prev => {
        const list = prev[scope] ?? []
        return {
          ...prev,
          [scope]: list.map(w => (w.id === conflict.tokenId ? { ...w, token: nextToken(w.token) } : w)),
        }
      })
    }
    setPulledTokenIds(prev => new Set(prev).add(conflict.path.join('.')))
    setPullConflicts(prev => prev.filter((_, i) => i !== index))
  }

  function beforeForBase(path: string[]): FlatToken | undefined {
    return working.find(w => w.id === path.join('.'))?.token
  }

  function beforeForBrand(brand: string): (path: string[]) => FlatToken | undefined {
    return path => {
      const id = path.join('.')
      // A brand override's "before" is its own working entry if it has one,
      // otherwise the value it currently inherits from Base.
      return (brandWorking[brand] ?? []).find(w => w.id === id)?.token ?? working.find(w => w.id === id)?.token
    }
  }

  async function handleSubmit() {
    setSubmitState('submitting')
    setSubmitMessage(null)
    try {
      const response = await fetch('/api/propose-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diff,
          description,
          targetBranch,
          newBrands: pendingBrands,
          brandDiffs,
          pulledPaths: [...pulledTokenIds],
        }),
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
    pullConflicts.length === 0 &&
    targetBranch.trim() !== '' &&
    submitState !== 'submitting'

  const draftHex = /^#[0-9a-fA-F]{6}$/.test(draft.value) ? draft.value : null

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="shrink-0 bg-background p-4" style={{ marginLeft: sidebarInset }}>
        <div className="flex h-14 items-center justify-start gap-4 rounded-[10px] border border-[color-mix(in_oklch,var(--border),var(--foreground)_20%)] px-4">
          <div className="flex items-center gap-2">
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

            <div className="relative w-96">
              <Label htmlFor="token-search" className="sr-only">
                Search tokens by name
              </Label>
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                ref={searchInputRef}
                id="token-search"
                type="search"
                placeholder="Search token…"
                className="h-8 pr-14 pl-8"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setSearchText('')
                  }
                }}
              />
              {!searchText && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1"
                >
                  <kbd className="rounded border border-input px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground">
                    Ctrl
                  </kbd>
                  <kbd className="rounded border border-input px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground">
                    F
                  </kbd>
                </div>
              )}
            </div>

            {pullConflicts.length > 0 && (
              <Button type="button" variant="destructive" onClick={() => setPullConflictsDialogOpen(true)}>
                <TriangleAlertIcon />
                {pullConflicts.length} Figma conflict{pullConflicts.length === 1 ? '' : 's'}
              </Button>
            )}

            <Button
              type="button"
              onClick={() => {
                setDraft(emptyDraft())
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
              {filteredWorking.length} token{filteredWorking.length === 1 ? '' : 's'}
            </TableCaption>
            <TableHeader>
              <TableRow ref={tableHeaderRowRef} className="h-8 max-h-8">
                <TableHead
                  scope="col"
                  className="sticky top-0 z-20 rounded-tl-[10px] bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)] py-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    Name
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled={visibleGroups.length === 0}
                            onClick={toggleAllGroups}
                            aria-label={allGroupsCollapsed ? 'Expand all' : 'Collapse all'}
                          />
                        }
                      >
                        {allGroupsCollapsed ? <ChevronsUpDownIcon /> : <ChevronsDownUpIcon />}
                      </TooltipTrigger>
                      <TooltipContent>{allGroupsCollapsed ? 'Expand all' : 'Collapse all'}</TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead
                  scope="col"
                  className="sticky top-0 z-20 bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)] py-0"
                >
                  Base
                </TableHead>
                {selectedBrand && (
                  <TableHead
                    scope="col"
                    className="sticky top-0 z-20 bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)] py-0"
                  >
                    {selectedBrand}
                  </TableHead>
                )}
                {!selectedBrand && (
                  <TableHead
                    scope="col"
                    className="sticky top-0 z-20 bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)] py-0"
                  >
                    Used
                  </TableHead>
                )}
                <TableHead
                  scope="col"
                  className="sticky top-0 z-20 w-9 rounded-tr-[10px] bg-[color-mix(in_oklch,var(--background),var(--muted)_50%)] p-1"
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowEntries.map(entry => {
                const { id, token, row, headerNodes, hidden, anyHeaderShown, depth } = entry
                const hex =
                  token.type === 'color'
                    ? getColorHex(token.referenceTarget ? token.resolvedValue : token.rawValue)
                    : null
                const swatchAlphaPercent =
                  token.type === 'color'
                    ? alphaPercentFor(token.referenceTarget ? token.resolvedValue : token.rawValue)
                    : null
                const cellErrors = errorsById.get(id) ?? EMPTY_ERRORS
                const isMalformed = malformed.has(id)
                const changeStatus = describeChangeStatus(originalById.get(id), token)
                const usageCount = referenceCounts.get(token.path.join('.')) ?? 0

                let brandInfo: TokenRowBrandInfo | null = null
                if (selectedBrand) {
                  const brandToken = brandTokenFor(selectedBrand, id)
                  if (brandToken) {
                    const brandResolved = brandResolvedByPath?.get(id)
                    const brandHex =
                      brandToken.type === 'color'
                        ? getColorHex(brandToken.referenceTarget ? brandResolved?.resolvedValue : brandToken.rawValue)
                        : null
                    const brandSwatchAlphaPercent =
                      brandToken.type === 'color'
                        ? alphaPercentFor(
                            brandToken.referenceTarget ? brandResolved?.resolvedValue : brandToken.rawValue,
                          )
                        : null
                    brandInfo = {
                      brand: selectedBrand,
                      token: brandToken,
                      hex: brandHex,
                      mode: brandModeFor(selectedBrand, id),
                      valueText: brandValueTextFor(selectedBrand, id),
                      alphaText: brandAlphaTextFor(selectedBrand, id),
                      swatchAlphaPercent: brandSwatchAlphaPercent,
                      isOverridden: (brandWorking[selectedBrand] ?? []).some(w => w.id === id),
                      isMalformed: brandMalformed.has(id),
                      isPopoverOpen: openPopoverId === `brand:${id}`,
                    }
                  }
                }

                return (
                  <TokenRow
                    key={id}
                    id={id}
                    token={token}
                    row={row}
                    headerNodes={headerNodes}
                    hidden={hidden}
                    anyHeaderShown={anyHeaderShown}
                    depth={depth}
                    hex={hex}
                    cellErrors={cellErrors}
                    isMalformed={isMalformed}
                    changeStatus={changeStatus}
                    nameText={nameTextFor(id, token)}
                    valueText={valueTextFor(id, token)}
                    alphaText={alphaTextFor(id, token)}
                    swatchAlphaPercent={swatchAlphaPercent}
                    mode={modeFor(id, token)}
                    isPopoverOpen={openPopoverId === id}
                    isCodeUsageOpen={openCodeUsageId === id}
                    usageCount={usageCount}
                    brandInfo={brandInfo}
                    cellRefs={cellRefs}
                    focusSnapshot={focusSnapshot}
                    handlers={rowHandlers}
                  />
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
                  onChange={e => setDraft(prev => ({ ...prev, name: sanitizePathInput(e.target.value) }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-token-type">Type</Label>
                <Select
                  value={draft.type}
                  onValueChange={value =>
                    setDraft(prev => {
                      const type = value ?? prev.type
                      // Switching to Color starts from white/opaque rather than
                      // an empty swatch — matches what a fresh color token
                      // should default to, and avoids the picker defaulting to
                      // black just because '#000000' happens to be its native
                      // fallback.
                      const shouldDefaultColor = type === 'color' && prev.value.trim() === ''
                      return { ...prev, type, value: shouldDefaultColor ? '#FFFFFF' : prev.value }
                    })
                  }
                >
                  <SelectTrigger id="new-token-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">string</SelectItem>
                    <SelectItem value="number">number</SelectItem>
                    <SelectItem value="color">color</SelectItem>
                    <SelectItem value="fontWeight">fontWeight</SelectItem>
                    <SelectItem value="fontFamily">fontFamily</SelectItem>
                    <SelectItem value="dimension">dimension</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Value</Label>

                {draft.type === 'fontWeight' ? (
                  <Select
                    value={draft.value}
                    onValueChange={value => value !== null && setDraft(prev => ({ ...prev, value }))}
                  >
                    <SelectTrigger id="new-token-value" aria-label="Value for new token" className="h-8 w-full">
                      <SelectValue placeholder="Select a weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_WEIGHT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={String(option.value)}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : draft.type === 'dimension' ? (
                  <div className="flex items-center gap-1.5">
                    <Input
                      aria-label="Value for new token"
                      placeholder="value…"
                      value={draft.value}
                      onChange={e => {
                        setDraft(prev => ({ ...prev, value: e.target.value }))
                        setDraftMalformed(false)
                      }}
                    />
                    <Select
                      value={draft.unit}
                      onValueChange={unit => {
                        if (unit !== 'px' && unit !== 'rem') return
                        setDraft(prev => {
                          const n = Number(prev.value)
                          if (Number.isNaN(n)) return { ...prev, unit }
                          const converted = convertDimensionUnit({ value: n, unit: prev.unit }, unit)
                          return { ...prev, value: String(converted.value), unit: converted.unit }
                        })
                      }}
                    >
                      <SelectTrigger aria-label="Unit for new token" className="h-8 w-18 shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSION_UNIT_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : draft.type === 'color' ? (
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
                      {renderColorSwatch(draftHex, draft.alpha)}
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
                          <div className="flex gap-2">
                            <div className="basis-2/3 space-y-1">
                              <Label htmlFor="draft-hex" className="text-xs text-muted-foreground">
                                Hex
                              </Label>
                              <Input
                                id="draft-hex"
                                aria-label="Value for new token"
                                placeholder="#RRGGBB"
                                value={draft.value}
                                onChange={e => {
                                  setDraft(prev => ({ ...prev, value: e.target.value }))
                                  setDraftMalformed(false)
                                }}
                              />
                            </div>
                            <div className="basis-1/3 space-y-1">
                              <Label htmlFor="draft-opacity" className="text-xs text-muted-foreground">
                                Opacity
                              </Label>
                              <div className="relative">
                                <Input
                                  id="draft-opacity"
                                  type="number"
                                  min={0}
                                  max={100}
                                  step={1}
                                  aria-label="Opacity for new token"
                                  value={draft.alpha}
                                  onChange={e => setDraft(prev => ({ ...prev, alpha: Number(e.target.value) }))}
                                  className="pr-6"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-muted-foreground"
                                >
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
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

        <Dialog open={editDraft !== null} onOpenChange={open => !open && closeEditDialog()}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
            {editDraft &&
              (() => {
                const originalToken = working.find(w => w.id === editDraft.id)?.token
                const tokenPath = originalToken?.path.join('.') ?? editDraft.id
                const usageCount = referenceCounts.get(tokenPath) ?? 0
                const codeUsage = CODE_USAGE[tokenPath]

                return (
                  <>
                    <DialogHeader>
                      <DialogTitle>Edit token</DialogTitle>
                      <DialogDescription>
                        Nothing happens until you apply, then submit and it&apos;s reviewed and merged.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="edit-token-name">Full name</Label>
                        <Input
                          id="edit-token-name"
                          value={editDraft.name}
                          onChange={e =>
                            setEditDraft(prev => (prev ? { ...prev, name: sanitizePathInput(e.target.value) } : prev))
                          }
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label>Base value</Label>
                        {renderEditValueEditor({
                          popoverKey: 'edit:base',
                          type: editDraft.type,
                          ariaLabel: 'Base value',
                          mode: editMode(),
                          value: editDraft.value,
                          alpha: editDraft.alpha,
                          unit: editDraft.unit,
                          referenceTarget: editDraft.referenceTarget,
                          malformed: editDraft.malformed,
                          onModeChange: setEditMode,
                          onValueChange: text =>
                            setEditDraft(prev => (prev ? { ...prev, value: text, malformed: false } : prev)),
                          onAlphaChange: percent => setEditDraft(prev => (prev ? { ...prev, alpha: percent } : prev)),
                          onUnitChange: unit => setEditDraft(prev => (prev ? { ...prev, unit } : prev)),
                          onReferenceChange: text =>
                            setEditDraft(prev => (prev ? { ...prev, referenceTarget: text } : prev)),
                        })}
                      </div>

                      {tokenBrands.length > 0 && (
                        <div className="space-y-2">
                          <Label>Brands</Label>
                          <div className="space-y-4 rounded-lg border p-3">
                            {tokenBrands.map(brand => {
                              const brandDraft = editDraft.brands[brand]
                              if (!brandDraft) return null
                              const isOverridden =
                                brandDraft.referenceTarget.trim() !== editDraft.referenceTarget.trim() ||
                                brandDraft.value !== editDraft.value

                              return (
                                <div key={brand} className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-medium">{brand}</span>
                                    <div className="flex items-center gap-2">
                                      {isOverridden && <Badge variant="outline">Overridden</Badge>}
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto px-1.5 py-0.5 text-xs"
                                        disabled={!isOverridden}
                                        onClick={() => resetEditBrandToBase(brand)}
                                      >
                                        Reset to base
                                      </Button>
                                    </div>
                                  </div>
                                  {renderEditValueEditor({
                                    popoverKey: `edit:brand:${brand}`,
                                    type: editDraft.type,
                                    ariaLabel: `${brand} value`,
                                    mode: editBrandMode(brand),
                                    value: brandDraft.value,
                                    alpha: brandDraft.alpha,
                                    unit: brandDraft.unit,
                                    referenceTarget: brandDraft.referenceTarget,
                                    malformed: brandDraft.malformed,
                                    onModeChange: mode => setEditBrandMode(brand, mode),
                                    onValueChange: text =>
                                      setEditDraft(prev =>
                                        prev
                                          ? {
                                              ...prev,
                                              brands: {
                                                ...prev.brands,
                                                [brand]: { ...prev.brands[brand], value: text, malformed: false },
                                              },
                                            }
                                          : prev,
                                      ),
                                    onAlphaChange: percent =>
                                      setEditDraft(prev =>
                                        prev
                                          ? {
                                              ...prev,
                                              brands: {
                                                ...prev.brands,
                                                [brand]: { ...prev.brands[brand], alpha: percent },
                                              },
                                            }
                                          : prev,
                                      ),
                                    onUnitChange: unit =>
                                      setEditDraft(prev =>
                                        prev
                                          ? {
                                              ...prev,
                                              brands: { ...prev.brands, [brand]: { ...prev.brands[brand], unit } },
                                            }
                                          : prev,
                                      ),
                                    onReferenceChange: text =>
                                      setEditDraft(prev =>
                                        prev
                                          ? {
                                              ...prev,
                                              brands: {
                                                ...prev.brands,
                                                [brand]: { ...prev.brands[brand], referenceTarget: text },
                                              },
                                            }
                                          : prev,
                                      ),
                                  })}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <Label>References</Label>
                        {usageCount > 0 ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGraphRoot({
                                paths: [editDraft.id],
                                title: toSlashPath(originalToken?.name ?? editDraft.name),
                              })
                            }
                          >
                            <NetworkIcon />
                            {usageCount} {usageCount === 1 ? 'reference' : 'references'}
                          </Button>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not referenced by other tokens.</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label>Used in code</Label>
                        {codeUsage && codeUsage.count > 0 ? (
                          <ul className="space-y-1 rounded-lg border p-2 text-sm text-muted-foreground">
                            {codeUsage.locations.map(location => (
                              <li key={`${location.package}/${location.file}`} className="flex gap-2">
                                <Badge variant="outline" className="shrink-0">
                                  {location.package}
                                </Badge>
                                <span className="truncate">{location.file}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not used in code.</p>
                        )}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={closeEditDialog}>
                        Cancel
                      </Button>
                      <Button type="button" disabled={!editDraft.name.trim()} onClick={applyEditDialog}>
                        Apply
                      </Button>
                    </DialogFooter>
                  </>
                )
              })()}
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDraft !== null} onOpenChange={open => !open && closeDeleteDialog()}>
          <DialogContent>
            {deleteDraft && (
              <>
                <DialogHeader>
                  <DialogTitle>Delete &quot;{deleteDraft.name}&quot;?</DialogTitle>
                  <DialogDescription>
                    {deleteDraft.figmaLinked
                      ? 'This token is linked to Figma — deleting it here also deletes the variable in Figma. '
                      : ''}
                    Nothing happens until you submit and it&apos;s reviewed and merged.
                  </DialogDescription>
                </DialogHeader>

                {deleteDraft.usageCount > 0 ? (
                  <Alert variant="destructive">
                    <TriangleAlertIcon />
                    <AlertDescription>
                      &quot;{deleteDraft.name}&quot; is referenced by {deleteDraft.usageCount}{' '}
                      {deleteDraft.usageCount === 1 ? 'other token' : 'other tokens'} and can&apos;t be deleted. Remove
                      those references first.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-1.5">
                    <Label htmlFor="delete-token-confirm">Type &quot;{deleteDraft.name}&quot; to confirm</Label>
                    <Input
                      id="delete-token-confirm"
                      autoFocus
                      value={deleteConfirmText}
                      onChange={e => setDeleteConfirmText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && deleteConfirmText === deleteDraft.name) {
                          e.preventDefault()
                          confirmDeleteToken()
                        }
                      }}
                    />
                  </div>
                )}

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={deleteDraft.usageCount > 0 || deleteConfirmText !== deleteDraft.name}
                    onClick={confirmDeleteToken}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={pullConflictsDialogOpen} onOpenChange={setPullConflictsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Figma pull conflicts</DialogTitle>
              <DialogDescription>
                These tokens changed both in your working changes and in Figma since your last pull. Submitting is
                blocked until every conflict is resolved.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-96 space-y-3 overflow-y-auto">
              {pullConflicts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No conflicts remaining.</p>
              ) : (
                pullConflicts.map((entry, index) => (
                  <div
                    key={`${entry.scope}-${entry.conflict.tokenId}`}
                    className="space-y-2 rounded-md border border-border p-3"
                  >
                    <p className="truncate text-sm font-medium">
                      {entry.scope !== 'base' && <span className="text-muted-foreground">{entry.scope} · </span>}
                      {entry.conflict.path.join('/')}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Working</p>
                        <p className="truncate font-mono">{JSON.stringify(entry.conflict.workingValue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Figma</p>
                        <p className="truncate font-mono">{JSON.stringify(entry.conflict.figmaValue)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => resolveConflictKeepWorking(index)}
                      >
                        Keep working value
                      </Button>
                      <Button type="button" size="sm" onClick={() => resolveConflictUseFigma(index)}>
                        Use Figma value
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
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
          onDiscardChange={discardChange}
          pendingBrands={pendingBrands}
          onUnstageBrand={unstageBrand}
          brandDiffs={brandDiffs}
          onDiscardBrandChange={discardBrandChange}
          pulledIds={pulledTokenIds}
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
      {!sidebarCollapsed && activeSidebarTab === 'figma' && (
        <FigmaPullSidebar
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
          syncStatus={syncStatus}
          loading={figmaPullLoading}
          error={figmaPullError}
          plan={pullPlan}
          selection={pullSelection}
          selectableCount={pullSelectableCount}
          hasNothingToApply={pullHasNothingToApply}
          onPull={handlePullFromFigma}
          onToggleSelection={togglePullSelection}
          onSelectAll={selectAllPullEntries}
          onSelectNone={selectNoPullEntries}
          onApply={handleApplyPull}
          onCancel={handleCancelPull}
          beforeForBase={beforeForBase}
          beforeForBrand={beforeForBrand}
        />
      )}
      {!sidebarCollapsed && activeSidebarTab === 'preview' && (
        <PreviewSidebar
          tokens={previewTokens}
          brand={selectedBrand}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
          syncStatus={syncStatus}
        />
      )}
      <SidebarActivityBar
        items={sidebarItems}
        activeId={activeSidebarTab}
        onSelect={selectSidebarTab}
        user={session?.user ? { name: session.user.login, avatarUrl: session.user.image ?? undefined } : undefined}
        onSignOut={() => signOut({ callbackUrl: '/' })}
      />
    </div>
  )
}
