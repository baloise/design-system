const fs = require('fs')
const glob = require('glob')
const { printNotFound, printError } = require('./log.util')

const readFile = (filepath, showError = true) => {
    try {
        return fs.readFileSync(filepath, 'utf8')
    } catch (err) {
        if (showError) {
            printNotFound(filepath)
        }
        return null
    }
}

const forEachComponent = (files, done) => files.forEach(f => done(f))

const findComponents = (done) =>
    glob('www/components/**/readme.md', {}, (err, files) => err
        ? printError('Could not find any components', err)
        : done(files))

const writeFile = (filepath, content) => {
    try {
        fs.writeFileSync(filepath, content)
        return null
    } catch (err) {
        printError(`Could not write file "${filepath}"`, err)
        return err
    }
}

module.exports = {
    readFile,
    writeFile,
    findComponents,
    forEachComponent,
}
