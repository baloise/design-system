import { isCtrlOrCommandKey, ACTION_KEYS, NUMBER_KEYS } from '../../../utils/constants/keys.constant'
import { stopEventBubbling } from '../../../utils/form-control'
import { InputMaskFormatterInterface } from '../input.mask'

export class VehicleRegistrationNumber implements InputMaskFormatterInterface {
  name: DS.InputMask = 'vehicle-registration-number'
  maxLength = 12

  format(value: string | null): string | null {
    if (!value) return value
    return this.formatValue(value)
  }

  onInput(ev: InputEvent): void {
    const input = ev.target as HTMLInputElement | null
    if (!input) return

    const cursorStart = (ev.target as HTMLInputElement).selectionStart ?? 0
    const cursorEnd = (ev.target as HTMLInputElement).selectionEnd ?? 0

    const raw = input.value.replace(/\D/g, '').substring(0, this.maxLength)
    input.value = this.formatValue(raw)

    if (cursorStart < raw.length) {
      input.setSelectionRange(cursorStart, cursorEnd)
    }
  }

  onKeydown(ev: KeyboardEvent): void {
    if (isCtrlOrCommandKey(ev)) return
    if (![...NUMBER_KEYS, ...ACTION_KEYS].includes(ev.key)) {
      stopEventBubbling(ev)
    }
  }

  private formatValue(value: string): string {
    const digits = value.replace(/\D/g, '')
    const parts = [
      digits.substring(0, 3),
      digits.substring(3, 6),
      digits.substring(6, 9),
      digits.substring(9, 12),
    ].filter(p => p.length > 0)
    switch (parts.length) {
      case 1:
        return parts[0]
      case 2:
        return `${parts[0]}.${parts[1]}`
      case 3:
        return `${parts[0]}.${parts[1]}.${parts[2]}`
      default:
        return `${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`
    }
  }
}
