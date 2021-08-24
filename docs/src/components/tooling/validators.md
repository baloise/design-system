# Validators

The library serve a collection of validator functions.

<!-- generated content -->

## API

### isCustom

`isCustom(validatorFn: BalValidatorFn) => BalValidatorFn`

Returns `true` if the value date is before the given date

```typescript
BalValidators.isCustom((value) => value > 2)(3) // true
```

### isBefore

`isBefore(date: Date | string) => BalValidatorFn`

Returns `true` if the value date is before the given date

```typescript
BalValidators.isBefore('2000-01-02')('2000-01-01') // true
BalValidators.isBefore(new Date(2020, 0, 2))(new Date(2020, 0, 1)) // true
```

### isAfter

`isAfter(date: Date | string) => BalValidatorFn`

Returns `true` if the value date is before the given date

```typescript
BalValidators.isAfter('2000-01-01')('2000-01-02') // true
BalValidators.isAfter(new Date(2020, 0, 1))(new Date(2020, 0, 2)) // true
```

### isDate

`isDate() => BalValidatorFn`

Returns `true` if the value is valid date

```typescript
BalValidators.isDate()('2000-01-02') // true
BalValidators.isDate()(new Date(2000, 0, 1)) // true
```

### isMin

`isMin(min: number) => BalValidatorFn`

Returns `true` if the number is bigger or equal than the min number

```typescript
BalValidators.isMin(10)(10) // true
BalValidators.isMin(10)(11) // true
BalValidators.isMin(10)(9) // false
```

### isMax

`isMax(max: number) => BalValidatorFn`

Returns `true` if the number is smaller or equal than the max number

```typescript
BalValidators.isMax(10)(10) // true
BalValidators.isMax(10)(9) // true
BalValidators.isMax(10)(11) // false
```

### isNumber

`isNumber() => BalValidatorFn`

Returns `true` if the number is valid

```typescript
BalValidators.isNumber()(10) // true
BalValidators.isNumber()('a') // false
```

### isMonetaryNumber

`isMonetaryNumber() => BalValidatorFn`

Returns `true` if the value is a valid formatted number

```typescript
BalValidators.isMonetaryNumber()(10) // true
BalValidators.isMonetaryNumber()(`1'000.99`) // true
BalValidators.isMonetaryNumber()(`a`) // false
```

### matchesRegex

`matchesRegex(regex: RegExp) => BalValidatorFn`

Returns `true` if the value matches the regex

```typescript
BalValidators.matchesRegex(new RegExp('^\\d+$'))('1') // true
```

### isEmail

`isEmail() => BalValidatorFn`

Returns `true` if the value matches the regex

```typescript
BalValidators.isEmail()('peter@baloise.ch') // true
```

### isPhone

`isPhone() => BalValidatorFn`

Returns `true` if the value matches the regex

```typescript
BalValidators.isPhone()('123 456 78 90') // true
```

### isRequired

`isRequired() => BalValidatorFn`

Returns `true` if the value is a non-empty value

```typescript
BalValidators.isRequired()('foo') // true
BalValidators.isRequired()('') // false
```

### isRequiredTrue

`isRequiredTrue() => BalValidatorFn`

Returns `true` if the value is true. This validator is commonly used for required checkboxes.

```typescript
BalValidators.isRequiredTrue()(true) // true
BalValidators.isRequiredTrue()('') // false
```

### isMinLength

`isMinLength(minLength: number) => BalValidatorFn`

Returns `true` if the string is bigger or equal than the min length

```typescript
BalValidators.isMinLength(3)('123') // true
BalValidators.isMinLength(3)('12') // false
```

### isMaxLength

`isMaxLength(maxLength: number) => BalValidatorFn`

Returns `true` if the string is smaller or equal than the max length

```typescript
BalValidators.isMaxLength(3)('123') // true
BalValidators.isMaxLength(3)('1234') // false
```
