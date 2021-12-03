export const tableHtml = `<bal-card>
  <table class="table is-fullwidth is-striped is-hoverable p-0">
    <thead>
      <th>Selected</th>
      <th>Name</th>
      <th>Status</th>
      <th></th>
    </thead>
    <tbody>
      <tr>
        <td>
          <bal-checkbox id="checkbox1"></bal-checkbox>
        </td>
        <td>Tony Stark</td>
        <td><bal-tag size="small" color="success">Ready</bal-tag></td>
        <td class="has-buttons">
          <bal-button color="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button color="info" size="small" icon="trash" square outlined></bal-button>
        </td>
      </tr>
      <tr>
        <td>
          <bal-checkbox id="checkbox2"></bal-checkbox>
        </td>
        <td>Steve Rogers</td>
        <td><bal-tag size="small" color="danger">Injured</bal-tag></td>
        <td class="has-buttons">
          <bal-button color="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button color="info" size="small" icon="trash" square outlined></bal-button>
        </td>
      </tr>
      <tr>
        <td>
          <bal-checkbox id="checkbox3"></bal-checkbox>
        </td>
        <td>Peter Parker</td>
        <td><bal-tag size="small" color="warning">In school</bal-tag></td>
        <td class="has-buttons">
          <bal-button color="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button color="info" size="small" icon="trash" square outlined></bal-button>
        </td>
      </tr>
      <tr>
        <td>
          <bal-checkbox id="checkbox4"></bal-checkbox>
        </td>
        <td>John Doe</td>
        <td><bal-tag size="small">Unknown</bal-tag></td>
        <td class="has-buttons">
          <bal-button color="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button color="info" size="small" icon="trash" square outlined></bal-button>
        </td>
      </tr>
    </tbody>
  </table>
</bal-card>
`
