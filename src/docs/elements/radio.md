# Radio

Select an option from a set

## Usage

```html
<div class="bal-radio">
    <input type="radio" id="gender-male" name="gender" value="male"/>
    <label for="gender-male">Mr</label>
</div>
<div class="bal-radio">
    <input type="radio" id="gender-female" name="gender" value="female"/>
    <label for="gender-female">Ms</label>
</div>
<div class="bal-radio">
    <input type="radio" id="gender-other" name="gender" value="other" checked/>
    <label for="gender-other">Other</label>
</div>
```

### Inverted style

```html
<div class="has-background-info is-padded">
    <div class="bal-radio is-inverted">
        <input type="radio" id="gender-male-inverted" name="gender" value="male"/>
        <label for="gender-male-inverted">Mr</label>
    </div>
    <div class="bal-radio is-inverted">
        <input type="radio" id="gender-female-inverted" name="gender" value="female"/>
        <label for="gender-female-inverted">Ms</label>
    </div>
    <div class="bal-radio is-inverted">
        <input type="radio" id="gender-other-inverted" name="gender" value="other" checked/>
        <label for="gender-other-inverted">Other</label>
    </div>
</div>
```

### Disabled

```html
<div class="bal-radio">
    <input type="radio" id="salutation-mr" name="salutation" value="mr" disabled checked/>
    <label for="salutation-mr">Mr</label>
</div>
<div class="bal-radio">
    <input type="radio" id="salutation-ms" name="salutation" value="ms" disabled/>
    <label for="salutation-ms">Ms</label>
</div>
```
