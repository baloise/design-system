export const InternalFormAppTemplate = `
<div class="bal-app bal-app-background has-sticky-footer">
  <header class="has-background-white">
    <bal-navbar no-burger>
      <bal-navbar-brand>
        <bal-icon name="logo" inverted size="large"></bal-icon>
        <bal-text style="margin-left: 15px">
          <strong>Form</strong>
        </bal-text>
      </bal-navbar-brand>
    </bal-navbar>
  </header>
  <main>
    <div class="container my-7">
      <bal-card>
        <bal-card-title level="h4" space="none">Contact Person</bal-card-title>
        <bal-card-subtitle level="h5" space="bottom">Subtitle</bal-card-subtitle>
        <bal-card-content>

        <form class="columns is-multiline mt-0">
      <bal-field class="column is-full py-0">
        <bal-field-control>
          <bal-radio-group>
            <bal-radio name="gender" value="male">Male</bal-radio>
            <bal-radio name="gender" value="female">Female</bal-radio>
          </bal-radio-group>
        </bal-field-control>
      </bal-field>
      <bal-field class="column is-half py-0" required>
        <bal-field-label required>Firstname</bal-field-label>
        <bal-field-control>
          <bal-input name="firstname" placeholder="Enter your firstname" required></bal-input>
        </bal-field-control>
      </bal-field>
      <bal-field class="column is-half py-0" required>
        <bal-field-label required>Lastname</bal-field-label>
        <bal-field-control>
          <bal-input name="lastname" placeholder="Enter your lastname" required></bal-input>
        </bal-field-control>
      </bal-field>
      <bal-field class="column is-half py-0" required>
        <bal-field-label required>Street</bal-field-label>
        <bal-field-control>
          <bal-input name="street" placeholder="Enter your street" required></bal-input>
        </bal-field-control>
      </bal-field>
      <div class="column is-half pb-0">
        <div class="columns">
          <bal-field class="column is-one-third py-0">
            <bal-field-label>Postal Code</bal-field-label>
            <bal-field-control>
              <bal-input name="postalCode" placeholder="4000" required></bal-input>
            </bal-field-control>
          </bal-field>
          <bal-field class="column is-two-thirds py-0">
            <bal-field-label>City</bal-field-label>
            <bal-field-control>
              <bal-input name="city" placeholder="Basel" required></bal-input>
            </bal-field-control>
          </bal-field>
        </div>
      </div>
      <bal-field class="column is-half py-0">
        <bal-field-label>Canton</bal-field-label>
        <bal-field-control>
          <bal-select placeholder="select your canton" formControlName="canton">
            <bal-select-option value="AG" label="AG">AG</bal-select-option>
            <bal-select-option value="BS" label="BS">BS</bal-select-option>
            <bal-select-option value="BL" label="BL">BL</bal-select-option>
          </bal-select>
        </bal-field-control>
      </bal-field>
      <bal-field class="column is-half py-0">
        <bal-field-label>Birthdate</bal-field-label>
        <bal-field-control>
          <bal-datepicker placeholder="Select your birthdate"></bal-datepicker>
        </bal-field-control>
      </bal-field>
      <bal-field class="column is-full py-0">
        <bal-field-control>
          <bal-checkbox>Checkbox</bal-checkbox>
        </bal-field-control>
      </bal-field>
      <bal-field class="column is-full py-0">
        <bal-field-label>Comment</bal-field-label>
        <bal-field-control>
          <bal-textarea name="comment" placeholder="Enter your comment"></bal-textarea>
        </bal-field-control>
      </bal-field>
    </form>
    </bal-card-content>
        <bal-card-actions position="right">
          <bal-button>Save</bal-button>
          <bal-button color="link">Cancel</bal-button>
        </bal-card-actions>
      </bal-card>
    </div>
  </main>
  <bal-footer has-track-line hide-links>
    TODO: add language switcher
  </bal-footer>
</div>`
