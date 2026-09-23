#!/usr/bin/env node
import { execFile } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs'
import { extname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const SCOPE = '@baloise'
const SHORT_NAMES = ['angular', 'core', 'react', 'styles']
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage'])
const LOCKFILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'npm-shrinkwrap.json'])
const IMPORT_EXTENSIONS = new Set([
  '.html',
  '.htm',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.scss',
  '.sass',
  '.vue',
  '.json',
])
const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']
const NOTHING = 'no Baloise Design System installation detected, nothing to migrate'

function packageName(short) {
  return `${SCOPE}/ds-${short}`
}

const MISSING_NEXT = `npm view ${packageName('core')} dist-tags did not include a next tag`

const execFileAsync = promisify(execFile)
const PACKAGE_RE = new RegExp(`${SCOPE}/ds-(?:${SHORT_NAMES.join('|')})\\b`)

export async function readNpmDistTags(execImpl = execFileAsync) {
  const { stdout } = await execImpl('npm', ['view', packageName('core'), 'dist-tags', '--json'], { encoding: 'utf8' })
  const parsed = JSON.parse(stdout)
  return typeof parsed === 'string' ? JSON.parse(parsed) : parsed
}

export async function detectBaloise(rootDir, options = {}) {
  const found = scan(rootDir)
  if (!found) {
    return { status: 'nothing-to-migrate', message: NOTHING }
  }

  const readDistTags = options.readDistTags ?? readNpmDistTags
  const distTags = await readDistTags()
  const version = typeof distTags?.next === 'string' ? distTags.next : ''
  if (!version) {
    return { status: 'error', message: MISSING_NEXT }
  }

  const framework = detectFramework(found.manifest)
  const packageManager = detectPackageManager(rootDir)
  return {
    status: 'ready',
    packageManager,
    installCommand: installCommand(packageManager),
    framework,
    packageJsonPath: found.packageJsonPath,
    dependencies: found.dependencies,
    imports: found.imports,
    version,
    aliases: aliasesFor(framework, version),
  }
}

export async function run(rootDir, stdout, options = {}) {
  const result = await detectBaloise(rootDir, options)
  stdout.write(`${JSON.stringify(result, null, 2)}\n`)
  return result.status === 'error' ? 1 : 0
}

function installCommand(packageManager) {
  if (packageManager === 'pnpm') return 'pnpm install'
  if (packageManager === 'yarn') return 'yarn install'
  return 'npm install'
}

function detectPackageManager(rootDir) {
  if (existsSync(join(rootDir, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(rootDir, 'yarn.lock'))) return 'yarn'
  if (existsSync(join(rootDir, 'package-lock.json'))) return 'npm'
  return 'npm'
}

function detectFramework(manifest) {
  const names = new Set(dependencyNames(manifest))
  if (names.has('@angular/core')) return 'angular'
  if (names.has('react') || names.has('react-dom')) return 'react'
  return 'html'
}

function aliasesFor(framework, version) {
  const alias = short => `npm:${packageName(short)}@${version}`
  if (framework === 'react') {
    return {
      '@helvetia/ds-react': alias('react'),
      '@helvetia/ds-styles': alias('styles'),
    }
  }
  if (framework === 'angular') {
    return {
      '@helvetia/ds-angular': alias('angular'),
      '@helvetia/ds-styles': alias('styles'),
    }
  }
  return {
    '@helvetia/ds-core': alias('core'),
    '@helvetia/ds-styles': alias('styles'),
  }
}

function dependencyNames(manifest) {
  const names = []
  for (const field of DEPENDENCY_FIELDS) {
    const block = manifest?.[field]
    if (block && typeof block === 'object') names.push(...Object.keys(block))
  }
  return names
}

function baloiseDependencies(manifest) {
  return [...new Set(dependencyNames(manifest).filter(name => PACKAGE_RE.test(name)))].sort()
}

function scan(rootDir) {
  const packages = []
  const imports = []
  walk(rootDir, rootDir, packages, imports)
  if (packages.length === 0 || imports.length === 0) return null

  packages.sort(
    (a, b) => a.packageJsonPath.length - b.packageJsonPath.length || a.packageJsonPath.localeCompare(b.packageJsonPath),
  )
  imports.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
  const chosen = packages[0]
  return {
    manifest: chosen.manifest,
    packageJsonPath: chosen.packageJsonPath,
    dependencies: chosen.dependencies,
    imports,
  }
}

function walk(rootDir, dir, packages, imports) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(rootDir, join(dir, entry.name), packages, imports)
      continue
    }
    if (!entry.isFile()) continue

    const filePath = join(dir, entry.name)
    if (entry.name === 'package.json') {
      const manifest = readJson(filePath)
      const dependencies = manifest ? baloiseDependencies(manifest) : []
      if (dependencies.length > 0) {
        packages.push({ manifest, packageJsonPath: toPosix(rootDir, filePath), dependencies })
      }
      continue
    }
    if (LOCKFILES.has(entry.name) || !IMPORT_EXTENSIONS.has(extname(entry.name))) continue
    collectImports(rootDir, filePath, imports)
  }
}

function collectImports(rootDir, filePath, imports) {
  let text
  try {
    text = readFileSync(filePath, 'utf8')
  } catch {
    return
  }
  const lines = text.split(/\r?\n/)
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    if (isIgnorableLine(line) || !PACKAGE_RE.test(line)) continue
    const snippet = line.trim().slice(0, 240)
    imports.push({
      file: toPosix(rootDir, filePath),
      line: index + 1,
      snippet,
      kind: kindOf(line),
    })
  }
}

function kindOf(line) {
  if (/<link\b/i.test(line) || /<script\b/i.test(line)) return 'bootstrap'
  if (/@import\b/.test(line) || /@use\b/.test(line)) return 'bootstrap'
  if (new RegExp(`import\\s+['"]${SCOPE}/ds-(?:core|styles)\\b`).test(line)) return 'bootstrap'
  if (new RegExp(`node_modules/${SCOPE}/ds-(?:styles|core)\\b`).test(line)) return 'bootstrap'
  return 'reference'
}

function isIgnorableLine(line) {
  const trimmed = line.trim()
  return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('<!--')
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'))
  } catch {
    return null
  }
}

function toPosix(rootDir, filePath) {
  return relative(rootDir, filePath).split(sep).join('/')
}

function isMainModule() {
  const entry = process.argv[1]
  if (!entry) return false
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(resolve(entry))
  } catch {
    return pathToFileURL(resolve(entry)).href === import.meta.url
  }
}

if (isMainModule()) {
  const root = process.argv[2] ? resolve(process.argv[2]) : process.cwd()
  run(root, process.stdout)
    .then(code => process.exit(code))
    .catch(error => {
      process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
      process.exit(1)
    })
}
