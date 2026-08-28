# TODO's

2

## Ongoing Improvements

| Item                                     | Description                                                                           | Status |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| Accordion                                | Use new native accordion API                                                          | ✅     |
| T-Shirt Sizes                            | Change to 2xl and get rid off normal and use medium instead                           | ✅     |
| Outline Shadow                           | Define it as a variable to overide the color                                          | ✅     |
| Playwright                               | Replace all Cypess test with Playwright                                               | ✅     |
| Default vs Base                          | Use Default for states with hover and active                                          | ✅     |
| UI Icons change base color               | Change base color of svg to primary and not black                                     | ✅     |
| FullWidth,Expanded,Wide                  | Stick with one nameing                                                                | ✅     |
| Modal                                    | Use new native dialog API                                                             | ✅     |
| Popup                                    | Use new native popup API                                                              | ✅     |
| NPM Updates                              | Check Vurnabilites and Renovate                                                       | ✅     |
| Sandbox                                  | Use new sandbox api                                                                   | ✅     |
| Validate Props and make them reflected   | Create utils and skill for that                                                       | ✅     |
| Rename props called interface to variant |                                                                                       | ✅     |
| Use exact versions                       | Adjust dependenciues to use exact versions                                            | ✅     |
| Check deps of core                       | Do we need all of them                                                                | ✅     |
| Create config as meta                    | Add new possability to add config values via html meta                                | ✅     |
| React                                    | Add frameworks back after migrating too shadow dom                                    | ✅     |
| Add missing regions 2.0                  | Austria, Spain, Italy                                                                 | ⬜     |
| Angular bindings                         | Add frameworks back after migrating too shadow dom                                    | ✅     |
| Angular forms integration                | ControlValueAccessor/reactive-forms wiring for form components (deferred by ADR-0006) | ⬜     |
| Create Migration Bal                     | Create migration plan for ex-baloise                                                  | ⬜     |
| Verify desing tokens                     | Check if the tokens follow our style-guide                                            | ⬜     |
| Figma Sync                               | Finish the github actions to sync tokens                                              | ⬜     |
| Gap Analyses Material                    | Check Components use cases                                                            | ⬜     |
| Gap Parttern Lib                         | Check Components use cases                                                            | ⬜     |
| Create Migration Hel                     | Create migration plan for ex-helvetia                                                 | ⬜     |
| Brand Icons                              | Update brand icons                                                                    | ⬜     |
| Brand Icons API                          | Create a task to automate the update                                                  | ⬜     |
| Check min height of 48px to 40px         | Verify if we can reduce the standard height 0f 48px to 40px                           | ⬜     |

## Componentes

We are continuously improving our components in several key areas:

- **Accessibility** — Making sure all components are fully accessible and follow WCAG 2.2 AA standards for inclusive usage
- **SEO** — Optimizing components to work well with search engines and semantic HTML best practices
- **Shadow DOM** — Adding Shadow DOM encapsulation to components for better style isolation and framework compatibility with React and Angular

These improvements help our components work seamlessly across all supported frameworks and ensure a better experience for all users.

### App Scope

| Component        | Type     | Shadow | Docs | A11y | Visual | Component | Tokens | Figma |
| ---------------- | -------- | ------ | ---- | ---- | ------ | --------- | ------ | ----- |
| app              | WC       | ✅     | ⬜   | ⛔   | ⛔     | ✅        | ⛔     | ⛔    |
| body             | CSS      | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| icon             | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| brand-icon       | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| heading          | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| text             | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| label            | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| link             | CSS      | ⛔     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| container        | CSS      | ❓     | ⬜   | ✅   | ✅     | ❓        | ✅     | ⬜    |
| form             | CSS      | ❓     | ⬜   | ✅   | ✅     | ❓        | ❓     | ⬜    |
| grid             | CSS      | ❓     | ⬜   | ✅   | ✅     | ❓        | ❓     | ⬜    |
| picture          | CSS      | ❓     | ⬜   | ✅   | ✅     | ❓        | ❓     | ⬜    |
| stack & content  | WC & CSS | ⛔     | ⬜   | ✅   | ✅     | ✅        | ⛔     | ⬜    |
| divider          | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| spinner          | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| progress-bar     | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| logo             | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| shape            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ❓     | ⬜    |
| close            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| button           | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| -- DATA --       | ###      | ###    | ###  | ###  | ###    | ###       | ###    | ###   |
| unordered-list   | CSS      | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| ordered-list     | CSS      | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| description-list | CSS      | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| badge            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| tag              | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| table            | CSS      | ❓     | ⬜   | ✅   | ✅     | ❓        | ✅     | ⬜    |
| card             | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| list             | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| accordion        | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| carousel         | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| -- ALERTS --     | ###      | ###    | ###  | ###  | ###    | ###       | ###    | ###   |
| notification     | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| snackbar         | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| toast            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| -- OVERLAY --    | ###      | ###    | ###  | ###  | ###    | ###       | ###    | ###   |
| modal            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| tooltip          | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| popover          | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| hint             | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| -- NAVIGATION -- | ###      | ###    | ###  | ###  | ###    | ###       | ###    | ###   |
| navbar           | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| menu             | WC       | ⬜     | ⬜   | ⬜   | ⬜     | ⬜        | ⬜     | ⬜    |
| tabs             | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| steps            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| pagination       | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ✅     | ⬜    |
| footer           | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| sheet            | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| -- FORMS --      | ###      | ###    | ###  | ###  | ###    | ###       | ###    | ###   |
| input            | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| textarea         | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| radio            | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| toggle           | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| checkbox         | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| segment          | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| number-input     | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| file-upload      | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| select           | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| time-input       | WC & CSS | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| date             | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| input-slider     | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| input-stepper    | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| data             | WC       | ✅     | ⬜   | ✅   | ✅     | ✅        | ⬜     | ⬜    |
| ag-grid          | Lib      | ✅     | ✅   | ✅   | ✅     | ✅        | ⬜     | ⬜    |

## Tokens & Figma

1.  Lint component
2.  Check Design tokens
3.  Add missing size tokens
4.  Use new token types
5.  Remove unuese styles keep it MVP
