import { AfterViewChecked, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[balAutoFocus]',
})
export class BalAutoFocus implements AfterViewChecked {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewChecked() {
    this.elementRef.nativeElement.focus()
  }
}
