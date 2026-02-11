# TODO's

- Check CSS utitlites for breaking changes
- Check Dropdown with Shadow DOM
- Update docs
- Create new visuals with the new styles

## MIGRATION

- add missing deprecated tokens to avoid clashses
- check for missing utility classes
- renaming of hovered => hover and pressed => active
- accordion v1 is gone
- bal-nav is gone

## FIXES

- Icons does not work wiht checkbox tiles

## generel

| Item            | Description                                                           | Status |
| --------------- | --------------------------------------------------------------------- | ------ |
| Outline Shadow  | Define it as a variable to overide the color                          | ⬜     |
| T-Shirt Sizes   | Change to 2xl and get rid off normal and use medium instead           | ⬜     |
| FIGMA API       | Pull tokens changes form the figma api instead of the manual proccess | ⬜     |
| Playwright      | Replace all Cypess test with Playwright                               | ⬜     |
| Default vs Base | Use Default for states with hover and active                          | ⬜     |
| Modal           | Use new native dialog API                                             | ⬜     |
| Popup           | Use new native popup API                                              | ⬜     |
| Accordion       | Use new native accordion API                                          | ⬜     |
| Sandbox         | Use new sandbox api                                                   | ⬜     |
| Brand Icons     | Update brand icons                                                    | ⬜     |
| Brand Icons API | Create a task to automate the update                                  | ⬜     |

## components

### rules

use id's and parts in the shadow dom components

### atomic components and prio for website

| Component          | Recommended Type   | Shadow DOM | Docs | Design Tokens | Testing |
| ------------------ | ------------------ | ---------- | ---- | ------------- | ------- |
| bal-link           | CSS-Only           | ✅         | ⬜   | ✅            | ⬜      |
| bal-stack          | Hybrid (No Shadow) | ✅         | ⬜   | ⬜            | ⬜      |
| bal-close          | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-tag            | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-badge          | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-heading        | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-text           | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-button         | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-label          | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-divider        | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-accordion      | Hybrid             | ✅         | ⬜   | ⬜            | ⬜      |
| bal-notification   | Hybrid             | ✅         | ⬜   | ✅            | ⬜      |
| bal-card           | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      |
| bal-list           | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      |
| bal-list-accordion | Hybrid             | ⬜         | ⬜   | ⬜            | ⬜      |
| -----------------  | ----------------   | ---------- | ---- | ------------- | --      |
| bal-icon           | Web Component      | ✅         | ⬜   | ✅            | ⬜      |
| bal-spinner        | Web Component      | ✅         | ⬜   | ✅            | ⬜      |
| bal-logo           | Web Component      | ✅         | ⬜   | ⬜            | ⬜      |
| bal-switch         | Web Component      | ✅         | ⬜   | ⬜            | ⬜      |
| bal-check          | Web Component      | ✅         | ⬜   | ⬜            | ⬜      |
| bal-toast          | Web Component      | ✅         | ⬜   | ✅            | ⬜      |
| bal-snackbar       | Web Component      | ✅         | ⬜   | ✅            | ⬜      |
| bal-shape          | Web Component      | ⬜         | ⬜   | ⬜            | ⬜      |
| bal-stage          | Web Component      | ⬜         | ⬜   | ⬜            | ⬜      |

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
