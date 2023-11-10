import { MaskContext } from '../context/mask-context'
import { MaskBlock } from './mask-block'

export class MaskBlockList {
  constructor(private _list: MaskBlock[] = []) {}

  get lastPosition(): number {
    return this._list[this._list.length - 1].to
  }

  get list(): MaskBlock[] {
    return this._list
  }

  set list(list: MaskBlock[]) {
    this._list = list
  }

  clone(): MaskBlockList {
    return new MaskBlockList([...this._list])
  }

  findByIndex(index: number, blocks = this.list): MaskBlock | undefined {
    return blocks.find(block => block.from <= index && index < block.to)
  }

  getPlaceholderMask(): string {
    const placeholder: string[] = []
    this.list.forEach(block => {
      const length = block.to - block.from
      for (let index = 0; index < length; index++) {
        placeholder.push(block.mask)
      }
    })
    return placeholder.join('')
  }

  getRawValueWithoutMaskByContext(context: MaskContext): string {
    return this.getRawValueWithoutMask(context.value)
  }

  getRawValueWithoutMask(value?: string): string {
    if (value) {
      let rawValue: string[] = []
      const chars = value.split('')
      for (let index = 0; index < chars.length; index++) {
        const char = chars[index]
        const block = this.findByIndex(index)
        if (block && !block.isSeparator) {
          rawValue.push(char.replace(block.mask, ''))
        } else {
          rawValue.push(char)
        }
      }
      rawValue = rawValue.filter(v => v)
      const amountSeparators = this.list.filter(block => block.isSeparator).length
      if (amountSeparators === rawValue.length) {
        return ''
      }
      return rawValue.join('')
    }
    return ''
  }

  formatBlocks(value: string, activeBlockIndex: number): string {
    let newValue = `${value}`
    for (let index = 0; index < this.list.length; index++) {
      const block = this.list[index]
      if (activeBlockIndex !== index && !block.isSeparator && block.isTouched(newValue)) {
        const blockValue = block.getValueOfTheBlock(newValue)
        const newBlockValue = block.format(blockValue)
        newValue = newValue.substring(0, block.from) + newBlockValue + newValue.substring(block.to)
      }
    }
    return newValue
  }

  getBlockIndexFromPosition(position: number): number | undefined {
    const length = this.list.reduce((acc, block) => acc + block.to - block.from, 0)
    if (position === length) {
      return this.list.length - 1
    }

    const index = this.list.findIndex(block => block.from <= position && position < block.to)
    return index < 0 ? undefined : Math.min(length, index)
  }

  verifyCallOfNextSeparator(key: string, index: number): boolean {
    if (this.list.length - 1 > index) {
      const nextBlock = this.list[index + 1]

      if (nextBlock.isSeparator && nextBlock.mask === key) {
        return true
      }
    }

    return false
  }
}
