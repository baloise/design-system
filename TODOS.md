# TODO's

- Check CSS utitlites for breaking changes
- Icons
- Check Dropdown with Shadow DOM
- Check visuals
- Update docs
- replace all base colors with brand colors
- replace all core components in the other components
  - text
  - heading
  - link
  - button
  - stack
  - label
  - divider

## MIGRATION

- add missing deprecated tokens to avoid clashses
- check for missing utility classes

## EXTRAS

- Create new visuals with the new styles
- Check to switch label, heading, text, stack, content component in the proxy libs

## MIGRATION NOTES

- renaming of hovered => hover and pressed => active
- accordion v1 is gone
- bal-nav is gone

## Documentation

- add Link documentation for typography
- add new sandbox code

## FIXES

- Icons does not work wiht checkbox tiles

## generel

| Item            | Description                                                           | Status |
| --------------- | --------------------------------------------------------------------- | ------ |
| T-Shirt Sizes   | Change to 2xl and get rid off normal and use medium instead           | ⬜     |
| FIGMA API       | Pull tokens changes form the figma api instead of the manual proccess | ⬜     |
| Playwright      | Replace all Cypess test with Playwright                               | ⬜     |
| Default vs Base | Use Default for states with hover and active                          | ⬜     |
| Modal           | Use new native dialog API                                             | ⬜     |
| Popup           | Use new native popup API                                              | ⬜     |
| Accordion       | Use new native accordion API                                          | ⬜     |

## components

Rules

use id's and parts in the shadow dom components

### atomic components and prio for website

| Component         | Recommended Type | Shadow DOM | Docs | Design Tokens |
| ----------------- | ---------------- | ---------- | ---- | ------------- |
| bal-close         | Hybrid           | ✅         | ⬜   | ⬜            |
| bal-tag           | Hybrid           | ✅         | ⬜   | ⬜            |
| bal-badge         | Hybrid           | ✅         | ⬜   | ⬜            |
| bal-heading       | Hybrid           | ✅         | ⬜   | ⬜            |
| bal-text          | Hybrid           | ✅         | ⬜   | ⬜            |
| bal-Link          | CSS-Only         | ⏳         | ⬜   | ⬜            |
| bal-label         | Hybrid           | ⏳         | ⬜   | ⬜            |
| bal-divider       | Hybrid           | ⏳         | ⬜   | ⬜            |
| bal-button        | Hybrid           | ⏳         | ⬜   | ⬜            |
| bal-card          | Hybrid           | ⏳         | ⬜   | ⬜            |
| bal-stack         | Hybrid           | ⏳         | ⬜   | ⬜            |
| bal-list          | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-notification  | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-accordion     | Hybrid           | ⬜         | ⬜   | ⬜            |
| ----------------- | ---------------- | ---------- | ---- | ------------- |
| bal-icon          | Web Component    | ✅         | ⬜   | ⬜            |
| bal-spinner       | Web Component    | ✅         | ⬜   | ⬜            |
| bal-logo          | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-switch        | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-check         | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-toast         | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-snackbar      | Web Component    | ⬜         | ⬜   | ⬜            |

### rest components

| Component          | Recommended Type | Shadow DOM | Docs | Design Tokens |
| ------------------ | ---------------- | ---------- | ---- | ------------- |
| bal-data           | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-input          | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-modal          | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-pagination     | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-popover        | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-progress-bar   | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-step-item      | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-steps          | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-table          | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-tabs           | Hybrid           | ⬜         | ⬜   | ⬜            |
| bal-tooltip        | Hybrid           | ⬜         | ⬜   | ⬜            |
| ------------------ | ---------------- | ---------- | ---- | ------------- |
| bal-footer         | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-radio          | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-segment        | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-app            | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-carousel       | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-date           | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-dropdown       | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-file-upload    | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-hint           | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-number-input   | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-option         | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-popup          | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-select         | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-sheet          | Web Component    | ⬜         | ⬜   | ⬜            |
| bal-time-input     | Web Component    | ⬜         | ⬜   | ⬜            |
