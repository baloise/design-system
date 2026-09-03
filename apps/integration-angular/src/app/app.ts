import { Component } from '@angular/core'
import { ButtonDemo } from './button-demo/button-demo'
import { CheckboxDemo } from './checkbox-demo/checkbox-demo'
import { InputDemo } from './input-demo/input-demo'

@Component({
  selector: 'app-root',
  imports: [ButtonDemo, InputDemo, CheckboxDemo],
  templateUrl: './app.html',
})
export class App {}
