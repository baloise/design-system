---
'@baloise/design-system-components': major
'@baloise/design-system-tokens': major
---

remove deprecated parts

### Design Token Removal

| Component     | Value     | Why                                     |
| ------------- | --------- | --------------------------------------- |
| **radius**    | `small`   | Is not supported in the new Style Guide |
| **radius**    | `x-large` | Is not supported in the new Style Guide |
| **container** | `is-blog` | Use default container instead           |

### Component Property Renaming

| Component            | Before        | After              |
| -------------------- | ------------- | ------------------ |
| **bal-card-actions** | `right`       | `position="right"` |
| **bal-navbar-brand** | `link-target` | `target`           |
| **bal-stage**        | `has-shape`   | `shape`            |
| **bal-radio**        | `is-empty`    | `label-hidden`     |

### Component Property Removal

| Component      | Property       | Why                                                              |
| -------------- | -------------- | ---------------------------------------------------------------- |
| **bal-select** | `no-border`    | Left over from the old style guide. Was event not active anymore |
| **bal-select** | `has-movement` | Left over from the old style guide. Was event not active anymore |
