export type ColorTypesBasic = 'primary'

export type ColorTypesGray = 'gray'

export type ColorTypesFunctional = 'success' | 'warning' | 'danger'

export type ColorTypesBackground = 'blue' | 'green' | 'pink' | 'orange' | 'yellow' | 'azul' | 'green-light' | 'violett' | 'violett-light' | '$pink-light'

export type ColorTypes = ColorTypesBasic | ColorTypesFunctional

export type ColorTypesExtended = ColorTypesBasic | ColorTypesFunctional | ColorTypesGray

export type ColorTypesAll = ColorTypesBasic | ColorTypesFunctional | ColorTypesGray | ColorTypesBackground
