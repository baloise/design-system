import { Component } from '@angular/core'
import { ButtonDemo } from './button-demo/button-demo'
import { CheckboxDemo } from './checkbox-demo/checkbox-demo'
import { CheckboxGroupDemo } from './checkbox-group-demo/checkbox-group-demo'
import { CounterDemo } from './counter-demo/counter-demo'
import { DateDemo } from './date-demo/date-demo'
import { FileUploadDemo } from './file-upload-demo/file-upload-demo'
import { InputDemo } from './input-demo/input-demo'
import { SliderDemo } from './slider-demo/slider-demo'
import { NumberInputDemo } from './number-input-demo/number-input-demo'
import { SegmentDemo } from './segment-demo/segment-demo'
import { TextareaDemo } from './textarea-demo/textarea-demo'
import { RadioGroupDemo } from './radio-group-demo/radio-group-demo'
import { SelectDemo } from './select-demo/select-demo'

@Component({
  selector: 'app-root',
  imports: [
    ButtonDemo,
    InputDemo,
    NumberInputDemo,
    SliderDemo,
    CounterDemo,
    TextareaDemo,
    CheckboxDemo,
    CheckboxGroupDemo,
    SegmentDemo,
    DateDemo,
    RadioGroupDemo,
    FileUploadDemo,
    SelectDemo,
  ],
  templateUrl: './app.html',
})
export class App {}
