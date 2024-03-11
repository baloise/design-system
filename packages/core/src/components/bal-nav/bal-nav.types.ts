import { NavLinkItem } from './models/bal-nav-link-item'

export interface NavLinkItemObserver {
  linkItemClickListener(item?: NavLinkItem): void
  accordionClickListener(item?: NavLinkItem): void
}
