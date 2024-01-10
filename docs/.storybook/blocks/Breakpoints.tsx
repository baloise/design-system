import React from 'react'

export const Pixel = ({ children }) => (
  <pre>
    <code>{children}</code>
  </pre>
)

export const Block = ({ label = '' }) => (
  <div className={`p-small radius-normal bg-${label ? 'green' : 'grey'}-2`}>
    <span className="text-weight-bold">{label || '-'}</span>
  </div>
)

export const Breakpoints = ({ children }) => {
  return (
    <table className="sb-unstyled table w-full is-bordered my-large">
      <thead>
        <tr>
          <th style={{ width: '16.6%' }}>
            Mobile
            <br /> up to <Pixel>768px</Pixel>
          </th>
          <th style={{ width: '16.6%' }}>
            Tablet
            <br /> between <Pixel>769px</Pixel> and <Pixel>1023px</Pixel>
          </th>
          <th style={{ width: '16.6%' }}>
            Desktop
            <br /> between <Pixel>1024px</Pixel> and <Pixel>1279px</Pixel>
          </th>
          <th style={{ width: '16.6%' }}>
            High-Definition
            <br /> between <Pixel>1280px</Pixel> and <Pixel>1439px</Pixel>
          </th>
          <th style={{ width: '16.6%' }}>
            Widescreen
            <br /> between <Pixel>1440px</Pixel> and <Pixel>1919px</Pixel>
          </th>
          <th>
            FullHD
            <br /> <Pixel>1920px</Pixel> and above
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Block label="mobile" />
          </td>
          <td colSpan={5}>
            <Block />
          </td>
        </tr>
        <tr>
          <td>
            <Block />
          </td>
          <td colSpan={5}>
            <Block label="tablet" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Block />
          </td>
          <td colSpan={4}>
            <Block label="desktop" />
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <Block />
          </td>
          <td colSpan={3}>
            <Block label="high-definition" />
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <Block />
          </td>
          <td colSpan={2}>
            <Block label="widescreen" />
          </td>
        </tr>
        <tr>
          <td colSpan={5}>
            <Block />
          </td>
          <td colSpan={1}>
            <Block label="fullhd" />
          </td>
        </tr>
        {/* DIVIDER */}
        {/* DIVIDER */}
        {/* DIVIDER */}
        <tr>
          <td colSpan={1}>
            <Block />
          </td>
          <td colSpan={1}>
            <Block label="tablet-only" />
          </td>
          <td colSpan={4}>
            <Block />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Block />
          </td>
          <td colSpan={1}>
            <Block label="desktop-only" />
          </td>
          <td colSpan={3}>
            <Block />
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <Block />
          </td>
          <td colSpan={1}>
            <Block label="high-definition-only" />
          </td>
          <td colSpan={2}>
            <Block />
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <Block />
          </td>
          <td colSpan={1}>
            <Block label="widescreen-only" />
          </td>
          <td colSpan={1}>
            <Block />
          </td>
        </tr>
        {/* DIVIDER */}
        {/* DIVIDER */}
        {/* DIVIDER */}
        <tr>
          <td colSpan={2}>
            <Block label="touch" />
          </td>
          <td colSpan={4}>
            <Block />
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <Block label="until-high-definition" />
          </td>
          <td colSpan={3}>
            <Block />
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <Block label="until-widescreen" />
          </td>
          <td colSpan={2}>
            <Block />
          </td>
        </tr>
        <tr>
          <td colSpan={5}>
            <Block label="until-fullhd" />
          </td>
          <td colSpan={1}>
            <Block />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
