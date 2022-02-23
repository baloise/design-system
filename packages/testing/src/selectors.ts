// @deprecated standard ist data-testid instead of data-testid
export const dataTestSelector = (testId: string): string => `[data-test-id="${testId}"]`

export const byTestId = (testId: string): string => `[data-testid="${testId}"]`
