const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const fileChanges = process.env.NX_FILE_CHANGES || ''

function formatSeconds(seconds) {
  return seconds >= 10 ? `${Math.round(seconds)}s` : `${seconds.toFixed(2)}s`
}

function grey(str) {
  return `\x1b[90m${str}\x1b[0m`
}

if (fileChanges) {
  const files = fileChanges
    .split(',')
    .map(f => f.trim())
    .filter(Boolean)
    .filter(f => f.endsWith('.css') || f.endsWith('.scss') || f.endsWith('.json'))

  if (files.length === 0) {
    return
  }

  const workspaceRoot = path.join(__dirname, '../..')

  console.log(`${grey('[  🎨   ]')}  compile styles started ${grey('...')}`)
  const startTime = process.hrtime.bigint()

  // Ensure a temp dir for PID tracking
  const tmpDir = path.join(workspaceRoot, 'tmp')
  try {
    fs.mkdirSync(tmpDir, { recursive: true })
  } catch {
    // Non-fatal; if we can't create it, we'll just skip PID tracking
  }

  const pidFile = path.join(tmpDir, 'nx-styles-build.pid')
  console.log(pidFile)

  // Cancel any previously running build
  try {
    if (fs.existsSync(pidFile)) {
      const previousPidRaw = fs.readFileSync(pidFile, 'utf8').trim()
      const previousPid = Number(previousPidRaw)
      if (!Number.isNaN(previousPid) && previousPid > 0) {
        // Try to kill the whole process group first (macOS/Linux)
        try {
          process.kill(-previousPid, 'SIGTERM')
        } catch {
          try {
            process.kill(previousPid, 'SIGTERM')
          } catch {
            // Non-fatal; if we can't create it, we'll just skip PID tracking
          }
        }
        console.log(`${grey('[  🛑   ]')}  canceled previous styles build (pid ${previousPid})`)
      }
    }
  } catch (e) {
    // Non-fatal; continue with a new run
  }

  // Start a new build with spawn for better control
  const child = spawn(path.join(workspaceRoot, 'node_modules/.bin/nx'), ['run', 'styles:build', '--dev'], {
    cwd: workspaceRoot,
    stdio: 'ignore',
    detached: true,
  })

  // Track PID for future cancellations
  try {
    fs.writeFileSync(pidFile, String(child.pid))
  } catch {
    // Non-fatal; if we can't create it, we'll just skip PID tracking
  }

  child.on('close', code => {
    const endTime = process.hrtime.bigint()
    const elapsedMs = Number(endTime - startTime) / 1e6
    const elapsedSeconds = elapsedMs / 1000

    // Clean up PID file if it still points to this child
    try {
      if (fs.existsSync(pidFile)) {
        const currentPid = Number(fs.readFileSync(pidFile, 'utf8').trim())
        if (currentPid === child.pid) {
          fs.unlinkSync(pidFile)
        }
      }
    } catch {
      // Non-fatal; if we can't create it, we'll just skip PID tracking
    }

    if (code !== 0) {
      console.error(`Error rebuilding styles: process exited with code ${code}`)
      console.log(`⏱️ Rebuild failed after ${formatSeconds(elapsedSeconds)}`)
      return
    }

    console.log(`${grey('[  🎨   ]')}  compile styles finished ${grey(`in ${formatSeconds(elapsedSeconds)}`)}`)
  })
} else {
  console.log('No file changes detected')
}

console.log('')
