/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTabsInterface = 'tabs' | 'tabs-sub' | 'steps' | 'o-steps' | 'navbar' | 'meta' | 'navigation'
  export type BalTabsIconPosition = 'horizontal' | 'vertical'
  export type BalTabsVertical = boolean | 'mobile' | 'tablet'
  export type BalTabsFloat = 'left' | 'right'
  // export type BalTabsColSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  export type BalTabsColSize = 'one-quarter' | 'one-third' | 'half' | 'two-thirds' | 'three-quarters' | 'full'
}

namespace BalEvents {
  export type BalTabsChangeDetail = string
  export type BalTabsChange = CustomEvent<BalTabsChangeDetail>
}
