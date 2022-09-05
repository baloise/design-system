const chalk = require('chalk')

const log = {
  title: text => {
    console.log('')
    console.log(chalk.bold.underline.blue(text))
    return log
  },

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

module.exports = log
