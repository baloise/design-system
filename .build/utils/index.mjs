import { spawn } from 'node:child_process'

export const exec = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    let outputError = []
    let output = []

    child.on('error', (error) => reject(error.message));
    child.on('exit', (code) => {
      if(code > 0){
        reject([
          ...output,
          '--------------------------------------',
          ...outputError
        ].join('\n'))
      }else {
        resolve(code)
      }
    });

    child.stdout.on('data', (data) => {
      output.push(`${data}`.trimEnd())
    });

    child.stderr.on('data', (data) => {
      outputError.push(`${data}`.trimEnd())
    });
  })
}

export const exit = () => process.exit(1);
export const done = () => process.exit(0);

export const log = (message, ...args) => console.log(message, ...args);
export const start = message => log('⏳ ', `${message}...`)
export const succeed = message => log('✅ ', message)
export const fail = (message, error) => {
  log('❌ ', message)
  if (error) {
    console.error(error)
  }
  exit()
}

export const logger = (subject) => {
  let startTime = new Date()

  return {
    info: (message, ...args) => {
      console.log(message || '', ...args)
    },
    start: message => {
      startTime = new Date()
      log('⏳ ', `${subject} \x1b[90mstarted ...\x1b[0m`, message || '')
    },
    succeed: message => {
      const endTime = new Date()
      const duration = endTime - startTime
      const seconds = parseFloat(duration / 1000).toFixed(2)
      log('✅ ', `\x1b[32m${subject} \x1b[90mfinished in ${seconds}sec\x1b[0m`, message || '')
    },
    fail: (message, ...args) => {
      const endTime = new Date()
      const duration = endTime - startTime
      const seconds = parseFloat(duration / 1000).toFixed(2)
      log('❌ ', `\x1b[31m${subject} \x1b[90mfailed after ${seconds}sec\x1b[0m`)
      if (message) {
        console.error(message)
      }
      exit()
    }
  }
}
