import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: 'balAutofocus',
})
export class BalAutoFocus implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus()
  }
}
