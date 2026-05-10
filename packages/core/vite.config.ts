import { defineConfig } from 'vite'
import { resolve } from 'path'

// Suppress warnings at the earliest opportunity
const originalEmitWarning = process.emitWarning
process.emitWarning = function (warning, type, code) {
  if (type === 'ExperimentalWarning' && String(warning).includes('localStorage')) {
    return
  }
  return originalEmitWarning.call(this, warning, type, code)
}

// Suppress source map warnings and localStorage warnings immediately
const originalStdoutWrite = process.stdout.write
const originalStderrWrite = process.stderr.write

const shouldSuppress = chunk => {
  const str = String(chunk || '')
  return (
    str.includes('Failed to load source map') ||
    str.includes('default.js.map') ||
    str.includes('localStorage is not available')
  )
}

process.stdout.write = function (chunk, encoding, callback) {
  if (shouldSuppress(chunk)) {
    if (typeof callback === 'function') callback()
    return true
  }
  return originalStdoutWrite.call(this, chunk, encoding, callback)
}

// @ts-expect-error — overriding stderr.write signature for warning suppression
process.stderr.write = function (chunk, encoding, callback) {
  if (shouldSuppress(chunk)) {
    if (typeof callback === 'function') callback()
    return true
  }
  return originalStderrWrite.call(this, chunk, encoding, callback)
}

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/components',

  resolve: {
    alias: {
      '@utils': resolve(__dirname, 'src/utils/index.ts'),
      '@global': resolve(__dirname, 'src/global/index.ts'),
    },
  },

  plugins: [],

  server: {
    middlewareMode: true,
    sourcemap: false,
  },

  build: {
    sourcemap: false,
  },

  optimizeDeps: {
    exclude: ['@stencil/core'],
  },

  test: {
    globals: true,
    passWithNoTests: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: '../../coverage/packages/components', provider: 'v8' },
  },
})
