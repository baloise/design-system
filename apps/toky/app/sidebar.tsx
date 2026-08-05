'use client'

import { useRef } from 'react'
import type { ComponentType, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export const SIDEBAR_MIN_WIDTH = 240
export const SIDEBAR_MAX_WIDTH = 640
export const SIDEBAR_DEFAULT_WIDTH = 320

// The VS Code-style icon rail anchored to the far left edge — fixed width,
// not resizable. Views land here as tabs, switched via SidebarActivityBar's
// activeId/onSelect, each rendering its own SidebarPanel alongside it.
export const ACTIVITY_BAR_WIDTH = 48

export interface SidebarActivityItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  badge?: number
}

export function SidebarActivityBar({
  items,
  activeId,
  onSelect,
}: {
  items: SidebarActivityItem[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <nav
      aria-label="Sidebar views"
      className="fixed top-16 bottom-0 left-0 z-40 flex flex-col items-center gap-1 bg-background pt-0 pb-2"
      style={{ width: ACTIVITY_BAR_WIDTH }}
    >
      {items.map(item => {
        const Icon = item.icon
        const isActive = item.id === activeId
        return (
          <Tooltip key={item.id}>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label={item.label}
                  aria-pressed={isActive}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    'relative flex size-12 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground',
                    isActive &&
                      'text-foreground before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:rounded-full before:bg-primary',
                  )}
                />
              }
            >
              <Icon className="size-6" />
              {!!item.badge && (
                <span className="absolute right-0.5 bottom-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}

// The resizable left-hand panel frame shared by every sidebar view (staged
// changes, problems, ...) — owns the drag-to-resize handle, header, and
// scrollable body; views only supply their own list content as children.
export function SidebarPanel({
  title,
  count,
  width,
  onWidthChange,
  toolbar,
  children,
}: {
  title: string
  count: number
  width: number
  onWidthChange: (width: number) => void
  // Non-scrolling controls pinned between the header and the scrollable list
  // (e.g. staged changes' description/branch/submit form) — optional since
  // most panels (problems, ...) are just a list.
  toolbar?: ReactNode
  children: ReactNode
}) {
  // Dragging reads/writes the width directly rather than through React state
  // during the drag itself — onWidthChange (and the resulting re-render) only
  // needs to fire once per pointermove, not fight with pointer capture timing.
  const dragState = useRef<{ startX: number; startWidth: number } | null>(null)

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.preventDefault()
    dragState.current = { startX: e.clientX, startWidth: width }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  function handlePointerMove(e: PointerEvent) {
    const drag = dragState.current
    if (!drag) return
    // The panel is anchored to the left edge (right after the activity bar),
    // so dragging right is what grows it.
    const delta = e.clientX - drag.startX
    const next = Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, drag.startWidth + delta))
    onWidthChange(next)
  }

  function handlePointerUp() {
    dragState.current = null
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  return (
    <aside
      className="fixed top-16 bottom-0 z-30 flex flex-col border-r-2 border-[color-mix(in_oklch,var(--card),var(--muted)_50%)] bg-card"
      style={{ width, left: ACTIVITY_BAR_WIDTH }}
    >
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={`Resize ${title.toLowerCase()} sidebar`}
        aria-valuenow={width}
        aria-valuemin={SIDEBAR_MIN_WIDTH}
        aria-valuemax={SIDEBAR_MAX_WIDTH}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') onWidthChange(Math.min(SIDEBAR_MAX_WIDTH, width + 16))
          if (e.key === 'ArrowLeft') onWidthChange(Math.max(SIDEBAR_MIN_WIDTH, width - 16))
        }}
        className={cn(
          'absolute top-0 -right-1.5 z-10 h-full w-3 cursor-col-resize touch-none',
          'after:absolute after:top-0 after:right-1.5 after:h-full after:w-0.5 after:bg-transparent',
          'hover:after:bg-ring focus-visible:after:bg-ring',
        )}
      />

      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <h2 className="text-sm font-semibold">{title}</h2>
        <Badge variant="secondary">{count}</Badge>
      </div>
      {toolbar && <div className="space-y-2 border-b border-border p-3">{toolbar}</div>}
      <div className="flex-1 overflow-y-auto p-3">{children}</div>
    </aside>
  )
}
