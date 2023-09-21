/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../interfaces.d.ts" />

namespace BalProps {
  export type BalDateCalendarAllowedDatesCallback = (isoDate: string) => boolean
}

namespace BalEvents {
  export interface BalDateCalendarCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalDateCalendarElement
  }

  export type BalDateCalendarChangeDetail = string | undefined
  export type BalDateCalendarChange = BalDateCalendarCustomEvent<BalDateCalendarChangeDetail>

  export interface BalDateCalendarCellCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalDateCalendarCellElement
  }

  export type BalDateCellSelectDetail = string | undefined
  export type BalDateCellSelect = BalDateCalendarCellCustomEvent<BalDateCellSelectDetail>
}
