---
'@baloise/design-system-components-table': minor
'@baloise/design-system-components': minor
'@baloise/design-system-tokens': minor
'@baloise/design-system-css': minor
---

split CSS-Package into smaller exports and moved to CSS-Variables.

Replace the import of the `global` SASS file with the CSS-Package.

**Before**

```scss
@import "@baloise/design-system-components/src/styles/global";
```

**After**

```scss
@import "@baloise/design-system-css/css/baloise-design-system";
```

To be more flexible the new CSS exports can be used directly like that:

```scss
// Resets CSS for all browsers
@import "./normalize";

// Core CSS, always required
@import "./core";

// Custom font faces
@import "./font";

// Deprecated styles will be removed with the next breaking version (optional)
@import "./legacy";

// CSS utilities classes (optional)
@import "@baloise/design-system-css/css/border";
@import "@baloise/design-system-css/css/color";
@import "@baloise/design-system-css/css/display";
@import "@baloise/design-system-css/css/flex";
@import "@baloise/design-system-css/css/grid";
@import "@baloise/design-system-css/css/opacity";
@import "@baloise/design-system-css/css/radius";
@import "@baloise/design-system-css/css/shadow";
@import "@baloise/design-system-css/css/spacing";
@import "@baloise/design-system-css/css/typography";
```


