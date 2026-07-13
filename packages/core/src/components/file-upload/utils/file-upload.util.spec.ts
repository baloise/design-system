import { describe, it, expect, beforeEach } from 'vitest'
import { toFileArray } from './file-list.util'
import { formatFileSize } from './file-size.util'
import { validateFileArray } from './file-validation.util'

describe('File List Utils', () => {
  describe('toFileArray', () => {
    it('should handle undefined FileList', () => {
      const result = toFileArray(undefined)
      expect(result).toEqual([])
    })

    it('should handle FileList array conversion', () => {
      const file1 = new File(['content1'], 'file1.txt', { type: 'text/plain' })
      const file2 = new File(['content2'], 'file2.txt', { type: 'text/plain' })
      // toFileArray uses Array.from which works with any iterable
      const mockFileList = [file1, file2] as any
      const result = toFileArray(mockFileList as FileList)

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('file1.txt')
    })
  })

  // toFileList uses DataTransfer which requires browser environment
  // Core validation tests below ensure the component works correctly
})

describe('File Size Utils', () => {
  describe('formatFileSize', () => {
    it('should format bytes', () => {
      expect(formatFileSize(100)).toBe('100 B')
      expect(formatFileSize(512)).toBe('512 B')
    })

    it('should format kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1.0 KB')
      expect(formatFileSize(1024 * 1.5)).toBe('1.5 KB')
      expect(formatFileSize(1024 * 500)).toBe('500.0 KB')
    })

    it('should format megabytes', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1.0 MB')
      expect(formatFileSize(1024 * 1024 * 2.5)).toBe('2.5 MB')
      expect(formatFileSize(1024 * 1024 * 100)).toBe('100.0 MB')
    })

    it('should format zero bytes', () => {
      expect(formatFileSize(0)).toBe('0 B')
    })

    it('should format boundary values', () => {
      expect(formatFileSize(1023)).toBe('1023 B')
      expect(formatFileSize(1024 * 1024 - 1)).toBe('1024.0 KB')
    })
  })
})

describe('File Validation Utils', () => {
  let testFile: File

  beforeEach(() => {
    testFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
  })

  describe('validateFileArray', () => {
    it('should validate file without constraints', () => {
      const result = validateFileArray([], [testFile], {})

      expect(result.validFiles).toHaveLength(1)
      expect(result.validFiles[0]).toBe(testFile)
      expect(result.invalidFiles).toHaveLength(0)
    })

    it('should reject file with bad extension', () => {
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' })
      const result = validateFileArray([], [file], {
        accept: 'image/png,image/jpeg',
      })

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(1)
      expect(result.invalidFiles[0].reasons).toContain('BAD_EXTENSION')
    })

    it('should accept file with correct extension', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })
      const result = validateFileArray([], [file], {
        accept: 'image/png,image/jpeg',
      })

      expect(result.validFiles).toHaveLength(1)
      expect(result.invalidFiles).toHaveLength(0)
    })

    it('should reject file that exceeds maxFileSize', () => {
      const result = validateFileArray([], [testFile], {
        maxFileSize: 1,
      })

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(1)
      expect(result.invalidFiles[0].reasons).toContain('FILE_TOO_BIG')
    })

    it('should accept file within maxFileSize', () => {
      const result = validateFileArray([], [testFile], {
        maxFileSize: 1000,
      })

      expect(result.validFiles).toHaveLength(1)
      expect(result.invalidFiles).toHaveLength(0)
    })

    it('should reject bundle that exceeds maxBundleSize', () => {
      const result = validateFileArray([testFile], [testFile], {
        maxBundleSize: testFile.size,
      })

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(1)
      expect(result.invalidFiles[0].reasons).toContain('FILE_SIZE_SUM_TOO_BIG')
    })

    it('should reject when exceeding maxFiles', () => {
      const result = validateFileArray([testFile], [testFile], {
        maxFiles: 1,
      })

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(1)
      expect(result.invalidFiles[0].reasons).toContain('TOO_MANY_FILES')
    })

    it('should reject duplicate files', () => {
      const result = validateFileArray([testFile], [testFile], {})

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(1)
      expect(result.invalidFiles[0].reasons).toContain('DUPLICATED_FILE')
    })

    it('should handle multiple validation failures', () => {
      const result = validateFileArray([testFile], [testFile], {
        maxFileSize: 1,
        maxFiles: 1,
      })

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(1)
      expect(result.invalidFiles[0].reasons.length).toBeGreaterThan(1)
    })

    it('should handle multiple files with mixed validity', () => {
      const validFile = new File(['test'], 'valid.png', { type: 'image/png' })
      const invalidFile = new File(['test'], 'invalid.pdf', { type: 'application/pdf' })

      const result = validateFileArray([], [validFile, invalidFile], {
        accept: 'image/png,image/jpeg',
      })

      expect(result.validFiles).toHaveLength(1)
      expect(result.invalidFiles).toHaveLength(1)
    })

    it('should accept files when constraints are undefined', () => {
      const result = validateFileArray([], [testFile], {
        accept: undefined,
        maxFileSize: undefined,
        maxBundleSize: undefined,
        maxFiles: undefined,
      })

      expect(result.validFiles).toHaveLength(1)
      expect(result.invalidFiles).toHaveLength(0)
    })

    it('should handle empty file array', () => {
      const result = validateFileArray([], [], {})

      expect(result.validFiles).toHaveLength(0)
      expect(result.invalidFiles).toHaveLength(0)
    })

    it('should preserve state when validating', () => {
      const stateFile = new File(['state'], 'state.txt', { type: 'text/plain' })
      const result = validateFileArray([stateFile], [testFile], {})

      expect(result.validFiles).toHaveLength(1)
      expect(result.validFiles[0]).toBe(testFile)
    })
  })
})
