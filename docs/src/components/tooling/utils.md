# Utils

The library serve a collection of utility functions.

::: tip
We recommand to use the utility library [date-fns](https://date-fns.org/) for working with dates and for other utilities the library [lodash](https://lodash.com/).
:::

## Usage

The utilities are simple functions.

```typescript
import { isEnterKey } from '@baloise/design-system-components'

if (isEnterKey(event)) {
  // do something...
}
```

<!-- generated content -->



## ArrayUtil

### areArraysEqual

`areArraysEqual(a: T[], b: T[]) => boolean`

Returns `true` if the arrays are equal

```typescript
areArraysEqual(['a', 'b'], ['b', 'a']) // true
```


---

## DateUtil

### now

`now() => Date`

Returns a JS Date instance of the exact moment

```typescript
const date = now()
// Wed Mar 10 2021 20:30:32 GMT+0100 (Central European Standard Time)
```

### today

`today() => Date`

Returns a JS Date instance of today with time being set to 0

```typescript
const date = today()
// Wed Mar 10 2021 00:00:00 GMT+0100 (Central European Standard Time)
```

### floorTime

`floorTime(date: Date) => any`

Returns a JS Date instance with time being set to 0

```typescript
const date = floorTime(new Date())
// Wed Mar 10 2021 00:00:00 GMT+0100 (Central European Standard Time)
```

### ceilTime

`ceilTime(date: Date) => any`

Returns a JS Date instance with the time set to the possible end

```typescript
const date = ceilTime(new Date())
```

### year

`year(date: Date | undefined) => number`

Returns the year number of the given date

```typescript
year(new Date(2020, 0, 1)) // 2020
```

### month

`month(date: Date | undefined) => number`

Returns the month number of the given date

```typescript
month(new Date(2020, 0, 1)) // 0
```

### day

`day(date: Date | undefined) => number`

Returns the day number of the given date

```typescript
day(new Date(2020, 0, 1)) // 1
```

### increaseYear

`increaseYear(date: Date, years: number) => number`

Increases the year of a date and retunrs the result

```typescript
increaseYear(new Date(2020, 0, 1), 1) // 2021
```

### decreaseYear

`decreaseYear(date: Date, years: number) => number`

Decreases the year of a date and retunrs the result

```typescript
decreaseYear(new Date(2020, 0, 1), 1) // 2019
```

### isBefore

`isBefore(date: any, beforeDate: Date | string | undefined) => boolean`

Returns `true` when the given date is not smaller than the before date.

```typescript
isBefore(new Date(2020, 1, 1), new Date(2020, 3, 1)) // true
```

### isAfter

`isAfter(date: any, afterDate: Date | string | undefined) => boolean`

Returns `true` when the given date is not smaller than the before date.

```typescript
isAfter(new Date(2020, 5, 1), new Date(2020, 3, 1)) // true
```

### isInRange

`isInRange(date: Date | undefined, minDate: Date | undefined, maxDate: Date | undefined) => boolean`

Returns `true` when the given date is not smaller than the minDate and not bigger than the maxDate.

```typescript
isInRange(new Date(2020, 1, 1), new Date(2020, 0, 1), new Date(2020, 2, 1)) // true
```

### getFirstDayOfTheWeek

`getFirstDayOfTheWeek(date: Date) => Date`

Returns the first day of the week of the given date.

### isSameYear

`isSameYear(a: Date, b: Date) => boolean`

Returns `true` when the year of the dates are the same

### isSameMonth

`isSameMonth(a: Date, b: Date) => boolean`

Returns `true` when the month of the dates are the same

### isSameDay

`isSameDay(a: Date, b: Date) => boolean`

Returns `true` when the day of the dates are the same

### isSameWeek

`isSameWeek(a: Date, b: Date) => boolean`

Returns `true` when the week of the dates are the same

### format

`format(value: string | Date | undefined | null) => string`

Transforms the ISO datestring into `dd.mm.yyyy`

```typescript
format('2020-12-02') // '02.12.2020'
```

### isoString

`isoString(date: Date | undefined) => string`

Returns the ISO string `yyyy-mm-dd` of the given date

```typescript
isoString(new Date(2020, 0, 13)) // '2020-01-13'
```

### newDateString

`newDateString(date: Date) => string`

Returns the ISO string `yyyy-mm-dd` of the given date

```typescript
newDateString(new Date(2020, 0, 13)) // '2020-01-13'
```

### newDateString

`newDateString(year: number, month: number, day: number) => string`

Returns the ISO string `yyyy-mm-dd` of the given parameters year, month and day

```typescript
newDateString(2020, 0, 13) // '2020-01-13'
```

### newDateString

`newDateString(yearOrDate: Date | number, month: number, day: number) => string`



### toDate

`toDate(datestring: string | undefined | null) => Date | undefined`

Turns the ISO string `yyyy-mm-dd` it a JS Date instance

```typescript
toDate('2020-01-13') // js date instance
```

### isValidDateString

`isValidDateString(datestring: string | undefined | null) => boolean`

Returns `true` if the given datestring is valid

```typescript
isValidDateString('2020-01-13') //true
isValidDateString('2020-01-0') //false
isValidDateString('') //false
isValidDateString('1899-01-0') //false
```

### isValidDate

`isValidDate(value: any) => boolean`

Returns `true` if the given date is valid


---

## KeyUtil

### isEnterKey

`isEnterKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `Enter` key

### isSpaceKey

`isSpaceKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `Space` key

### isEscapeKey

`isEscapeKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `Escape` key

### isBackspaceKey

`isBackspaceKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `Backspace` key

### isArrowDownKey

`isArrowDownKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `ArrowDown` key

### isArrowUpKey

`isArrowUpKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `ArrowUp` key


---

## NumberUtil

### isValidMonetaryNumber

`isValidMonetaryNumber(stringValue: string) => boolean`

Returns `true` if the arrays are equal

```typescript
isValidMonetaryNumber(`1'000.99`) // true
```


---

## Util

### isEmpty

`isEmpty(value: any) => boolean`

Returns `true` if the value is empty


---
