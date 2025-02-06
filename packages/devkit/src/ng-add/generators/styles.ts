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
@forward '@baloise/ds-styles/sass/mixins';

// Resets CSS for all browser
@forward '@baloise/ds-styles/css/normalize';
@forward '@baloise/ds-styles/css/structure';

// Custom font faces
@forward '@baloise/ds-styles/css/font';

// Core CSS with CSS variables, always required
@forward '@baloise/ds-styles/css/core';

// CSS utilities classes (optional)
@forward '@baloise/ds-styles/css/utilities/background';
@forward '@baloise/ds-styles/css/utilities/border';
@forward '@baloise/ds-styles/css/utilities/elevation';
@forward '@baloise/ds-styles/css/utilities/flex';
@forward '@baloise/ds-styles/css/utilities/interaction';
@forward '@baloise/ds-styles/css/utilities/layout';
@forward '@baloise/ds-styles/css/utilities/sizing';
@forward '@baloise/ds-styles/css/utilities/spacing';
@forward '@baloise/ds-styles/css/utilities/typography';
`
    host.overwrite(filePath, newContent)
  }
}
