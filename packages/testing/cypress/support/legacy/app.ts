import { CheckboxPage } from './pages/checkbox.page'
import { ButtonPage } from './pages/button.page'
import { AccordionPage } from './pages/accordion.page'
import { DatepickerPage } from './pages/datepicker.page'
import { SelectPage } from './pages/select.page'
import { InputPage } from './pages/input.page'
import { RadioPage } from './pages/radio.page'
import { TabsPage } from './pages/tabs.page'
import { ToastPage } from './pages/toast.page'

export class App {
  getCheckboxPage = () => new CheckboxPage()
  getButtonPage = () => new ButtonPage()
  getAccordionPage = () => new AccordionPage()
  getDatepickerPage = () => new DatepickerPage()
  getSelectPage = () => new SelectPage()
  getInputPage = () => new InputPage()
  getRadioPage = () => new RadioPage()
  getTabsPage = () => new TabsPage()
  getToastPage = () => new ToastPage()
}

export const app = new App()
