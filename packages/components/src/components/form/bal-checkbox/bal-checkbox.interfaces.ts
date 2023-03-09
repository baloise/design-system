/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalCheckboxGroupInterface = 'checkbox' | 'select-button' | 'switch'
  export type BalCheckboxInterface = BalCheckboxGroupInterface
}

namespace BalEvents {
  export type BalCheckboxChangeDetail = boolean
  export type BalCheckboxChange = CustomEvent<BalCheckboxChangeDetail>
  export type BalCheckboxGroupChangeDetail = any[]
  export type BalCheckboxGroupChange = CustomEvent<BalCheckboxGroupChangeDetail>
}
