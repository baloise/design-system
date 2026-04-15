import { isCtrlOrCommandKey, ACTION_KEYS, NUMBER_KEYS } from '../../../utils/constants/keys.constant'
import { stopEventBubbling } from '../../../utils/form-control'
import { formatVehicleRegistrationNumber, MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER } from '../input-util'
import { InputMaskFormatterInterface } from '../input.mask'

export class VehicleRegistrationNumber implements InputMaskFormatterInterface {
  name: DS.InputMask = 'vehicle-registration-number'
  maxLength = MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER

  format(value: string | null): string | null {
    if (!value) return value
    return formatVehicleRegistrationNumber(value)
  }

  onInput(ev: InputEvent): void {
    const input = ev.target as HTMLInputElement | null
    if (!input) return

    const cursorStart = (ev.target as HTMLInputElement).selectionStart ?? 0
    const cursorEnd = (ev.target as HTMLInputElement).selectionEnd ?? 0

    const raw = input.value.replace(/\D/g, '').substring(0, this.maxLength)
    input.value = formatVehicleRegistrationNumber(raw)

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
}
