export const isEnterKey = (event: KeyboardEvent): boolean => event.key === 'Enter'

export const isEscapeKey = (event: KeyboardEvent): boolean => event.key === 'Escape'

export const isArrowDownKey = (event: KeyboardEvent): boolean => event.key === 'ArrowDown' || event.key === 'Down'

export const isArrowUpKey = (event: KeyboardEvent): boolean => event.key === 'ArrowUp' || event.key === 'Up'
