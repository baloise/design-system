import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/output-target-web',

  plugins: [],

  test: {
    globals: true,
    passWithNoTests: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: '../../coverage/libs/output-target-web', provider: 'v8' },
  },
})
