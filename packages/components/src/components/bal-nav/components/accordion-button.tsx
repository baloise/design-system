import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface AccordionButtonProps {
  id: string
  label: string
  level: 'meta' | 'menu'
  open: boolean
  onClick: (ev: MouseEvent) => void
}

export const AccordionButton: FunctionalComponent<AccordionButtonProps> = ({ id, label, level, open, onClick }) => {
  const block = BEM.block('nav')

  return (
    <button
      id={id}
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
