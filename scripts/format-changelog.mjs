/**
 * Format changelog — post-processes the top version block of CHANGELOG.md right after
 * `changeset version` runs. Renames the bump-level headers to their emoji equivalents,
 * splits `**deps**:`-scoped bullets out of Fixes into their own section, and appends a
 * deduped Thank You list built from `<!-- author:name -->` markers left by
 * `.changeset/my-changelog-config.js` (which are stripped from the final output).
 */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')
const changelogPath = resolve(workspaceRoot, 'CHANGELOG.md')

const HEADER_RENAMES = [
  ['### Major Changes', '### 💥 Breaking Change'],
  ['### Minor Changes', '### ✨ Features'],
  ['### Patch Changes', '### 🩹 Fixes'],
]

const SECTION_ORDER = ['### 💥 Breaking Change', '### ✨ Features', '### 🩹 Fixes', '### 🧱 Updated Dependencies']

const AUTHOR_MARKER_RE = /<!-- author:([^>]*?) -->/g

/**
 * Splits a section body into individual bullet entries. Bullets are separated by blank
 * lines and each starts with `- `; continuation lines are indented.
 */
function splitBullets(body) {
  return body
    .split(/\n(?=- )/)
    .map(entry => entry.trim())
    .filter(Boolean)
}

/**
 * Extracts sections (heading -> bullet list) from a version block, in the order found.
 */
function parseSections(block) {
  const sections = []
  const headingRe = /^### .+$/gm
  const headings = [...block.matchAll(headingRe)]

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i][0]
    const start = headings[i].index + heading.length
    const end = i + 1 < headings.length ? headings[i + 1].index : block.length
    const body = block.slice(start, end)
    sections.push({ heading, bullets: splitBullets(body) })
  }

  return sections
}

function formatVersionBlock(block) {
  let renamed = block
  for (const [from, to] of HEADER_RENAMES) {
    renamed = renamed.replaceAll(from, to)
  }

  const sections = parseSections(renamed)
  const bySection = new Map()
  for (const { heading, bullets } of sections) {
    bySection.set(heading, [...(bySection.get(heading) ?? []), ...bullets])
  }

  const fixes = bySection.get('### 🩹 Fixes') ?? []
  const deps = fixes.filter(bullet => bullet.replace(/^-\s*/, '').startsWith('**deps**:'))
  const remainingFixes = fixes.filter(bullet => !deps.includes(bullet))
  bySection.set('### 🩹 Fixes', remainingFixes)
  bySection.set('### 🧱 Updated Dependencies', [...(bySection.get('### 🧱 Updated Dependencies') ?? []), ...deps])

  const authors = new Set()
  for (const bullets of bySection.values()) {
    for (const bullet of bullets) {
      for (const match of bullet.matchAll(AUTHOR_MARKER_RE)) {
        if (match[1]) authors.add(match[1])
      }
    }
  }

  const stripMarkers = bullet => bullet.replace(AUTHOR_MARKER_RE, '').trimEnd()

  const preamble = block.slice(0, block.search(/^### /m) === -1 ? block.length : block.search(/^### /m))
  const parts = [preamble.trimEnd()]

  for (const heading of SECTION_ORDER) {
    const bullets = (bySection.get(heading) ?? []).map(stripMarkers)
    if (bullets.length === 0) continue
    parts.push(`${heading}\n\n${bullets.join('\n\n')}`)
  }

  if (authors.size > 0) {
    const thankYou = [...authors]
      .sort((a, b) => a.localeCompare(b))
      .map(name => `- [@${name}](https://github.com/${name})`)
    parts.push(`### ❤️ Thank You\n\n${thankYou.join('\n')}`)
  }

  return parts.join('\n\n') + '\n\n'
}

async function main() {
  const content = await readFile(changelogPath, 'utf-8')

  const firstHeadingMatch = content.match(/^## .+$/m)
  if (!firstHeadingMatch) {
    console.log('✔ No version block found in CHANGELOG.md, nothing to format')
    return
  }

  const blockStart = firstHeadingMatch.index
  const nextHeadingMatch = content.slice(blockStart + firstHeadingMatch[0].length).match(/^## .+$/m)
  const blockEnd = nextHeadingMatch ? blockStart + firstHeadingMatch[0].length + nextHeadingMatch.index : content.length

  const block = content.slice(blockStart, blockEnd)
  const formattedBlock = formatVersionBlock(block)

  const updated = content.slice(0, blockStart) + formattedBlock + content.slice(blockEnd)
  await writeFile(changelogPath, updated, 'utf-8')
  console.log('✔ Formatted CHANGELOG.md')
}

await main()
