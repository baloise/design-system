---
'@baloise/design-system-components': major
'@baloise/design-system-css': major
---

remove deprecated global component styles.
Component styles will be loaded lazy to optimize the speed of the first render, there for only import the needed CSS files.

#### Global import

The global import of the main styles and his utility classes move to the CSS framework.

**before**

```scss
@import '@baloise/design-system-components/src/styles/global';
```

**after**

With the solution we are able to add only what we need.

```scss
// SASS mixins and variables
@import '@baloise/design-system-css/sass/mixins';

// Resets CSS for all browser
@import '@baloise/design-system-css/css/normalize';
@import '@baloise/design-system-css/css/structure';

// Custom font faces
@import '@baloise/design-system-css/sass/font';

// Core CSS, always required
@import '@baloise/design-system-css/css/core';

// Deprecated styles will be removed with the next breaking version (optional)
@import '@baloise/design-system-css/sass/legacy';

// CSS utilities classes (optional)
@import '@baloise/design-system-css/css/border';
@import '@baloise/design-system-css/css/color';
@import '@baloise/design-system-css/css/display';
@import '@baloise/design-system-css/css/flex';
@import '@baloise/design-system-css/css/grid';
@import '@baloise/design-system-css/css/opacity';
@import '@baloise/design-system-css/css/radius';
@import '@baloise/design-system-css/css/shadow';
@import '@baloise/design-system-css/css/spacing';
@import '@baloise/design-system-css/css/typography';
```

#### Component utilities import

The location of the `variable` & `mixins` has changed to `@baloise/design-system-css/sass/mixins`.

**before**

```scss
@import '@baloise/design-system-components/src/styles/global.utilities';
```

**after**

```scss
@import '@baloise/design-system-css/sass/mixins';
```
