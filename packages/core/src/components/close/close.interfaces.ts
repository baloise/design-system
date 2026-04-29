/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const CLOSE_SIZES = ['sm', 'md', 'small', 'medium'] as const

  export type CloseSize = (typeof CLOSE_SIZES)[number]
}
