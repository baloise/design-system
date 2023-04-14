## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](?path=/docs/development-testing--page)

<!-- START: human documentation -->



<!-- END: human documentation -->

### Component Commands

A list of the custom commands for this specific component.

| Command                   | Description                        | Signature                                          |
| ------------------------- | ---------------------------------- | -------------------------------------------------- |
| `balInputStepperIncrease` | Increases the value of the control | `(options?: Partial<Loggable>): Chainable<JQuery>` |
| `balInputStepperDecrease` | Decreases the value of the control | `(options?: Partial<Loggable>): Chainable<JQuery>` |


### Component Element Selectors

| Selector                | Element               |
| ----------------------- | --------------------- |
| `inputStepper.decrease` | Decrease button.      |
| `inputStepper.increase` | Increase button.      |
| `inputStepper.native`   | Native input element. |
| `inputStepper.text`     | Text element.         |

