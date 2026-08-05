import { TriangleAlertIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SidebarPanel } from './sidebar'

export interface ProblemItem {
  id: string
  name: string
  message: string
  // 'warning' issues are worth surfacing but never block staging/submitting.
  severity: 'error' | 'warning'
}

// A token can carry more than one problem (e.g. an empty value AND a
// duplicate name) — each shows up as its own row, same as validateWorkingTokens
// reports them, so the count here always matches the badge.
export function ProblemsList({ problems }: { problems: ProblemItem[] }) {
  if (problems.length === 0) {
    return <p className="text-sm text-muted-foreground">No problems detected.</p>
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
}: {
  problems: ProblemItem[]
  width: number
  onWidthChange: (width: number) => void
}) {
  return (
    <SidebarPanel title="Problems" count={problems.length} width={width} onWidthChange={onWidthChange}>
      <ProblemsList problems={problems} />
    </SidebarPanel>
  )
}
