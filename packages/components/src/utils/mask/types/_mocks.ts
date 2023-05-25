import { EventEmitter } from '@stencil/core'
import {
  MaskPositionTarget,
  MaskMouseContextEvent,
  MaskKeyboardContextEvent,
  MaskClipboardContextEvent,
  MaskFocusContextEvent,
} from '../context'
import { MaskComponent } from '../mask-interfaces'

export class MaskComponentMock implements MaskComponent {
  el = {} as HTMLElement
  value: string | undefined
  inputValue: string | undefined
  initialValue = ''
  focused = false
  disabled = false
  readonly = false
  nativeInput = {
    value: '',
  } as any as HTMLInputElement
  valueChanged = vi.fn(() => undefined)
  balChange = { emit: vi.fn(() => undefined) } as any as EventEmitter
  balInput = { emit: vi.fn(() => undefined) } as any as EventEmitter
  balBlur = { emit: vi.fn(() => undefined) } as any as EventEmitter
  balFocus = { emit: vi.fn(() => undefined) } as any as EventEmitter
  balKeyPress = { emit: vi.fn(() => undefined) } as any as EventEmitter
}

export class MaskPositionTargetMock implements MaskPositionTarget {
  constructor(
    public value = '',
    public selectionStart: number | null = null,
    public selectionEnd: number | null = null,
  ) {}
}

export class MaskMouseContextEventMock implements MaskMouseContextEvent {
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
  constructor(public target = new MaskPositionTargetMock()) {}
}

export class MaskKeyboardContextEventMock implements MaskKeyboardContextEvent {
  key = ''
  metaKey = false
  ctrlKey = false
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
  constructor(public target = new MaskPositionTargetMock()) {}
}

export class MaskClipboardContextEventMock implements MaskClipboardContextEvent {
  constructor(private data = '') {}
  clipboardData = {
    getData: () => this.data,
  } as any
  target = new MaskPositionTargetMock()
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
}

export class MaskFocusContextMock implements MaskFocusContextEvent {
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
  constructor(public target = new MaskPositionTargetMock()) {}
}
