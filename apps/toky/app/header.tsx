'use client'

import { GitPullRequestIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SyncStatus } from '@/src/tokens/github-write'

// Pending gets a filled, amber "still needs attention" treatment — synced is
// deliberately quiet since there's nothing to act on.
const PENDING_BADGE_CLASSES =
  'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-400'

function SyncStatusBadge({ syncStatus }: { syncStatus: SyncStatus }) {
  if (syncStatus.state === 'synced') {
    return <Badge variant="secondary">In sync with next</Badge>
  }

  const label = syncStatus.prNumber ? `Pull request #${syncStatus.prNumber} open` : 'Pull request open'

  if (syncStatus.prUrl) {
    return (
      <Badge
        variant="outline"
        className={cn(PENDING_BADGE_CLASSES, 'gap-1')}
        render={<a href={syncStatus.prUrl} target="_blank" rel="noreferrer" />}
      >
        <GitPullRequestIcon />
        {label}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className={cn(PENDING_BADGE_CLASSES, 'gap-1')}>
      <GitPullRequestIcon />
      {label}
    </Badge>
  )
}

export function Header({ syncStatus }: { syncStatus: SyncStatus }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between bg-background px-2">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Design System" className="size-8" />
        <span className="font-heading text-lg font-semibold">Token Editor</span>
        <SyncStatusBadge syncStatus={syncStatus} />
      </div>
      <div className="flex items-center gap-3">{/* user goes here */}</div>
    </header>
  )
}
