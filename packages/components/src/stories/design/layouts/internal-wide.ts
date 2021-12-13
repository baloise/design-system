export const InternalWideAppTemplate = `
<div class="bal-app bal-app-background has-sticky-footer">
  <header class="has-background-white">
    <bal-navbar no-burger>
      <bal-navbar-brand>
        <bal-icon name="logo" inverted size="large"></bal-icon>
        <bal-text style="margin-left: 15px">
          <strong>Wide</strong>
        </bal-text>
      </bal-navbar-brand>
    </bal-navbar>
  </header>
  <main>
    <div class="m-7">
      <bal-card>
        <bal-card-title>Table of ****</bal-card-title>
        <bal-card-subtitle>Subtitle</bal-card-subtitle>
        <bal-card-content>
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
                <td>
                    <bal-tag size="small" color="success">Ready</bal-tag>
                </td>
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
                <td>
                    <bal-tag size="small" color="danger">Injured</bal-tag>
                </td>
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
                <td>
                    <bal-tag size="small" color="warning">In school</bal-tag>
                </td>
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
                <td>
                    <bal-tag size="small">Unknown</bal-tag>
                </td>
                <td class="has-buttons">
                    <bal-button color="info" size="small" icon="edit" square outlined></bal-button>
                    <bal-button color="info" size="small" icon="trash" square outlined></bal-button>
                </td>
            </tr>
        </tbody>
    </table>
        </bal-card-content>
        <bal-card-actions>
          <bal-pagination page-range="3" total-pages="20" value="2"></bal-pagination>
        </bal-card-actions>
      </bal-card>
    </div>
  </main>
  <bal-footer has-track-line hide-links>
    <div class="mx-7">
    TODO: add language switcher
    </div>
  </bal-footer>
</div>`
