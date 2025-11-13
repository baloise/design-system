import { JsonDocs, OutputTargetDocsJson } from '@stencil/core/internal'
import { writeFileSync } from 'fs'

/**
 * Custom output target that generates docs-json without timestamp
 * This wraps the standard docs-json output and removes the timestamp field
 */
export function docsJsonWithoutTimestamp(outputTarget: OutputTargetDocsJson): OutputTargetDocsJson {
  return {
    ...outputTarget,
    type: 'docs-custom',
    generator: async (docs: JsonDocs) => {
      // Remove timestamp from docs
      const { timestamp: _timestamp, ...docsWithoutTimestamp } = docs as any

      // Write the file without timestamp
      const content = JSON.stringify(docsWithoutTimestamp, null, 2)
      writeFileSync(outputTarget.file, content, 'utf8')
    },
  } as any
}
