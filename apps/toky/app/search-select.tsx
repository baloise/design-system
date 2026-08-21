'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { CheckIcon, SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { normalizeSearchText } from '@/src/tokens/filter'

export interface SearchSelectOption {
  value: string
  label: string
  // Present only when the option has a color worth previewing (e.g. a color-typed reference
  // target) - absence means "not applicable", not "color unknown".
  swatch?: string
  // Short resolved-value summary shown right-aligned on the row (e.g. "1.5rem", "#F05D4D") -
  // absence means "no summary available", not "empty value". Mutually exclusive with
  // borderPreview below - a row shows one or the other, never both.
  detail?: string
  // Present only for border-typed reference targets - a little solid/dashed/dotted line segment
  // right-aligned on the row, colored and styled to match what picking this option would actually
  // resolve to, so a border's color+style is legible at a glance instead of guessed from its path.
  borderPreview?: { color: string; cssStyle: string }
  // The option's dimension value normalized to px, for exact-value search (see parseDimensionQuery
  // below) — lets searching "4px" or "0.25rem" find only tokens whose value is exactly that,
  // regardless of which unit they're authored in, rather than substring-matching display text
  // (where "4px" would wrongly match a displayed "14px"). Absent for non-dimension options.
  dimensionPx?: number
}

// Recognizes a bare "<number><px|rem>" search query (e.g. "4px", "0.25rem") and normalizes it to
// px, so it can be compared for exact equality against an option's dimensionPx instead of being
// treated as substring text — a substring match on "4px" would also hit a displayed "14px".
const DIMENSION_QUERY_PATTERN = /^(-?\d+(?:\.\d+)?)\s*(px|rem)$/i
const PX_PER_REM = 16

function parseDimensionQueryPx(text: string): number | null {
  const match = DIMENSION_QUERY_PATTERN.exec(text.trim())
  if (!match) return null
  const value = Number(match[1])
  return match[2].toLowerCase() === 'px' ? value : value * PX_PER_REM
}

// A search field with an always-visible, independently scrollable results list underneath
// (rather than a floating combobox dropdown) - originally the token editor's reference picker,
// generalized for any "search a flat list of paths, pick one" popover (also used by the Live
// Preview sidebar's page picker). Kept as its own component so its local filter state - and the
// search input's focus - survives the parent re-rendering on every keystroke.
//
// Keyboard: ArrowUp/ArrowDown move a highlighted option (always starting at the first result of
// the current search, not wherever `currentValue` happens to sit), Enter picks whichever option
// is highlighted. Follows the standard combobox pattern (aria-activedescendant on the input,
// role="option"/aria-selected on each row) rather than moving DOM focus into the list itself, so
// typing is never interrupted.
export function SearchSelect({
  options,
  currentValue,
  onSelect,
  ariaLabel,
  emptyMessage = 'No matching options.',
}: {
  options: SearchSelectOption[]
  currentValue: string
  onSelect: (value: string) => void
  ariaLabel: string
  emptyMessage?: string
}) {
  const [filter, setFilter] = useState('')
  const filtered = useMemo(() => {
    // A recognizable dimension query ("4px", "0.25rem") matches by exact px-normalized value only
    // — never falls back to substring text matching, which would also match a displayed "14px".
    const dimensionQueryPx = parseDimensionQueryPx(filter)
    if (dimensionQueryPx !== null) {
      return options.filter(
        option => option.dimensionPx !== undefined && Math.abs(option.dimensionPx - dimensionQueryPx) < 1e-6,
      )
    }
    const query = normalizeSearchText(filter)
    if (!query) return options
    // Matches on the path (label) as before, or on the resolved-value summary (detail, e.g. "2px").
    return options.filter(
      option =>
        normalizeSearchText(option.label).includes(query) || normalizeSearchText(option.detail ?? '').includes(query),
    )
  }, [options, filter])

  const [highlightedIndex, setHighlightedIndex] = useState(0)
  // A fresh search result set always highlights its first row, regardless of where the
  // highlight was sitting in the previous result set (which may not even exist anymore).
  useEffect(() => {
    setHighlightedIndex(0)
  }, [filtered])

  const listboxId = useId()
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (filtered.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const option = filtered[highlightedIndex]
      if (option) onSelect(option.value)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label={ariaLabel}
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-activedescendant={filtered[highlightedIndex] ? `${listboxId}-${highlightedIndex}` : undefined}
          placeholder="Search"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-8"
          autoFocus
        />
      </div>
      <div id={listboxId} role="listbox" aria-label={ariaLabel} className="h-64 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-2.5 py-2 text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          filtered.map((option, index) => {
            const isActive = option.value === currentValue
            const isHighlighted = index === highlightedIndex
            return (
              <button
                key={option.value}
                id={`${listboxId}-${index}`}
                ref={el => {
                  optionRefs.current[index] = el
                }}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => onSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-sm outline-none',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isHighlighted
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {option.swatch && (
                  <span
                    aria-hidden="true"
                    className="size-3.5 shrink-0 rounded-sm border border-border/50"
                    style={{ backgroundColor: option.swatch }}
                  />
                )}
                <span className="flex-1 truncate">{option.label}</span>
                {option.borderPreview ? (
                  <span
                    aria-hidden="true"
                    className="h-0 w-8 shrink-0 border-t-2"
                    style={{
                      borderTopColor: option.borderPreview.color,
                      borderTopStyle: option.borderPreview.cssStyle as CSSProperties['borderTopStyle'],
                    }}
                  />
                ) : (
                  option.detail && (
                    <span
                      className={cn(
                        'shrink-0 truncate text-xs',
                        isActive ? 'text-primary-foreground/70' : 'text-muted-foreground',
                      )}
                    >
                      {option.detail}
                    </span>
                  )
                )}
                {isActive && <CheckIcon className="size-4 shrink-0" />}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
