import {
  createBadgeCellRenderer,
  createButtonCellRenderer,
  createTagCellRenderer,
  createTextCellRenderer,
  helvetiaGridTheme,
} from '@baloise/ds-ag-grid'
import { AllCommunityModule, createGrid, ModuleRegistry, type GridOptions } from 'ag-grid-community'
import type { Meta, StoryObj } from '@storybook/html-vite'

ModuleRegistry.registerModules([AllCommunityModule])

interface Policy {
  policyNumber: string
  holder: string
  product: string
  premium: number
  status: string
  openClaims: number
  /** Icon name shown after the policy number. */
  icon?: string
}

const rowData: Policy[] = [
  {
    policyNumber: 'POL-1001',
    holder: 'Anna Keller',
    product: 'Home',
    premium: 480,
    status: 'Active',
    openClaims: 0,
  },
  {
    policyNumber: 'POL-1002',
    holder: 'Marco Rossi',
    product: 'Car',
    premium: 720,
    status: 'Active',
    openClaims: 2,
    icon: 'consultant',
  },
  {
    policyNumber: 'POL-1003',
    holder: 'Sophie Dubois',
    product: 'Life',
    premium: 1250,
    status: 'Active',
    openClaims: 0,
  },
  {
    policyNumber: 'POL-1004',
    holder: 'Lukas Meier',
    product: 'Travel',
    premium: 95,
    status: 'Pending',
    openClaims: 1,
  },
  {
    policyNumber: 'POL-1005',
    holder: 'Julia Steiner',
    product: 'Home',
    premium: 510,
    status: 'Active',
    openClaims: 0,
  },
  {
    policyNumber: 'POL-1006',
    holder: 'David Fischer',
    product: 'Liability',
    premium: 210,
    status: 'Cancelled',
    openClaims: 3,
    icon: 'consultant',
  },
  {
    policyNumber: 'POL-1007',
    holder: 'Elena Brunner',
    product: 'Car',
    premium: 690,
    status: 'Active',
    openClaims: 0,
  },
  {
    policyNumber: 'POL-1008',
    holder: 'Thomas Weber',
    product: 'Life',
    premium: 1400,
    status: 'Pending',
    openClaims: 1,
  },
  {
    policyNumber: 'POL-1009',
    holder: 'Nina Baumann',
    product: 'Travel',
    premium: 110,
    status: 'Active',
    openClaims: 0,
  },
  {
    policyNumber: 'POL-1010',
    holder: 'Felix Huber',
    product: 'Home',
    premium: 495,
    status: 'Active',
    openClaims: 0,
  },
]

const STATUS_TAG_COLORS: Record<string, string> = {
  Active: 'success',
  Pending: 'warning',
  Cancelled: 'danger',
}

const columnDefs: GridOptions<Policy>['columnDefs'] = [
  {
    field: 'policyNumber',
    headerName: 'Policy ID',
    cellRenderer: createTextCellRenderer<Policy>({
      icon: params => params.data?.icon,
      position: 'after',
    }),
  },
  { field: 'holder', headerName: 'Holder' },
  { field: 'premium', headerName: 'Premium (CHF)' },
  {
    field: 'status',
    headerName: 'Status',
    cellRenderer: createTagCellRenderer<Policy>({
      color: params => STATUS_TAG_COLORS[params.value as string] ?? 'grey',
    }),
  },
  {
    field: 'openClaims',
    headerName: 'Open Claims',
    cellRenderer: createBadgeCellRenderer<Policy>({
      color: 'danger',
    }),
  },
  {
    headerName: 'Actions',
    field: 'policyNumber',
    cellRenderer: createButtonCellRenderer<Policy>([
      { label: 'Edit', color: 'secondary', onClick: params => console.log('Edit', params.data?.policyNumber) },
      { label: 'Delete', color: 'danger', onClick: params => console.log('Delete', params.data?.policyNumber) },
    ]),
    sortable: false,
    filter: false,
  },
]

const renderGrid = (container: HTMLElement) => {
  // `position: fixed` would pull the container out of normal flow, collapsing the Docs
  // `<Canvas>` iframe (and its measured height) to 0 — use a normal-flow, explicitly
  // sized container instead so the grid renders inside both Canvas and the standalone story.
  container.style.boxSizing = 'border-box'
  container.style.height = '510px'
  container.style.padding = '1rem'

  const gridDiv = document.createElement('div')
  gridDiv.style.height = '100%'
  container.appendChild(gridDiv)
  createGrid(gridDiv, {
    theme: helvetiaGridTheme,
    columnDefs,
    rowData,
    rowSelection: { mode: 'multiRow' },
    // AG Grid measures the header row's border width once, at mount, to size the header
    // container tall enough to show it. That first measurement can land before the design
    // tokens are applied, so the header stays 2px too short and clips the border down to 1px.
    // Re-asserting `headerHeight` with its own rendered value forces AG Grid to re-measure
    // and size the header correctly, without changing its visible height.
    onGridReady: params => {
      requestAnimationFrame(() => {
        const headerRowHeight = gridDiv.querySelector('.ag-header-row')?.clientHeight
        if (headerRowHeight) {
          params.api.setGridOption('headerHeight', headerRowHeight + 1)
          params.api.setGridOption('headerHeight', headerRowHeight)
        }
      })
    },
  })
}

const meta: Meta = {
  title: 'Components/AG Grid/Theme',
}

export default meta

/**
 * `` themes AG Grid's headers and cells using
 * `var(--ds-alias-*)` params, which re-resolve automatically against
 * whichever brand's token cascade is active. Use the "Theme" toggle in the
 * toolbar above to switch between Helvetia and TCS — TCS tokens aren't
 * populated yet, so no visible color/font change is expected there.
 */
export const Basic: StoryObj = {
  render: () => {
    const container = document.createElement('div')
    renderGrid(container)
    return container
  },
}
Basic.storyName = '🧩 Basic'
