import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface AccordionButtonProps {
  label: string
  level: 'meta' | 'menu'
  open: boolean
  onClick: (ev: MouseEvent) => void
}

export const AccordionButton: FunctionalComponent<AccordionButtonProps> = ({ label, level, open, onClick }) => {
  const block = BEM.block('nav')

  return (
    <button
      class={{
        ...block.element(`mobile-${level}-item`).class(),
      }}
      onClick={ev => onClick(ev)}
    >
      <span>{label}</span>
      <bal-icon name="nav-go-down" size="small" turn={open}></bal-icon>
    </button>
  )
}
