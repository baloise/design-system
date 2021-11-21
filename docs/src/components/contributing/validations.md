# Write your own Validator

All our validators are located in the `packages/components/src/validators` dir.

::: tip
Before writing or updating a component please finish the [dev setup](/components/contributing/installation.html)
:::

The documentation to the validators can be found [here](components/tooling/validators.html).

## Getting Started

Navigate into the component package:

```bash
cd packages/components
```

Inside the folder `src/validators` are the validators. Each validator has its own test file.

To run the test use this command:

```bash
# to run the tests ones
npm run test:unit

# run the tests after each change
npm run test:unit:watch
```

## Structure

The structure of the validator is importend, because out of it the documentation is automatically generate as well as the adapter for our supported frameworks like angular.

The comment block has a short description and an example part for the documentaion.

The first function receivs the options parameter and the second function gets the value to validate.

````typescript
import { BalValidatorFn } from './validator.type'

/**
 * Returns `true` if the value date is before the given date
 *
 * ```typescript
 * BalValidators.isCustom((value) => value > 2)(3) // true
 * ```
 */
export function isCustom(validatorFn: BalValidatorFn): BalValidatorFn {
  return function(value: any) {
    return validatorFn(value)
  }
}
````
