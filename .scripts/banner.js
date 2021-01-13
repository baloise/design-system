const figlet = require('figlet')
const chalk = require('chalk')
const log = require('./log')

const banner = text => {
  return new Promise(resolve => {
    figlet(text, (err, data) => {
      if (err) {
        console.log(log.title(text))
      } else {
        console.log(chalk.blue(data))
      }
      resolve()
    })
  })
}

const run = async () => {
  const text = process.argv[2].split(':').join(' : ')

  try {
    await banner(text)
  } catch (error) {
    log.title(text)
  }

  log.break()
  return process.exit(0)
}

run()
