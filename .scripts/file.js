const fs = require('fs')
const glob = require('glob')
const log = require('./log')

const read = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

const readSync = path => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    return null
  }
}

const write = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

const scan = async path => {
  return new Promise((resolve, reject) => {
    glob(path, (err, filterFilePaths) => {
      if (err) {
        return reject(err)
      }
      resolve(filterFilePaths)
    })
  })
}

const save = async (filePath, content) => {
  try {
    await write(filePath, content)
    log.success(`Successfully updated ${filePath}`)
  } catch (error) {
    log.error(`Could not update ${filePath}`, error)
    setTimeout(() => process.exit(1), 0)
  }
}

const makeDir = async dirPath => {
  return new Promise(resolve => {
    fs.mkdir(dirPath, { recursive: true }, error => {
      if (error) {
        log.error(`Could not update ${filePath}`, error)
        setTimeout(() => process.exit(1), 0)
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  readSync,
  read,
  write,
  scan,
  save,
  makeDir,
}
