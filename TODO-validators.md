# TODO Validator

Check all components and sub-components so all stencil components and adjust the validators.

We defined two task to change. Please update all the props and there Anotation and also if necessary update the type like TAG_COLORS to have the enum item ''.

## 1.ValidateEmptyOrType to ValidateType

```ts
@Prop()
@ValidateEmptyOrType('<type>')
readonly closable: <type> = false

// or
@Prop()
@ValidateEmptyOrType('<type>')
readonly closable?: <type>
```

to

```ts
@Prop()
@ValidateType('<type>')
readonly closable: <type> = false
```

## 2. ValidateEmptyOrOneOf to ValidateOneOf

```ts
@Prop()
@ValidateEmptyOrOneOf(...TAG_COLORS)
readonly color: TagColor = ''

// or
@Prop()
@ValidateEmptyOrOneOf(...TAG_COLORS)
readonly color?: TagColor
```

to

```ts
@Prop()
@ValidateOneOf(...TAG_COLORS)
readonly color: TagColor = ''
```

## Progress

| Component        | Done |
| ---------------- | ---- |
| heading          | ⬜   |
| text             | ⬜   |
| label            | ⬜   |
| link             | ⬜   |
| stack            | ⬜   |
| divider          | ⬜   |
| tag              | ⬜   |
| button           | ⬜   |
| notification     | ⬜   |
| unordered-list   | ⬜   |
| ordered-list     | ⬜   |
| description-list | ⬜   |
| card             | ⬜   |
| accordion        | ⬜   |
| list             | ⬜   |
| icon             | ⬜   |
| spinner          | ⬜   |
| logo             | ⬜   |
| close            | ⬜   |
| badge            | ⬜   |
| toast            | ⬜   |
| snackbar         | ⬜   |
| input            | ⬜   |
| textarea         | ⬜   |
| shape            | ⬜   |
| stage            | ⬜   |
| input            | ⬜   |
| textarea         | ⬜   |
| radio            | ⬜   |
| checkbox         | ⬜   |
| segment          | ⬜   |
| app              | ⬜   |
| number-input     | ⬜   |
| progress-bar     | ⬜   |
| pagination       | ⬜   |
