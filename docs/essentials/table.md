# Table

[Go to the Bulma documentation](https://bulma.io/documentation/elements/table/).

## Usage

```html
<table class="table is-fullwidth is-striped is-hoverable">
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
      <td><bal-tag type="success">Ready</bal-tag></td>
      <td class="has-buttons">
        <div class="buttons">
          <bal-button type="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button type="info" size="small" icon="trash" square outlined></bal-button>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <bal-checkbox id="checkbox2"></bal-checkbox>
      </td>
      <td>Steve Rogers</td>
      <td><bal-tag type="danger">Injured</bal-tag></td>
      <td class="has-buttons">
        <div class="buttons">
          <bal-button type="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button type="info" size="small" icon="trash" square outlined></bal-button>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <bal-checkbox id="checkbox3"></bal-checkbox>
      </td>
      <td>Peter Parker</td>
      <td><bal-tag type="warning">In school</bal-tag></td>
      <td class="has-buttons">
        <div class="buttons">
          <bal-button type="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button type="info" size="small" icon="trash" square outlined></bal-button>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <bal-checkbox id="checkbox4"></bal-checkbox>
      </td>
      <td>John Doe</td>
      <td><bal-tag>Unknown</bal-tag></td>
      <td class="has-buttons">
        <div class="buttons">
          <bal-button type="info" size="small" icon="edit" square outlined></bal-button>
          <bal-button type="info" size="small" icon="trash" square outlined></bal-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```
