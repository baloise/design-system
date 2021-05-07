/**
 * Returns `true` if the keyboard event was triggered by the `Enter` key
 */
export function isEnterKey(event: KeyboardEvent): boolean {
  return event.key === 'Enter'
}

/**
 * Returns `true` if the keyboard event was triggered by the `Space` key
 */
export function isSpaceKey(event: KeyboardEvent): boolean {
  return event.key === ' '
}

/**
 * Returns `true` if the keyboard event was triggered by the `Escape` key
 */
export function isEscapeKey(event: KeyboardEvent): boolean {
  return event.key === 'Escape'
}

/**
 * Returns `true` if the keyboard event was triggered by the `ArrowDown` key
 */
export function isArrowDownKey(event: KeyboardEvent): boolean {
  return event.key === 'ArrowDown' || event.key === 'Down'
}

/**
 * Returns `true` if the keyboard event was triggered by the `ArrowUp` key
 */
export function isArrowUpKey(event: KeyboardEvent): boolean {
  return event.key === 'ArrowUp' || event.key === 'Up'
}
