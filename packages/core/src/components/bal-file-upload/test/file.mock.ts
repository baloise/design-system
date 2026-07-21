export function MockFile(name: string, size: number, mimeType: string) {
  name = name || 'mock.txt'
  size = size || 1024
  mimeType = mimeType || 'plain/txt'

  function range(count: number) {
    let output = ''
    for (let i = 0; i < count; i++) {
      output += 'a'
    }
    return output
  }

  const blob: any = new Blob([range(size)], { type: mimeType })
  blob.lastModifiedDate = new Date()
  blob.name = name
  return blob as File
}
