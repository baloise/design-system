import { CheckboxPage } from './pages/checkbox.page'
import { ButtonPage } from './pages/button.page'
import { AccordionPage } from './pages/accordion.page'
import { DatepickerPage } from './pages/datepicker.page'
import { DropdownPage } from './pages/dropdown.page'
import { SelectPage } from './pages/select.page'
import { InputPage } from './pages/input.page'
import { ModalPage } from './pages/modal.page'
import { RadioPage } from './pages/radio.page'
import { TabsPage } from './pages/tabs.page'
import { ToastPage } from './pages/toast.page'
import { SnackbarPage } from './pages/snackbar.page'
import { PaginationPage } from './pages/pagination.page'
import { SliderPage } from './pages/slider.page'
import { HintPage } from './pages/hint.page'
import { TextareaPage } from './pages/textarea.page'

export class App {
  getCheckboxPage = () => new CheckboxPage()
  getButtonPage = () => new ButtonPage()
  getAccordionPage = () => new AccordionPage()
  getDatepickerPage = () => new DatepickerPage()
  getDropdownPage = () => new DropdownPage()
  getSelectPage = () => new SelectPage()
  getInputPage = () => new InputPage()
  getTextareaPage = () => new TextareaPage()
  getModalPage = () => new ModalPage()
  getRadioPage = () => new RadioPage()
  getTabsPage = () => new TabsPage()
  getToastPage = () => new ToastPage()
  getSnackbarPage = () => new SnackbarPage()
  getPaginationPage = () => new PaginationPage()
  getSliderPage = () => new SliderPage()
  getHintPage = () => new HintPage()
}

export const app = new App()
