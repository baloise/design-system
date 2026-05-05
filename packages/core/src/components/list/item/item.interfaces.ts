export const ITEM_VARIANTS = ['default', 'link', 'button', 'accordion'] as const
export const ITEM_ACTION_ICONS = ['default', 'link', 'link-external', 'download'] as const
export const ITEM_LABEL_LEVELS = ['', 'h1', 'h2', 'h3', 'h4', 'h5'] as const
export const ITEM_LABEL_SIZES = ['', 'h1', 'h2', 'h3', 'h4', 'h5', '3xl', '2xl', 'xl', 'lg', 'base'] as const

export type ItemVariant = (typeof ITEM_VARIANTS)[number]
export type ItemActionIcon = (typeof ITEM_ACTION_ICONS)[number]
export type ItemLabelLevel = (typeof ITEM_LABEL_LEVELS)[number]
export type ItemLabelSize = (typeof ITEM_LABEL_SIZES)[number]
