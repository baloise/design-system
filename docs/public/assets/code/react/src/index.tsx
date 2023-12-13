import React from "react";
import ReactDOM from "react-dom";

// Resets CSS for all browser
import "@baloise/design-system-styles/css/normalize.css";
import "@baloise/design-system-styles/css/structure.css";

// Custom font faces
import "@baloise/design-system-styles/css/font.css";

// Core CSS, always required
import "@baloise/design-system-styles/css/core.css";

// CSS utilities classes (optional)
import "@baloise/design-system-styles/css/utilities/all.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
