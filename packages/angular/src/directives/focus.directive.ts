/* eslint-disable @angular-eslint/directive-class-suffix */
import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[balAutoFocus]',
})
export class BalAutoFocus implements AfterViewInit {
  constructor(protected elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.setFocus()
  }

  setFocus() {
    const el = this.elementRef.nativeElement
    if (el) {
      if (el.setFocus) {
        el.setFocus()
      } else {
        el.focus()
      }
    }
  }
}
