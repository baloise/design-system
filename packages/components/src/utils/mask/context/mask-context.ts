import { MaskPosition, MaskPositionTarget } from './mask-position'

export interface MaskContextEvent {
  target: MaskPositionTarget | null
  preventDefault?(): void
  stopPropagation?(): void
}

export abstract class MaskContext<T = MaskContextEvent> {
  public position!: MaskPosition

  constructor(protected event: T & MaskContextEvent) {
    this.position = new MaskPosition(event.target)
  }

  public get target(): HTMLInputElement {
    return this.event.target as any
  }

  public get value(): string {
    return this.target.value
  }

  public set value(newValue: string) {
    this.target.value = newValue
  }

  public isValueEmpty(): boolean {
    return this.value === '' || this.value === undefined || this.value === null
  }

  public preventDefault() {
    if (this.event.preventDefault) {
      this.event.preventDefault()
    }
  }

  public stopPropagation() {
    this.preventDefault()
    if (this.event.stopPropagation) {
      this.event.stopPropagation()
    }
  }
}
