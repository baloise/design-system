import React from 'react'
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { addons, useGlobals } from 'storybook/manager-api'

const LocationSVG = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M7 13.5l-.4.3-.001-.002-.003-.003-.01-.014-.039-.052a50.534 50.534 0 0 1-.66-.92 51.781 51.781 0 0 1-1.562-2.362c-.568-.915-1.142-1.92-1.576-2.859C2.324 6.668 2 5.74 2 5a5 5 0 1 1 10 0c0 .74-.324 1.668-.75 2.588-.433.94-1.007 1.944-1.575 2.86a51.781 51.781 0 0 1-2.222 3.28l-.039.053-.01.014-.003.003v.001L7 13.5zm0 0l.4.3a.5.5 0 0 1-.8 0l.4-.3zM8.622 5a1.622 1.622 0 1 1-3.244 0 1.622 1.622 0 0 1 3.244 0z" clip-rule="evenodd"/></svg>`

const regions: { id: string; title: string; flag: string }[] = [
  { id: 'CH', title: 'Switzerland', flag: '🇨🇭' },
  { id: 'DE', title: 'Germany', flag: '🇩🇪' },
  { id: 'AT', title: 'Austria', flag: '🇦🇹' },
  { id: 'BE', title: 'Belgium', flag: '🇧🇪' },
  { id: 'LU', title: 'Luxembourg', flag: '🇱🇺' },
  { id: 'ES', title: 'Spain', flag: '🇪🇸' },
  { id: 'IT', title: 'Italy', flag: '🇮🇹' },
  { id: 'NL', title: 'Netherlands', flag: '🇳🇱' },
  { id: 'FR', title: 'France', flag: '🇫🇷' },
]

const SvgIcon = ({ html, size = 14 }: { html: string; size?: number }) => (
  <span
    style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export const registerRegion: React.FC = () => {
  const [globals, updateGlobals] = useGlobals()
  const activeRegion = globals.region ?? 'CH'

  const handleSelect = (id: string) => {
    updateGlobals({ ...globals, region: id })
    addons.getChannel().emit(FORCE_RE_RENDER)
  }

  const active = regions.find(r => r.id === activeRegion) ?? regions[0]

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={regions.map(r => ({
            id: r.id,
            title: `${r.flag} ${r.title} (${r.id})`,
            active: r.id === activeRegion,
            onClick: () => {
              handleSelect(r.id)
              onHide()
            },
          }))}
        />
      )}
    >
      <IconButton key="region-toolbar" title="Design system region" active={activeRegion !== 'CH'}>
        <SvgIcon html={LocationSVG} />
        <span style={{ marginLeft: 4, fontSize: '16px' }}>{active.flag}</span>
      </IconButton>
    </WithTooltip>
  )
}
