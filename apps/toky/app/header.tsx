'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SyncStatus } from '@/src/tokens/github-write'

// Pending gets a dark pill with a glowing amber dot — still needs attention,
// same "something's live" language as the Next.js dev overlay's status pill.
// Synced is deliberately quiet since there's nothing to act on.
const PENDING_BADGE_CLASSES = 'gap-2 border-border bg-muted/50 text-foreground'

function PendingDot() {
  return (
    <span
      aria-hidden="true"
      className="size-2 shrink-0 rounded-full bg-amber-500 shadow-[0_0_6px_0_var(--color-amber-500)]"
    />
  )
}

export function SyncStatusBadge({ syncStatus }: { syncStatus: SyncStatus }) {
  if (syncStatus.state === 'synced') {
    return <Badge variant="secondary">In sync with next</Badge>
  }

  const label = syncStatus.prNumber ? `Pull request #${syncStatus.prNumber}` : 'Pull request'

  if (syncStatus.prUrl) {
    return (
      <Badge
        variant="outline"
        className={cn(PENDING_BADGE_CLASSES)}
        render={<a href={syncStatus.prUrl} target="_blank" rel="noreferrer" />}
      >
        <PendingDot />
        {label}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className={cn(PENDING_BADGE_CLASSES)}>
      <PendingDot />
      {label}
    </Badge>
  )
}
