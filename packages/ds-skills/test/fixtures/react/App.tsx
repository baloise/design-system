import { BalSpinner } from '@baloise/ds-react'

const _note = 'bal-spinner'
const _example = '<BalSpinner small color="white" />'
const _markup = `<BalSpinner small />`
const _trailing = true // <BalSpinner color="blue" />
const _packed = 1 // <BalSpinner small />
const _hidden = /* <bal-spinner small></bal-spinner> */ null

export function App() {
  return (
    <>
      <BalSpinner small />
      <BalSpinner color="white" inverted deactivated variation="circle" />
      <BalSpinner color="blue" />
      <BalSpinner small="false" />
      <BalSpinner small>loading</BalSpinner>
    </>
  )
}
