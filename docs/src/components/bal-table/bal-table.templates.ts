export const tableHtml = `<table class="table w-full is-striped is-hoverable p-none">
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
      <td><bal-tag color="green">Ready</bal-tag></td>
      <td class="has-buttons">
        <bal-button color="info" size="small" icon="edit" square="true" outlined="true"></bal-button>
        <bal-button color="info" size="small" icon="trash" square="true" outlined="true"></bal-button>
      </td>
    </tr>
    <tr>
      <td>
        <bal-checkbox id="checkbox2"></bal-checkbox>
      </td>
      <td>Steve Rogers</td>
      <td><bal-tag size="" color="red">Injured</bal-tag></td>
      <td class="has-buttons">
        <bal-button color="info" size="small" icon="edit" square="true" outlined="true"></bal-button>
        <bal-button color="info" size="small" icon="trash" square="true" outlined="true"></bal-button>
      </td>
    </tr>
    <tr>
      <td>
        <bal-checkbox id="checkbox3"></bal-checkbox>
      </td>
      <td>Peter Parker</td>
      <td><bal-tag size="" color="yellow">In school</bal-tag></td>
      <td class="has-buttons">
        <bal-button color="info" size="small" icon="edit" square="true" outlined="true"></bal-button>
        <bal-button color="info" size="small" icon="trash" square="true" outlined="true"></bal-button>
      </td>
    </tr>
    <tr>
      <td>
        <bal-checkbox id="checkbox4"></bal-checkbox>
      </td>
      <td>John Doe</td>
      <td><bal-tag size="" color="purple">Unknown</bal-tag></td>
      <td class="has-buttons">
        <bal-button color="info" size="small" icon="edit" square="true" outlined="true"></bal-button>
        <bal-button color="info" size="small" icon="trash" square="true" outlined="true"></bal-button>
      </td>
    </tr>
  </tbody>
</table>`
