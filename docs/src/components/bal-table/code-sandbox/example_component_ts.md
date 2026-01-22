```ts
import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core'
import { ColDef } from 'ag-grid-community'
import { AgGridModule } from 'ag-grid-angular'
import { BalTableTextRenderer, BalTableTagRenderer, BalTableButtonRenderer } from '@baloise/ds-table'

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AgGridModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  columnDefs: ColDef[] = [
    { field: '', sortable: true, filter: true, checkboxSelection: true },
    { field: 'number', sortable: true, filter: true },
    {
      field: 'textWithIcon',
      sortable: true,
      filter: true,
      cellRenderer: BalTableTextRenderer({
        icon: _ => 'date',
        iconColor: _ => 'primary',
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
        icon: 'plus',
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
}
```
