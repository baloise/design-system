import { addOption, findLabelByValue, findOptionByValue, removeOption, updateOption } from './option.utils'

describe('bal-select', () => {
  let options = new Map()
  beforeEach(() => {
    options = new Map()
    options.set('2', { id: '2', label: 'label 2', value: '2' })
    options.set('1', { id: '1', label: 'label 1', value: '1' })
  })

  describe('addOption', () => {
    test('should add option', () => {
      const result = addOption(new Map(), { id: '1', label: 'label 1', value: '1' })
      expect(result.size).toBe(1)
      expect(result.get('1')).toStrictEqual({ id: '1', label: 'label 1', value: '1' })
    })
  })
  describe('updateOption', () => {
    test('should update the given option only', () => {
      const result = updateOption(options, { id: '1', label: 'label 11', value: '1' })
      expect(result.size).toBe(2)
      expect(result.get('2')).toStrictEqual({ id: '2', label: 'label 2', value: '2' })
      expect(result.get('1')).toStrictEqual({ id: '1', label: 'label 11', value: '1' })
    })
  })
  describe('removeOption', () => {
    test('should remove only the given option', () => {
      const result = removeOption(options, { id: '1', label: 'label 1', value: '1' })
      expect(result.size).toBe(1)
      expect(result.get('2')).toStrictEqual({ id: '2', label: 'label 2', value: '2' })
    })
  })
  describe('findOptionByValue', () => {
    test('should find option', () => {
      const result = findOptionByValue(options, '1')
      expect(result).toStrictEqual({ id: '1', label: 'label 1', value: '1' })
    })
    test('should return undefined when there was no matching option', () => {
      const result = findOptionByValue(options, '7')
      expect(result).toBe(undefined)
    })
  })
  describe('findLabelByValue', () => {
    test('should find option', () => {
      const result = findLabelByValue(options, '2')
      expect(result).toStrictEqual('label 2')
    })
    test('should return an empty string if the option does not exist', () => {
      const result = findLabelByValue(options, '3')
      expect(result).toStrictEqual('')
    })
  })
})
