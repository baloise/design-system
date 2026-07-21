const dataTestSelectors = (testId: string) => [
  `[data-test-id="${testId}"]`, // @deprecated standard ist data-testid instead of data-test-id
  `[data-testid="${testId}"]`,
  `[data-test="${testId}"]`,
  `[data-cy="${testId}"]`,
]

export const byTestId = (testId: string): string => dataTestSelectors(testId).join(', ')

// @deprecated standard is byTestId
export const dataTestSelector = (testId: string): string => byTestId(testId)

export const parseDataTestID = (testId: string): string => {
  return testId.split(',').shift()?.trim().slice(15).slice(0, -2) || ''
}

export const byDataSelectors = (dateTestId: string, dataSelectors: string[], value: string): string => {
  const dataIds = dateTestId.split(',').map(d => d.trim())
  const selectors: string[] = []
  for (let index = 0; index < dataSelectors.length; index++) {
    const dataSelector = dataSelectors[index]
    for (let index = 0; index < dataIds.length; index++) {
      const dataId = dataIds[index]
      selectors.push(`${dataId}[data-${dataSelector}="${value}"]`)
    }
  }
  return selectors.join(',')
}
