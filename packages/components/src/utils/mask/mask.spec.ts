import { initializeConfig } from '../config'
import { NUMBER_KEYS } from '../constants/keys.constant'
import { MaskComponentMock } from './__test__/mask-component.mock'
import { MaskBlock } from './blocks'
import {
  MaskClipboardContext,
  MaskClipboardContextEvent,
  MaskFocusContext,
  MaskFocusContextEvent,
  MaskKeyboardContext,
  MaskKeyboardContextEvent,
  MaskLocaleContext,
  MaskLocaleContextEvent,
  MaskMouseContext,
  MaskMouseContextEvent,
  MaskValueChangedContext,
  MaskValueChangedContextEvent,
} from './context'
import { AbstractMask } from './mask'

class MyMask extends AbstractMask {
  public maxLength = 5
  public minLength = 5

  constructor() {
    super([
      new MaskBlock({ from: 0, to: 2, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
      new MaskBlock({ from: 2, to: 3, mask: locale => (locale === 'de-CH' ? '-' : '_'), isSeparator: true }),
      new MaskBlock({ from: 3, to: 5, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
    ])
  }
}

describe('MaskComponentAdapter', () => {
  let mask = new MyMask()
  let component = new MaskComponentMock()

  beforeEach(() => {
    initializeConfig()
    mask = new MyMask()
    component = new MaskComponentMock()
  })
  describe('fireI18nChange', () => {
    test('should reformat value due to locale change', () => {
      vi.spyOn(mask, 'onLocaleChange')
      component.value = '1_-34'
      component.nativeInput.value = '1_-34'

      const event = { locale: 'en-CH' } as MaskLocaleContextEvent
      const context = new MaskLocaleContext({ component, mask, event })
      mask.fireI18nChange(context)

      expect(mask.onLocaleChange).toBeCalledTimes(1)
      expect(context.value).toBe('1__34')
    })
  })

  describe('fireValueChanged', () => {
    test('should call value change', () => {
      vi.spyOn(mask, 'onValueChanged')
      component.value = '1234'
      component.nativeInput.value = '12-34'

      const event = { newValue: '4321', oldValue: '1234' } as MaskValueChangedContextEvent
      const context = new MaskValueChangedContext({ component, mask, event })
      mask.fireValueChanged(context)

      expect(mask.onValueChanged).toBeCalledTimes(1)
    })

    test('should not call value change, because value did not change', () => {
      vi.spyOn(mask, 'onValueChanged')
      component.value = '1234'
      component.nativeInput.value = '12-34'

      const event = { newValue: '1234', oldValue: '1234' } as MaskValueChangedContextEvent
      const context = new MaskValueChangedContext({ component, mask, event })
      mask.fireValueChanged(context)

      expect(mask.onValueChanged).toBeCalledTimes(0)
    })
  })

  describe('firePaste', () => {
    test('should paste value into input', () => {
      vi.spyOn(mask, 'onPaste')
      vi.spyOn(mask, 'onChange')

      component.value = '__-__'
      component.nativeInput.value = '__-__'
      const event = { clipboardData: { getData: vi.fn().mockReturnValue('99-99') } } as MaskClipboardContextEvent
      const context = new MaskClipboardContext({ component, mask, event })

      mask.firePaste(context)

      expect(mask.onPaste).toBeCalledTimes(1)
      expect(mask.onChange).toBeCalledTimes(1)
      expect(context.value).toBe('99-99')
      expect(context.position.value).toBe(5)
    })
  })

  describe('fireClick', () => {
    test('should set position to start', () => {
      const event = {} as MaskMouseContextEvent
      const context = new MaskMouseContext({ component, mask, event })

      mask.fireClick(context)

      expect(context.position.value).toBe(0)
    })

    test('should not set position', () => {
      const event = {} as MaskMouseContextEvent
      const context = new MaskMouseContext({ component, mask, event })
      context.position.value = 5
      context.value = '99-99'

      mask.fireClick(context)

      expect(context.position.value).toBe(5)
    })

    test('should set position to start', () => {
      const event = {} as MaskMouseContextEvent
      const context = new MaskMouseContext({ component, mask, event })
      context.position.value = 5
      context.value = '__-__'

      mask.fireClick(context)

      expect(context.position.value).toBe(0)
    })
  })

  describe('fireFocus', () => {
    test('should add placeholder mask to input', () => {
      vi.spyOn(mask, 'onFocus')
      const event = {} as MaskFocusContextEvent
      const context = new MaskFocusContext({ component, mask, event })
      context.value = ''

      mask.fireFocus(context)

      expect(context.value).toBe('__-__')
      expect(mask.onFocus).toBeCalledTimes(1)
    })

    test('should not change input value', () => {
      vi.spyOn(mask, 'onFocus')
      const event = {} as MaskFocusContextEvent
      const context = new MaskFocusContext({ component, mask, event })
      context.value = '99-99'

      mask.fireFocus(context)

      expect(context.value).toBe('99-99')
      expect(mask.onFocus).toBeCalledTimes(1)
    })
  })

  describe('fireBlur', () => {
    test('should add placeholder mask to input', () => {
      const event = {} as MaskFocusContextEvent
      const context = new MaskFocusContext({ component, mask, event })
      context.value = '__-__'

      vi.spyOn(mask, 'onBlur')
      vi.spyOn(mask, 'onChange')
      vi.spyOn(context, 'submit')

      mask.fireBlur(context)

      expect(context.value).toBe('')
      expect(mask.onBlur).toBeCalledTimes(0)
      expect(mask.onChange).toBeCalledTimes(0)
      expect(context.submit).toBeCalledTimes(1)
    })

    test('should not change input value', () => {
      const event = {} as MaskFocusContextEvent
      const context = new MaskFocusContext({ component, mask, event })
      context.value = '99-99'

      vi.spyOn(mask, 'onBlur')
      vi.spyOn(mask, 'onChange')
      vi.spyOn(context, 'submit')

      mask.fireBlur(context)

      expect(context.value).toBe('99-99')
      expect(mask.onBlur).toBeCalledTimes(1)
      expect(mask.onChange).toBeCalledTimes(0)
      expect(context.submit).toBeCalledTimes(1)
    })
  })

  describe('fireKeyDown', () => {
    beforeEach(() => {
      vi.spyOn(mask, 'onNavigationDown')
      vi.spyOn(mask, 'onSelectAll')
      vi.spyOn(mask, 'onBackspaceDown')
      vi.spyOn(mask, 'onDeleteDown')
      vi.spyOn(mask, 'onBlockChange')
    })

    test('should not change value due to navigation key', () => {
      const event = { key: 'Right' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '__-__'

      mask.fireKeyDown(context)

      expect(context.value).toBe('__-__')
      expect(mask.onNavigationDown).toBeCalledTimes(1)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should not change value due to select all', () => {
      const event = { key: 'a', ctrlKey: true } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-99'

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-99')
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(1)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should remove the char in front of the cursor', () => {
      const event = { key: 'Backspace' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-99'
      context.position.value = 5

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-9_')
      expect(context.position.value).toBe(4)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(1)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should remove the char in after of the cursor', () => {
      const event = { key: 'Delete' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-99'
      context.position.value = 4

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-9_')
      expect(context.position.value).toBe(5)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(1)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should format left block and move to the next one', () => {
      const event = { key: '-' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '9_-__'
      context.position.value = 1

      mask.fireKeyDown(context)

      expect(context.value).toBe('09-__')
      expect(context.position.value).toBe(3)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should remove all the selected one', () => {
      component.nativeInput.value = '99-99'
      component.nativeInput.selectionStart = 0
      component.nativeInput.selectionEnd = 5

      const event = { key: 'Backspace' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-99'

      mask.fireKeyDown(context)

      expect(context.value).toBe('__-__')
      expect(context.position.value).toBe(0)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should allow normal key input', () => {
      component.nativeInput.value = '99-9_'
      component.nativeInput.selectionStart = 4
      component.nativeInput.selectionEnd = 4

      const event = { key: '7' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-9_'

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-97')
      expect(context.position.value).toBe(5)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(1)
    })

    test('should skip not allowed key press', () => {
      component.nativeInput.value = '99-9_'
      component.nativeInput.selectionStart = 4
      component.nativeInput.selectionEnd = 4

      const event = { key: 'p' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-9_'

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-9_')
      expect(context.position.value).toBe(4)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should jump to next block due to separator input', () => {
      component.nativeInput.value = '9_-__'
      component.nativeInput.selectionStart = 1
      component.nativeInput.selectionEnd = 1

      const event = { key: '-' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '9_-__'

      mask.fireKeyDown(context)

      expect(context.value).toBe('09-__')
      expect(context.position.value).toBe(3)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should jump to next block due to finish the previous block', () => {
      component.nativeInput.value = '9_-__'
      component.nativeInput.selectionStart = 1
      component.nativeInput.selectionEnd = 1

      const event = { key: '9' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '9_-__'

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-__')
      expect(context.position.value).toBe(3)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(1)
    })

    test('should jump to previous block due to finish the block before', () => {
      component.nativeInput.value = '99-9_'
      component.nativeInput.selectionStart = 4
      component.nativeInput.selectionEnd = 4

      const event = { key: 'Backspace' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-9_'

      mask.fireKeyDown(context)

      expect(context.value).toBe('99-__')
      expect(context.position.value).toBe(2)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(1)
      expect(mask.onDeleteDown).toBeCalledTimes(0)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })

    test('should jump to previous block due to finish the block before', () => {
      component.nativeInput.value = '99-99'
      component.nativeInput.selectionStart = 1
      component.nativeInput.selectionEnd = 1

      const event = { key: 'Delete' } as MaskKeyboardContextEvent
      const context = new MaskKeyboardContext({ component, mask, event })
      context.value = '99-99'

      mask.fireKeyDown(context)

      expect(context.value).toBe('09-99')
      expect(context.position.value).toBe(3)
      expect(mask.onNavigationDown).toBeCalledTimes(0)
      expect(mask.onSelectAll).toBeCalledTimes(0)
      expect(mask.onBackspaceDown).toBeCalledTimes(0)
      expect(mask.onDeleteDown).toBeCalledTimes(1)
      expect(mask.onBlockChange).toBeCalledTimes(0)
    })
  })
})
