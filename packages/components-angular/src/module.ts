import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { appInitialize, BaloiseDesignSystemAngularConfig } from './app-initialize'
import { BooleanValueAccessor } from './directives/boolean-value-accessor'
import { TextValueAccessor } from './directives/text-value-accessor'
import { SelectValueAccessor } from './directives/select-value-accessor'
import { CheckboxValueAccessor } from './directives/checkbox-accessor'

import { AutoFocus } from './focus.directive'
import { AngularDelegate, BalAppModule, BalNoticesModule } from '.'

const DECLARATIONS = [
  // directives
  AutoFocus,

  // ngModel accessors
  CheckboxValueAccessor,
  BooleanValueAccessor,
  TextValueAccessor,
  SelectValueAccessor,
]

const MODULES = [BalAppModule, BalNoticesModule]

@NgModule({
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS, MODULES],
  imports: [CommonModule, FormsModule, MODULES],
  providers: [AngularDelegate],
})
export class BalCoreModule {
  static forRoot(config: BaloiseDesignSystemAngularConfig = {}): ModuleWithProviders<BalCoreModule> {
    return {
      ngModule: BalCoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize(config),
          multi: true,
          deps: [DOCUMENT, NgZone],
        },
      ],
    }
  }
}
