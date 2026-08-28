# Task: Implement a framework-agnostic Phone Number Form Web Component

We need to create a new **phone number form Web Component** for our existing Design System.

The component should follow the architecture, conventions, APIs, styling approach, and patterns of the existing `ds-input` components as closely as possible.

## Goal

Create a new phone-number input component that provides:

- Country selection
- Country flags
- International calling prefix, e.g. `+41` for Switzerland
- Phone number text input
- Formatting of the phone number when the field loses focus
- Support for all countries
- Ability to restrict the available countries through a component prop
- Phone-number formatting using `libphonenumber-js`
- Integration with the existing Design System input/form infrastructure, especially `field.util`
- Visual examples in `input-phone.visual.html`

The component is a **Design System component**.

It should handle the **input UX and presentation**, but **must not perform business-level phone-number validation**.

Validation is the responsibility of the consuming application.

---

# Important architecture principle

The component must separate:

### Design System responsibilities

- Rendering the country selector
- Rendering country flags
- Rendering the calling prefix
- Handling user input
- Handling formatting
- Handling country changes
- Managing input state
- Integrating with `field.util`
- Accessibility
- Visual states
- Emitting the appropriate value/events

### Application responsibilities

The Design System must NOT decide whether a phone number is valid.

Do NOT add:

- `isValidPhoneNumber()`
- `isPossiblePhoneNumber()`
- Application-specific validation rules
- Business validation
- Server-side validation

The consuming application can perform validation on the resulting value.

---

# Phone-number library

Use:

`libphonenumber-js`

The component should use the library only for formatting/input-related functionality.

Preferred functionality:

| Function                        | Needed?                           | Purpose                                                            |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| `AsYouType`                     | Yes                               | Format while the user types / format according to selected country |
| `parseIncompletePhoneNumber()`  | Maybe                             | Normalize pasted/user-entered values                               |
| `formatIncompletePhoneNumber()` | Maybe                             | Format a value without maintaining an `AsYouType` instance         |
| `parsePhoneNumber()`            | No                                | Application-level parsing/validation                               |
| `isValidPhoneNumber()`          | No                                | Application responsibility                                         |
| `isPossiblePhoneNumber()`       | No                                | Application responsibility                                         |
| `getCountries()`                | Yes if required by implementation | Country selector                                                   |
| `getCountryCallingCode()`       | Yes                               | Display calling prefix                                             |

Use the smallest appropriate `libphonenumber-js` API/metadata setup possible.

Do not introduce the full validation functionality just because it is available.

Investigate whether the `min` build or another appropriately scoped import is sufficient.

The implementation should support **all countries**, while still allowing the component consumer to restrict the available countries.

---

# Functional requirements

## 1. Country selector

The component must provide a country selection UI.

Each country option should display:

- Country flag
- Country name
- International calling prefix

Example:

```text
🇨🇭 Switzerland (+41)
🇩🇪 Germany (+49)
🇫🇷 France (+33)
🇮🇹 Italy (+39)
```

The currently selected country should be visible in the input control.

The exact visual design should follow existing Design System conventions.

Do not invent a completely new interaction pattern if an existing DS component can be reused.

Investigate existing components for:

- Select
- Dropdown
- Combobox
- Menu
- Input prefix/suffix
- Field
- Form controls

and reuse existing primitives where appropriate.

---

# 2. Available countries

The component must support all countries.

Add a property that allows consumers to restrict which countries are available.

For example:

```html
<ds-input-phone countries="CH,DE,FR,IT"></ds-input-phone>
```

The exact API should follow existing Design System conventions.

Determine from the existing codebase whether this should be:

- an array property
- a string property
- another existing pattern

Do not invent an API style that conflicts with existing components.

The component should also have a sensible default:

```text
all countries
```

---

# 3. Selected country

The component needs a way to define the selected/default country.

For example:

```html
<ds-input-phone country="CH"></ds-input-phone>
```

Again, inspect existing Design System conventions before deciding the final API.

The implementation should clearly distinguish:

- available countries
- currently selected country

If the selected country is not included in the available-country list, define sensible behavior based on existing DS conventions.

---

# 4. Phone number input

The phone number itself must be a normal text input.

Do NOT use:

```html
<input type="tel" />
```

unless this is explicitly compatible with the existing `ds-input` implementation and its conventions.

Investigate the existing input component and determine the appropriate input type/attributes.

The user should be able to enter:

```text
79 123 45 67
```

or:

```text
791234567
```

depending on the current country.

---

# 5. Formatting

Use `libphonenumber-js` to format the phone number.

The main requirement is:

> When the user leaves the field, the phone number should be formatted according to the selected country.

Example for Switzerland:

User enters:

```text
791234567
```

After blur:

```text
79 123 45 67
```

The country prefix should not be duplicated inside the phone-number field because the country selector already displays:

```text
🇨🇭 +41
```

Therefore the visual result should be approximately:

```text
┌──────────────┬──────────────────┐
│ 🇨🇭  +41     │ 79 123 45 67     │
└──────────────┴──────────────────┘
```

Investigate how `AsYouType` and/or `formatIncompletePhoneNumber()` should be used to achieve this behavior.

The implementation must correctly handle:

- empty values
- partially entered numbers
- pasted numbers
- numbers containing spaces
- numbers containing `+`
- country changes
- switching between countries
- existing formatted values

Do not implement phone-number validation.

---

# 6. Value

Determine how the component should expose its value.

The preferred approach is to keep the component's value compatible with the existing `ds-input` conventions.

Investigate the existing components and `field.util` before defining the API.

The component should ideally distinguish between:

- displayed/formatted value
- underlying value

Do not assume that the formatted display value should be the canonical application value.

The implementation plan should explicitly explain the recommended value model.

---

# 7. `field.util`

The new component MUST use the existing `field.util` infrastructure.

Before planning the implementation:

1. Find the existing `ds-input` components.
2. Understand how they integrate with `field.util`.
3. Identify the relevant helpers/utilities.
4. Follow the same patterns for:

   - value handling
   - field state
   - disabled state
   - readonly state
   - required state
   - error state
   - labels
   - help text
   - IDs
   - accessibility
   - form integration
   - events

Do not create a parallel field abstraction.

The phone component should feel like another native Design System input component from an API and implementation perspective.

---

# 8. Accessibility

The component must follow the accessibility patterns already established by the Design System.

Investigate existing input/select components and reuse their patterns.

Consider at minimum:

- accessible label
- description/help text
- error message
- keyboard navigation
- focus management
- disabled state
- readonly state
- screen-reader announcement
- country selector accessibility
- flag accessibility
- calling-code accessibility
- correct input semantics

Flags should not be the only way the country is identified.

The country name must be accessible.

---

# 9. Country flags

Investigate how flags are currently handled in the Design System.

Reuse an existing flag/icon solution if one exists.

Do not introduce a new flag dependency without first checking the existing repository.

The implementation should support all countries.

The plan should explicitly identify:

- where flag assets come from
- how they are loaded
- whether they increase bundle size
- whether they are tree-shakeable
- whether all countries are bundled
- whether flags can be loaded efficiently

---

# 10. Visual examples

Create:

```text
input-phone.visual.html
```

following the existing `*.visual.html` conventions in the repository.

The implementation plan should include examples covering at least:

### Basic

- Default phone input
- Selected country
- Placeholder

### Countries

- Switzerland
- Germany
- France
- Italy
- Multiple available countries
- Restricted country list

### States

- Disabled
- Readonly
- Required
- Error
- Help text

### Interaction

- Empty
- Typing
- Formatted value
- Country selection

### Formatting

Examples demonstrating different international number formats.

The visual examples are for visual/manual verification only.

---

# Out of scope

Testing is explicitly OUT OF SCOPE.

Do NOT plan or implement:

- Unit tests
- Integration tests
- E2E tests
- Playwright tests
- Cypress tests
- Automated visual regression tests

The only visual artifact required is:

```text
input-phone.visual.html
```

---

# Implementation constraints

Before proposing the implementation:

1. Inspect the existing `ds-input` components.
2. Inspect `field.util`.
3. Inspect existing form components.
4. Inspect existing country/flag/select components.
5. Inspect existing `*.visual.html` files.
6. Inspect package/dependency conventions.
7. Check how dependencies are imported and bundled.
8. Check the existing component naming conventions.
9. Check existing property/attribute conventions.
10. Check existing event conventions.

The implementation should feel native to the existing Design System rather than introducing an isolated architecture.

---

# Bundle size

Bundle size matters.

The component is part of a Design System and may be consumed by many applications.

Investigate the bundle impact of `libphonenumber-js`.

Prefer the smallest appropriate API/build.

The implementation should NOT unnecessarily include:

- full validation metadata
- APIs that are not used
- application-level phone-number validation

The implementation plan should include an explicit section:

## Bundle-size impact

Explain:

- which `libphonenumber-js` entry point will be used
- which functionality is imported
- what metadata is required
- whether tree-shaking works
- estimated bundle impact
- whether custom metadata should be considered
- whether supporting all countries conflicts with bundle-size optimization

Do not optimize prematurely, but make the trade-offs explicit.

---

# Deliverable

For this task, do NOT implement the component yet.

First create a detailed **implementation plan divided into phases**.

The plan should be actionable enough that another developer/Claude session can execute it phase by phase.

Use approximately the following structure:

## Phase 0 — Repository investigation

Identify all existing components/utilities that should be reused.

Include specific files and explain what should be learned from each.

## Phase 1 — API and architecture

Define:

- component name
- properties
- attributes
- events
- value model
- country model
- available-country API
- selected-country API
- field integration
- accessibility model

Explicitly call out decisions that need to be made.

## Phase 2 — Phone-number formatting

Define exactly how `libphonenumber-js` should be integrated.

Explain:

- imports
- `AsYouType`
- handling incomplete values
- blur formatting
- country changes
- pasted values
- display vs canonical value

## Phase 3 — Country selector

Define:

- country data
- country names
- ISO country codes
- calling codes
- flags
- filtering
- keyboard interaction
- selected state

## Phase 4 — Component implementation

Describe the implementation order and major files that need to be created/changed.

## Phase 5 — Field integration

Describe how `field.util` and existing input patterns should be integrated.

## Phase 6 — Accessibility

Describe the accessibility implementation.

## Phase 7 — Visual examples

Define the contents of:

```text
input-phone.visual.html
```

including all required examples.

## Phase 8 — Bundle-size review

Analyze the final dependency/import strategy and identify potential optimizations.

## Phase 9 — Manual verification

Define a manual checklist for verifying the component using the visual examples.

Do NOT include automated tests.

---

# Expected output

The first response should contain **only the implementation plan**.

Do not write the implementation yet.

Do not create tests.

Do not make assumptions about the existing Design System architecture without inspecting the repository first.

Where the repository already has a pattern, explicitly reference and reuse that pattern rather than introducing a new one.
