// Vitest setup file to suppress experimental warnings
const originalEmitWarning = process.emitWarning

process.emitWarning = function (warning, type, code) {
  if (type === 'ExperimentalWarning' && warning.includes('localStorage')) {
    return
  }
  return originalEmitWarning.call(this, warning, type, code)
}
