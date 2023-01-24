export const toFileArray = (list: FileList): File[] => {
  return Array.from(list)
}

export const toFileList = (files: File[]): FileList => {
  class MyFileList {
    get length() {
      return files.length
    }
  }

  Object.setPrototypeOf(MyFileList.prototype, FileList.prototype)

  const myFileList = new MyFileList() as any

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    myFileList[index] = file
  }

  return myFileList as FileList
}
