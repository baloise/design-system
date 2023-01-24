import { FileUploadRejectionReason } from '../bal-file-upload.type'
import { validateFileArray } from '../utils/file-validation.util'
import { MockFile } from './file.mock'

describe('bal-file-upload', () => {
  describe('file-validation.util', () => {
    const FileA = MockFile('file-a.png', 800, 'image/png')
    const FileB = MockFile('file-b.png', 1000, 'image/jpeg')

    test('Should add new File', () => {
      const { validFiles, invalidFiles } = validateFileArray([FileA], [FileB], {})

      expect(invalidFiles).toHaveLength(0)
      expect(validFiles).toHaveLength(1)
      expect(validFiles[0].name).toBe(FileB.name)
    })

    test('Should not add any files because it is empty', () => {
      const { validFiles, invalidFiles } = validateFileArray([FileA], [], {})

      expect(invalidFiles).toHaveLength(0)
      expect(validFiles).toHaveLength(0)
    })

    test('Should only accept type image/png', () => {
      const { validFiles, invalidFiles } = validateFileArray([], [FileA, FileB], {
        accept: 'image/png',
      })

      expect(validFiles).toHaveLength(1)
      expect(validFiles[0].name).toBe(FileA.name)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileB.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.BAD_EXTENSION)
    })

    test('Should only accept maxFileSize', () => {
      const { validFiles, invalidFiles } = validateFileArray([], [FileA, FileB], {
        maxFileSize: 900,
      })

      expect(validFiles).toHaveLength(1)
      expect(validFiles[0].name).toBe(FileA.name)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileB.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.FILE_TOO_BIG)
    })

    test('Should reject bundle size bigger than the config allows', () => {
      const { validFiles, invalidFiles } = validateFileArray([], [FileA, FileB], {
        maxBundleSize: 1200,
      })

      expect(validFiles).toHaveLength(1)
      expect(validFiles[0].name).toBe(FileA.name)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileB.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.FILE_SIZE_SUM_TOO_BIG)
    })

    test('Should reject the whole size bigger than the config allows', () => {
      const { validFiles, invalidFiles } = validateFileArray([FileA], [FileB], {
        maxBundleSize: 1200,
      })

      expect(validFiles).toHaveLength(0)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileB.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.FILE_SIZE_SUM_TOO_BIG)
    })

    test('Should allow the max bundle size', () => {
      const { validFiles, invalidFiles } = validateFileArray([], [FileA, FileB], {
        maxBundleSize: 1800,
      })

      expect(validFiles).toHaveLength(2)
      expect(validFiles[0].name).toBe(FileA.name)
      expect(validFiles[1].name).toBe(FileB.name)

      expect(invalidFiles).toHaveLength(0)
    })

    test('Should not add a file because max files is already reached', () => {
      const { validFiles, invalidFiles } = validateFileArray([FileA], [FileB], {
        maxFiles: 1,
      })

      expect(validFiles).toHaveLength(0)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileB.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.TOO_MANY_FILES)
    })

    test('Should not add more files than the max files', () => {
      const { validFiles, invalidFiles } = validateFileArray([], [FileA, FileB], {
        maxFiles: 1,
      })

      expect(validFiles).toHaveLength(1)
      expect(validFiles[0].name).toBe(FileA.name)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileB.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.TOO_MANY_FILES)
    })

    test('Should not add duplicated files', () => {
      const { validFiles, invalidFiles } = validateFileArray([FileA], [FileA], {})

      expect(validFiles).toHaveLength(0)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileA.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.DUPLICATED_FILE)
    })

    test('Should not add duplicated files but rest should be added', () => {
      const { validFiles, invalidFiles } = validateFileArray([FileA], [FileA, FileB], {})

      expect(validFiles).toHaveLength(1)
      expect(validFiles[0].name).toBe(FileB.name)

      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe(FileA.name)
      expect(invalidFiles[0].reasons).includes(FileUploadRejectionReason.DUPLICATED_FILE)
    })
  })
})
