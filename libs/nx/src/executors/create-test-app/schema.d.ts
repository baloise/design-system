export interface CreateTestAppExecutorSchema {
  framework: 'angular' | 'react'
  workspaceRoot: string
  build: boolean
  start: boolean
  test: boolean
  version: string
} // eslint-disable-line
