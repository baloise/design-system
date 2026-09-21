import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { run } from './cli'

const SKILL_DIR = 'ds-migrate-from-baloise'
const SKILL_RELATIVE_PATH = join('.claude', 'skills', SKILL_DIR)

let scratch: string | undefined

afterEach(() => {
  if (scratch) {
    rmSync(scratch, { recursive: true, force: true })
    scratch = undefined
  }
})

function createScratchDir() {
  scratch = mkdtempSync(join(tmpdir(), 'ds-skills-'))
  return scratch
}

function collectOutput() {
  let text = ''
  return {
    get text() {
      return text
    },
    write(chunk: string) {
      text += chunk
    },
  }
}

describe('ds-skills add', () => {
  it('copies the skill payload into .claude/skills, creating the parent folders', async () => {
    const cwd = createScratchDir()
    const stdout = collectOutput()
    const stderr = collectOutput()

    const code = await run(['add'], { cwd, stdout, stderr })

    expect(code).toBe(0)
    expect(stderr.text).toBe('')
    expect(stdout.text).toContain(join(cwd, SKILL_RELATIVE_PATH))

    const copiedSkill = readFileSync(join(cwd, SKILL_RELATIVE_PATH, 'SKILL.md'), 'utf8')
    expect(copiedSkill).toContain('Init')
    expect(copiedSkill).toContain('Components')
    expect(copiedSkill).toContain('CSS utils (coming soon)')
    expect(copiedSkill).toContain('Assets (coming soon)')
    expect(copiedSkill).toMatch(/never runs `git add`/i)
    expect(copiedSkill).toMatch(/git commit/i)
  })

  it('overwrites a previous copy on re-run', async () => {
    const cwd = createScratchDir()
    const dest = join(cwd, SKILL_RELATIVE_PATH)
    mkdirSync(dest, { recursive: true })
    writeFileSync(join(dest, 'SKILL.md'), 'stale payload\n')
    writeFileSync(join(dest, 'stale.txt'), 'should be replaced\n')

    const stdout = collectOutput()
    const stderr = collectOutput()
    const code = await run(['add'], { cwd, stdout, stderr })

    expect(code).toBe(0)
    expect(stderr.text).toBe('')
    expect(readFileSync(join(dest, 'SKILL.md'), 'utf8')).not.toContain('stale payload')
    expect(readFileSync(join(dest, 'SKILL.md'), 'utf8')).toContain('Init')
    expect(existsSync(join(dest, 'stale.txt'))).toBe(false)
  })

  it('prints usage and exits with 1 when the add command is missing', async () => {
    const cwd = createScratchDir()
    const stdout = collectOutput()
    const stderr = collectOutput()

    const code = await run([], { cwd, stdout, stderr })

    expect(code).toBe(1)
    expect(stderr.text).toMatch(/Usage: ds-skills add/)
  })

  it('prints usage and exits with 1 for an unknown command', async () => {
    const cwd = createScratchDir()
    const stdout = collectOutput()
    const stderr = collectOutput()

    const code = await run(['list'], { cwd, stdout, stderr })

    expect(code).toBe(1)
    expect(stderr.text).toMatch(/Usage: ds-skills add/)
  })
})
