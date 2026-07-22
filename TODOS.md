# TODO's

See [MIGRATION-MAPPING-Baloise.md](./MIGRATION-MAPPING-Baloise.md) for the full v19 (`bal-*`) → v20 (`ds-*`) component tag mapping and per-component gap analysis status.

## Ongoing Improvements

| Item                                     | Description                                                                            | Status |
| ---------------------------------------- | -------------------------------------------------------------------------------------- | ------ |
| Accordion                                | Use new native accordion API                                                           | ✅     |
| T-Shirt Sizes                            | Change to 2xl and get rid off normal and use medium instead                            | ✅     |
| Outline Shadow                           | Define it as a variable to overide the color                                           | ✅     |
| Playwright                               | Replace all Cypess test with Playwright                                                | ✅     |
| Default vs Base                          | Use Default for states with hover and active                                           | ✅     |
| UI Icons change base color               | Change base color of svg to primary and not black                                      | ✅     |
| FullWidth,Expanded,Wide                  | Stick with one nameing                                                                 | ✅     |
| Modal                                    | Use new native dialog API                                                              | ✅     |
| Popup                                    | Use new native popup API                                                               | ✅     |
| NPM Updates                              | Check Vurnabilites and Renovate                                                        | ✅     |
| Sandbox                                  | Use new sandbox api                                                                    | ✅     |
| Validate Props and make them reflected   | Create utils and skill for that                                                        | ✅     |
| Rename props called interface to variant |                                                                                        | ✅     |
| Use exact versions                       | Adjust dependenciues to use exact versions                                             | ✅     |
| Check deps of core                       | Do we need all of them                                                                 | ✅     |
| Create config as meta                    | Add new possability to add config values via html meta                                 | ✅     |
| React                                    | Add frameworks back after migrating too shadow dom                                     | ✅     |
| Anuglar                                  | Add frameworks back after migrating too shadow dom                                     | ⬜     |
| Create Migration Bal                     | Create migration plan for ex-baloise                                                   | ⬜     |
| Add missing regions                      | Austria, Spain, Italy                                                                  | ⬜     |
| Verify desing tokens                     | Check if the tokens follow our style-guide                                             | ⬜     |
| Gap Analyses Material                    | Check Components use cases                                                             | ⬜     |
| Create Migration Hel                     | Create migration plan for ex-helvetia                                                  | ⬜     |
| Brand Icons                              | Update brand icons                                                                     | ⬜     |
| Brand Icons API                          | Create a task to automate the update                                                   | ⬜     |
| Check min height of 48px to 40px         | Verify if we can reduce the standard height 0f 48px to 40px                            | ⬜     |
| Hover                                    | Check all hover states if they have ` @media (hover: hover) and (pointer: fine) {...}` | ⬜     |

## Componentes

We are continuously improving our components in several key areas:

- **Accessibility** — Making sure all components are fully accessible and follow WCAG 2.2 AA standards for inclusive usage
- **SEO** — Optimizing components to work well with search engines and semantic HTML best practices
- **Shadow DOM** — Adding Shadow DOM encapsulation to components for better style isolation and framework compatibility with React and Angular

These improvements help our components work seamlessly across all supported frameworks and ensure a better experience for all users.

### App Scope MVP

| Component        | Type   | Shadow | Docs | Tokens | A11y | Visual | Component |
| ---------------- | ------ | ------ | ---- | ------ | ---- | ------ | --------- |
| heading          | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| text             | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| label            | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| link             | CSS    | ⛔     | ✅   | ✅     | ✅   | ✅     | ✅        |
| stack            | Hybrid | ⛔     | ✅   | ⛔     | ✅   | ✅     | ✅        |
| divider          | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| tag              | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| button           | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| notification     | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| unordered-list   | CSS    | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| ordered-list     | CSS    | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| description-list | CSS    | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| card             | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| accordion        | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| list             | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| icon             | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| spinner          | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| logo             | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| close            | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| badge            | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| toast            | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| snackbar         | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| input            | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| textarea         | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| shape            | WC     | ✅     | ✅   | ❓     | ✅   | ✅     | ✅        |
| input            | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| textarea         | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| radio            | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| checkbox         | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| segment          | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| app              | WC     | ✅     | ⬜   | ✅     | ⬜   | ⬜     | ⬜        |
| number-input     | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| progress-bar     | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| pagination       | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| tabs             | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| steps            | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| carousel         | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| table            | Hybrid | ❓     | ✅   | ✅     | ✅   | ✅     | ❓        |
| modal            | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| tooltip          | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| popover          | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| hint             | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| data             | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| footer           | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| file-upload      | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| select           | CSS    | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| navbar           | Hybrid | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| time-input       | CSS    | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| date             | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| dropdown/select  | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |
| autocomplete     | WC     | ✅     | ✅   | ✅     | ✅   | ✅     | ✅        |

### Issues

| Component      | Notes                                                    | Done |
| -------------- | -------------------------------------------------------- | ---- |
| Badge          | Icon size do not match the normal size                   | ⬜   |
| Checkbox/Radio | Background grey is too dark                              | ⬜   |
| Checkbox/Radio | Tile hover color is wrong                                | ⬜   |
| Input          | Disabled background is too dark                          | ⬜   |
| Textarea       | Padding top and bottom is missing                        | ⬜   |
| Segment        | Background grey is too dark                              | ⬜   |
| Segment        | Invalid description test is not red                      | ⬜   |
| Tag            | Background grey is too dark                              | ⬜   |
| Toggle         | Background grey is too dark                              | ⬜   |
| Card           | Story tile card is broken                                | ⬜   |
| Card           | Teaser Cards - card should all have the same height      | ⬜   |
| Card           | Card Images - missing the space                          | ⬜   |
| Carousel       | Background pagination grey is too dark                   | ⬜   |
| Logo           | Missing variant stories in the docs                      | ⬜   |
| Close          | Missing variant stories in the docs                      | ⬜   |
| Shape          | Missing variant stories in the docs                      | ⬜   |
| Data           | Divider is too dark grey                                 | ⬜   |
| Data           | Disabled state is not gray                               | ⬜   |
| Date           | Should be a form component in the story change title     | ✅   |
| FileUpload     | Should be a form component in the story change title     | ✅   |
| TimeInput      | Should be a form component in the story change title     | ✅   |
| FileUpload     | File item bg is too dark gray                            | ⬜   |
| Hint           | BG is too dark grey                                      | ⬜   |
| Hint           | Migration example title i undefined                      | ⬜   |
| Navbar         | Stories do not show open state on mobile                 | ⬜   |
| Notification   | BG grey is too dark                                      | ⬜   |
| Snackbar       | BG grey is too dark                                      | ⬜   |
| Toast          | BG grey is too dark                                      | ⬜   |
| Steps          | BG grey is too dark                                      | ⬜   |
| Notification   | Heading is not bold                                      | ⬜   |
| Popup          | Focus trap is not woring                                 | ⬜   |
| Select         | Story canvas nees overlapping                            | ⬜   |
| All            | Docs the variants page should start with the basic story | ✅   |
| All            | All css story should start wiht the emoji                | ✅   |
| Table          | Striped should be light grey                             | ⬜   |
| Toast/Shackbar | Check icons                                              | ⬜   |

### Extended Scope not MVP

| Component           | Type | Shadow | Docs | Tokens | A11y | Visual | Component |
| ------------------- | ---- | ------ | ---- | ------ | ---- | ------ | --------- |
| select/mobile/modal | WC   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| forms/vertical      | WC   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| sheet/drawer        | WC   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| menu                | WC   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| ag-grid             | Lib  | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| link-area           | WC   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |

### Website Scope

| Component        | Type | Shadow | Docs | Tokens | A11y | Visual | Component |
| ---------------- | ---- | ------ | ---- | ------ | ---- | ------ | --------- |
| nav              | ❓   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| stage            | ❓   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| input-phone      | ❓   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| input-slider     | ❓   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| input-stepper    | ❓   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
| tabs collapsable | ❓   | ⬜     | ⬜   | ⬜     | ⬜   | ⬜     | ⬜        |
