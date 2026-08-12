/**
 * Local-git equivalent of lib/github.mjs's commitFiles — for testing
 * backfill-commit.mjs's patch/baseline logic end-to-end with a real `git
 * commit`, against a disposable local repo, with no GitHub API call and no
 * credentials at all. Selected by TOKENS_DIR_OVERRIDE
 * (docs/plans/figma-sync-action-plan.md's local-testing convention,
 * shared with pull.mjs) pointing at a `tokens/` directory inside a git
 * working tree — never used in figma-sync.yml.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf-8' }).trim()
}

export function isGitRepo(dir) {
  try {
    git(['rev-parse', '--is-inside-work-tree'], dir)
    return true
  } catch {
    return false
  }
}

/**
 * @param {object} params
 * @param {string} params.repoRoot the git working tree root
 * @param {{ path: string, content: string }[]} params.files paths relative to repoRoot
 * @param {string} params.message
 */
export function commitFilesLocally({ repoRoot, files, message }) {
  if (!isGitRepo(repoRoot)) {
    throw new Error(
      `${repoRoot} is not a git working tree — run "git init" there first (see docs on TOKENS_DIR_OVERRIDE local testing).`,
    )
  }

  for (const file of files) {
    writeFileSync(resolve(repoRoot, file.path), file.content)
  }

  git(['add', ...files.map(f => f.path)], repoRoot)
  git(['commit', '-m', message], repoRoot)
  const sha = git(['rev-parse', 'HEAD'], repoRoot)

  return { sha }
}

/** Path relative to the git repo root, for a file addressed relative to some other directory (e.g. tokensDir). */
export function relativeToRepoRoot(repoRoot, fromDir, fileName) {
  return relative(repoRoot, resolve(fromDir, fileName))
}
