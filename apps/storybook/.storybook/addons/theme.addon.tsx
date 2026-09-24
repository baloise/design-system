import React from 'react'
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { addons, useGlobals } from 'storybook/manager-api'

const DesignSVG = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M4.35.577a7 7 0 0 1 9.381 4.085c.27.758.15 1.626-.315 2.282A2.526 2.526 0 0 1 11.37 8H9.5a1.5 1.5 0 0 0-.455 2.931c.55.205.935.702.972 1.286a1.43 1.43 0 0 1-1.01 1.524A6.8 6.8 0 0 1 7.129 14a7 7 0 0 1-3.636-1.021A7.055 7.055 0 0 1 .15 6.517a7.055 7.055 0 0 1 4.2-5.94zM4.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-6 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clip-rule="evenodd"/></svg>`

const SvgIcon = ({ html, size = 14 }: { html: string; size?: number }) => (
  <span
    style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

const themes: { id: string; title: string; color: string }[] = [
  { id: '', title: 'Helvetia', color: '#000d6e' },
  { id: 'orange-vacations', title: 'Orange Vacations', color: '#f19654' },
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
            // right: (
            //   <span
            //     style={{
            //       display: 'inline-block',
            //       width: 12,
            //       height: 12,
            //       borderRadius: '50%',
            //       background: t.color,
            //       border: '1px solid rgba(0,0,0,.15)',
            //     }}
            //   />
            // ),
          }))}
        />
      )}
    >
      <IconButton key="theme-toolbar" title="Select a brand (theme)" active={activeTheme !== ''}>
        <SvgIcon html={DesignSVG} />
        {/* <span
          style={{
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: active.color,
            border: '1px solid rgba(0,0,0,.15)',
            marginLeft: 4,
            marginRight: 2,
          }}
        /> */}
        {active.title}
      </IconButton>
    </WithTooltip>
  )
}
