import { ButtonElementType, ButtonTarget } from '../button/button.interfaces'

export const CARD_ALIGNMENTS = ['center', 'left'] as const
export const CARD_IMAGE_TEASERS = ['wide-left', 'wide-center', 'wide-right', ''] as const
export const CARD_ACTIONS_ALIGNMENTS = ['right', 'center', 'left'] as const
export const CARD_FOOTER_POSITIONS = ['right', 'center', 'left'] as const
export const CARD_HEADER_DIRECTIONS = ['row', 'column'] as const
export const CARD_SPACES = ['sm', 'md', 'lg', '', 'small', 'medium', 'large'] as const
export const CARD_COLORS = [
  'primary',
  'grey',
  'dashed',
  'red',
  'yellow',
  'purple',
  'green',
  'red-dark',
  'yellow-dark',
  'purple-dark',
  'green-dark',
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
