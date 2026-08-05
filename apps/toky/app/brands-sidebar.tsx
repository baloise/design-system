'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { BRAND_NAME_ERROR_MESSAGE, validateBrandName } from '@/src/tokens/brand'
import { SidebarPanel } from './sidebar'

export function BrandsSidebar({
  realBrands,
  pendingBrands,
  onStageBrand,
  selectedBrand,
  onSelectBrand,
  width,
  onWidthChange,
}: {
  // Real (already-on-GitHub) brand files, and anything staged this session
  // but not yet submitted — merged in the list below so creating a brand
  // doesn't look like it silently did nothing.
  realBrands: string[]
  pendingBrands: string[]
  onStageBrand: (name: string) => void
  // null means Base — the table's always-present first column, and the only
  // selection that's never "pending" (Base always exists).
  selectedBrand: string | null
  onSelectBrand: (name: string | null) => void
  width: number
  onWidthChange: (width: number) => void
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [touched, setTouched] = useState(false)

  const allKnownBrands = [...realBrands, ...pendingBrands]
  const error = validateBrandName(name, allKnownBrands)

  function openDialog() {
    setName('')
    setTouched(false)
    setDialogOpen(true)
  }

  function handleCreate() {
    setTouched(true)
    if (error) return
    onStageBrand(name.trim())
    setDialogOpen(false)
  }

  const rows = [
    { name: 'Base', status: 'current' as const },
    ...[...new Set(allKnownBrands)]
      .sort((a, b) => a.localeCompare(b))
      .map(brand => ({
        name: brand,
        status: pendingBrands.includes(brand) ? ('pending' as const) : ('real' as const),
      })),
  ]

  return (
    <>
      <SidebarPanel
        title="Brands"
        count={allKnownBrands.length}
        width={width}
        onWidthChange={onWidthChange}
        toolbar={
          <Button type="button" variant="outline" className="w-full" onClick={openDialog}>
            <PlusIcon />
            Create new brand
          </Button>
        }
      >
        <ul className="space-y-1">
          {rows.map(row => {
            const value = row.status === 'current' ? null : row.name
            const isSelected = selectedBrand === value
            return (
              <li key={row.name}>
                <button
                  type="button"
                  onClick={() => onSelectBrand(isSelected ? null : value)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring',
                    isSelected && 'bg-accent',
                  )}
                >
                  <span className="min-w-0 truncate">{row.name}</span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    {row.status === 'current' && <Badge variant="secondary">Current</Badge>}
                    {row.status === 'pending' && <Badge variant="default">Pending</Badge>}
                    {isSelected && <Badge variant="outline">Shown</Badge>}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </SidebarPanel>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create brand</DialogTitle>
            <DialogDescription>
              Starts as an empty override of Base — nothing is different until you override a token under it later.
              Nothing happens until you submit and it&apos;s reviewed and merged.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5">
            <Label htmlFor="new-brand-name">Name</Label>
            <Input
              id="new-brand-name"
              autoFocus
              placeholder="Acme"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={touched && !!error}
            />
            {touched && error && <p className="text-sm text-destructive">{BRAND_NAME_ERROR_MESSAGE[error]}</p>}
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <Button type="button" disabled={!!error} onClick={handleCreate}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
