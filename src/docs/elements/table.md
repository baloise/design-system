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
                <div class="bal-checkbox">
                    <input type="checkbox" id="checkbox1"/>
                    <label for="checkbox1"></label>
                </div>
            </td>
            <td>Tony Stark</td>
            <td><bal-tag type="is-success">Ready</bal-tag></td>
            <td class="has-buttons">
                <div class="buttons">
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="edit" size="medium"></bal-icon>
                    </bal-button>
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="trash" size="medium"></bal-icon>
                    </bal-button>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="bal-checkbox">
                    <input type="checkbox" id="checkbox2"/>
                    <label for="checkbox2"></label>
                </div>
            </td>
            <td>Steve Rogers</td>
            <td><bal-tag type="is-danger">Injured</bal-tag></td>
            <td class="has-buttons">
                <div class="buttons">
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="edit" size="medium"></bal-icon>
                    </bal-button>
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="trash" size="medium"></bal-icon>
                    </bal-button>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="bal-checkbox">
                    <input type="checkbox" id="checkbox3"/>
                    <label for="checkbox3"></label>
                </div>
            </td>
            <td>Peter Parker</td>
            <td><bal-tag type="is-warning">In school</bal-tag></td>
            <td class="has-buttons">
                <div class="buttons">
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="edit" size="medium"></bal-icon>
                    </bal-button>
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="trash" size="medium"></bal-icon>
                    </bal-button>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="bal-checkbox">
                    <input type="checkbox" id="checkbox4"/>
                    <label for="checkbox4"></label>
                </div>
            </td>
            <td>John Doe</td>
            <td><bal-tag>Unknown</bal-tag></td>
            <td class="has-buttons">
                <div class="buttons">
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="edit" size="medium"></bal-icon>
                    </bal-button>
                    <bal-button type="is-info" size="is-small" outlined>
                        <bal-icon name="trash" size="medium"></bal-icon>
                    </bal-button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
```
