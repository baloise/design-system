/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const ACCORDION_SUMMARY_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', ''] as const
  export const ACCORDION_MARKERS = ['', 'plus', 'plus-minus', 'none'] as const
  export const ACCORDION_MARKER_POSITIONS = ['', 'left', 'right'] as const
  export const ACCORDION_BUTTON_COLORS = ['primary', 'secondary', 'success', 'warning', 'danger', ''] as const
  export const ACCORDION_BUTTON_SIZES = ['sm', 'lg', 'xl', ''] as const

  export type AccordionSummaryLevel = (typeof ACCORDION_SUMMARY_LEVELS)[number]
  export type AccordionMarker = (typeof ACCORDION_MARKERS)[number]
  export type AccordionMarkerPosition = (typeof ACCORDION_MARKER_POSITIONS)[number]
  export type AccordionButtonColor = (typeof ACCORDION_BUTTON_COLORS)[number]
  export type AccordionButtonSize = (typeof ACCORDION_BUTTON_SIZES)[number]

  export interface AccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsAccordionElement
  }

  export type AccordionToggleDetail = { group?: string; id: string; open: boolean }
  export type AccordionToggle = AccordionCustomEvent<AccordionToggleDetail>
}
