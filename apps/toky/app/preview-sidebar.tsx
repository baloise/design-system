'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronsUpDownIcon, MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { tabsListVariants } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { SyncStatus } from '@/src/tokens/github-write'
import type { PreviewToken } from '@/src/tokens/css-preview'
import { SIDEBAR_DEFAULT_WIDTH, SidebarPanel } from './sidebar'
import { SearchSelect } from './search-select'
import type { SearchSelectOption } from './search-select'

export const PREVIEW_TAB_ICON = MonitorIcon

const DEFAULT_PREVIEW_URL = 'http://localhost:4000/playground.html'
const PLAYGROUND_PAGE = '/playground.html'

type PreviewBreakpoint = 'mobile' | 'tablet' | 'desktop'

// Mobile has no breakpoint token of its own (it's the DS's base/default layout below the Tablet
// breakpoint) - 412 is a common device viewport width (e.g. Pixel/Android), not a DS token. Tablet
// and Desktop are packages/tokens' 🔗 Alias/📐 Breakpoint/Tablet and /Desktop tokens (769, 1024).
// All three carry an explicit product-chosen +26 on top of their base value.
const BREAKPOINT_WIDTH: Record<PreviewBreakpoint, number> = {
  mobile: 438,
  tablet: 795,
  desktop: 1050,
}

// The panel content's own horizontal padding (SidebarPanel's `p-3` = 12px each side), which the
// iframe sits inside of — sizing the sidebar to exactly BREAKPOINT_WIDTH would leave the iframe
// itself 24px narrower than the breakpoint it's meant to simulate, so that padding is added on
// top of the target breakpoint before it's applied to the sidebar.
const PREVIEW_CONTENT_PADDING_X = 24

const BREAKPOINT_ICON: Record<PreviewBreakpoint, typeof MonitorIcon> = {
  mobile: SmartphoneIcon,
  tablet: TabletIcon,
  desktop: MonitorIcon,
}

const BREAKPOINT_LABEL: Record<PreviewBreakpoint, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
}
// First-run trap: opening this tab without `pnpm --filter core start` running leaves the iframe
// blank with no reliable onError signal (browsers don't fire that consistently for
// connection-refused) - a missed `ready` handshake within this window is the next best signal.
const READY_TIMEOUT_MS = 3000

function getPreviewUrl(): string {
  return process.env.NEXT_PUBLIC_DS_PREVIEW_URL || DEFAULT_PREVIEW_URL
}

// "/components/badge/test/badge.visual.html" -> "components/badge/badge" - drops the fixed
// "test/" segment and the ".visual.html"/".style.html" suffix (redundant once every option is a
// visual or style page), keeping the label scannable in a narrow sidebar. The suffix is kept as a
// " (style)" marker for style pages, since a component can offer both variants side by side.
function labelForPage(page: string): string {
  const isStyle = /\.style\.html$/.test(page)
  const base = page
    .replace(/^\//, '')
    .replace(/\.(visual|style)\.html$/, '')
    .replace(/\/test\//, '/')
  return isStyle ? `${base} (style)` : base
}

export function PreviewSidebar({
  tokens,
  brand,
  width,
  onWidthChange,
  syncStatus,
}: {
  tokens: PreviewToken[]
  brand: string | null
  width: number
  onWidthChange: (width: number) => void
  syncStatus: SyncStatus
}) {
  const previewUrl = getPreviewUrl()
  const previewOrigin = useMemo(() => {
    try {
      return new URL(previewUrl).origin
    } catch {
      return null
    }
  }, [previewUrl])

  const [page, setPage] = useState(PLAYGROUND_PAGE)
  const [pickerOpen, setPickerOpen] = useState(false)
  // Every *.visual.html and *.style.html page under packages/core's browsable source dirs
  // (blocks, templates, foundation, components), fetched from the manifest packages/core's www
  // build generates (see stencil.config.ts) - "Playground" is always offered even before/without
  // this loading.
  const [availablePages, setAvailablePages] = useState<string[]>([])

  useEffect(() => {
    if (!previewOrigin) return
    let cancelled = false
    fetch(`${previewOrigin}/visual-pages.json`)
      .then(res => (res.ok ? res.json() : []))
      .then((pages: unknown) => {
        if (!cancelled && Array.isArray(pages)) setAvailablePages(pages)
      })
      .catch(() => {
        // Preview server unreachable/manifest missing - the ready-handshake timeout below
        // already surfaces that, so this just leaves the page list at "Playground only".
      })
    return () => {
      cancelled = true
    }
  }, [previewOrigin])

  const pageOptions: SearchSelectOption[] = useMemo(
    () => [
      { value: PLAYGROUND_PAGE, label: 'Playground' },
      ...availablePages.map(p => ({ value: p, label: labelForPage(p) })),
    ],
    [availablePages],
  )
  const currentPageLabel = pageOptions.find(option => option.value === page)?.label ?? page

  const src = previewOrigin ? `${previewOrigin}${page}` : previewUrl

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [ready, setReady] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  // Re-runs on every page change too, since changing `src` reloads the iframe - a fresh load
  // needs its own ready handshake and timeout, same as the tab-remount case.
  useEffect(() => {
    if (!previewOrigin) {
      setTimedOut(true)
      return
    }

    setReady(false)
    setTimedOut(false)

    const timeoutId = window.setTimeout(() => setTimedOut(true), READY_TIMEOUT_MS)

    function handleMessage(event: MessageEvent) {
      if (event.origin !== previewOrigin || event.source !== iframeRef.current?.contentWindow) return
      if (!event.data || event.data.source !== 'ds-token-preview' || event.data.type !== 'ready') return
      window.clearTimeout(timeoutId)
      setReady(true)
      setTimedOut(false)
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      window.clearTimeout(timeoutId)
    }
  }, [previewOrigin, src])

  // `diff` (and therefore `tokens`) is always the full comparison against the original baseline,
  // not an incremental delta - so re-posting it here on every change (including the first, once
  // `ready` flips) already keeps the preview in sync without a separate "initial sync" path.
  useEffect(() => {
    if (!ready || !previewOrigin) return
    const win = iframeRef.current?.contentWindow
    if (!win) return

    win.postMessage({ source: 'ds-token-preview', type: 'set-brand', brand }, previewOrigin)
    win.postMessage({ source: 'ds-token-preview', type: 'set-tokens', tokens }, previewOrigin)
  }, [ready, tokens, brand, previewOrigin])

  // Sets the sidebar's own (resizable) width to the breakpoint, rather than a fixed width on the
  // iframe itself — the iframe always fills its container (see the SidebarPanel's own 360px
  // floor/no ceiling), so "preview at tablet width" means the panel itself becomes tablet-wide.
  // Styled like the Global/Alias/Component layer tabs (same tabsListVariants), but built from
  // plain buttons rather than the Tabs primitive - Tabs.Root's onValueChange doesn't fire for a
  // click on the already-active tab, which would break "click the active breakpoint to go back
  // to the default width".
  const breakpointButtons = (
    <div className={cn(tabsListVariants({ variant: 'default' }), 'gap-2')} role="group" aria-label="Preview width">
      {(Object.keys(BREAKPOINT_WIDTH) as PreviewBreakpoint[]).map(bp => {
        const Icon = BREAKPOINT_ICON[bp]
        const sidebarWidthForBreakpoint = BREAKPOINT_WIDTH[bp] + PREVIEW_CONTENT_PADDING_X
        const isActive = width === sidebarWidthForBreakpoint
        return (
          <Tooltip key={bp}>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label={`${BREAKPOINT_LABEL[bp]} (${BREAKPOINT_WIDTH[bp]}px)`}
                  aria-pressed={isActive}
                  onClick={() => onWidthChange(isActive ? SIDEBAR_DEFAULT_WIDTH : sidebarWidthForBreakpoint)}
                  className={cn(
                    'relative inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 rounded-md border border-transparent text-sm font-medium whitespace-nowrap text-foreground/60 transition-all hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-1 focus-visible:outline-ring [&_svg]:pointer-events-none [&_svg]:shrink-0',
                    // Icon-only (inactive) tabs are square — width matches the tab list's own
                    // height. The active tab also shows its label, so it grows to fit instead.
                    isActive
                      ? 'bg-background px-2 text-foreground shadow-sm dark:border-input dark:bg-input/30'
                      : 'aspect-square',
                  )}
                />
              }
            >
              <Icon className="size-4" />
              {isActive && BREAKPOINT_LABEL[bp]}
            </TooltipTrigger>
            <TooltipContent>
              {BREAKPOINT_LABEL[bp]} ({BREAKPOINT_WIDTH[bp]}px)
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )

  return (
    <SidebarPanel
      title="Preview"
      titleActions={breakpointButtons}
      width={width}
      onWidthChange={onWidthChange}
      syncStatus={syncStatus}
      scrollContent={false}
      toolbar={
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger
            render={<Button type="button" variant="outline" className="w-full justify-between font-normal" />}
          >
            <span className="truncate">{currentPageLabel}</span>
            <ChevronsUpDownIcon aria-hidden="true" className="size-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <SearchSelect
              options={pageOptions}
              currentValue={page}
              onSelect={value => {
                setPage(value)
                setPickerOpen(false)
              }}
              ariaLabel="Preview page"
              emptyMessage="No matching pages."
            />
          </PopoverContent>
        </Popover>
      }
    >
      <div className="relative h-full w-full">
        <iframe
          ref={iframeRef}
          src={src}
          title="Design system preview"
          // `block` matters here, not just cosmetic: an iframe's UA-default inline display leaves
          // a few px of baseline gap below it, which is just enough to make the panel's `overflow-y-auto`
          // wrapper think its content overflows vertically - the resulting scrollbar eats into the
          // horizontal space, so the iframe ends up narrower than the breakpoint width it was sized for.
          className="block h-full w-full rounded-lg border-0 bg-white"
        />
        {timedOut && !ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 p-4 text-center text-sm text-muted-foreground">
            <span>Preview server isn&apos;t running — start it with</span>
            <br />
            <br />
            <code className="rounded bg-muted px-1 py-0.5 font-mono">pnpm --filter core start</code>
          </div>
        )}
      </div>
    </SidebarPanel>
  )
}
