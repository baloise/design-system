import { isCtrlOrCommandKey, ACTION_KEYS, NUMBER_KEYS } from '../../../global'
import { stopEventBubbling } from '../../../utils/form-control'
import { InputMaskFormatterInterface } from '../input.mask'

export class ClaimNumber implements InputMaskFormatterInterface {
  name: DS.InputMask = 'claim-number'
  maxLength = 11

  format(value: string | null): string | null {
    if (!value) return value
    return this.formatValue(value)
  }

  onInput(ev: InputEvent): void {
    const input = ev.target as HTMLInputElement | null
    if (!input) return
    const cursorStart = (ev.target as HTMLInputElement).selectionStart ?? 0
    const cursorEnd = (ev.target as HTMLInputElement).selectionEnd ?? 0
    const raw = input.value.replace(/[^\dXx]/g, '').substring(0, this.maxLength)
    input.value = this.formatValue(raw)
    if (cursorStart < raw.length) {
      input.setSelectionRange(cursorStart, cursorEnd)
    }
  }

  onKeydown(ev: KeyboardEvent): void {
    if (isCtrlOrCommandKey(ev)) return
    const input = ev.target as HTMLInputElement
    const rawLength = input?.value.replace(/[^\dXx]/g, '').length ?? 0
    const isXAllowed = (ev.key === 'X' || ev.key === 'x') && rawLength >= this.maxLength - 1
    if (!isXAllowed && ![...NUMBER_KEYS, ...ACTION_KEYS].includes(ev.key)) {
      stopEventBubbling(ev)
    }
  }

  private formatValue(value: string): string {
    const newValue = value.trim().toUpperCase()
    const parts = [
      newValue.substring(0, 2),
      newValue.substring(2, 8),
      newValue.substring(8, 10),
      newValue.substring(10, 11),
    ].filter(p => p.length > 0)
    switch (parts.length) {
      case 1:
        return newValue
      case 2:
        return `${parts[0]}/${parts[1]}`
      case 3:
        return `${parts[0]}/${parts[1]}/${parts[2]}`
      default:
        return `${parts[0]}/${parts[1]}/${parts[2]}.${parts[3]}`
    }
  }
}
