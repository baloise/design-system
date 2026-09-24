# Repo Move: `next` → helvetia-design/design-system

## Context

Today everything lives in `baloise/design-system` (public, active):
- `main` — the historical/production branch, currently without live CI.
- `next` — the active development branch, full history, extensive `.github/workflows/`.
- ~130 other branches (feature/dependabot/release branches), tags `v10`–`v18`, a `production` branch.
- 39 open issues, 7 open milestones, 30 labels.
- Packages published as `@baloise/ds-*` to npm; `homepage`/security-advisory links point at `baloise.dev`.

The `helvetia-design` GitHub org exists (created 2026-09-21) and is currently empty. The acting user (`hirsch88`) has admin rights on both `baloise/design-system` and the `helvetia-design` org.

## Goal — end state

Two permanently separate repos:
- **`baloise/design-system`** — keeps `main` as its own independent repo/history. Untouched in phase 1; in phase 2 (separate, later effort) `main`'s CI is restored so it's canonical again within this repo. No rename of the branch itself — "main becomes the master" is a role change, not a `git branch -m`.
- **`helvetia-design/design-system`** — new public repo, becomes home for `next` and all future active development.

No merge/consolidation of the two repos is planned. No npm scope or branding change is part of this move — `@baloise/ds-*` package names and `baloise.dev` links stay as-is.

## Phase 1 — move `next`

### Scope decisions
- **What moves:** only `next` and any git tags reachable from its history. The ~130 other stale/feature/dependabot branches and the `production` branch are *not* mirrored — abandoned in place.
- **Mechanism:** push-mirror, not a GitHub repo transfer. A brand-new empty repo is created at `helvetia-design/design-system`; `next`'s full history is pushed into it as the default branch. `baloise/design-system` (and `main`) is never touched by a transfer operation.
- **CI:** `.github/workflows/*` files travel with the code (they're part of `next`'s history) but stay dormant in phase 1 — no secrets/environments/branch protection configured for them yet, so nothing runs. Wiring them up is phase 2+ work.
- **Access:** only the acting user gets write access to the new repo initially; team/org access is added after the migration is validated.

### Steps
1. **Freeze `next` in the old repo** — add branch protection on `baloise/design-system:next` blocking new pushes, so the snapshot we mirror is final. Confirm no in-flight pushes before proceeding.
2. **Create the new repo** — `gh repo create helvetia-design/design-system --public` (empty, no auto-init).
3. **Push-mirror** — push `next`'s full history and reachable tags into the new repo; set `next` as its default branch.
   ```
   git remote add helvetia-design git@github.com:helvetia-design/design-system.git
   git push helvetia-design next:next
   git push helvetia-design --tags   # only tags reachable from next
   gh repo edit helvetia-design/design-system --default-branch next
   ```
4. **Replicate labels** — copy all 30 labels (name/color/description) from `baloise/design-system` into the new repo.
5. **Replicate open milestones** — recreate the 7 open milestones (title/description/due date) in the new repo, so issue transfers can reattach to them.
6. **Transfer open issues** — use `gh issue transfer <number> helvetia-design/design-system` for all 39 open issues. This preserves comments/reactions and leaves an automatic redirect at the old URL (no manual copy/close script needed). Labels/milestones only carry over if a same-named one already exists in the destination — hence step 4/5 must run first.
7. **Close open PRs targeting `next`** in the old repo, each with a comment explaining the move and asking the author to push their branch to the new remote and open a fresh PR there (PRs can't be transferred via API).
8. **Leave `next` frozen** in the old repo (branch protection stays in place) as a read-only historical pointer — not deleted.

### Explicitly out of scope for phase 1
- Renaming/rebranding npm packages or domain references.
- Wiring up CI secrets/environments in the new repo.
- Replicating stale branches, dependabot branches, or version tags not reachable from `next`.
- Any change to `baloise/design-system:main`.
- Adding team/org-wide collaborators to the new repo.

## Phase 2 — restore `main` as canonical (separate, later effort)

Scope not yet detailed. Known constraints going in:
- `main` stays in `baloise/design-system`; no rename to a literal `master` branch.
- Goal is to reinstate `main`'s CI/tooling so it's the canonical/production branch again within its existing repo — not a merge with `helvetia-design/design-system`.
