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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BRAND_NAME_ERROR_MESSAGE, validateBrandName } from '@/src/tokens/brand'
import type { SyncStatus } from '@/src/tokens/github-write'
import { SidebarPanel } from './sidebar'

// "Base" is a reserved brand name (see validateBrandName), so it's safe to
// reuse as the Tabs value standing in for `selectedBrand === null`.
const BASE_TAB_VALUE = 'Base'

export function BrandsSidebar({
  realBrands,
  pendingBrands,
  onStageBrand,
  selectedBrand,
  onSelectBrand,
  width,
  onWidthChange,
  syncStatus,
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
  syncStatus: SyncStatus
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
    { name: 'Base', pending: false },
    ...[...new Set(allKnownBrands)]
      .sort((a, b) => a.localeCompare(b))
      .map(brand => ({ name: brand, pending: pendingBrands.includes(brand) })),
  ]

  return (
    <>
      <SidebarPanel
        title="Brands"
        count={allKnownBrands.length}
        width={width}
        onWidthChange={onWidthChange}
        syncStatus={syncStatus}
        toolbar={
          <Button type="button" variant="outline" className="w-full" onClick={openDialog}>
            <PlusIcon />
            Create new brand
          </Button>
        }
      >
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Select brand</p>
          <Tabs
            orientation="vertical"
            value={selectedBrand ?? BASE_TAB_VALUE}
            onValueChange={value =>
              onSelectBrand(value === BASE_TAB_VALUE ? null : ((value as string | null) ?? null))
            }
          >
            <TabsList className="w-full items-stretch gap-1">
              {rows.map(row => (
                <TabsTrigger key={row.name} value={row.name} className="w-full justify-between">
                  <span className="min-w-0 truncate">{row.name}</span>
                  {row.pending && <Badge variant="default">Pending</Badge>}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
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
            {touched && error && <p className="text-sm text-destructive">{BRAND_NAME_ERROR_MESSAGE.get(error)}</p>}
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
