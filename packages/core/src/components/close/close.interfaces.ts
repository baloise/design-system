export const CLOSE_SIZES = ['md'] as const
export const CLOSE_BUTTON_SIZES = ['sm', 'lg'] as const

export type CloseSize = (typeof CLOSE_SIZES)[number]
export type CloseButtonSize = (typeof CLOSE_BUTTON_SIZES)[number]
