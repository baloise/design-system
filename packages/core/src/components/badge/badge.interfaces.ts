/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  // Define const arrays as the SOURCE OF TRUTH
  export const BADGE_SIZES = ['small', 'large', ''] as const
  export const BADGE_COLORS = ['grey', 'danger', 'warning', 'success', 'red', 'yellow', 'green', 'purple', ''] as const
  export const BADGE_POSITIONS = ['card', 'button', 'tabs', ''] as const

  // Derive the types from the arrays
  export type BadgeSize = (typeof BADGE_SIZES)[number]
  export type BadgeColor = (typeof BADGE_COLORS)[number]
  export type BadgePosition = (typeof BADGE_POSITIONS)[number]
}
