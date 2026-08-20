import { baloiseGridTheme } from '@baloise/ds-ag-grid'
import { AllCommunityModule, createGrid, ModuleRegistry, type GridOptions } from 'ag-grid-community'
import type { Meta, StoryObj } from '@storybook/html-vite'

ModuleRegistry.registerModules([AllCommunityModule])

interface Policy {
  policyNumber: string
  holder: string
  product: string
  premium: number
  status: string
}

const rowData: Policy[] = [
  { policyNumber: 'POL-1001', holder: 'Anna Keller', product: 'Home', premium: 480, status: 'Active' },
  { policyNumber: 'POL-1002', holder: 'Marco Rossi', product: 'Car', premium: 720, status: 'Active' },
  { policyNumber: 'POL-1003', holder: 'Sophie Dubois', product: 'Life', premium: 1250, status: 'Active' },
  { policyNumber: 'POL-1004', holder: 'Lukas Meier', product: 'Travel', premium: 95, status: 'Pending' },
  { policyNumber: 'POL-1005', holder: 'Julia Steiner', product: 'Home', premium: 510, status: 'Active' },
  { policyNumber: 'POL-1006', holder: 'David Fischer', product: 'Liability', premium: 210, status: 'Cancelled' },
  { policyNumber: 'POL-1007', holder: 'Elena Brunner', product: 'Car', premium: 690, status: 'Active' },
  { policyNumber: 'POL-1008', holder: 'Thomas Weber', product: 'Life', premium: 1400, status: 'Pending' },
  { policyNumber: 'POL-1009', holder: 'Nina Baumann', product: 'Travel', premium: 110, status: 'Active' },
  { policyNumber: 'POL-1010', holder: 'Felix Huber', product: 'Home', premium: 495, status: 'Active' },
]

const columnDefs: GridOptions<Policy>['columnDefs'] = [
  { field: 'policyNumber', headerName: 'Policy #' },
  { field: 'holder', headerName: 'Holder' },
  { field: 'product', headerName: 'Product' },
  { field: 'premium', headerName: 'Premium (CHF)' },
  { field: 'status', headerName: 'Status' },
]

const renderGrid = (container: HTMLElement) => {
  container.style.position = 'fixed'
  container.style.inset = '0'
  container.style.boxSizing = 'border-box'
  container.style.padding = '1rem'

  const gridDiv = document.createElement('div')
  gridDiv.style.height = '100%'
  container.appendChild(gridDiv)
  createGrid(gridDiv, { theme: baloiseGridTheme, columnDefs, rowData })
}

const meta: Meta = {
  title: 'Components/AG Grid/Theme',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

/**
 * `baloiseGridTheme` themes AG Grid's headers and cells using
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
