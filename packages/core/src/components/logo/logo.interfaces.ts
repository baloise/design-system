/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const LOGO_COLORS = ['primary', 'white'] as const
  export const LOGO_SIZES = ['lg', 'sm', '', 'large', 'small'] as const
  export const LOGO_BRANDS = ['baloise', 'helvetia', ''] as const

  export type LogoColor = (typeof LOGO_COLORS)[number]
  export type LogoSize = (typeof LOGO_SIZES)[number]
  export type LogoBrand = (typeof LOGO_BRANDS)[number]
}
