import { setupConfig } from '../../config'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from './mask-block'

describe('MaskBlock', () => {
  beforeEach(() => {
    setupConfig()
  })

  test('should have default values', () => {
    const block = new MaskBlock({})
    expect(block.from).toBe(0)
    expect(block.to).toBe(0)
    expect(block.isSeparator).toBe(false)
    expect(block.mask).toBe('_')
    expect(block.allowedKeys).toStrictEqual([])
    expect(block.format('1234')).toBe('1234')
  })

  test('should format the value', () => {
    const block = new MaskBlock({
      format: value => 'bubu' + value,
    })
    expect(block.format('1234')).toBe('bubu1234')
  })

  test('should custom mask char', () => {
    const block = new MaskBlock({
      mask: locale => (locale === 'de-CH' ? '#' : '-'),
    })
    expect(block.mask).toBe('#')

    block.onI18nChange('de-FR')
    expect(block.mask).toBe('-')
  })

  test('should get value of block', () => {
    const block = new MaskBlock({ from: 0, to: 2 })
    expect(block.getValueOfTheBlock('12345678')).toBe('12')

    const secondBlock = new MaskBlock({ from: 2, to: 3 })
    expect(secondBlock.getValueOfTheBlock('12345678')).toBe('3')
  })

  test('should verify if the block was touched', () => {
    const block = new MaskBlock({ from: 0, to: 2 })
    expect(block.isTouched('12345678')).toBe(true)

    const secondBlock = new MaskBlock({ from: 0, to: 2 })
    expect(secondBlock.isTouched('________')).toBe(false)
  })

  test('should verify if the key is allowed', () => {
    const block = new MaskBlock({ allowedKeys: [...NUMBER_KEYS] })
    expect(block.verifyAllowedKeyHits('1')).toBe(true)
    expect(block.verifyAllowedKeyHits('a')).toBe(false)
  })
})
