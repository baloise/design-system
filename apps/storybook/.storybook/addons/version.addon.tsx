import React from 'react'
import { ToggleButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components'
import { version } from '../../../../packages/core/package.json'

const TagSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-2 -2 16 16" height="14" width="14" focusable="false" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M6.303042857142857 0.37657714285714283C6.544165714285714 0.13545857142857143 6.871191428571428 0 7.21218 0H10.714285714285714c0.7100571428571428 0 1.2857142857142856 0.575634 1.2857142857142856 1.2857142857142856v3.5021057142857144c0 0.3409885714285714 -0.13542857142857143 0.6680142857142857 -0.3765428571428571 0.9091371428571428L5.837708571428571 11.48262857142857c-0.5021057142857143 0.5021142857142856 -1.3161685714285714 0.5021142857142856 -1.8182742857142855 0L0.517332 7.9805657142857145c-0.502104 -0.5021057142857143 -0.5021023714285714 -1.3161685714285714 0 -1.8182742857142855l5.785710857142857 -5.785714285714286ZM8.785714285714285 2.357142857142857c0.4734 0 0.8571428571428571 0.38376 0.8571428571428571 0.8571428571428571 0 0.4733914285714285 -0.3837428571428571 0.8571428571428571 -0.8571428571428571 0.8571428571428571 -0.4733828571428571 0 -0.8571428571428571 -0.3837514285714285 -0.8571428571428571 -0.8571428571428571 0 -0.4733828571428571 0.3837514285714285 -0.8571428571428571 0.8571428571428571 -0.8571428571428571Z" clip-rule="evenodd" stroke-width="0.8571"></path></svg>`

const SvgIcon = ({ html, size = 14 }: { html: string; size?: number }) => (
  <span
    style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

const links = [{ id: 'baloise', title: 'Baloise DS', href: 'https://design.baloise.dev/' }]

export const registerVersion: React.FC = () => {
  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={() => (
        <TooltipLinkList
          links={links.map(link => ({
            id: link.id,
            title: link.title,
            href: link.href,
            target: '_blank',
          }))}
        />
      )}
    >
      <ToggleButton key="version-toolbar" title="Select Design System version" pressed={false} ariaLabel={false}>
        <SvgIcon html={TagSVG} />
        {version}
      </ToggleButton>
    </WithTooltip>
  )
}
