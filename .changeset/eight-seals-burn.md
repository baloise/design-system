---
'@baloise/design-system-components': patch
---

The term `hidden` is a reserved accessibility (a11y) value. Consequently, we found it necessary to rename our hidden properties for checkboxes, radio buttons, tabs, and steps.
The attribute remains in place for now, ensuring no breaking changes at this time.

The `hidden` property for the checkbox and radio has been updated and renamed to `non-submit.`
The `hidden` property for the tabs and steps has been updated and renamed to `invisible.`
