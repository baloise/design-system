<!-- Auto Generated File -->

# Utils

## balDateUtil

```typescript
import { balDateUtil } from '@baloise/ui-library'
```

### now

`now() => Date`

Returns a JS Date instance of today

```typescript
const date = balDateUtil.now()
```

### year

`year(date: Date | undefined) => number`

Returns the year number of the given date

```typescript
balDateUtil.year(new Date(2020, 0, 1)) // 2020
```

### month

`month(date: Date | undefined) => number`

Returns the month number of the given date

```typescript
balDateUtil.month(new Date(2020, 0, 1)) // 0
```

### day

`day(date: Date | undefined) => number`

Returns the day number of the given date

```typescript
balDateUtil.day(new Date(2020, 0, 1)) // 1
```

### increaseYear

`increaseYear(date: Date, years: number) => number`

Increases the year of a date and retunrs the result

```typescript
balDateUtil.increaseYear(new Date(2020, 0, 1), 1) // 2021
```

### decreaseYear

`decreaseYear(date: Date, years: number) => number`

Decreases the year of a date and retunrs the result

```typescript
balDateUtil.decreaseYear(new Date(2020, 0, 1), 1) // 2019
```

### isInRange

`isInRange(date: Date | undefined, minDate: Date | undefined, maxDate: Date | undefined) => boolean`

Returns `true` when the given date is not smaller than the minDate and not bigger than the maxDate.

```typescript
balDateUtil.isInRange(new Date(2020, 1, 1), new Date(2020, 0, 1), new Date(2020, 2, 1)) // true
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

`format(datestring: string | undefined | null) => string`

Transforms the ISO datestring into `dd.mm.yyyy`

```typescript
balDateUtil.format('2020-12-02') // '02.12.2020'
```

### isoString

`isoString(date: Date | undefined) => string`

Returns the ISO string `yyyy-mm-dd` of the given date

```typescript
balDateUtil.isoString(new Date(2020, 0, 13)) // '2020-01-13'
```

### newDateString

`newDateString(date: Date) => string`

Returns the ISO string `yyyy-mm-dd` of the given date

```typescript
balDateUtil.newDateString(new Date(2020, 0, 13)) // '2020-01-13'
```

### newDateString

`newDateString(year: number, month: number, day: number) => string`

Returns the ISO string `yyyy-mm-dd` of the given parameters year, month and day

```typescript
balDateUtil.newDateString(2020, 0, 13) // '2020-01-13'
```

### newDateString

`newDateString(yearOrDate: Date | number, month: number, day: number) => string`



### toDate

`toDate(datestring: string | undefined | null) => Date | undefined`

Turns the ISO string `yyyy-mm-dd` it a JS Date instance

```typescript
balDateUtil.toDate('2020-01-13') // js date instance
```

### isValidDateString

`isValidDateString(datestring: string | undefined | null) => boolean`

Returns `true` if the given datestring is valid

```typescript
balDateUtil.isValidDateString('2020-01-13') //true
balDateUtil.isValidDateString('2020-01-0') //false
balDateUtil.isValidDateString('') //false
balDateUtil.isValidDateString('1899-01-0') //false
```


---

## balKeyUtil

```typescript
import { balKeyUtil } from '@baloise/ui-library'
```

### isEnterKey

`isEnterKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `Enter` key

### isEscapeKey

`isEscapeKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `Escape` key

### isArrowDownKey

`isArrowDownKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `ArrowDown` key

### isArrowUpKey

`isArrowUpKey(event: KeyboardEvent) => boolean`

Returns `true` if the keyboard event was triggered by the `ArrowUp` key


---

## balNumberUtil

```typescript
import { balNumberUtil } from '@baloise/ui-library'
```

### round

`round(value: number, digits: number) => string`




---

## balStringUtil

```typescript
import { balStringUtil } from '@baloise/ui-library'
```

### isBlank

`isBlank(s: string | null) => boolean`



### isNotBlank

`isNotBlank(s: string) => boolean`



### assertNotBlank

`assertNotBlank(s: string) => any`



### isStringLiteral

`isStringLiteral(s: any) => boolean`




---

## balUtil

```typescript
import { balUtil } from '@baloise/ui-library'
```

### isDefined

`isDefined(obj: any) => boolean`



### isFunction

`isFunction(obj: any) => boolean`



### isNumber

`isNumber(obj: any) => boolean`



### isString

`isString(obj: any) => boolean`



### isArray

`isArray(obj: any) => boolean`



### isNotArray

`isNotArray(obj: any) => boolean`



### isError

`isError(obj: any) => boolean`



### isObject

`isObject(obj: any) => boolean`



### isBoolean

`isBoolean(obj: any) => boolean`



### assertNull

`assertNull(obj: any) => any`



### assertNotNull

`assertNotNull(obj: any) => any`



### assertFunction

`assertFunction(obj: any) => any`



### areArraysEqual

`areArraysEqual(a: T[], b: T[]) => boolean`




---

