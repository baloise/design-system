/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const CARD_ALIGNMENTS = ['right', 'center', 'left'] as const
  export const CARD_ACTIONS_ALIGNMENTS = ['right', 'center', 'left'] as const
  export const CARD_FOOTER_POSITIONS = ['right', 'center', 'left'] as const
  export const CARD_HEADER_DIRECTIONS = ['row', 'column'] as const
  export const CARD_SPACES = ['sm', 'md', 'lg', '', 'small', 'medium', 'large'] as const
  export const CARD_COLORS = [
    'white',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    '',
    'grey',
    'blue',
    'red',
    'yellow',
    'purple',
    'green',
    'red-light',
    'yellow-light',
    'purple-light',
    'green-light',
    'grey-light',
    'purple-1',
    'purple-2',
    'purple-3',
    'green-1',
    'green-2',
    'green-3',
    'red-1',
    'red-2',
    'red-3',
    'yellow-1',
    'yellow-2',
    'yellow-3',
  ] as const

  export type CardAlignment = (typeof CARD_ALIGNMENTS)[number]
  export type CardActionsAlignment = (typeof CARD_ACTIONS_ALIGNMENTS)[number]
  export type CardFooterPosition = (typeof CARD_FOOTER_POSITIONS)[number]
  export type CardHeaderDirection = (typeof CARD_HEADER_DIRECTIONS)[number]
  export type CardButtonElementType = ButtonElementType
  export type CardButtonTarget = ButtonTarget
  export type CardSpace = (typeof CARD_SPACES)[number]
  export type CardColor = (typeof CARD_COLORS)[number]
}
