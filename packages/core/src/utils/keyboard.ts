/**
 * Returns `true` if the keyboard event was triggered by the `Enter` key
 */
export function isTabKey(event: KeyboardEvent): boolean {
  return event.key === 'Tab'
}

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
 * Returns `true` if the keyboard event was triggered by the `Backspace` key
 */
export function isBackspaceKey(event: KeyboardEvent): boolean {
  return event.key === 'Backspace'
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

/**
 * Returns `true` if the keyboard event was triggered by the `ArrowLeft` key
 */
export function isArrowLeftKey(event: KeyboardEvent): boolean {
  return event.key === 'ArrowLeft' || event.key === 'Left'
}

/**
 * Returns `true` if the keyboard event was triggered by the `ArrowRight` key
 */
export function isArrowRightKey(event: KeyboardEvent): boolean {
  return event.key === 'ArrowRight' || event.key === 'Right'
}

/**
 * Returns `true` if the keyboard event was triggered by the `Home` key
 */
export function isHomeKey(event: KeyboardEvent): boolean {
  return event.key === 'Home'
}

/**
 * Returns `true` if the keyboard event was triggered by the `End` key
 */
export function isEndKey(event: KeyboardEvent): boolean {
  return event.key === 'End'
}
