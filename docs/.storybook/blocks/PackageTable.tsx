


import React from 'react';

export const PackageTable = ({ children }) => {
  return <table className="sb-unstyled table w-full is-striped mt-large">
  <thead>
    <tr>
      <th>Package</th>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/components/CHANGELOG.md">Components</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-components">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-components" alt="npm" />
        </a>
      </td>
      <td>Core package build with web components and global styling.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/components-angular/CHANGELOG.md">
          Components Angular
        </a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-components-angular">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-components-angular" alt="npm" />
        </a>
      </td>
      <td>Angular component proxies based on the the core package.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/components-react/CHANGELOG.md">
          Components React
        </a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-components-react">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-components-react" alt="npm" />
        </a>
      </td>
      <td>React component proxies based on the the core package.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/components-table/CHANGELOG.md">
          Components Table
        </a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-components-table">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-components-table" alt="npm" />
        </a>
      </td>
      <td>Integration library for AG-Grid with styles and renderer functions</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/components-vue/CHANGELOG.md">
          Components Vue
        </a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-components-vue">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-components-vue" alt="npm" />
        </a>
      </td>
      <td>Vue component proxies based on the the core package.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/cli/CHANGELOG.md">CLI</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-cli">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-cli" alt="npm" />
        </a>
      </td>
      <td>CLI to scaffold an angular project or migration helpers.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/fonts/CHANGELOG.md">Fonts</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-fonts">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-fonts" alt="npm" />
        </a>
      </td>
      <td>Web-Font of the design system.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/icons/CHANGELOG.md">Icons</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-icons">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-icons" alt="npm" />
        </a>
      </td>
      <td>SVG icons of the design system.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/favicons/CHANGELOG.md">Favicons</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-favicons">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-favicons" alt="npm" />
        </a>
      </td>
      <td>Favicons of the design system.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/maps/CHANGELOG.md">Maps</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-maps">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-maps" alt="npm" />
        </a>
      </td>
      <td>Google Maps styles and icons.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/styles/CHANGELOG.md">Styles</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-styles">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-styles" alt="npm" />
        </a>
      </td>
      <td>Basic CSS styles with utility classes.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/testing/CHANGELOG.md">Testing</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-testing">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-testing" alt="npm" />
        </a>
      </td>
      <td>Testing package with custom and overridden commands for each component.</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/baloise/design-system/blob/main/packages/tokens/CHANGELOG.md">Tokens</a>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/@baloise/design-system-tokens">
          <img src="https://img.shields.io/npm/v/@baloise/design-system-tokens" alt="npm" />
        </a>
      </td>
      <td>Design Tokens like color and spacing.</td>
    </tr>
  </tbody>
</table>
};

