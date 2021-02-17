import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-i18n',
  templateUrl: './i18n.component.html',
})
export class I18nComponent {
  constructor(public translate: TranslateService) {}

  changeLanguage() {
    const lang = this.translate.getLangs().filter(l => l !== this.translate.currentLang)[0]
    this.translate.use(lang)
  }
}
