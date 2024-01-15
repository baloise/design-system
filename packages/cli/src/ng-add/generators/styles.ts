import { SchematicsException, Tree } from '@angular-devkit/schematics'

export const addStyles = (host: Tree) => {
  const filePath = `src/styles.scss`
  const configBuffer = host.read(filePath)
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${filePath})`)
  }
  const content = configBuffer.toString()

  if (!content.includes('@baloise/design-system-css/css/core')) {
    const newContent =
      content +
      `
// SASS mixins and variables
@import '@baloise/design-system-css/sass/mixins';

// Resets CSS for all browser
@import '@baloise/design-system-css/css/normalize';
@import '@baloise/design-system-css/css/structure';

// Custom font faces
@import '@baloise/design-system-css/css/font';

// Core CSS, always required
@import '@baloise/design-system-css/css/core';

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
`
    host.overwrite(filePath, newContent)
  }
}
