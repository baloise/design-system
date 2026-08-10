'use client'

import { TriangleAlertIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import type { SyncStatus } from '@/src/tokens/github-write'
import { SidebarPanel } from './sidebar'

export interface ProblemItem {
  id: string
  name: string
  message: string
  // 'warning' issues are worth surfacing but never block staging/submitting.
  severity: 'error' | 'warning'
}

type ProblemFilter = 'all' | 'error' | 'warning'

// A token can carry more than one problem (e.g. an empty value AND a
// duplicate name) — each shows up as its own row, same as validateWorkingTokens
// reports them, so the count here always matches the badge.
export function ProblemsList({
  problems,
  emptyMessage = 'No problems detected.',
}: {
  problems: ProblemItem[]
  emptyMessage?: string
}) {
  if (problems.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>
  }

  return (
    <ul className="space-y-2">
      {problems.map((problem, index) => (
        <li key={index} className="flex items-start gap-2 text-sm">
          <TriangleAlertIcon
            aria-hidden="true"
            className={cn(
              'mt-0.5 size-4 shrink-0',
              problem.severity === 'warning' ? 'text-amber-500 dark:text-amber-400' : 'text-destructive',
            )}
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{problem.name}</p>
            <p className="text-xs text-muted-foreground">{problem.message}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ProblemsSidebar({
  problems,
  width,
  onWidthChange,
  syncStatus,
}: {
  problems: ProblemItem[]
  width: number
  onWidthChange: (width: number) => void
  syncStatus: SyncStatus
}) {
  const [filter, setFilter] = useState<ProblemFilter>('all')

  const errorCount = useMemo(() => problems.filter(p => p.severity === 'error').length, [problems])
  const warningCount = problems.length - errorCount

  const filteredProblems = useMemo(
    () => (filter === 'all' ? problems : problems.filter(p => p.severity === filter)),
    [problems, filter],
  )

  return (
    <SidebarPanel
      title="Problems"
      count={problems.length}
      width={width}
      onWidthChange={onWidthChange}
      syncStatus={syncStatus}
      toolbar={
        // Only worth showing once there's a mix to filter — a single-severity
        // list has nothing for the tabs to narrow down.
        errorCount > 0 && warningCount > 0 ? (
          <Tabs value={filter} onValueChange={value => setFilter(value as ProblemFilter)}>
            <TabsList className="w-full">
              <TabsTrigger value="all">All ({problems.length})</TabsTrigger>
              <TabsTrigger value="error">Errors ({errorCount})</TabsTrigger>
              <TabsTrigger value="warning">Warnings ({warningCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : undefined
      }
    >
      <ProblemsList
        problems={filteredProblems}
        emptyMessage={filter === 'all' ? undefined : `No ${filter}s detected.`}
      />
    </SidebarPanel>
  )
}
