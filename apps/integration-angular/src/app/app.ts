import { Component } from '@angular/core'
import { ButtonDemo } from './button-demo/button-demo'
import { CheckboxDemo } from './checkbox-demo/checkbox-demo'
import { CheckboxGroupDemo } from './checkbox-group-demo/checkbox-group-demo'
import { DateDemo } from './date-demo/date-demo'
import { FileUploadDemo } from './file-upload-demo/file-upload-demo'
import { InputDemo } from './input-demo/input-demo'
import { InputSliderDemo } from './input-slider-demo/input-slider-demo'
import { InputStepperDemo } from './input-stepper-demo/input-stepper-demo'
import { NumberInputDemo } from './number-input-demo/number-input-demo'
import { SegmentDemo } from './segment-demo/segment-demo'
import { TextareaDemo } from './textarea-demo/textarea-demo'
import { RadioGroupDemo } from './radio-group-demo/radio-group-demo'
import { SelectDemo } from './select-demo/select-demo'
import { ToggleDemo } from './toggle-demo/toggle-demo'

@Component({
  selector: 'app-root',
  imports: [
    ButtonDemo,
    InputDemo,
    NumberInputDemo,
    InputSliderDemo,
    InputStepperDemo,
    TextareaDemo,
    CheckboxDemo,
    CheckboxGroupDemo,
    SegmentDemo,
    DateDemo,
    RadioGroupDemo,
    FileUploadDemo,
    SelectDemo,
    ToggleDemo,
  ],
  templateUrl: './app.html',
})
export class App {}
