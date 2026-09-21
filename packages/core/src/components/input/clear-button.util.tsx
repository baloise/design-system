import { h, FunctionalComponent } from '@stencil/core'
import { DsLanguage } from '@global'
import { i18nDsClearButton } from './clear-button.i18n'

export type ClearButtonProps = {
  value: unknown
  disabled?: boolean
  readonly?: boolean
  language: DsLanguage
  onClick: () => void
}

export const ClearButton: FunctionalComponent<ClearButtonProps> = ({
  value,
  disabled,
  readonly,
  language,
  onClick,
}) => {
  if (!value || disabled || readonly) return null
  const label = i18nDsClearButton[language].clear
  return <button id="clear" part="clear" type="button" aria-label={label} title={label} onClick={onClick}></button>
}
