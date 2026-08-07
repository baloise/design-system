import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { commitFilesLocally, isGitRepo } from '../lib/local-git.mjs'

let repoRoot: string

beforeEach(() => {
  repoRoot = mkdtempSync(join(tmpdir(), 'figma-sync-local-git-test-'))
})

afterEach(() => {
  rmSync(repoRoot, { recursive: true, force: true })
})

describe('isGitRepo', () => {
  it('is false for a plain directory', () => {
    expect(isGitRepo(repoRoot)).toBe(false)
  })

  it('is true once the directory has been git-initialized', () => {
    execFileSync('git', ['init', '-q'], { cwd: repoRoot })
    expect(isGitRepo(repoRoot)).toBe(true)
  })
})

describe('commitFilesLocally', () => {
  beforeEach(() => {
    execFileSync('git', ['init', '-q'], { cwd: repoRoot })
    execFileSync('git', ['config', 'user.email', 'test@local'], { cwd: repoRoot })
    execFileSync('git', ['config', 'user.name', 'local-test'], { cwd: repoRoot })
  })

  it('throws a clear error against a directory that is not a git repo, rather than a raw git CLI error', () => {
    const notARepo = mkdtempSync(join(tmpdir(), 'figma-sync-not-a-repo-'))
    try {
      expect(() =>
        commitFilesLocally({ repoRoot: notARepo, files: [{ path: 'a.txt', content: 'x' }], message: 'test' }),
      ).toThrow(/not a git working tree/)
    } finally {
      rmSync(notARepo, { recursive: true, force: true })
    }
  })

  it('writes every file to disk and commits them in one real commit', () => {
    const result = commitFilesLocally({
      repoRoot,
      files: [
        { path: 'a.json', content: '{"a":1}\n' },
        { path: 'b.json', content: '{"b":2}\n' },
      ],
      message: 'test commit',
    })

    expect(result.sha).toMatch(/^[0-9a-f]{40}$/)
    expect(readFileSync(join(repoRoot, 'a.json'), 'utf-8')).toBe('{"a":1}\n')
    expect(readFileSync(join(repoRoot, 'b.json'), 'utf-8')).toBe('{"b":2}\n')

    const log = execFileSync('git', ['log', '--oneline', '-1'], { cwd: repoRoot, encoding: 'utf-8' })
    expect(log).toContain('test commit')
  })

  it('a second commit only touches the file it wrote, leaving the other untouched in history', () => {
    commitFilesLocally({ repoRoot, files: [{ path: 'a.json', content: '{"a":1}\n' }], message: 'first' })
    commitFilesLocally({ repoRoot, files: [{ path: 'a.json', content: '{"a":2}\n' }], message: 'second' })

    expect(readFileSync(join(repoRoot, 'a.json'), 'utf-8')).toBe('{"a":2}\n')
    const log = execFileSync('git', ['log', '--oneline'], { cwd: repoRoot, encoding: 'utf-8' })
    expect(log.trim().split('\n')).toHaveLength(2)
  })
})
