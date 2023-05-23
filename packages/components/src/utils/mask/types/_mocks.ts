import {
  MaskPositionTarget,
  MaskMouseContextEvent,
  MaskKeyboardContextEvent,
  MaskClipboardContextEvent,
  MaskFocusContextEvent,
} from '../context'

export class MaskPositionTargetMock implements MaskPositionTarget {
  selectionStart: number | null = null
  selectionEnd: number | null = null
  value = ''
}

export class MaskMouseContextEventMock implements MaskMouseContextEvent {
  target = new MaskPositionTargetMock()
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
}

export class MaskKeyboardContextEventMock implements MaskKeyboardContextEvent {
  key = ''
  metaKey = false
  ctrlKey = false
  target = new MaskPositionTargetMock()
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
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
  target = new MaskPositionTargetMock()
  preventDefault = vi.fn(() => undefined)
  stopPropagation = vi.fn(() => undefined)
}
