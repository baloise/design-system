import { Component } from '@angular/core'
import { ButtonDemo } from './button-demo/button-demo'
import { CheckboxDemo } from './checkbox-demo/checkbox-demo'
import { InputDemo } from './input-demo/input-demo'
import { NumberInputDemo } from './number-input-demo/number-input-demo'
import { RadioGroupDemo } from './radio-group-demo/radio-group-demo'

@Component({
  selector: 'app-root',
  imports: [ButtonDemo, InputDemo, NumberInputDemo, CheckboxDemo, RadioGroupDemo],
  templateUrl: './app.html',
})
export class App {}
