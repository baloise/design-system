import { MaskPosition } from './mask-position'

export abstract class MaskContext<T = Event> {
  public position!: MaskPosition

  constructor(protected event: T & Event) {
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
    this.event.preventDefault()
  }

  public stopPropagation() {
    this.preventDefault()
    this.event.stopPropagation()
  }
}
