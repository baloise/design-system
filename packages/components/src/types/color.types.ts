export type ColorTypesBasic = 'primary' | 'info'

export type ColorTypesExtended = 'success' | 'warning' | 'danger'

export type ColorTypes = ColorTypesBasic | ColorTypesExtended

export type BalButtonExtraColor = 'link' | 'light'

export type BalButtonColor = ColorTypes | BalButtonExtraColor

export type BalIconColor = BackgroundColors | ColorTypesExtended | 'black' | 'info'

export type BackgroundColors = 'white' | 'primary' | 'blue' | 'red' | 'purple' | 'yellow' | 'green'
