import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    globals: true,
    environment: 'node',
    include: ['scripts/**/*.{test,spec}.ts'],
    reporters: ['default'],
  },
})
