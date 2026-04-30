import { ButtonElementType, ButtonTarget } from '../button/button.interfaces'

export const CARD_ALIGNMENTS = ['right', 'center', 'left', ''] as const
export const CARD_IMAGE_TEASERS = ['wide-left', 'wide-center', 'wide-right', ''] as const
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
  'primary-light',
  'primary-dark',
  'grey-light',
  'grey-dark',
  'blue-light',
  'red-light',
  'yellow-light',
  'purple-light',
  'purple-lighter',
  'green-light',
  'success-light',
  'success-dark',
  'success-darker',
  'warning-light',
  'warning-dark',
  'warning-darker',
  'danger-light',
  'danger-dark',
  'danger-darker',
  'light-blue',
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
export type CardImageTeaser = (typeof CARD_IMAGE_TEASERS)[number]
export type CardActionsAlignment = (typeof CARD_ACTIONS_ALIGNMENTS)[number]
export type CardFooterPosition = (typeof CARD_FOOTER_POSITIONS)[number]
export type CardHeaderDirection = (typeof CARD_HEADER_DIRECTIONS)[number]
export type CardButtonElementType = ButtonElementType
export type CardButtonTarget = ButtonTarget
export type CardSpace = (typeof CARD_SPACES)[number]
export type CardColor = (typeof CARD_COLORS)[number]
