import React from 'react'
import ReactDOM from 'react-dom'

// Resets CSS for all browser
import '@baloise/ds-styles/css/normalize.css'
import '@baloise/ds-styles/css/structure.css'

// Custom font faces
import '@baloise/ds-styles/css/font.css'

// Core CSS, always required
import '@baloise/ds-styles/css/core.css'

// CSS utilities classes (optional)
import '@baloise/ds-styles/css/utilities/all.css'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
