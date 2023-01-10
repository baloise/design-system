<bal-doc-banner id="anchor--development-form--page" subtitle="Development">Form</bal-doc-banner>

<bal-doc-lead>
The indispensable form controls, designed for maximum clarity.
Form elements are used in combination with the CSS grid system.
</bal-doc-lead>

## Form fields

A basic form field has his container element `bal-field` and 3 child elements:

- `bal-field-label` for adding a label to the form control.
- `bal-field-control` to contain the control like an input.
- `bal-field-message` to show validation message or helper messages.

<bal-doc-preview>
  <bal-field class="column is-full py-none">
    <bal-field-label>Firstname</bal-field-label>
    <bal-field-control>
      <bal-input placeholder="Enter your firstname"></bal-input>
    </bal-field-control>
    <bal-field-message color="danger">Required Field</bal-field-message>
  </bal-field>
</bal-doc-preview>

```html
<bal-field>
  <bal-field-label>Firstname</bal-field-label>
  <bal-field-control>
    <bal-input placeholder="Enter your firstname"></bal-input>
  </bal-field-control>
  <bal-field-message color="danger">Required Field</bal-field-message>
</bal-field>
```

## Form Grid

To combine form fields / controls to a bigger form use the [Form Grid component](?path=/docs/components-form-form-grid--basic).

<bal-doc-preview>
  <form className="has-background-white">
    <bal-form-grid>
      <bal-form-col>
        <bal-field>
          <bal-field-control>
            <bal-radio-group>
              <bal-radio name="gender" value="male">
                Male
              </bal-radio>
              <bal-radio name="gender" value="female">
                Female
              </bal-radio>
            </bal-radio-group>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
      <bal-form-col size="half">
        <bal-field>
          <bal-field-label>Firstname</bal-field-label>
          <bal-field-control>
            <bal-input placeholder="Enter your firstname"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
      <bal-form-col size="half">
        <bal-field>
          <bal-field-label>Lastname</bal-field-label>
          <bal-field-control>
            <bal-input placeholder="Enter your lastname"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
    </bal-form-grid>
  </form>
</bal-doc-preview>

```html
<bal-form-grid>
  <bal-form-col>
    <bal-field>
      <bal-field-control>
        <bal-radio-group>
          <bal-radio name="gender" value="male"> Male </bal-radio>
          <bal-radio name="gender" value="female"> Female </bal-radio>
        </bal-radio-group>
      </bal-field-control>
    </bal-field>
  </bal-form-col>
  <bal-form-col size="half">
    <bal-field>
      <bal-field-label>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Enter your firstname"></bal-input>
      </bal-field-control>
    </bal-field>
  </bal-form-col>
  <bal-form-col size="half">
    <bal-field>
      <bal-field-label>Lastname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Enter your lastname"></bal-input>
      </bal-field-control>
    </bal-field>
  </bal-form-col>
</bal-form-grid>
```
