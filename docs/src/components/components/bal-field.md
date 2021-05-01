# bal-field

A field wrappes a form field like input. It provides a clear style structure of each control.

## Basic

<ClientOnly>  <docs-demo-bal-field-41></docs-demo-bal-field-41></ClientOnly>

```html
<bal-card padding="form">
  <bal-card-content>
    <bal-field expanded>
      <bal-field-label required>Firstname</bal-field-label>
      <bal-field-hint subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
      <bal-field-control>
        <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
      </bal-field-control>
      <bal-field-message color="danger">Required Field</bal-field-message>
    </bal-field>

    <bal-field expanded disabled loading>
      <bal-field-label>Lastname</bal-field-label>
      <bal-field-control>
        <bal-input name="lastname" placeholder="Enter your lastname" value="Parker"></bal-input>
      </bal-field-control>
      <bal-field-message color="warning">Correct</bal-field-message>
    </bal-field>

    <bal-field expanded>
      <bal-field-label>Alias</bal-field-label>
      <bal-field-control icon-left="account" icon-right="check">
        <bal-input name="alias" placeholder="Enter your alias" value="Spider-Man"></bal-input>
      </bal-field-control>
      <bal-field-message color="success">Correct</bal-field-message>
    </bal-field>

    <bal-field expanded>
      <bal-field-label>Comment</bal-field-label>
      <bal-field-control>
        <bal-textarea name="comment" placeholder="Enter your comment"></bal-textarea>
      </bal-field-control>
      <bal-field-message>Some Message</bal-field-message>
    </bal-field>
  </bal-card-content>
</bal-card>
```

## Inverted

<ClientOnly>  <docs-demo-bal-field-42></docs-demo-bal-field-42></ClientOnly>

```html
<bal-card padding="form" color="info" inverted>
  <bal-card-content>
    <bal-field expanded inverted loading>
      <bal-field-label required>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input id="bal-input-1" name="firstName" placeholder="Enter your firstname"></bal-input>
      </bal-field-control>
      <bal-field-message color="danger">Required Field</bal-field-message>
    </bal-field>

    <bal-field expanded inverted disabled>
      <bal-field-label>Alias</bal-field-label>
      <bal-field-control icon-left="account" icon-right="check">
        <bal-input name="alias" placeholder="Enter your alias" value="Spider-Man"></bal-input>
      </bal-field-control>
      <bal-field-message>Some Message</bal-field-message>
    </bal-field>
  </bal-card-content>
</bal-card>
```

## Form

<ClientOnly>  <docs-demo-bal-field-43></docs-demo-bal-field-43></ClientOnly>

```html
<bal-card padding="form">
  <bal-card-content>
    <bal-field expanded>
      <bal-field-label required>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input name="firstName" placeholder="Enter your firstname"></bal-input>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded>
      <bal-field-label required>Year</bal-field-label>
      <bal-field-control>
        <bal-select id="bal-select-year" placeholder="select a year">
          <bal-select-option value="1995" label="1995">1995</bal-select-option>
          <bal-select-option value="1996" label="1996">1996</bal-select-option>
          <bal-select-option value="1997" label="1997">1997</bal-select-option>
          <bal-select-option value="1998" label="1998">1998</bal-select-option>
          <bal-select-option value="1999" label="1999">1999</bal-select-option>
          <bal-select-option value="2000" label="2000">2000</bal-select-option>
        </bal-select>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded>
      <bal-field-label required>Birthdate</bal-field-label>
      <bal-field-control>
        <bal-datepicker placeholder="pick a date"></bal-datepicker>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded>
      <bal-field-label required>Remember me?</bal-field-label>
      <bal-field-control>
        <bal-checkbox label="Yes"></bal-checkbox>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded>
      <bal-field-label required>How many cars do you have?</bal-field-label>
      <bal-field-control>
        <bal-radio-group value="2" id="radio-example">
          <bal-radio label="Label 1" name="radio-example" value="1"></bal-radio>
          <bal-radio label="Label 2" name="radio-example" value="2"></bal-radio>
          <bal-radio label="Label 3" name="radio-example" value="3"></bal-radio>
          <bal-radio label="Label Disabled" name="radio-example" value="4" disabled></bal-radio>
        </bal-radio-group>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded>
      <bal-field-label required>Are you sure?</bal-field-label>
      <bal-field-control>
        <bal-radio-group value="yes" interface="select-button">
          <bal-radio label="Yes" name="select-button-example-2" value="yes"></bal-radio>
          <bal-radio label="No" name="select-button-example-2" value="no"></bal-radio>
        </bal-radio-group>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
  </bal-card-content>
</bal-card>
```

## Validation for all fields

This is not a recommanded validation style. Only use this style if you do not have the possibility to use live validation.

<ClientOnly>  <docs-demo-bal-field-44></docs-demo-bal-field-44></ClientOnly>

```html
<bal-card padding="form">
  <bal-card-content>
    <bal-field expanded invalid>
      <bal-field-label required>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input name="firstName" placeholder="Enter your firstname"></bal-input>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded invalid>
      <bal-field-label required>Year</bal-field-label>
      <bal-field-control>
        <bal-select id="bal-select-year" placeholder="select a year">
          <bal-select-option value="1995" label="1995">1995</bal-select-option>
          <bal-select-option value="1996" label="1996">1996</bal-select-option>
          <bal-select-option value="1997" label="1997">1997</bal-select-option>
          <bal-select-option value="1998" label="1998">1998</bal-select-option>
          <bal-select-option value="1999" label="1999">1999</bal-select-option>
          <bal-select-option value="2000" label="2000">2000</bal-select-option>
        </bal-select>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded invalid>
      <bal-field-label required>Birthdate</bal-field-label>
      <bal-field-control>
        <bal-datepicker placeholder="pick a date"></bal-datepicker>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded invalid>
      <bal-field-label required>Remember me?</bal-field-label>
      <bal-field-control>
        <bal-checkbox label="Yes"></bal-checkbox>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded invalid>
      <bal-field-label required>How many cars do you have?</bal-field-label>
      <bal-field-control>
        <bal-radio-group value="2" id="radio-example">
          <bal-radio label="Label 1" name="radio-example" value="1"></bal-radio>
          <bal-radio label="Label 2" name="radio-example" value="2"></bal-radio>
          <bal-radio label="Label 3" name="radio-example" value="3"></bal-radio>
          <bal-radio label="Label Disabled" name="radio-example" value="4" disabled></bal-radio>
        </bal-radio-group>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-field expanded invalid>
      <bal-field-label required>Are you sure?</bal-field-label>
      <bal-field-control>
        <bal-radio-group value="yes" interface="select-button">
          <bal-radio label="Yes" name="select-button-example-2" value="yes"></bal-radio>
          <bal-radio label="No" name="select-button-example-2" value="no"></bal-radio>
        </bal-radio-group>
      </bal-field-control>
      <bal-field-message></bal-field-message>
    </bal-field>
    <bal-notification color="danger">
      <span class="icon-text">
        <span class="icon">
          <bal-icon inverted name="alert-circle"></bal-icon>
        </span>
        <span style="margin-left: 10px">
          <strong style="margin-right: 10px"> Your Form is invalid. Please check your input and try it again. !</strong>
          <ul>
            <li>Your Name is required</li>
            <li>...</li>
          </ul>
        </span>
      </span>
    </bal-notification>
  </bal-card-content>
</bal-card>
```


## API

### bal-field

#### Properties

| Attribute    | Description                                                                                 | Type      | Default |
| :----------- | :------------------------------------------------------------------------------------------ | :-------- | :------ |
| **disabled** | If `true` the field loses opacity                                                           | `boolean` | `false` |
| **expanded** | If `true` the component takes the whole width                                               | `boolean` | `false` |
| **invalid**  | If `true` the component gets a invalid style. Only use this if there is no live validation. | `boolean` | `false` |
| **inverted** | If `true` the field can be used on blue background.                                         | `boolean` | `false` |
| **loading**  | If `true` a loading spinner is visible at the end of the input                              | `boolean` | `false` |

### bal-field-control


# bal-field-control

`bal-field-control` is a child component of `bal-field`.


#### Properties

| Attribute      | Description                                                    | Type      | Default |
| :------------- | :------------------------------------------------------------- | :-------- | :------ |
| **icon-left**  | Baloise icon for the left side of the input                    | `string`  | `''`    |
| **icon-right** | Baloise icon for the right side of the input                   | `string`  | `''`    |
| **inverted**   | If `true` the field can be used on blue background.            | `boolean` | `false` |
| **loading**    | If `true` a loading spinner is visible at the end of the input | `boolean` | `false` |

### bal-field-hint


# bal-field-hint

`bal-field-hint` is a child component of `bal-field`.

#### Properties

| Attribute   | Description              | Type     | Default |
| :---------- | :----------------------- | :------- | :------ |
| **subject** | Text of the inputs label | `string` | `''`    |

### bal-field-label


# bal-field-label

`bal-field-label` is a child component of `bal-field`.


#### Properties

| Attribute    | Description                                        | Type      | Default |
| :----------- | :------------------------------------------------- | :-------- | :------ |
| **required** | If `true` a asterix (*) is added to the label text | `boolean` | `false` |

### bal-field-message


# bal-field-message

`bal-field-message` is a child component of `bal-field`.


#### Properties

| Attribute | Description                       | Type                                    | Default |
| :-------- | :-------------------------------- | :-------------------------------------- | :------ |
| **color** | Defines the color of the message. | `"" , "danger" , "success" , "warning"` | `''`    |






## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-field)
