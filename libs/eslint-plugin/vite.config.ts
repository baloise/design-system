import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/eslint-plugin',
  plugins: [],
  test: {
    globals: true,
    passWithNoTests: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: '../../coverage/libs/eslint-plugin', provider: 'v8' },
  },
})
