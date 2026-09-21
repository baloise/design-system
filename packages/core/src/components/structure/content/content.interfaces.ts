export const CONTENT_DIRECTIONS = ['column', 'row'] as const
export const CONTENT_SPACES = ['none', '3xs', '2xs', 'xs', 'sm', 'base'] as const
export const CONTENT_ALIGNMENTS = ['start', 'center', 'end'] as const
export const CONTENT_TEXT_ALIGNMENTS = ['left', 'center', 'right'] as const

export type ContentDirection = (typeof CONTENT_DIRECTIONS)[number]
export type ContentSpace = (typeof CONTENT_SPACES)[number]
export type ContentAlignment = (typeof CONTENT_ALIGNMENTS)[number]
export type ContentTextAlignment = (typeof CONTENT_TEXT_ALIGNMENTS)[number]
