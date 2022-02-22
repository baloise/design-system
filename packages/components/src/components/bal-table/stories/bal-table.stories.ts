import { onMounted } from 'vue'
import { Grid } from 'ag-grid-community'

import { BalComponentStory } from '../../../stories/utils'
import { BalTable, BalIcon, BalCheckbox, BalButton, BalTag, BalCard } from '../../../../.storybook/vue/components'
import docs from './bal-table.docs.mdx'
import { tableHtml } from './bal-table.templates.ts'

import {
  BalTableButtonRenderer,
  BalTableTagRenderer,
  BalTableTextRenderer,
} from '../../../../../components-table/dist/index.esm.js'

const component = BalComponentStory({
  component: BalTable,
  docs,
  layout: 'fullscreen',
})

export default component.story

export const HtmlTable = args => ({
  components: { ...component.components, BalIcon, BalCheckbox, BalButton, BalTag, BalCard },
  setup: () => ({ args }),
  template: tableHtml,
})
HtmlTable.parameters = { ...component.sourceCode(HtmlTable) }

export const AgGrid = args => ({
  components: { ...component.components, BalIcon, BalCheckbox, BalButton, BalTag, BalCard },
  setup: () => {
    onMounted(() => {
      const columnDefs = [
        { field: '', sortable: true, filter: true, checkboxSelection: true },
        { field: 'number', sortable: true, filter: true },
        {
          field: 'textWithIcon',
          sortable: true,
          filter: true,
          cellRenderer: BalTableTextRenderer({
            icon: _ => 'github',
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
            icon: 'github',
          }),
        },
      ]

      // specify the data
      const rowData = [
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

      function onFirstDataRendered(params) {
        params.api.sizeColumnsToFit()
      }

      // let the grid know which columns and what data to use
      const gridOptions: any = {
        columnDefs: columnDefs,
        rowData: rowData,
        rowSelection: 'multiple',
        onFirstDataRendered: onFirstDataRendered,
        onGridReady: function (params) {
          params.api.sizeColumnsToFit()

          window.addEventListener('resize', function () {
            setTimeout(function () {
              params.api.sizeColumnsToFit()
            })
          })
        },
      }

      // setup the grid after the page has finished loading
      setTimeout(() => {
        const gridDiv = document.querySelector('#myGrid') as any
        new Grid(gridDiv, gridOptions)
        gridOptions.api.sizeColumnsToFit()
      })
    })

    return { args }
  },
  template: `<bal-table class="p-0" id="myGrid" style="height: 250px; width: 100%"></bal-table>`,
})
AgGrid.parameters = { ...component.sourceCode(AgGrid) }
