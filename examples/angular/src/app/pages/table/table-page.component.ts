import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { GridApi, ColumnApi } from 'ag-grid-community'
import {
  BalTableTextRenderer,
  BalTableTagRenderer,
  BalTableButtonRenderer,
} from '@baloise/design-system-components-table'

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
})
export class TablePageComponent {
  private gridApi!: GridApi
  private gridColumnApi!: ColumnApi

  columnDefs = [
    { field: '', sortable: true, filter: true, checkboxSelection: true },
    { field: 'number', sortable: true, filter: true },
    {
      field: 'textWithIcon',
      sortable: true,
      filter: true,
      cellRenderer: BalTableTextRenderer({
        icon: params => 'github',
        iconColor: params => 'primary',
      }),
    },
    {
      field: 'tag',
      sortable: true,
      filter: true,
      cellRenderer: BalTableTagRenderer({
        color: params => (params.value === 'Invalid' ? 'danger' : 'success'),
      }),
    },
    {
      field: 'button',
      sortable: true,
      filter: true,
      cellRenderer: BalTableButtonRenderer({
        expanded: true,
        icon: 'github',
      }),
    },
  ]

  rowData = [
    {
      number: '1',
      textWithIcon: 'Base Text',
      tag: 'OK',
      button: 'Action',
    },
    {
      number: '2',
      textWithIcon: 'Base Text',
      tag: 'Invalid',
      button: 'Action',
    },
    {
      number: '3',
      textWithIcon: 'Base Text',
      tag: 'OK',
      button: 'Action',
    },
  ]

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['first'])
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi }) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    this.gridApi.sizeColumnsToFit()

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.gridApi.sizeColumnsToFit()
      })
    })
  }
}
