import { initialize } from '../../config'
import { MaskClipboardContextEventMock, MaskFocusContextMock, MaskKeyboardContextEventMock, MaskMouseContextEventMock } from './_mocks'
import { DateMask } from './mask-date'

describe('mask', () => {
  beforeEach(() => {
    initialize()
  })
  describe('DateMask', () => {
    test('should add the empty mask when clicking the input and it is empty', () => {
      const context = new MaskMouseContextEventMock()
      const dateMask = new DateMask()

      expect(context.target.value).toBe('')
      dateMask.fireClick(context)
      expect(context.target.value).toBe('__.__.____')
      dateMask.fireBlur(context)
      expect(context.target.value).toBe('')
    })

    test('should paste a new date', () => {
      const context = new MaskClipboardContextEventMock('20021998')
      const dateMask = new DateMask()

      dateMask.firePaste(context)
      expect(context.target.value).toBe('20.02.1998')
    })

    test('should select all and remove all', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '20.02.1998'
      keyContext.ctrlKey = true
      keyContext.key = 'a'
      keyContext.target.selectionStart = 0
      keyContext.target.selectionEnd = 10
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1998')

      keyContext.ctrlKey = false
      keyContext.key = 'Backspace'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('__.__.____')
    })

    test('should add date', () => {
      const clickContext = new MaskMouseContextEventMock()
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

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
    })

    test('should not go change date when input max length is reached', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      keyContext.key = '8'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.1998')
    })

    test('should remove the previous char and replace it with the mask', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      keyContext.key = 'Backspace'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('20.02.199_')
      expect(keyContext.target.selectionStart).toBe(9)
      expect(keyContext.target.selectionEnd).toBe(9)
    })

    test('should remove the previous char and hop over the separator', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

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
    })

    test('should delete the previous char and replace it with the mask', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 0
      keyContext.target.selectionEnd = 0
      keyContext.key = 'Delete'
      dateMask.fireKeyDown(keyContext)
      expect(keyContext.target.value).toBe('_0.02.1998')
      expect(keyContext.target.selectionStart).toBe(1)
      expect(keyContext.target.selectionEnd).toBe(1)
    })

    test('should delete the previous char and hop over the separator', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

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
    })

    test('should change due to i18n change the masks and the separators', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '__.__.____'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      expect(keyContext.target.value).toBe('__.__.____')

      dateMask.fireI18nChange({
        locale: 'fr-BE',
        target: keyContext.target,
      })
      expect(keyContext.target.value).toBe('__/__/____')
    })

    test('should change due to i18n change', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '20.02.1998'
      keyContext.target.selectionStart = 10
      keyContext.target.selectionEnd = 10
      expect(keyContext.target.value).toBe('20.02.1998')

      dateMask.fireI18nChange({
        locale: 'fr-BE',
        target: keyContext.target,
      })
      expect(keyContext.target.value).toBe('20/02/1998')
    })

    test('should format previous block', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

      keyContext.target.value = '__.02.1998'
      keyContext.target.selectionStart = 1
      keyContext.target.selectionEnd = 1
      keyContext.key = '1'
      dateMask.fireKeyDown(keyContext)

      expect(keyContext.target.value).toBe('01.02.1998')
      expect(keyContext.target.selectionStart).toBe(3)
      expect(keyContext.target.selectionEnd).toBe(3)
    })

    test('should format previous block with a separator jump', () => {
      const keyContext = new MaskKeyboardContextEventMock()
      const dateMask = new DateMask()

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
    })

    test('should format whole value after blur', () => {
      const context = new MaskFocusContextMock()
      const dateMask = new DateMask()

      context.target.value = '_1._2.__88'
      dateMask.fireBlur(context)

      expect(context.target.value).toBe('01.02.1988')
    })
  })
})
