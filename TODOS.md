# Design Questions

- Button height reduce to 40px
- keep line height 1.5
- stage component that to do?

# TODO's

| Item                       | Description                                                           | Status |
| -------------------------- | --------------------------------------------------------------------- | ------ |
| Accordion                  | Use new native accordion API                                          | ✅     |
| T-Shirt Sizes              | Change to 2xl and get rid off normal and use medium instead           | ✅     |
| Outline Shadow             | Define it as a variable to overide the color                          | ✅     |
| Playwright                 | Replace all Cypess test with Playwright                               | ✅     |
| Default vs Base            | Use Default for states with hover and active                          | ✅     |
| FIGMA API                  | Pull tokens changes form the figma api instead of the manual proccess | ⬜     |
| Modal                      | Use new native dialog API                                             | ⬜     |
| Popup                      | Use new native popup API                                              | ⬜     |
| Sandbox                    | Use new sandbox api                                                   | ⬜     |
| Brand Icons                | Update brand icons                                                    | ⬜     |
| Brand Icons API            | Create a task to automate the update                                  | ⬜     |
| Gap Analyses Material      | Check Components use cases                                            | ⬜     |
| NPM Updates                | Check Vurnabilites                                                    | ⬜     |
| UI Icons change base color | Change base color of svg to primary and not black                     | ⬜     |
| Anuglar React              | Add frameworks back after migrating too shadow dom                    | ⬜     |
| FullWidth,Expanded,Wide  | Stick with one nameing                                                | ⬜     |

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

| Component            | Recommended Type   | Shadow DOM | Docs | Design Tokens | Testing | Vars |
| -------------------- | ------------------ | ---------- | ---- | ------------- | ------- | ---- |
| bal-heading          | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-text             | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-label            | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-link             | CSS-Only           | ⛔         | ✅   | ✅            | ✅      | ✅   |
| bal-stack            | Hybrid (No Shadow) | ⛔         | ✅   | ⛔            | ✅      | ⛔   |
| bal-divider          | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-tag              | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-button           | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-notification     | Hybrid             | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-unordered-list   | CSS-Only           | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-ordered-list     | CSS-Only           | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-description-list | CSS-Only           | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-card             | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      | ⬜   |
| bal-accordion        | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      | ⬜   |
| bal-list             | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      | ⬜   |
| bal-list-accordion   | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      | ⬜   |
| ------------------   | ------------------ | ---------- | ---- | ------------- | ------- | ---- |
| bal-icon             | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-spinner          | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-logo             | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-check            | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-switch           | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-close            | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-badge            | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-toast            | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-snackbar         | Web Component      | ✅         | ✅   | ✅            | ✅      | ✅   |
| bal-shape            | Web Component      | ✅         | ✅   | ❓            | ✅      | ✅   |
| bal-stage            | Web Component      | ❓         | ❓   | ❓            | ❓      | ⬜   |

### rest components

| Component               | Recommended Type | Shadow DOM | Docs | Design Tokens |
| ----------------------- | ---------------- | ---------- | ---- | ------------- |
| bal-data                | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-input               | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-modal               | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-pagination          | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-popover             | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-progress-bar        | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-step-item           | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-steps               | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-table               | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-tabs                | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-tooltip             | Hybrid           | ⬜         | ⬜   | ⬜            |
| ------------------      | ---------------- | ---------- | ---- | ------------- |
| bal-footer              | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-radio               | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-segment             | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-app                 | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-carousel            | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-date                | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-dropdown            | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-file-upload         | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-hint                | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-number-input        | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-option              | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-popup               | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-select (deprecated) | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-sheet               | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-time-input          | Web Component    | ⬜         | ⬜   | ⬜            |
