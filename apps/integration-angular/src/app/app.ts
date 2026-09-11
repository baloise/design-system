import { Component } from '@angular/core'
import { ButtonDemo } from './button-demo/button-demo'
import { CheckboxDemo } from './checkbox-demo/checkbox-demo'
import { CheckboxGroupDemo } from './checkbox-group-demo/checkbox-group-demo'
import { DateDemo } from './date-demo/date-demo'
import { InputDemo } from './input-demo/input-demo'
import { InputSliderDemo } from './input-slider-demo/input-slider-demo'
import { NumberInputDemo } from './number-input-demo/number-input-demo'
import { SegmentDemo } from './segment-demo/segment-demo'
import { TextareaDemo } from './textarea-demo/textarea-demo'

@Component({
  selector: 'app-root',
  imports: [
    ButtonDemo,
    InputDemo,
    NumberInputDemo,
    InputSliderDemo,
    TextareaDemo,
    CheckboxDemo,
    CheckboxGroupDemo,
    SegmentDemo,
    DateDemo,
  ],
  templateUrl: './app.html',
})
export class App {}
