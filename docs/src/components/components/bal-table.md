---
sidebarDepth: 0
---

# Table




<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

The basic table is only css and html provided by the bulma framework.

[Go to the Bulma documentation](https://bulma.io/documentation/elements/table/)

<ClientOnly><docs-demo-bal-table-101></docs-demo-bal-table-101></ClientOnly>


### Advanced with AG-Grid

<Content slot-key="bal-table-ag-grid" ></Content>
<ClientOnly><docs-demo-bal-table-102></docs-demo-bal-table-102></ClientOnly>



## Code



### Properties


| Attribute    | Description                          | Type      | Default |
| :----------- | :----------------------------------- | :-------- | :------ |
| **expanded** | If `true` the table has a full width | `boolean` | `false` |




## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-table.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-table)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balTable"></docs-component-script>
</ClientOnly>

<!-- START: human documentation slots -->

:::: slot bal-table-ag-grid

::: danger <img src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" style="width: 32px">Angular

To use AG-Grid with angular install the package `ag-grid-angular`

```bash
npm install --save ag-grid-community ag-grid-angular
npm install # in certain circumstances npm will perform an "auto prune". This step ensures all expected dependencies are | present
```

After installing the AG-Grid add the component in our html component file.

```html
<ag-grid-angular
  class="ag-theme-alpine"
  style="width: 100%; height: 400px"
  [rowData]="rowData"
  [columnDefs]="columnDefs"
  (gridReady)="onGridReady($event)"
>
</ag-grid-angular>
```

Define the `columnDefs` and `rowData` as described in the AG-Grid documentation. Moreover, if your table has 100% of width it is helpful to use the `gridApi.sizeColumnsToFit()` function to resize the table.

```typescript
import { GridApi, ColumnApi } from 'ag-grid-community'

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
})
export class TablePageComponent {
  private gridApi!: GridApi
  private gridColumnApi!: ColumnApi

  columnDefs = [...]
  rowData = [...]

  constructor(private router: Router) {}

  // every time the window gets resized the chart width gets adjusted if 100%.
  onGridReady(params: { api: GridApi }) {
    this.gridApi = params.api
    this.gridApi.sizeColumnsToFit()
    window.addEventListener('resize', () => {
      setTimeout(() => this.gridApi.sizeColumnsToFit())
    })
  }
}
```

**Links**

- [More documentation to AG-Grid with Angular](https://www.ag-grid.com/angular-grid/getting-started/)
- [Example implementation](https://github.com/baloise/design-system/tree/master/examples/angular)

:::

::::

<!-- END: human documentation slots -->