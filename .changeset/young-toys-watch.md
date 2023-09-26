---
'@baloise/design-system-css': minor
---

Introduce a compact theme option for the dashboard or internal applications.

The compact theme features a narrower layout with a reduced font size (14px instead of 16px). Additionally, spaces such as margins and paddings are adjusted to align with mobile dimensions, ensuring a more compact appearance.

To activate the compact theme, import the `theme-compact` stylesheet into the root App component or a global stylesheet.

It is recommended to import the `theme-compact` file at the end of your stylesheet, after the other imports from the Design System.

```scss
@import '@baloise/design-system-css/css/theme-compact';

// or for SASS

@import '@baloise/design-system-css/sass/theme-compact';
```
