import { addOption, findLabelByValue, findOptionByValue, removeOption, updateOption } from './option.utils'

describe('bal-select', () => {
  describe('addOption', () => {
    test('should add option', () => {
      const result = addOption([], { id: '1', label: '1', value: '1' })
      expect(result.length).toBe(1)
      expect(result[0]).toStrictEqual({ id: '1', label: '1', value: '1' })
    })
  })
  describe('updateOption', () => {
    test('should update the given option only', () => {
      const result = updateOption(
        [
          { id: '2', label: '2', value: '2' },
          { id: '1', label: '1', value: '1' },
        ],
        { id: '1', label: '11', value: '1' },
      )
      expect(result.length).toBe(2)
      expect(result[0]).toStrictEqual({ id: '2', label: '2', value: '2' })
      expect(result[1]).toStrictEqual({ id: '1', label: '11', value: '1' })
    })
  })
  describe('removeOption', () => {
    test('should remove only the given option', () => {
      const result = removeOption(
        [
          { id: '2', label: '2', value: '2' },
          { id: '1', label: '1', value: '1' },
        ],
        { id: '1', label: '1', value: '1' },
      )
      expect(result.length).toBe(1)
      expect(result[0]).toStrictEqual({ id: '2', label: '2', value: '2' })
    })
  })
  describe('findOptionByValue', () => {
    test('should find option', () => {
      const result = findOptionByValue(
        [
          { id: '2', label: '2', value: '2' },
          { id: '1', label: '1', value: '1' },
        ],
        '1',
      )
      expect(result).toStrictEqual({ id: '1', label: '1', value: '1' })
    })
    test('should return undefined when there was no matching option', () => {
      const result = findOptionByValue(
        [
          { id: '2', label: '2', value: '2' },
          { id: '1', label: '1', value: '1' },
        ],
        '7',
      )
      expect(result).toBe(undefined)
    })
  })
  describe('findLabelByValue', () => {
    test('should find option', () => {
      const result = findLabelByValue(
        [
          { id: '2', label: 'label 2', value: '2' },
          { id: '1', label: 'label 1', value: '1' },
        ],
        '2',
      )
      expect(result).toStrictEqual('label 2')
    })
    test('should return an empty string if the option does not exist', () => {
      const result = findLabelByValue(
        [
          { id: '2', label: 'label 2', value: '2' },
          { id: '1', label: 'label 1', value: '1' },
        ],
        '3',
      )
      expect(result).toStrictEqual('')
    })
  })
})
