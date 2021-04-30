import { BalOptionController } from '../bal-select'
import { addValue, removeValue, validateAfterBlur, findLabelByValue, findOptionByLabel } from './utils'

describe('bal-select', () => {
  let optionA: BalOptionController
  let optionB: BalOptionController

  beforeEach(() => {
    optionA = {
      id: 'id-a',
      value: '1',
      label: 'labelA',
      textContent: 'labelA',
      innerHTML: 'labelA',
    }
    optionB = {
      id: 'id-b',
      value: '2',
      label: 'labelB',
      textContent: 'labelB',
      innerHTML: 'labelB',
    }
  })
  describe('addValue', () => {
    test('should replace the current selection', () => {
      const result = addValue(['1'], '3', false)
      expect(result).toStrictEqual(['3'])
    })
    test('should add new value', () => {
      const result = addValue(['1', '2'], '3', true)
      expect(result).toStrictEqual(['1', '2', '3'])
    })
    test('should add new value', () => {
      const result = addValue(['1', '2', '3'], '2', true)
      expect(result).toStrictEqual(['1', '3'])
    })
  })
  describe('removeValue', () => {
    test('should remove only the given option', () => {
      const result = removeValue(['1', '2'], '1')
      expect(result).toStrictEqual(['2'])
    })
  })
  describe('validateAfterBlur', () => {
    let options = new Map()
    beforeEach(() => {
      options = new Map()
      options.set(optionA.value, optionA)
      options.set(optionB.value, optionB)
    })
    test('should keep the typed value', () => {
      const result = validateAfterBlur(['1'], options, 'labelA')
      expect(result).toStrictEqual(['1'])
    })
    test('should remove the value due to non existing label', () => {
      const result = validateAfterBlur(['1'], options, 'invalid-label')
      expect(result).toStrictEqual([])
    })
    test('should set the value of the given label', () => {
      const result = validateAfterBlur([], options, 'labelA')
      expect(result).toStrictEqual(['1'])
    })
    test('should not set the value', () => {
      const result = validateAfterBlur([], options, '')
      expect(result).toStrictEqual([])
    })
  })
  describe('findLabelByValue', () => {
    let options = new Map()
    beforeEach(() => {
      options = new Map()
      options.set(optionA.value, optionA)
      options.set(optionB.value, optionB)
    })
    test('should find option', () => {
      const result = findLabelByValue(options, '2')
      expect(result).toStrictEqual('labelB')
    })
    test('should return an empty string if the option does not exist', () => {
      const result = findLabelByValue(options, '3')
      expect(result).toStrictEqual('')
    })
  })
  describe('findOptionByLabel', () => {
    let options = new Map()
    beforeEach(() => {
      options = new Map()
      options.set(optionA.value, optionA)
      options.set(optionB.value, optionB)
    })
    test('should find option', () => {
      const result = findOptionByLabel(options, 'labelA')
      expect(result?.value).toStrictEqual('1')
    })
    test('should return an empty string if the option does not exist', () => {
      const result = findOptionByLabel(options, '3')
      expect(result?.value).toBeUndefined()
    })
  })
})
