import { InputMask } from '../input.interfaces'
import { InputMaskFormatterInterface } from '../input.mask'
import { BasicContractNumber } from './basic-contract-number'
import { BeEnterpriseNumber } from './be-enterprise-number'
import { BeIBAN } from './be-iban'
import { ClaimNumber } from './claim-number'
import { ContractNumber } from './contract-number'
import { OfferNumber } from './offer-number'
import { VehicleRegistrationNumber } from './vehicle-registration-number'

export const masks: InputMaskFormatterInterface[] = [
  new VehicleRegistrationNumber(),
  new OfferNumber(),
  new ContractNumber(),
  new BasicContractNumber(),
  new ClaimNumber(),
  new BeEnterpriseNumber(),
  new BeIBAN(),
]

export const getMask = (name: InputMask | undefined) => masks.find(m => m.name === name)
