import { spawn } from 'node:child_process'

export const exec = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    child.on('close', (code) => resolve(code));
    child.on('error', (error) => reject(error.message));

    // child.stdout.on('data', (data) => {
    //   // console.log(`${data}`.trimEnd());
    // });

    // child.stderr.on('data', (data) => {
    //   // console.error(`${data}`.trimEnd());
    // });
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
