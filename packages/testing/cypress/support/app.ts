import { CheckboxPage } from './pages/checkbox.page'

export class App {
  getCheckboxPage() {
    return new CheckboxPage()
  }
}

export const app = new App()
