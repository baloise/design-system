// Resets CSS for all browser
import '@baloise/ds-styles/css/normalize.css'
import '@baloise/ds-styles/css/structure.css'

// Custom font faces
import '@baloise/ds-styles/css/font.css'

// Core CSS, always required
import '@baloise/ds-styles/css/core.css'

// CSS utilities classes (optional)
import '@baloise/ds-styles/css/utilities/all'

import { defineCustomElements } from '@baloise/ds-core/loader'
import { balSnackbarController, BalToastController } from '@baloise/ds-core'

defineCustomElements()
window.balSnackbarController = balSnackbarController
window.BalToastController = BalToastController
