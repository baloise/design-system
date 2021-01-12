const fs = require('fs')
const glob = require('glob')

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

module.exports = {
  read,
  write,
  scan,
}
