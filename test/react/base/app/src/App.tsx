import Input from './form-components/input'
import { BalApp, useBaloiseDesignSystem } from './generated/src'

function App() {
  useBaloiseDesignSystem()

  const handleSubmit = (event: React.FormEvent) => {
    alert('Form submitted!')
    event.preventDefault()
  }

  return (
    <BalApp className="has-sticky-footer">
      <main className="container py-normal">
        <form className="is-flex fg-normal is-flex-direction-column" onSubmit={handleSubmit}>
          <Input />
        </form>
      </main>
    </BalApp>
  )
}

export default App
