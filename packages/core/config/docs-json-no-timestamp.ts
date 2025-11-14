import { JsonDocs, OutputTargetDocsJson } from '@stencil/core/internal'
import { writeFileSync } from 'fs'

/**
 * Custom output target that generates docs-json without timestamp and path information
 * This wraps the standard docs-json output and removes the timestamp field and all path-related properties
 */
export function docsJsonWithoutTimestamp(outputTarget: OutputTargetDocsJson): OutputTargetDocsJson {
  return {
    ...outputTarget,
    type: 'docs-custom',
    generator: async (docs: JsonDocs) => {
      // Remove timestamp from docs
      const { timestamp: _timestamp, ...docsWithoutTimestamp } = docs as any

      // Remove path-related properties from components
      if (docsWithoutTimestamp.components) {
        docsWithoutTimestamp.components = docsWithoutTimestamp.components.map((component: any) => {
          const {
            dirPath: _dirPath,
            filePath: _filePath,
            readmePath: _readmePath,
            usagesDir: _usagesDir,
            ...componentWithoutPaths
          } = component
          return componentWithoutPaths
        })
      }

      // Write the file without timestamp and paths
      const content = JSON.stringify(docsWithoutTimestamp, null, 2)
      writeFileSync(outputTarget.file, content, 'utf8')
    },
  } as any
}
