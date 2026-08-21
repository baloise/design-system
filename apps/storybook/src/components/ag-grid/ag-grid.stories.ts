import { helvetiaGridTheme } from '@baloise/ds-ag-grid'
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
}

const rowData: Policy[] = [
  { policyNumber: 'POL-1001', holder: 'Anna Keller', product: 'Home', premium: 480, status: 'Active', openClaims: 0 },
  { policyNumber: 'POL-1002', holder: 'Marco Rossi', product: 'Car', premium: 720, status: 'Active', openClaims: 2 },
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
  { field: 'policyNumber', headerName: 'Policy ID' },
  { field: 'holder', headerName: 'Holder' },
  { field: 'premium', headerName: 'Premium (CHF)' },
  {
    field: 'status',
    headerName: 'Status',
    cellRenderer: (params: { value: string }) => {
      const wrapper = document.createElement('div')
      wrapper.style.display = 'flex'
      wrapper.style.height = '100%'
      wrapper.style.alignItems = 'center'

      const tag = document.createElement('ds-tag')
      tag.textContent = params.value
      tag.setAttribute('size', 'sm')
      tag.setAttribute('color', STATUS_TAG_COLORS[params.value] ?? 'grey')

      wrapper.append(tag)
      return wrapper
    },
  },
  {
    field: 'openClaims',
    headerName: 'Open Claims',
    cellRenderer: (params: { value: number }) => {
      const wrapper = document.createElement('div')
      wrapper.style.display = 'flex'
      wrapper.style.height = '100%'
      wrapper.style.alignItems = 'center'

      if (params.value > 0) {
        const badge = document.createElement('ds-badge')
        badge.textContent = String(params.value)
        badge.setAttribute('color', 'danger')
        wrapper.append(badge)
      }

      return wrapper
    },
  },
  {
    headerName: 'Actions',
    field: 'policyNumber',
    cellRenderer: (params: { data: Policy }) => {
      const wrapper = document.createElement('div')
      wrapper.style.display = 'flex'
      wrapper.style.gap = '0.5rem'
      wrapper.style.height = '100%'
      wrapper.style.alignItems = 'center'

      const editButton = document.createElement('ds-button')
      editButton.textContent = 'Edit'
      editButton.setAttribute('size', 'sm')
      editButton.setAttribute('color', 'secondary')
      editButton.addEventListener('click', () => console.log('Edit', params.data.policyNumber))

      const deleteButton = document.createElement('ds-button')
      deleteButton.textContent = 'Delete'
      deleteButton.setAttribute('size', 'sm')
      deleteButton.setAttribute('color', 'danger')
      deleteButton.addEventListener('click', () => console.log('Delete', params.data.policyNumber))

      wrapper.append(editButton, deleteButton)
      return wrapper
    },
    sortable: false,
    filter: false,
  },
]

const renderGrid = (container: HTMLElement) => {
  container.style.position = 'fixed'
  container.style.inset = '0'
  container.style.boxSizing = 'border-box'
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
    onGridReady: (params) => {
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
  parameters: {
    layout: 'fullscreen',
  },
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
