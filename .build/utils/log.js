
const log = {
  title: text => {
    console.log('')
    console.log(text)
    return log
  },

  error: (message, error) => {
    console.log('❌ ', message)
    if (error) {
      console.error(error)
    }
    return log
  },

  warn: (message, error) => {
    console.log('⚠️ ', message)
    if (error) {
      console.error(error)
    }
    return log
  },

  success: message => {
    console.log('✅ ', message)
    return log
  },

  list: message => {
    console.log(' ❯', message)
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
