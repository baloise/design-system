const chalk = require('chalk')
const figlet = require('figlet')

const title = async text => {
  console.log(chalk.bold.underline.blue(text))
  console.log('')
}

const banner = async text => {
  return new Promise(resolve => {
    figlet(text, (err, data) => {
      if (err) {
        console.log(title(text))
      } else {
        console.log(chalk.blue(data))
      }
      console.log('')
      resolve()
    })
  })
}

const log = {
  error: (message, error) => {
    console.log('❌ ', chalk.red(message))
    if (error) {
      console.error(error)
    }
    return log
  },
  warn: (message, error) => {
    console.log('⚠️ ', chalk.yellow(message))
    if (error) {
      console.error(error)
    }
    return log
  },
  success: message => {
    console.log('✅ ', chalk.green(message))
    return log
  },
  list: message => {
    console.log(' ❯', chalk.blue(message))
    return log
  },
  info: message => {
    console.log(message)
    return log
  },
  break: () => {
    console.log('')
    return log
  },
}

module.exports = {
  banner,
  title,
  log,
}
