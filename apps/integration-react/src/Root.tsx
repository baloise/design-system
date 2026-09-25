import { useState } from 'react'
import {
  DsRootProvider,
  DsButton,
  DsCheckbox,
  DsInput,
  DsPhoneInput,
  DsModalBody,
  DsModalHeader,
  DsSelect,
  DsSelectOption,
  Modal,
  useModal,
  useSnackbar,
  useToast,
} from '@helvetia-design/react'

const SPORT_OPTIONS = [
  { key: 'running', value: 'Running' },
  { key: 'climbing', value: 'Climbing' },
  { key: 'surfing', value: 'Surfing' },
]

const SelectFilterDemo = () => {
  const [selectedSport, setSelectedSport] = useState<string>()

  return (
    <section>
      <h2>Select filter demo (issue #1879)</h2>

      <label htmlFor="sport1">Sport 1</label>
      <DsSelect
        data-testid="sport1"
        name="sport1"
        onDsChange={event => setSelectedSport(event.detail as unknown as string)}
      >
        {SPORT_OPTIONS.map(option => (
          <DsSelectOption key={option.key} value={option.key}>
            {option.value}
          </DsSelectOption>
        ))}
      </DsSelect>

      <label htmlFor="sport2">Sport 2</label>
      <DsSelect data-testid="sport2" name="sport2">
        {SPORT_OPTIONS.filter(option => option.key !== selectedSport).map(option => (
          <DsSelectOption key={option.key} value={option.key}>
            {option.value}
          </DsSelectOption>
        ))}
      </DsSelect>
    </section>
  )
}

const OverlayDemos = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [presentToast, dismissToast] = useToast()
  const [presentSnackbar, dismissSnackbar] = useSnackbar()
  const [presentModal, dismissModal] = useModal()

  return (
    <section>
      <h2>Overlays</h2>

      <p data-testid="modal-open">Modal open: {String(isOpen)}</p>
      <DsButton data-testid="open-modal" onDsClick={() => setIsOpen(true)}>
        Open modal
      </DsButton>
      <Modal open={isOpen} onOpenChange={setIsOpen} data-testid="modal">
        <DsModalHeader>Test Modal</DsModalHeader>
        <DsModalBody>
          <p>Body content</p>
        </DsModalBody>
      </Modal>

      <DsButton
        data-testid="present-imperative-modal"
        onDsClick={() =>
          presentModal(
            <>
              <DsModalHeader>Imperative Modal</DsModalHeader>
              <DsModalBody>
                <p data-testid="imperative-modal-body">Presented via useModal()</p>
                <DsButton data-testid="dismiss-imperative-modal" onDsClick={() => dismissModal()}>
                  Close
                </DsButton>
              </DsModalBody>
            </>,
          )
        }
      >
        Present modal via useModal()
      </DsButton>

      <DsButton
        data-testid="show-toast"
        onDsClick={() =>
          presentToast({
            heading: 'Saved',
            message: 'Your changes have been saved.',
            closable: true,
            duration: 'infinite',
            closeHandler: () => undefined,
            actionHandler: () => undefined,
          })
        }
      >
        Show toast
      </DsButton>
      <DsButton data-testid="dismiss-toast" onDsClick={() => dismissToast()}>
        Dismiss toast
      </DsButton>

      <DsButton
        data-testid="show-snackbar"
        onDsClick={() =>
          presentSnackbar({
            heading: 'Offline',
            message: 'You are currently offline.',
            closable: true,
            closeHandler: () => undefined,
            actionHandler: () => undefined,
          })
        }
      >
        Show snackbar
      </DsButton>
      <DsButton data-testid="dismiss-snackbar" onDsClick={() => dismissSnackbar()}>
        Dismiss snackbar
      </DsButton>
    </section>
  )
}

export const Root = () => {
  const [clicks, setClicks] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('+41791234567')
  const [checked, setChecked] = useState(false)

  return (
    <DsRootProvider animated={false}>
      <main>
        <h1>ds-react smoke test</h1>

        <p data-testid="clicks">Clicks: {clicks}</p>
        <DsButton data-testid="button" onDsClick={() => setClicks(count => count + 1)}>
          Click me
        </DsButton>

        <p data-testid="input-value">Input value: {inputValue}</p>
        <DsInput
          data-testid="input"
          name="smoke-test-input"
          value={inputValue}
          onDsInput={event => setInputValue(event.detail ?? '')}
        />

        <p data-testid="phone-value">Phone value: {phoneValue}</p>
        <DsPhoneInput
          data-testid="phone"
          name="smoke-test-phone"
          initialCountry="CH"
          value={phoneValue}
          onDsInput={event => setPhoneValue(event.detail.value ?? '')}
        />

        <p data-testid="checked">Checked: {String(checked)}</p>
        <DsCheckbox data-testid="checkbox" checked={checked} onDsChange={event => setChecked(event.detail)}>
          Accept
        </DsCheckbox>

        <OverlayDemos />

        <SelectFilterDemo />
      </main>
    </DsRootProvider>
  )
}

export default Root
