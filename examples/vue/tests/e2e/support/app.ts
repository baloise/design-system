import { HomePage } from './pages/home-page'

class App {
  getHomePage = () => new HomePage()
}

export const app = new App()
