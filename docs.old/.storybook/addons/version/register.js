import React from 'react'

import { addons, types } from '@storybook/addons'
import { IconButton, TooltipLinkList, WithTooltip } from '@storybook/components'
import { version } from '../../../../packages/core/package.json'

const links = [
  { id: 'v15', title: 'v15', href: 'https://baloise-design-system-v15.vercel.app' },
  { id: 'v16', title: 'v16', href: 'https://baloise-design-system-v16.vercel.app' },
  { id: 'v17', title: 'v17', href: 'https://baloise-design-system-v17.vercel.app' },
  { id: 'v18', title: 'v18', href: 'https://baloise-design-system-v18.vercel.app' },
]

addons.register('my/toolbar', () => {
  addons.add('my-toolbar-addon/toolbar', {
    title: 'Version badge',
    type: types.TOOLEXTRA,
    render: ({ active }) => {
      return (
        <WithTooltip
          placement="top"
          trigger="click"
          tooltip={({ onHide }) => (
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
          <IconButton key="my-toolbar-links" title="Versions">
            <span className="my-version">Version:</span> {version}
          </IconButton>
        </WithTooltip>
      )
    },
  })
})
