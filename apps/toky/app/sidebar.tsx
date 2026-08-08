'use client'

import { useRef } from 'react'
import type { ComponentType, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { SyncStatus } from '@/src/tokens/github-write'
import { SyncStatusBadge } from './header'

// Placeholder until the signed-in GitHub session lands (see docs/adr/0003) — swap for the
// user's actual avatar_url/login once Auth.js is wired up.
export interface SidebarUser {
  name: string
  avatarUrl?: string
}

// 360px floor for every sidebar — below that the staged-changes form/table controls start
// clipping. No ceiling: a sidebar can be dragged arbitrarily wide.
export const SIDEBAR_MIN_WIDTH = 360
export const SIDEBAR_MAX_WIDTH = Infinity
export const SIDEBAR_DEFAULT_WIDTH = 360

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
  user,
}: {
  items: SidebarActivityItem[]
  activeId: string
  onSelect: (id: string) => void
  // Omit while there's no signed-in user to show (e.g. auth not wired up yet).
  user?: SidebarUser
}) {
  return (
    <nav
      aria-label="Sidebar views"
      className="fixed top-0 bottom-0 left-0 z-40 flex flex-col items-center border-r border-border bg-background"
      style={{ width: ACTIVITY_BAR_WIDTH }}
    >
      <div className="flex h-14 w-full shrink-0 items-center justify-center border-b border-border">
        <img src="/logo.svg" alt="Design System" className="size-8" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 pb-2">
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
      </div>
      {user && (
        <div className="flex w-full shrink-0 items-center justify-center border-t border-border py-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label={user.name}
                  className="flex size-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-border transition-colors hover:ring-foreground"
                />
              }
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="size-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">{user.name.slice(0, 1).toUpperCase()}</span>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">{user.name}</TooltipContent>
          </Tooltip>
        </div>
      )}
    </nav>
  )
}

// The resizable left-hand panel frame shared by every sidebar view (staged
// changes, problems, ...) — owns the drag-to-resize handle, header, and
// scrollable body; views only supply their own list content as children.
export function SidebarPanel({
  title,
  count,
  titleActions,
  width,
  onWidthChange,
  minWidth = SIDEBAR_MIN_WIDTH,
  maxWidth = SIDEBAR_MAX_WIDTH,
  syncStatus,
  toolbar,
  scrollContent = true,
  children,
}: {
  title: string
  // Omit entirely for panels with no natural "item count" (e.g. Live Preview) — absence means
  // "not applicable", not "zero", so no badge renders at all rather than an empty "0".
  count?: number
  // Rendered top-right of the title row, after the count badge (e.g. Live Preview's
  // mobile/tablet/desktop width buttons) — for controls that belong with the panel identity
  // itself, not the scrollable toolbar area below it.
  titleActions?: ReactNode
  width: number
  onWidthChange: (width: number) => void
  // Per-panel resize floor/ceiling — defaults to the shared sidebar range, but a panel showing
  // rendered content (e.g. Live Preview) can raise its own minWidth past the shared default.
  minWidth?: number
  maxWidth?: number
  // Rendered as the panel's top row, in the app header's place — the header
  // no longer exists as its own bar (see SidebarActivityBar's logo, which
  // took its other half).
  syncStatus: SyncStatus
  // Non-scrolling controls pinned between the header and the scrollable list
  // (e.g. staged changes' description/branch/submit form) — optional since
  // most panels (problems, ...) are just a list.
  toolbar?: ReactNode
  // False for panels whose content already fills the available height exactly and manages its own
  // scrolling (e.g. Live Preview's iframe) — `overflow-y-auto`'s scrollbar reserving horizontal
  // space would otherwise make that content measurably narrower than intended for no visual reason.
  scrollContent?: boolean
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
    const next = Math.min(maxWidth, Math.max(minWidth, drag.startWidth + delta))
    onWidthChange(next)
  }

  function handlePointerUp() {
    dragState.current = null
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  // A panel can be handed a `width` below its own `minWidth` (e.g. Live Preview's 320px floor
  // while the shared sidebar width — set from a different, lower-floor panel — is still 240) —
  // clamp what's actually rendered without waiting for a drag/keyboard resize to correct it.
  const effectiveWidth = Math.min(maxWidth, Math.max(minWidth, width))

  return (
    <aside
      className="fixed top-0 bottom-0 z-30 flex flex-col border-r-2 border-[color-mix(in_oklch,var(--card),var(--muted)_50%)] bg-background"
      style={{ width: effectiveWidth, left: ACTIVITY_BAR_WIDTH }}
    >
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={`Resize ${title.toLowerCase()} sidebar`}
        aria-valuenow={effectiveWidth}
        aria-valuemin={minWidth}
        aria-valuemax={Number.isFinite(maxWidth) ? maxWidth : undefined}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') onWidthChange(Math.min(maxWidth, effectiveWidth + 16))
          if (e.key === 'ArrowLeft') onWidthChange(Math.max(minWidth, effectiveWidth - 16))
        }}
        className={cn(
          'absolute top-0 -right-1.5 z-10 h-full w-2 cursor-col-resize touch-none',
          'after:absolute after:top-0 after:right-1.5 after:h-full after:w-0.5 after:bg-transparent',
          'hover:after:bg-ring focus-visible:after:bg-ring',
        )}
      />

      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
        <span className="font-heading text-lg font-semibold">Toky</span>
        <SyncStatusBadge syncStatus={syncStatus} />
      </div>
      <div className="flex h-10 items-center justify-between gap-2 px-4 uppercase">
        <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
        <div className="flex shrink-0 items-center gap-2 normal-case">
          {count !== undefined && <Badge variant="secondary">{count}</Badge>}
          {titleActions}
        </div>
      </div>
      {toolbar && <div className="space-y-2 p-3">{toolbar}</div>}
      <div className={cn('flex-1 p-3', scrollContent ? 'overflow-y-auto' : 'overflow-hidden')}>{children}</div>
    </aside>
  )
}
