# Baloise v19 → v20 Component Mapping

Draft mapping between v19 (`main`, `bal-*` prefix, `components-v19-main.json`) and v20
(`next`, `ds-*` prefix, `packages/core/docs/components.json`) components. This is the
reference used to generate per-component `GAP-Baloise.md` gap analyses.

See [TODOS.md](./TODOS.md) for the component build-out status (App / Extended / Website
Scope tables) — done components and components planned for a later stage.

**Please review and mark each `⬜` as `✅` (confirmed) or correct the target tag / note.**

## Direct rename (prefix swap, high confidence)

| v19 tag              | v20 tag             | Confirmed? |
| -------------------- | ------------------- | ---------- |
| `bal-accordion`      | `ds-accordion`      | ✅         |
| `bal-app`            | `ds-app`            | ✅         |
| `bal-badge`          | `ds-badge`          | ✅         |
| `bal-button`         | `ds-button`         | ✅         |
| `bal-button-group`   | `ds-button-group`   | ✅         |
| `bal-card`           | `ds-card`           | ✅         |
| `bal-card-actions`   | `ds-card-actions`   | ✅         |
| `bal-card-content`   | `ds-card-content`   | ✅         |
| `bal-card-subtitle`  | `ds-card-subtitle`  | ✅         |
| `bal-card-title`     | `ds-card-title`     | ✅         |
| `bal-carousel`       | `ds-carousel`       | ✅         |
| `bal-carousel-item`  | `ds-carousel-item`  | ✅         |
| `bal-checkbox`       | `ds-checkbox`       | ✅         |
| `bal-checkbox-group` | `ds-checkbox-group` | ✅         |
| `bal-close`          | `ds-close`          | ✅         |
| `bal-content`        | `ds-content`        | ✅         |
| `bal-data`           | `ds-data`           | ✅         |
| `bal-data-item`      | `ds-data-item`      | ✅         |
| `bal-data-label`     | `ds-data-label`     | ✅         |
| `bal-data-value`     | `ds-data-value`     | ✅         |
| `bal-divider`        | `ds-divider`        | ✅         |
| `bal-file-upload`    | `ds-file-upload`    | ✅         |
| `bal-footer`         | `ds-footer`         | ✅         |
| `bal-heading`        | `ds-heading`        | ✅         |
| `bal-hint`           | `ds-hint`           | ✅         |
| `bal-hint-text`      | `ds-hint-text`      | ✅         |
| `bal-hint-title`     | `ds-hint-title`     | ✅         |
| `bal-icon`           | `ds-icon`           | ✅         |
| `bal-input`          | `ds-input`          | ✅         |
| `bal-label`          | `ds-label`          | ✅         |
| `bal-list`           | `ds-list`           | ✅         |
| `bal-logo`           | `ds-logo`           | ✅         |
| `bal-modal`          | `ds-modal`          | ✅         |
| `bal-modal-body`     | `ds-modal-body`     | ✅         |
| `bal-modal-header`   | `ds-modal-header`   | ✅         |
| `bal-navbar`         | `ds-navbar`         | ✅         |
| `bal-notification`   | `ds-notification`   | ✅         |
| `bal-number-input`   | `ds-number-input`   | ✅         |
| `bal-pagination`     | `ds-pagination`     | ✅         |
| `bal-popup`          | `ds-popup`          | ✅         |
| `bal-progress-bar`   | `ds-progress-bar`   | ✅         |
| `bal-radio`          | `ds-radio`          | ✅         |
| `bal-radio-group`    | `ds-radio-group`    | ✅         |
| `bal-segment`        | `ds-segment`        | ✅         |
| `bal-segment-item`   | `ds-segment-item`   | ✅         |
| `bal-select`         | `ds-select`         | ✅         |
| `bal-select-option`  | `ds-select-option`  | ✅         |
| `bal-shape`          | `ds-shape`          | ✅         |
| `bal-snackbar`       | `ds-snackbar`       | ✅         |
| `bal-spinner`        | `ds-spinner`        | ✅         |
| `bal-stack`          | `ds-stack`          | ✅         |
| `bal-steps`          | `ds-steps`          | ✅         |
| `bal-tabs`           | `ds-tabs`           | ✅         |
| `bal-tag`            | `ds-tag`            | ✅         |
| `bal-tag-group`      | `ds-tag-group`      | ✅         |
| `bal-text`           | `ds-text`           | ✅         |
| `bal-textarea`       | `ds-textarea`       | ✅         |
| `bal-toast`          | `ds-toast`          | ✅         |
| `bal-tooltip`        | `ds-tooltip`        | ✅         |

Note: `bal-popup` → `ds-popup` is listed here as a direct rename, but see also
`bal-popover` / `bal-popover-content` below, which may target the same `ds-popup` —
these three v19 tags need to be disambiguated against one v20 tag.

## Renamed / merged / consolidated (needs confirmation)

| v19 tag                        | v20 tag (guess)          | Reasoning                                                                             | Confirmed? |
| ------------------------------ | ------------------------ | ------------------------------------------------------------------------------------- | ---------- |
| `bal-accordion-details`        | `ds-accordion`           | Consolidated — via `content` slot instead of subcomponent                             | ✅         |
| `bal-accordion-summary`        | `ds-accordion`           | Consolidated — via `summary` slot instead of subcomponent                             | ✅         |
| `bal-accordion-trigger`        | `ds-accordion`           | Consolidated — built into ds-accordion button props                                   | ✅         |
| `bal-check`                    | `ds-checkbox` (internal) | Folded in — was internal checkmark visual, no separate tag in v20                     | ✅         |
| `bal-date`                     | `ds-date`                | Renamed — full calendar API (open/close/select methods) matches                       | ✅         |
| `bal-dropdown`                 | `ds-select`              | Renamed — multiple/chips/filter/clearable props match Slim Select description         | ✅         |
| `bal-form`                     | `form`                   | Moved to CSS-only utility (no longer a Stencil component)                             | ✅         |
| `bal-form-col`                 | `grid`                   | Moved to CSS-only utility — check if col maps to `grid` or `container`                | ✅         |
| `bal-form-grid`                | `grid`                   | Moved to CSS-only utility                                                             | ✅         |
| `bal-input-date`               | `ds-date`                | Superseded — subset of bal-date props/methods, looks like older duplicate             | ✅         |
| `bal-list-item`                | `ds-item`                | Consolidated — ds-item supports plain/accordion/link/button variants                  | ✅         |
| `bal-list-item-accordion-body` | `ds-item`                | Consolidated into ds-item                                                             | ✅         |
| `bal-list-item-accordion-head` | `ds-item`                | Consolidated into ds-item                                                             | ✅         |
| `bal-list-item-content`        | `ds-item`                | Consolidated into ds-item                                                             | ✅         |
| `bal-list-item-icon`           | `ds-item`                | Consolidated into ds-item                                                             | ✅         |
| `bal-list-item-subtitle`       | `ds-item`                | Consolidated into ds-item                                                             | ✅         |
| `bal-list-item-title`          | `ds-item`                | Consolidated into ds-item                                                             | ✅         |
| `bal-nav`                      | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-link`                 | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-link-grid`            | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-link-grid-col`        | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-link-group`           | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-menu-bar`             | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-menu-flyout`          | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-nav-meta-bar`             | `ds-navbar`              | Consolidated — documented in `packages/core/CONTEXT.md` as intentional MVP scope-down | ✅         |
| `bal-navbar-brand`             | `ds-navbar`              | Consolidated — `brand` slot                                                           | ✅         |
| `bal-navbar-menu`              | `ds-navbar`              | Consolidated — `menu-start`/`menu-end` slots                                          | ✅         |
| `bal-navbar-menu-end`          | `ds-navbar`              | Consolidated — `menu-end` slot                                                        | ✅         |
| `bal-navbar-menu-start`        | `ds-navbar`              | Consolidated — `menu-start` slot                                                      | ✅         |
| `bal-notices`                  | `ds-alert-container`     | Renamed — manages toast/snackbar queue                                                | ✅         |
| `bal-option`                   | `ds-select-option`       | Was part of dropdown now ds-select-option                                             | ✅         |
| `bal-option-list`              | `ds-select-optgroup`?    | Was internal option-list infra for bal-dropdown now in ds-select; needs confirmation  | ✅         |
| `bal-popover`                  | `ds-popup`               | Consolidated                                                                          | ✅         |
| `bal-popover-content`          | `ds-popup`               | Consolidated                                                                          | ✅         |
| `bal-radio-icon`               | `ds-radio` (internal)    | Folded in — was internal radio visual, no separate tag in v20                         | ✅         |
| `bal-popup` variant drawer     | `ds-drawer`              | Was in popup moved out into seperate component                                        | ✅         |
| `bal-step-item`                | `ds-step`                | Renamed                                                                               | ✅         |
| `bal-switch`                   | `ds-toggle`              | Renamed and now a full form control not only icon                                     | ✅         |
| `bal-tab-item`                 | `ds-tab`                 | Renamed                                                                               | ✅         |
| `bal-table`                    | `table`                  | Moved to CSS-only utility                                                             | ✅         |
| `bal-time-input`               | `time-input`             | Moved to CSS-only utility                                                             | ✅         |

## Not yet migrated (no v20 target)

| v19 tag                  | Note                                               | Reasoning                                                             | Confirmed? |
| ------------------------ | -------------------------------------------------- | --------------------------------------------------------------------- | ---------- |
| `bal-sheet`              | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-card-button`        | No corresponding component/directory in `next` yet | Removed use ds-card-actions                                           | ✅         |
| `bal-field`              | No corresponding component/directory in `next` yet | Removed and done with css utils or inside the form components         | ✅         |
| `bal-field-control`      | No corresponding component/directory in `next` yet | Removed and done with css utils or inside the form components         | ✅         |
| `bal-field-hint`         | No corresponding component/directory in `next` yet | Removed and done with css utils or inside the form components         | ✅         |
| `bal-field-label`        | No corresponding component/directory in `next` yet | Removed and done with css utils or inside the form components         | ✅         |
| `bal-field-message`      | No corresponding component/directory in `next` yet | Removed and done with css utils or inside the form components         | ✅         |
| `bal-input-group`        | No corresponding component/directory in `next` yet | Done with the slots `statt` and `end` of the field functinal coponent | ✅         |
| `bal-input-slider`       | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-input-stepper`      | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-date-calendar`      | No corresponding component/directory in `next` yet | Removed now inside the ds-date                                        | ✅         |
| `bal-date-calendar-cell` | No corresponding component/directory in `next` yet | Removed now inside the ds-date                                        | ✅         |
| `bal-stage`              | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-stage-back-link`    | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-stage-body`         | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-stage-foot`         | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-stage-head`         | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |
| `bal-stage-image`        | No corresponding component/directory in `next` yet | MVP Scope                                                             | ✅         |

## Net-new in v20 (no v19 origin, or origin unclear)

| v20 tag              | Possible v19 origin                   |
| -------------------- | ------------------------------------- |
| `ds-card-header`     | — (genuinely new)                     |
| `ds-select-optgroup` | Possibly `bal-option-list`, see above |
| `ds-step-panel`      | — (genuinely new)                     |
| `ds-tab-panel`       | — (genuinely new)                     |

## CSS-only utility components (out of scope for prop/method/event diffing)

`container`, `form`, `grid`, `link`, `picture`, `table`, `time-input` — these are
`type: "css-only"` in `components.json`, i.e. HTML/CSS patterns, not Stencil web
components. No props/methods/events to diff against v19 equivalents.
