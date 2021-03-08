const fs = require('fs')
const fse = require('fs-extra')
const glob = require('glob')
const path = require('path')
const log = require('./log')

const read = async filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

const readSync = filePath => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    return null
  }
}

const write = async (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

const scan = async filePath => {
  return new Promise((resolve, reject) => {
    glob(filePath, (err, filterFilePaths) => {
      if (err) {
        return reject(err)
      }
      resolve(filterFilePaths)
    })
  })
}

const remove = async filePath => {
  try {
    const filterFilePaths = await scan(filePath)
    for (let index = 0; index < filterFilePaths.length; index++) {
      await fse.remove(filterFilePaths[index])
    }
  } catch (error) {
    log.error(`Could not save ${filePath}`, error)
    setTimeout(() => process.exit(1), 0)
  }
}

const save = async (filePath, content) => {
  try {
    await write(filePath, content)
    log.success(`Successfully updated ${path.basename(filePath)}`)
  } catch (error) {
    log.error(`Could not save ${filePath}`, error)
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

const empty = async dir => {
  return new Promise(async resolve => {
    try {
      await fse.emptyDir(dir)
      resolve()
    } catch (err) {
      log.error(`Could not empty ${dir}`, error)
      setTimeout(() => process.exit(1), 0)
    }
  })
}

const copy = async (srcDir, destDir) => {
  return new Promise(async resolve => {
    try {
      await fse.copy(srcDir, destDir)
      resolve()
    } catch (error) {
      log.error(`Could not copy ${srcDir} to ${destDir}`, error)
      setTimeout(() => process.exit(1), 0)
    }
  })
}

module.exports = {
  readSync,
  read,
  write,
  scan,
  save,
  makeDir,
  copy,
  empty,
  remove,
}
