import React from 'react';
import { createRoot } from 'react-dom/client';

import '@baloise/design-system-components/dist/design-system-components/design-system-components.css';

import App from './app';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
