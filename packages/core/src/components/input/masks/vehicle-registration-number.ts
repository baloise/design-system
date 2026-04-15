import { InputMaskFormatterInterface } from '../input.mask'

export class VehicleRegistrationNumber implements InputMaskFormatterInterface {
  name: DS.InputMask = 'vehicle-registration-number'
  maxLength = 2

  format(value: string | null): string | null {
    throw new Error('Method not implemented.')
  }

  onInput(ev: InputEvent): void {
    throw new Error('Method not implemented.')
  }

  onKeydown(ev: InputEvent): void {
    throw new Error('Method not implemented.')
  }
}
