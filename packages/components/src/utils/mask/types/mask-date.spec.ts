import { initialize } from '../../config'
import { MaskComponentMock } from '../__test__/mask-component.mock'
import { MaskClipboardContext, MaskClipboardContextEvent, MaskFocusContext, MaskFocusContextEvent } from '../context'
import { DateMask } from './mask-date'

describe('MaskComponentAdapter', () => {
  let mask = new DateMask()
  let component = new MaskComponentMock()

  beforeEach(() => {
    initialize()
    mask = new DateMask()
    component = new MaskComponentMock()
  })
  describe('onParseValue', () => {
    test('should parse value', () => {
      expect(mask.onParseValue()).toBe('')
      expect(mask.onParseValue('1.1')).toBe('2023-01-01')
    })
  })
  describe('onFormatValue', () => {
    test('should format value', () => {
      expect(mask.onFormatValue()).toBe('')
      expect(mask.onFormatValue('2023-01-01')).toBe('01.01.2023')
    })
  })
  describe('onPaste', () => {
    test('should paste and format value', () => {
      component.nativeInput.value = 'TT.MM.JJJJ'
      const event = { clipboardData: { getData: vi.fn().mockReturnValue('1.1.23') } } as MaskClipboardContextEvent
      const context = new MaskClipboardContext({ mask, event, component })

      mask.onPaste(context, undefined as any, undefined as any)

      expect(context.value).toBe('01.01.2023')
      expect(context.position.value).toBe(10)
    })
  })
  describe('onBlur', () => {
    test('should format value after blur', () => {
      component.nativeInput.value = 'TT.MM.JJJJ'
      const event = {} as MaskFocusContextEvent
      const context = new MaskFocusContext({ mask, event, component })
      context.value = '01.01.'

      mask.onBlur(context)

      expect(context.value).toBe('01.01.2023')
      expect(context.position.value).toBe(10)
    })
  })
})
