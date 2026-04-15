# Design Questions

- Button height reduce to 40px
- keep line height 1.5
- stage component that to do?

# TODO's

| Item                             | Description                                                           | Status |
| -------------------------------- | --------------------------------------------------------------------- | ------ |
| Accordion                        | Use new native accordion API                                          | ✅     |
| T-Shirt Sizes                    | Change to 2xl and get rid off normal and use medium instead           | ✅     |
| Outline Shadow                   | Define it as a variable to overide the color                          | ✅     |
| Playwright                       | Replace all Cypess test with Playwright                               | ✅     |
| Default vs Base                  | Use Default for states with hover and active                          | ✅     |
| FIGMA API                        | Pull tokens changes form the figma api instead of the manual proccess | ⬜     |
| Modal                            | Use new native dialog API                                             | ⬜     |
| Popup                            | Use new native popup API                                              | ⬜     |
| Sandbox                          | Use new sandbox api                                                   | ⬜     |
| Brand Icons                      | Update brand icons                                                    | ⬜     |
| Brand Icons API                  | Create a task to automate the update                                  | ⬜     |
| Gap Analyses Material            | Check Components use cases                                            | ⬜     |
| NPM Updates                      | Check Vurnabilites                                                    | ⬜     |
| UI Icons change base color       | Change base color of svg to primary and not black                     | ⬜     |
| Anuglar React                    | Add frameworks back after migrating too shadow dom                    | ⬜     |
| FullWidth,Expanded,Wide          | Stick with one nameing                                                | ⬜     |
| Check min height of 48px to 40px | Verify if we can reduce the standard height 0f 48px to 40px           | ⬜     |

## components

### rules

use id's and parts in the shadow dom components

### atomic components and prio for website

Checklist

1. has shadow dom
2. style ends with host or/and style
3. reflect @props if use for theming
4. use mixins correctly
5. has variables
6. has one visual file for the component

| Component          | Recommended Type   | Shadow DOM | Docs | Design Tokens | Testing | Vars |
| ------------------ | ------------------ | ---------- | ---- | ------------- | ------- | ---- |
| heading            | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| text               | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| label              | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| link               | CSS-Only           | ⛔         | ✅   | ✅            | ✅      | ✅   |
| stack              | Hybrid (No Shadow) | ⛔         | ✅   | ⛔            | ✅      | ⛔   |
| divider            | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| tag                | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| button             | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| notification       | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| unordered-list     | CSS-Only           | ✅         | ✅   | ✅            | ✅      | ✅   |
| ordered-list       | CSS-Only           | ✅         | ✅   | ✅            | ✅      | ✅   |
| description-list   | CSS-Only           | ✅         | ✅   | ✅            | ✅      | ✅   |
| card               | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| accordion          | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| list               | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| list-accordion     | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| ------------------ | ------------------ | ---------- | ---- | ------------- | ------- | ---- |
| icon               | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| spinner            | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| logo               | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| check              | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| switch             | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| close              | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| badge              | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| toast              | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| snackbar           | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| shape              | Web Component      | ✅         | ✅   | ❓            | ✅      | ✅   |
| stage              | Web Component      | ❓         | ❓   | ❓            | ❓      | ⬜   |

### rest components

| Component           | Recommended Type | Shadow DOM | Docs | Design Tokens |
| ------------------- | ---------------- | ---------- | ---- | ------------- |
| input               | Hybrid           | ⬜         | ⬜   | ⬜            |
| data                | Hybrid           | ⬜         | ⬜   | ⬜            |
| modal               | Hybrid           | ⬜         | ⬜   | ⬜            |
| pagination          | Hybrid           | ⬜         | ⬜   | ⬜            |
| popover             | Hybrid           | ⬜         | ⬜   | ⬜            |
| progress-bar        | Hybrid           | ⬜         | ⬜   | ⬜            |
| step-item           | Hybrid           | ⬜         | ⬜   | ⬜            |
| steps               | Hybrid           | ⬜         | ⬜   | ⬜            |
| table               | Hybrid           | ⬜         | ⬜   | ⬜            |
| tabs                | Hybrid           | ⬜         | ⬜   | ⬜            |
| tooltip             | Hybrid           | ⬜         | ⬜   | ⬜            |
| ------------------  | ---------------- | ---------- | ---- | ------------- |
| footer              | Web Component    | ⬜         | ⬜   | ⬜            |
| radio               | Web Component    | ⬜         | ⬜   | ⬜            |
| segment             | Web Component    | ⬜         | ⬜   | ⬜            |
| app                 | Web Component    | ⬜         | ⬜   | ⬜            |
| carousel            | Web Component    | ⬜         | ⬜   | ⬜            |
| date                | Web Component    | ⬜         | ⬜   | ⬜            |
| dropdown            | Web Component    | ⬜         | ⬜   | ⬜            |
| file-upload         | Web Component    | ⬜         | ⬜   | ⬜            |
| hint                | Web Component    | ⬜         | ⬜   | ⬜            |
| number-input        | Web Component    | ⬜         | ⬜   | ⬜            |
| option              | Web Component    | ⬜         | ⬜   | ⬜            |
| popup               | Web Component    | ⬜         | ⬜   | ⬜            |
| select (deprecated) | Web Component    | ⬜         | ⬜   | ⬜            |
| sheet               | Web Component    | ⬜         | ⬜   | ⬜            |
| time-input          | Web Component    | ⬜         | ⬜   | ⬜            |

1. Enable shadow dom
2. Add parts to important elements in the components tree like clickable elements, titles or contents
3. Rename component from Bal to DS
4. migrate Scss style to a .host.scss file and add the missing css variables
5. Update the visual file like the others with the correct imports and structure with sections and data-testid
6. Create visual.play file for the component that test all data-test id secctions of the html file
7. Create a simple a11y.play file to test the component
8. Creeate a PO file and the component.play.ts file to test test the component interactions clickable stuff events and for course the PO
