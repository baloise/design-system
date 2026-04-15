import { InputMaskFormatterInterface } from '../input.mask'
import { VehicleRegistrationNumber } from './vehicle-registration-number'

export const masks: InputMaskFormatterInterface[] = [new VehicleRegistrationNumber()]

export const getMask = (name: DS.InputMask | undefined) => masks.find(m => m.name === name)
