import React from 'react'
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { addons, useGlobals } from 'storybook/manager-api'

const themes: { id: string; title: string; color: string }[] = [
  { id: '', title: 'Helvetia', color: '#000d6e' },
  { id: 'tcs', title: 'TCS', color: '#ffeb02' },
]

export const registerTheme: React.FC = () => {
  const [globals, updateGlobals] = useGlobals()
  const activeTheme = globals.theme ?? ''

  const handleSelect = (id: string) => {
    updateGlobals({ ...globals, theme: id })
    addons.getChannel().emit(FORCE_RE_RENDER)
  }

  const active = themes.find(t => t.id === activeTheme) ?? themes[0]

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={themes.map(t => ({
            id: t.id || 'Helvetia',
            title: t.title,
            active: t.id === activeTheme,
            onClick: () => {
              handleSelect(t.id)
              onHide()
            },
            right: (
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: t.color,
                  border: '1px solid rgba(0,0,0,.15)',
                }}
              />
            ),
          }))}
        />
      )}
    >
      <IconButton key="theme-toolbar" title="Brand theme" active={activeTheme !== ''}>
        <span style={{ marginRight: 6 }}>Theme:</span>
        <span
          style={{
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: active.color,
            border: '1px solid rgba(0,0,0,.15)',
            marginRight: 2,
          }}
        />
        {active.title}
      </IconButton>
    </WithTooltip>
  )
}
