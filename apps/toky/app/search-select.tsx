'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
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
    const query = normalizeSearchText(filter)
    if (!query) return options
    return options.filter(option => normalizeSearchText(option.label).includes(query))
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
                {isActive && <CheckIcon className="size-4 shrink-0" />}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
