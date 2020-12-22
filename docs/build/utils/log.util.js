const chalk = require('chalk')

const banner = (title) => {
    console.log('📘 ', title)
    console.log(' ')
}

const printError = (message, error) => {
    console.log('❌ ', chalk.red(message))
    if (error) {
        console.error(error)
    }
}

const printWarning = (message, error) => {
    console.log('🚨 ', chalk.yellow(message))
}

const printSuccess = (filepath) => {
    if (filepath.indexOf('/components/') >= 0) {
        console.log('✅ ', chalk.green(filepath.split('/components/')[1]) + ' => is updated')
    } else {
        console.log('✅ ', chalk.green(filepath) + ' => is updated')
    }
}

const printNotFound = (filepath) => {
    console.log('🔍 ', chalk.blue(filepath) + ' => Please create a index.html file with some examples')
}

module.exports = {
    banner,
    printError,
    printWarning,
    printSuccess,
    printNotFound,
}
