import { SchematicsException, Tree } from '@angular-devkit/schematics'

export const addStyles = (host: Tree) => {
  const filePath = `src/styles.scss`
  const configBuffer = host.read(filePath)
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${filePath})`)
  }
  const content = configBuffer.toString()

  if (!content.includes('@baloise/ds-styles/css/core')) {
    const newContent =
      content +
      `
// SASS mixins and SASS variables
@import '@baloise/ds-styles/sass/mixins';

// Resets CSS for all browser
@import '@baloise/ds-styles/css/normalize';
@import '@baloise/ds-styles/css/structure';

// Custom font faces
@import '@baloise/ds-styles/css/font';

// Core CSS with CSS variables, always required
@import '@baloise/ds-styles/css/core';

// CSS utilities classes (optional)
@import '@baloise/ds-styles/css/utilities/background';
@import '@baloise/ds-styles/css/utilities/border';
@import '@baloise/ds-styles/css/utilities/elevation';
@import '@baloise/ds-styles/css/utilities/flex';
@import '@baloise/ds-styles/css/utilities/interaction';
@import '@baloise/ds-styles/css/utilities/layout';
@import '@baloise/ds-styles/css/utilities/sizing';
@import '@baloise/ds-styles/css/utilities/spacing';
@import '@baloise/ds-styles/css/utilities/typography';
`
    host.overwrite(filePath, newContent)
  }
}
