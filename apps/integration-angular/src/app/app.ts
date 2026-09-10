import { Component } from '@angular/core'
import { ButtonDemo } from './button-demo/button-demo'
import { CheckboxDemo } from './checkbox-demo/checkbox-demo'
import { DateDemo } from './date-demo/date-demo'
import { InputDemo } from './input-demo/input-demo'
import { NumberInputDemo } from './number-input-demo/number-input-demo'
import { TextareaDemo } from './textarea-demo/textarea-demo'

@Component({
  selector: 'app-root',
  imports: [ButtonDemo, InputDemo, NumberInputDemo, TextareaDemo, CheckboxDemo, DateDemo],
  templateUrl: './app.html',
})
export class App {}
