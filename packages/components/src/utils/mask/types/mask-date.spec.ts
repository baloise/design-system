import { initialize } from '../../config'
import {
  MaskClipboardContextEventMock,
  MaskComponentMock,
  MaskFocusContextMock,
  MaskKeyboardContextEventMock,
  MaskMouseContextEventMock,
  MaskPositionTargetMock,
} from './_mocks'
import { DateMask } from './mask-date'

describe('mask', () => {
  let dateMask = new DateMask()
  let component = new MaskComponentMock()
  beforeEach(() => {
    initialize()
    dateMask = new DateMask()
    component = new MaskComponentMock()
    dateMask.bindComponent(component)
  })
  describe('DateMask', () => {
    test('should add the empty mask when clicking the input and it is empty', () => {
      const target = new MaskPositionTargetMock()
      const context = new MaskFocusContextMock(target)
      expect(context.target.value).toBe('')

      dateMask.fireFocus(context)
      expect(component.focused).toBeTruthy()
      expect(context.target.value).toBe('__.__.____')

      dateMask.fireBlur(context)
      expect(context.target.value).toBe('')

      expect(component.balInput.emit).toBeCalledTimes(2)
      expect(component.balChange.emit).not.toBeCalled()
    })

    test('should paste a new date', () => {
      const context = new MaskClipboardContextEventMock('20021998')

      dateMask.firePaste(context)
      expect(context.target.value).toBe('20.02.1998')

      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(1)
    })

    test('should not paste a new date', () => {
      component.disabled = true
      const context = new MaskClipboardContextEventMock('20021998')

      dateMask.firePaste(context)
      expect(context.target.value).toBe('')

      expect(component.balInput.emit).toBeCalledTimes(0)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should select all and remove all', () => {
      component.value = '20.02.1998'
      component.inputValue = '20.02.1998'

      const keyContext = new MaskKeyboardContextEventMock()
      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 0
      keyContext.target.selectionEnd = 10

      keyContext.ctrlKey = true
      keyContext.key = 'a'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1998')

      keyContext.ctrlKey = false
      keyContext.key = 'Backspace'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('__.__.____')

      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(1)
    })

    test('should add date', () => {
      const target = new MaskPositionTargetMock()
      const focusContext = new MaskFocusContextMock(target)
      const clickContext = new MaskMouseContextEventMock(target)
      const keyContext = new MaskKeyboardContextEventMock(target)

      dateMask.fireFocus(focusContext)
      dateMask.fireClick(clickContext)
      keyContext.target.value = clickContext.target.value
      keyContext.key = '2'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('2_.__.____')
      keyContext.key = '0'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.__.____')
      keyContext.key = '0'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.0_.____')
      keyContext.key = '2'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.____')
      keyContext.key = '1'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1___')
      keyContext.key = '9'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.19__')
      keyContext.key = '9'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.199_')
      keyContext.key = '8'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1998')

      expect(component.balInput.emit).toBeCalledTimes(9)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should not go change date when input max length is reached', () => {
      component.value = '20.02.1998'
      component.inputValue = '20.02.1998'

      const keyContext = new MaskKeyboardContextEventMock()
      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      keyContext.key = '8'
      dateMask.fireKeyDown(keyContext)

      expect(keyContext.target.value).toBe('20.02.1998')
      expect(component.balInput.emit).toBeCalledTimes(0)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should remove the previous char and replace it with the mask', () => {
      component.value = '20.02.1998'
      component.inputValue = '20.02.1998'

      const keyContext = new MaskKeyboardContextEventMock()
      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      keyContext.key = 'Backspace'
      dateMask.fireKeyDown(keyContext)

      expect(keyContext.target.value).toBe('20.02.199_')
      expect(keyContext.target.selectionStart).toBe(9)
      expect(keyContext.target.selectionEnd).toBe(9)
      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should remove the previous char and hop over the separator', () => {
      component.value = '20.02.1998'
      component.inputValue = '20.02.1998'

      const keyContext = new MaskKeyboardContextEventMock()
      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 3
      keyContext.target.selectionEnd = 3
      keyContext.key = 'Backspace'

      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1998')
      expect(keyContext.target.selectionStart).toBe(2)
      expect(keyContext.target.selectionEnd).toBe(2)

      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('2_.02.1998')
      expect(keyContext.target.selectionStart).toBe(1)
      expect(keyContext.target.selectionEnd).toBe(1)

      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should delete the previous char and replace it with the mask', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 0
      keyContext.target.selectionEnd = 0
      keyContext.key = 'Delete'

      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('_0.02.1998')
      expect(keyContext.target.selectionStart).toBe(1)
      expect(keyContext.target.selectionEnd).toBe(1)
      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should delete the previous char and hop over the separator', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 2
      keyContext.target.selectionEnd = 2
      keyContext.key = 'Delete'

      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1998')
      expect(keyContext.target.selectionStart).toBe(3)
      expect(keyContext.target.selectionEnd).toBe(3)

      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20._2.1998')
      expect(keyContext.target.selectionStart).toBe(4)
      expect(keyContext.target.selectionEnd).toBe(4)
      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should change due to i18n change the masks and the separators', () => {
      const keyContext = new MaskKeyboardContextEventMock()

      keyContext.target.value = '__.__.____'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      expect(keyContext.target.value).toBe('__.__.____')

      dateMask.fireI18nChange({
        locale: 'fr-BE',
        target: keyContext.target,
      })
      expect(keyContext.target.value).toBe('__/__/____')
      expect(component.balInput.emit).toBeCalledTimes(0)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should change due to i18n change', () => {
      const keyContext = new MaskKeyboardContextEventMock()

      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      expect(keyContext.target.value).toBe('20.02.1998')

      dateMask.fireI18nChange({
        locale: 'fr-BE',
        target: keyContext.target,
      })
      expect(keyContext.target.value).toBe('20/02/1998')
      expect(component.balInput.emit).toBeCalledTimes(0)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should format previous block', () => {
      const keyContext = new MaskKeyboardContextEventMock()

      keyContext.target.value = '__.02.1998'
      keyContext.target.selectionStart = 1
      keyContext.target.selectionEnd = 1
      keyContext.key = '1'
      dateMask.fireKeyDown(keyContext)

      expect(keyContext.target.value).toBe('01.02.1998')
      expect(keyContext.target.selectionStart).toBe(3)
      expect(keyContext.target.selectionEnd).toBe(3)
      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should format previous block with a separator jump', () => {
      const keyContext = new MaskKeyboardContextEventMock()

      keyContext.target.value = '__.02.1998'
      keyContext.target.selectionStart = 0
      keyContext.target.selectionEnd = 0
      keyContext.key = '1'
      dateMask.fireKeyDown(keyContext)

      keyContext.key = '.'
      dateMask.fireKeyDown(keyContext)

      expect(keyContext.target.value).toBe('01.02.1998')
      expect(keyContext.target.selectionStart).toBe(3)
      expect(keyContext.target.selectionEnd).toBe(3)
      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })

    test('should format whole value after blur', () => {
      const context = new MaskFocusContextMock()

      context.target.value = '_1._2.__88'
      dateMask.fireBlur(context)

      expect(context.target.value).toBe('01.02.1988')
      expect(component.balInput.emit).toBeCalledTimes(1)
      expect(component.balChange.emit).toBeCalledTimes(1)
    })

    test('should format the value from iso to user format', () => {
      expect(dateMask.onFormatValue('1988-02-01')).toBe('01.02.1988')
    })

    test('should parse the value from user input to iso', () => {
      expect(dateMask.onParseValue('01.02.1988')).toBe('1988-02-01')
    })

    test('should set initial value', () => {
      component.value = '1988-02-01'
      component.inputValue = '1988-02-01'
      dateMask.fireValueChanged('1988-02-01')

      expect(component.nativeInput.value).toBe('01.02.1988')
      expect(component.balInput.emit).not.toBeCalled()
      expect(component.balChange.emit).not.toBeCalled()
    })

    test('should value after initial', () => {
      component.value = undefined
      component.inputValue = undefined
      dateMask.fireValueChanged(undefined)

      component.value = '1988-02-01'
      dateMask.fireValueChanged('1988-02-01')

      expect(component.nativeInput.value).toBe('01.02.1988')
      expect(component.balInput.emit).not.toBeCalled()
      expect(component.balChange.emit).not.toBeCalled()
    })

    test('should set date and keep it after click and blur', () => {
      component.value = undefined
      component.inputValue = undefined
      dateMask.fireValueChanged(undefined)

      component.value = '2021-10-21'
      dateMask.fireValueChanged('2021-10-21')
      expect(component.nativeInput.value).toBe('21.10.2021')

      const clickTarget = new MaskPositionTargetMock('21.10.2021', 10, 10)
      const clickContext = new MaskMouseContextEventMock(clickTarget)

      dateMask.fireClick(clickContext)
      expect(clickContext.target.value).toBe('21.10.2021')
      expect(component.nativeInput.value).toBe('21.10.2021')

      const blurContext = new MaskFocusContextMock(clickTarget)
      dateMask.fireBlur(blurContext)
      expect(clickContext.target.value).toBe('21.10.2021')
      expect(component.nativeInput.value).toBe('21.10.2021')
      expect(component.balInput.emit).not.toBeCalled()
      expect(component.balChange.emit).not.toBeCalled()
    })

    test('should not do anything due to disabled component', () => {
      component.disabled = true
      const target = new MaskPositionTargetMock()
      const clickContext = new MaskMouseContextEventMock(target)
      const keyContext = new MaskKeyboardContextEventMock(target)
      const focusContext = new MaskFocusContextMock(target)

      dateMask.fireClick(clickContext)
      expect(clickContext.target.value).toBe('')
      expect(component.nativeInput.value).toBe('')

      keyContext.key = '2'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('')
      expect(component.nativeInput.value).toBe('')

      dateMask.fireBlur(focusContext)
      expect(focusContext.target.value).toBe('')
      expect(component.nativeInput.value).toBe('')

      expect(component.balInput.emit).toBeCalledTimes(0)
      expect(component.balChange.emit).toBeCalledTimes(0)
    })
  })
})
