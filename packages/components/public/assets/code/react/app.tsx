import React from 'react';
import {
  useBaloiseDesignSystem,
  BalApp,
} from '@baloise/design-system-components-react';

import Example from './example';

export default function App() {
  useBaloiseDesignSystem();

  return (
    <BalApp>
      <main className="container py-large">
        <Example />
      </main>
    </BalApp>
  );
}
