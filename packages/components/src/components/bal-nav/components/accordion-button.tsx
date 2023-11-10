import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface AccordionButtonProps {
  id: string
  label: string
  level: 'meta' | 'menu'
  open: boolean
  link: boolean
  href?: string
  target?: string
  onClick: (ev: MouseEvent) => void
}

export const AccordionButton: FunctionalComponent<AccordionButtonProps> = ({
  id,
  label,
  level,
  open,
  link,
  href,
  target,
  onClick,
}) => {
  const block = BEM.block('nav')

  return link ? (
    <a
      id={id}
      class={{
        ...block.element(`mobile-${level}-item`).class(),
      }}
      href={href}
      target={target}
      onClick={ev => onClick(ev)}
    >
      <span>{label}</span>
    </a>
  ) : (
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
