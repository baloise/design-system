# Input

We only use bulma style for the input element, in order that we can use `ngModel` or `v-model` in our frameworks.

## Usage

```html
<input class="input" placeholder="Placeholder Text" />
<input class="input" value="Lorem Ipsum" />
```

### Inverted style

```html
<div class="has-background-info is-padded">
    <input class="input is-inverted" placeholder="Placeholder Text" />
    <input class="input is-inverted" value="Lorem Ipsum" />
</div>
```

### Disabled

```html
<input class="input" placeholder="Placeholder Text" disabled />
<input class="input" disabled value="Lorem Ipsum" />
```

### Inverted style

```html
<div class="has-background-info is-padded">
<input class="input is-inverted" placeholder="Placeholder Text" disabled />
<input class="input is-inverted" disabled value="Lorem Ipsum" />
</div>
```
