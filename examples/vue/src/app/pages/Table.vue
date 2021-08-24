<template>
  <bal-card class="mt-6">
    <bal-card-content>
      <bal-heading space="bottom">Table</bal-heading>

      <AgGridVue
        style="width: 500px; height: 300px"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :modules="modules"
      ></AgGridVue>
    </bal-card-content>
  </bal-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

export default defineComponent({
  components: { AgGridVue },
  data() {
    return {
      columnDefs: null as any,
      rowData: null as any,
      modules: [ClientSideRowModelModule],
    }
  },
  beforeMount() {
    this.columnDefs = [{ field: 'make' }, { field: 'model' }, { field: 'price' }]

    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 },
    ]
  },
})
</script>
