import React from 'react'
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { addons, useGlobals } from 'storybook/manager-api'

const WebSVG = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M5.04883 0.275541C2.32493 1.06453 0.285118 3.46373 0.0275269 6.375H3.22773C3.41606 4.22626 4.03911 2.14922 5.04883 0.275541ZM3.22773 7.625H0.0275269C0.285118 10.5363 2.32493 12.9355 5.04883 13.7245C4.0391 11.8508 3.41606 9.77374 3.22773 7.625ZM6.6522 13.9915C5.44618 12.0855 4.69968 9.90183 4.48294 7.625H9.51704C9.30031 9.90183 8.5538 12.0855 7.34777 13.9915C7.23256 13.9971 7.11661 14 7.00001 14C6.88338 14 6.76743 13.9971 6.6522 13.9915ZM8.95115 13.7245C11.6751 12.9355 13.7149 10.5363 13.9725 7.625H10.7722C10.5839 9.77375 9.96087 11.8508 8.95115 13.7245ZM10.7722 6.375H13.9725C13.7149 3.46372 11.6751 1.06451 8.95114 0.275533C9.96087 2.14921 10.5839 4.22625 10.7722 6.375ZM6.65221 0.00848953C6.76743 0.00285182 6.88339 0 7.00001 0C7.11661 0 7.23256 0.0028513 7.34777 0.008488C8.5538 1.91446 9.3003 4.09817 9.51704 6.375H4.48294C4.69968 4.09817 5.44618 1.91446 6.65221 0.00848953Z" clip-rule="evenodd"/></svg>`

const languages: { id: string; title: string }[] = [
  { id: 'en', title: 'English' },
  { id: 'de', title: 'Deutsch' },
  { id: 'fr', title: 'Français' },
  { id: 'it', title: 'Italiano' },
  { id: 'nl', title: 'Nederlands' },
  { id: 'es', title: 'Español' },
  { id: 'pl', title: 'Polski' },
  { id: 'pt', title: 'Português' },
  { id: 'sv', title: 'Svenska' },
  { id: 'fi', title: 'Suomi' },
]

const SvgIcon = ({ html, size = 14 }: { html: string; size?: number }) => (
  <span
    style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export const registerLanguage: React.FC = () => {
  const [globals, updateGlobals] = useGlobals()
  const activeLanguage = globals.language ?? 'de'

  const handleSelect = (id: string) => {
    updateGlobals({ ...globals, language: id })
    addons.getChannel().emit(FORCE_RE_RENDER)
  }

  const active = languages.find(l => l.id === activeLanguage) ?? languages[0]

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={languages.map(l => ({
            id: l.id,
            title: l.title,
            right: l.id.toUpperCase(),
            active: l.id === activeLanguage,
            onClick: () => {
              handleSelect(l.id)
              onHide()
            },
          }))}
        />
      )}
    >
      <IconButton key="language-toolbar" title="Design system language" active={activeLanguage !== 'de'}>
        <SvgIcon html={WebSVG} />
        <span style={{ marginLeft: 4 }}>{active.id.toUpperCase()}</span>
      </IconButton>
    </WithTooltip>
  )
}
