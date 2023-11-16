import { setupConfig } from '../../config'
import { MaskComponentMock } from '../__test__/mask-component.mock'
import { MaskMock } from '../__test__/mask.mock'
import { MaskComponentAdapter } from './mask-component-adapter'
import * as exports from '../context'

describe('MaskComponentAdapter', () => {
  let mask = new MaskMock()
  let component = new MaskComponentMock()
  let adapter = new MaskComponentAdapter(mask)

  beforeEach(() => {
    setupConfig()
    mask = new MaskMock()
    mask.minLength = 10
    mask.maxLength = 10
    component = new MaskComponentMock()
    adapter = new MaskComponentAdapter(mask)
    adapter.bindComponent(component)
  })

  test('should return input attributes', () => {
    expect(adapter.attributes).toStrictEqual({
      inputMode: 'text',
      maxLength: 10,
      minLength: 10,
      type: 'text',
      autoCapitalize: 'off',
      autoCorrect: 'off',
      spellcheck: false,
    })
  })

  test('should update native input value', () => {
    component.value = 'bubu'
    adapter.bindComponentDidLoad()
    expect(component.nativeInput.value).toStrictEqual('bubu')
  })

  test('should bind locale change and submit changes', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskLocaleContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
          locale: 'en-CH',
        } as any),
    )

    mask.fireI18nChange.mockImplementation((context: any) => context.locale)

    adapter.bindConfigChanged({ region: 'CH', language: 'en' } as any)
    expect(mask.fireI18nChange).toReturnWith('en-CH')
    expect(mask.fireI18nChange).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
  })

  test('should bind value changes', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskValueChangedContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
          newValue: 'new',
          oldValue: 'old',
        } as any),
    )

    mask.fireValueChanged.mockImplementation((context: any) => context.newValue)

    adapter.bindValueChanged('new', 'old')
    expect(mask.fireValueChanged).toReturnWith('new')
    expect(mask.fireValueChanged).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
  })

  test('should bind key down events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskKeyboardContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
          key: 'p',
        } as any),
    )

    mask.fireKeyDown.mockImplementation((context: any) => context.key)

    adapter.bindKeyDown({ key: 'p' } as any)
    expect(mask.fireKeyDown).toReturnWith('p')
    expect(mask.fireKeyDown).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
  })

  test('should not bind key down events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskKeyboardContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    component.disabled = true
    adapter.bindKeyDown({ key: 'p' } as any)

    expect(mask.fireKeyDown).toBeCalledTimes(0)
    expect(submitSpy).toBeCalledTimes(0)
  })

  test('should bind focus events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskFocusContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    mask.fireFocus.mockImplementation((context: any) => context.key)

    adapter.bindFocus({} as any)
    expect(mask.fireFocus).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
    expect(component.focused).toBeTruthy()
  })

  test('should not bind focus events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskFocusContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    component.disabled = true
    adapter.bindFocus({} as any)

    expect(mask.fireFocus).toBeCalledTimes(0)
    expect(submitSpy).toBeCalledTimes(0)
    expect(component.focused).toBeFalsy()
  })

  test('should bind blur events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskFocusContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    mask.fireBlur.mockImplementation((context: any) => context.key)

    component.focused = true
    adapter.bindBlur({} as any)
    expect(mask.fireBlur).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
    expect(component.focused).toBeFalsy()
  })

  test('should not bind blur events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskFocusContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    component.disabled = true
    component.focused = true
    adapter.bindBlur({} as any)

    expect(mask.fireBlur).toBeCalledTimes(0)
    expect(submitSpy).toBeCalledTimes(0)
    expect(component.focused).toBeTruthy()
  })

  test('should bind paste events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskClipboardContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    mask.firePaste.mockImplementation((context: any) => context.key)

    adapter.bindPaste({} as any)
    expect(mask.firePaste).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
  })

  test('should not bind paste events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskClipboardContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    component.disabled = true
    adapter.bindPaste({} as any)

    expect(mask.firePaste).toBeCalledTimes(0)
    expect(submitSpy).toBeCalledTimes(0)
  })

  test('should bind click events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskMouseContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    mask.fireClick.mockImplementation((context: any) => context.key)

    adapter.bindClick({} as any)
    expect(mask.fireClick).toBeCalledTimes(1)
    expect(submitSpy).toBeCalledTimes(1)
  })

  test('should not bind click events', () => {
    const submitSpy = vi.fn()
    vi.spyOn(exports, 'MaskMouseContext').mockImplementation(
      () =>
        ({
          submit: submitSpy,
        } as any),
    )

    component.disabled = true
    adapter.bindClick({} as any)

    expect(mask.fireClick).toBeCalledTimes(0)
    expect(submitSpy).toBeCalledTimes(0)
  })
})
