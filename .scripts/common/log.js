const chalk = require('chalk')
const figlet = require('figlet')

const banner = async title => {
  return new Promise(resolve => {
    figlet(title, (err, data) => {
      if (err) {
        console.log(title)
      } else {
        console.log(data)
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
  log,
}
