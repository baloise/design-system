# ds-token-lint Skill

## Overview

Checks a component's Component-layer design tokens (`🧩 Component > <ComponentName>` in `packages/tokens/tokens/Base.tokens.json`) against the design system's real naming convention, reports violations as a markdown table for review, and — once approved — renames the tokens in `Base.tokens.json`, updates every `var()` reference in SCSS, and recompiles the token outputs.

Built via a `/grilling` session (see git history) that checked the intended rule checklist against the actual compiled tokens before writing any code. That check found STYLE_GUIDE.md's documented segment order (`variant` before `category`) doesn't match what's actually shipped (`category` before `variant`, universally) — see [REFERENCE.md](REFERENCE.md) for the full finding and which rules survived vs. were dropped as a result.

## Files

- **SKILL.md** — user-facing skill documentation: quick start, workflow, what's checked and why
- **REFERENCE.md** — the empirical findings behind the rule checklist, and implementation notes per rule
- **index.js** — CLI entry point (`<component>` for check, `<component> --apply` to write approved fixes)
- **implementation.js** — core logic: token tree traversal, name derivation, rule checks, JSON rewriting, SCSS reference updates

## Usage

```bash
node .claude/skills/ds-token-lint/index.js button
node .claude/skills/ds-token-lint/index.js button --apply
```

Claude drives this as a two-phase flow:

1. **Check** — run without `--apply`, show the resulting markdown table to the user, ask for approval (whole-batch, since renames are breaking changes)
2. **Apply** — only after explicit approval, run with `--apply`, then invoke the `ds-changeset` skill (bump: `major`) to record the breaking change

## Scope (v1)

- Component-layer tokens only — not Alias/Global usage in SCSS (that's `ds-lint-component`'s job)
- `Base.tokens.json` only — brand override files (`Tcs.tokens.json`) are not scanned
- Single component per run — no `--all` mode
- Whole-batch approval — no per-row selection

See [SKILL.md](SKILL.md) for the full rule checklist and [REFERENCE.md](REFERENCE.md) for why it looks the way it does.

## Important Notes

**No backup file.** Unlike `ds-create-token`, this skill doesn't write a `.bak` copy of `Base.tokens.json` before editing — per CLAUDE.md, changes are always left unstaged for the user to review via `git diff`, which is the safety net.

**Never commits.** Per CLAUDE.md, this skill never stages or commits changes — that's left to the user.
