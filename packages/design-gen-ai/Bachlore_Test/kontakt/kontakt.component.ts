import { Component } from '@angular/core'
import {
  BalNavbarBundle,
  BalLayoutBundle,
  BalTypographyBundle,
  BalButtonBundle,
  BalFormBundle,
} from '@baloise/ds-core-angular'

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [
    ...BalNavbarBundle,
    ...BalLayoutBundle,
    ...BalTypographyBundle,
    ...BalButtonBundle,
    ...BalFormBundle,
  ],
  templateUrl: './kontakt.component.html',
})
export class KontaktComponent {}
