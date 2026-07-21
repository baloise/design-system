import { MaskComponent } from '../component'

export class MaskComponentMock implements MaskComponent {
  value: string | undefined = undefined
  allowInvalidValue = false
  inputValue: string | undefined = undefined
  initialValue = ''
  focused = false
  disabled = false
  readonly = false

  el = document.createElement('div')
  nativeInput = document.createElement('input')

  valueChanged = vi.fn()
  balKeyPress = { emit: vi.fn() }
  balChange = { emit: vi.fn() }
  balInput = { emit: vi.fn() }
  balFocus = { emit: vi.fn() }
  balBlur = { emit: vi.fn() }
}
