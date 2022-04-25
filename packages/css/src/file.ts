import { writeFile, mkdir } from 'fs'
import { dirname } from 'path'

export const write = async (filePath: string, data: any) => {
  return new Promise<void>((resolve, reject) => {
    mkdir(dirname(filePath), { recursive: true }, mkdirError => {
      if (mkdirError) {
        return reject(mkdirError)
      }

      writeFile(filePath, data, err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}
