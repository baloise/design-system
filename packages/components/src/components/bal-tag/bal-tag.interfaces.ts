/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTagColor =
    | 'blue'
    | 'grey'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'green'
    | 'yellow'
    | 'red'
    | 'purple'
    | ''
  export type BalTagSize = 'small' | 'medium' | 'large' | ''
  export type BalTagFontWeight = 'regular' | 'bold'
  export type BalTagPlacement = 'left' | 'center'
}

namespace BalEvents {
  export type BalTagCloseClickDetail = MouseEvent
  export type BalTagCloseClick = CustomEvent<BalTagCloseClickDetail>
}
