/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const LABEL_WEIGHTS = ['bold', 'regular'] as const
  export const LABEL_SIZES = [
    '',
    'sm',
    'lg',
    'xl',
    '2xl',
    '3xl',
    'small',
    'large',
    'x-large',
    'xx-large',
    'xxx-large',
  ] as const

  export type LabelWeight = (typeof LABEL_WEIGHTS)[number]
  export type LabelSize = (typeof LABEL_SIZES)[number]
}
