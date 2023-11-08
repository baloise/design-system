import React from 'react';
import {
  useBaloiseDesignSystem,
  BalApp,
} from '@baloise/design-system-components-react';

import Example from './Example';

export default function App() {
  useBaloiseDesignSystem();

  return (
    <BalApp>
      <Example />
    </BalApp>
  );
}
