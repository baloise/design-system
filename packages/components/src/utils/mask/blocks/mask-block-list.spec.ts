import { initialize } from '../../config'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from './mask-block'
import { MaskBlockList } from './mask-block-list'

describe('MaskBlockList', () => {
  const blocks = [
    new MaskBlock({ from: 0, to: 2, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
    new MaskBlock({ from: 2, to: 3, isSeparator: true, mask: '.' }),
    new MaskBlock({ from: 3, to: 5, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
    new MaskBlock({ from: 5, to: 6, isSeparator: true, mask: '.' }),
    new MaskBlock({ from: 6, to: 10, allowedKeys: [...NUMBER_KEYS] }),
  ]

  beforeEach(() => {
    initialize()
  })

  test('should get list', () => {
    const block = new MaskBlockList(blocks)
    expect(block.list).toStrictEqual(blocks)
  })

  test('should set list', () => {
    const block = new MaskBlockList(blocks)
    block.list = []
    expect(block.list).toStrictEqual([])
  })

  test('should clone list', () => {
    const block = new MaskBlockList(blocks)
    const clone = block.clone()
    block.list = []
    expect(block.list).toStrictEqual([])
    expect(clone.list).toStrictEqual(blocks)
  })

  test('should find block by value index', () => {
    const block = new MaskBlockList(blocks)
    expect(block.findByIndex(0)).toStrictEqual(blocks[0])
    expect(block.findByIndex(1)).toStrictEqual(blocks[0])
    expect(block.findByIndex(2)).toStrictEqual(blocks[1])
  })

  test('should create mask placeholder', () => {
    const block = new MaskBlockList(blocks)
    expect(block.getPlaceholderMask()).toBe('__.__.____')
  })

  test('should get raw value without the mask symbol', () => {
    const block = new MaskBlockList(blocks)
    expect(block.getRawValueWithoutMask('21.10.____')).toBe('21.10.')
    expect(block.getRawValueWithoutMask('21.1_.____')).toBe('21.1.')
    expect(block.getRawValueWithoutMask('21.__.____')).toBe('21..')
    expect(block.getRawValueWithoutMask('__.__.____')).toBe('')
    expect(block.getRawValueWithoutMask('')).toBe('')
  })

  test('should format the blocks which are not active', () => {
    const block = new MaskBlockList(blocks)
    expect(block.formatBlocks('_1._1.20__', 0)).toBe('_1.01.20__')
    expect(block.formatBlocks('_1._1.20__', 2)).toBe('01._1.20__')
    expect(block.formatBlocks('_1._1.20__', 5)).toBe('01.01.20__')
  })

  test('should return block index from position', () => {
    const block = new MaskBlockList(blocks)
    expect(block.getBlockIndexFromPosition(0)).toBe(0)
    expect(block.getBlockIndexFromPosition(1)).toBe(0)
    expect(block.getBlockIndexFromPosition(2)).toBe(1)
    expect(block.getBlockIndexFromPosition(3)).toBe(2)
  })

  test('should verify if the next separator was pressed', () => {
    const block = new MaskBlockList(blocks)
    expect(block.verifyCallOfNextSeparator('.', 0)).toBe(true)
    expect(block.verifyCallOfNextSeparator('.', 1)).toBe(false)
    expect(block.verifyCallOfNextSeparator('.', 2)).toBe(true)

    expect(block.verifyCallOfNextSeparator('_', 0)).toBe(false)
    expect(block.verifyCallOfNextSeparator('_', 1)).toBe(false)
    expect(block.verifyCallOfNextSeparator('_', 2)).toBe(false)
  })
})
