import { Mask } from '../mask-interfaces'

export class MaskMock implements Mask {
  maxLength = 0
  minLength = 0
  inputMode: BalProps.BalInputInputMode = 'text'

  fireI18nChange = vi.fn()
  fireKeyDown = vi.fn()
  fireFocus = vi.fn()
  fireBlur = vi.fn()
  firePaste = vi.fn()
  fireClick = vi.fn()
  fireValueChanged = vi.fn()
}
