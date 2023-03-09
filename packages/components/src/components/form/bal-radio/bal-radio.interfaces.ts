/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalRadioGroupInterface = 'radio' | 'select-button'
  export type BalRadioInterface = BalRadioGroupInterface
}

namespace BalEvents {
  export type BalRadioChangeDetail = boolean
  export type BalRadioChange = CustomEvent<BalRadioChangeDetail>
  export type BalRadioGroupChangeDetail = number | string | boolean
  export type BalRadioGroupChange = CustomEvent<BalRadioGroupChangeDetail>
}
