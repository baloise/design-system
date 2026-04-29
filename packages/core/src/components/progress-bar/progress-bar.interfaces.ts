/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  // --- Props types (was BalProps) ---
  export const PROGRESS_BAR_BACKGROUNDS = ['light', 'dark'] as const
  export const PROGRESS_BAR_COLORS = ['primary', 'purple', 'yellow', 'red', 'green'] as const

  export type ProgressBarBackground = (typeof PROGRESS_BAR_BACKGROUNDS)[number]
  export type ProgressBarColor = (typeof PROGRESS_BAR_COLORS)[number]
}
