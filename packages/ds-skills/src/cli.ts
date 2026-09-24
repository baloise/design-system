#!/usr/bin/env node
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PACKAGE_NAME = '@helvetia/ds-skills'
const SKILL_NAME = 'ds-migrate-from-baloise'
const USAGE = 'Usage: ds-skills add\n'

export type CliIo = {
  cwd: string
  stdout: { write(chunk: string): void }
  stderr: { write(chunk: string): void }
}

function findPackageRoot(startDir: string): string {
  let dir = startDir
  while (true) {
    const pkgPath = join(dir, 'package.json')
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { name?: string }
      if (pkg.name === PACKAGE_NAME) {
        return dir
      }
    }
    const parent = dirname(dir)
    if (parent === dir) {
      throw new Error(`Could not locate the ${PACKAGE_NAME} package root`)
    }
    dir = parent
  }
}

export async function run(
  argv: string[],
  io: CliIo = { cwd: process.cwd(), stdout: process.stdout, stderr: process.stderr },
): Promise<number> {
  if (argv.length !== 1 || argv[0] !== 'add') {
    io.stderr.write(USAGE)
    return 1
  }

  const packageRoot = findPackageRoot(dirname(fileURLToPath(import.meta.url)))
  const source = join(packageRoot, 'skills', SKILL_NAME)
  const destination = join(io.cwd, '.claude', 'skills', SKILL_NAME)

  if (!existsSync(source)) {
    io.stderr.write(`Skill payload not found at ${source}\n`)
    return 1
  }

  await mkdir(dirname(destination), { recursive: true })
  await rm(destination, { recursive: true, force: true })
  await cp(source, destination, { recursive: true, force: true })

  io.stdout.write(`Copied ${SKILL_NAME} to ${destination}\n`)
  return 0
}

function isMainModule(): boolean {
  const entry = process.argv[1]
  if (!entry) {
    return false
  }
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(resolve(entry))
  } catch {
    return pathToFileURL(resolve(entry)).href === import.meta.url
  }
}

if (isMainModule()) {
  run(process.argv.slice(2))
    .then(code => process.exit(code))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
