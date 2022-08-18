export const ContactFormTemplate = `
<form action="https://www.w3schools.com/action_page.php" target="_blank">
  <bal-card>
    <bal-card-content>
      <bal-form-grid>

        <bal-form-col>
          <bal-field>
            <bal-field-control>
              <bal-radio-group>
                <bal-radio name="gender" value="male">Male</bal-radio>
                <bal-radio name="gender" value="female">Female</bal-radio>
              </bal-radio-group>
            </bal-field-control>
            <bal-field-message>Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Firstname</bal-field-label>
            <bal-field-control>
              <bal-input name="firstname" placeholder="Enter your firstname"></bal-input>
            </bal-field-control>
            <bal-field-message>Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Lastname</bal-field-label>
            <bal-field-control>
              <bal-input name="lastname" placeholder="Enter your lastname"></bal-input>
            </bal-field-control>
            <bal-field-message>Field Message</bal-field-message>
          </bal-field>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Street</bal-field-label>
            <bal-field-control>
              <bal-input name="street" placeholder="Enter your street"></bal-input>
            </bal-field-control>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-form-grid>
            <bal-form-col size="one-third">
              <bal-field required>
                <bal-field-label>Postal Code</bal-field-label>
                <bal-field-control>
                  <bal-input name="postalCode" placeholder="4000"></bal-input>
                </bal-field-control>
              </bal-field>
            </bal-form-col>
            <bal-form-col size="two-thirds">
              <bal-field required>
                <bal-field-label>City</bal-field-label>
                <bal-field-control>
                  <bal-input name="city" placeholder="Basel"></bal-input>
                </bal-field-control>
              </bal-field>
            </bal-form-col>
          </bal-form-grid>
        </bal-form-col>

        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Canton</bal-field-label>
            <bal-field-control>
              <bal-select placeholder="select your canton" name="canton">
                <bal-select-option value="AG" label="AG">AG</bal-select-option>
                <bal-select-option value="BS" label="BS">BS</bal-select-option>
                <bal-select-option value="BL" label="BL">BL</bal-select-option>
              </bal-select>
            </bal-field-control>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-field required>
            <bal-field-label>Birthdate</bal-field-label>
            <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
            <bal-field-control>
              <bal-datepicker min="2022-08-21" name="birthdate" placeholder="Select your birthdate"></bal-datepicker>
            </bal-field-control>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field required>
            <bal-field-control>
              <bal-checkbox name="checkbox">Checkbox</bal-checkbox>
            </bal-field-control>
          </bal-field>
        </bal-form-col>

        <bal-form-col>
          <bal-field required="false">
            <bal-field-label>Comment</bal-field-label>
            <bal-field-control>
              <bal-textarea name="comment" placeholder="Enter your comment"></bal-textarea>
            </bal-field-control>
          </bal-field>
        </bal-form-col>

      </bal-form-grid>
    </bal-card-content>
    <bal-card-actions position="right">
      <bal-button element-type="submit" color="primary">Submit</bal-button>
      <bal-button element-type="reset" color="link">Reset</bal-button>
    </bal-card-actions>
  </bal-card>
</form>`
