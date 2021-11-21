# Write your own Utility

All our validators are located in the `packages/components/src/utils` dir.

::: tip
Before writing or updating a component please finish the [dev setup](/components/contributing/installation.html)
:::

The documentation to the utility can be found [here](components/tooling/utils.html).

## Getting Started

Navigate into the component package:

```bash
cd packages/components
```

Inside the folder `src/utils` are the validators. Each utility has its own test file.

To run the test use this command:

```bash
# to run the tests ones
npm run test:unit

# run the tests after each change
npm run test:unit:watch
```

## Structure

The structure of the util is importend, because out of it the documentation is automatically generate as well as the adapter for our supported frameworks like angular.

The comment block has a short description and an example part for the documentaion.

Each utility function needs to be exported.

````typescript
/**
 * Returns `true` if the arrays are equal
 *
 * ```typescript
 * isValidMonetaryNumber(`1'000.99`) // true
 * ```
 */
export function isValidMonetaryNumber(stringValue: string): boolean {
  // utility logic
  return any
}
````
