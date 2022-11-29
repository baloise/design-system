import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[balAutoFocus]',
})
export class BalAutoFocus implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

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
