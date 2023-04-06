const dataTestSelectors = (testId: string) => [
  `[data-test-id="${testId}"]`, // @deprecated standard ist data-testid instead of data-test-id
  `[data-testid="${testId}"]`,
  `[data-test="${testId}"]`,
  `[data-cy="${testId}"]`,
]

export const byTestId = (testId: string): string => dataTestSelectors(testId).join(', ')

// @deprecated standard is byTestId
export const dataTestSelector = (testId: string): string => byTestId(testId)
