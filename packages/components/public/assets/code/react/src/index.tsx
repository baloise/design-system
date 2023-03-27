import React from "react";
import ReactDOM from "react-dom";

// Resets CSS for all browser
import "@baloise/design-system-css/css/normalize.css";
import "@baloise/design-system-css/css/structure.css";

// Custom font faces
import "@baloise/design-system-css/css/font.css";

// Core CSS, always required
import "@baloise/design-system-css/css/core.css";

// CSS utilities classes (optional)
import "@baloise/design-system-css/css/border.css";
import "@baloise/design-system-css/css/color.css";
import "@baloise/design-system-css/css/display.css";
import "@baloise/design-system-css/css/flex.css";
import "@baloise/design-system-css/css/grid.css";
import "@baloise/design-system-css/css/opacity.css";
import "@baloise/design-system-css/css/radius.css";
import "@baloise/design-system-css/css/shadow.css";
import "@baloise/design-system-css/css/spacing.css";
import "@baloise/design-system-css/css/typography.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
