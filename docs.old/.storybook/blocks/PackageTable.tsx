import React from 'react'

export const PackageTable = ({ children }) => {
  return (
    <table className="sb-unstyled table w-full is-striped mt-large">
      <thead>
        <tr>
          <th>Package</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Fonts</strong>
          </td>
          <td>Web-Font of the design system.</td>
        </tr>
        <tr>
          <td>
            <strong>Tokens</strong>
          </td>
          <td>Design Tokens like color and spacing.</td>
        </tr>
        <tr>
          <td>
            <strong>Icons</strong>
          </td>
          <td>SVG UI-Icons of the design system.</td>
        </tr>
        <tr>
          <td>
            <strong>Brand Icons</strong>
          </td>
          <td>SVG Brand-Icons of the design system.</td>
        </tr>
        <tr>
          <td>
            <strong>Favicons</strong>
          </td>
          <td>Favicons of the design system.</td>
        </tr>
        <tr>
          <td>
            <strong>Maps</strong>
          </td>
          <td>Google Maps styles and icons.</td>
        </tr>
        <tr>
          <td>
            <strong>Devkit</strong>
          </td>
          <td>Angular Schematics for creating a new project and upgrade scripts</td>
        </tr>
        <tr>
          <td>
            <strong>Styles</strong>
          </td>
          <td>Basic CSS styles with utility classes.</td>
        </tr>
        <tr>
          <td>
            <strong>Core</strong>
          </td>
          <td>Core package build with web components and styling.</td>
        </tr>
        <tr>
          <td>
            <strong>Angular</strong>
          </td>
          <td>Angular component proxies based on the the core package.</td>
        </tr>
        <tr>
          <td>
            <strong>React</strong>
          </td>
          <td>React component proxies based on the the core package.</td>
        </tr>
        <tr>
          <td>
            <strong>Table</strong>
          </td>
          <td>Integration library for AG-Grid with styles and renderer functions</td>
        </tr>
        <tr>
          <td>
            <strong>Testing</strong>
          </td>
          <td>Testing package with custom and overridden commands for each component.</td>
        </tr>
      </tbody>
    </table>
  )
}
