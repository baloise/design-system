# 3. GitHub OAuth sign-in gates access; the bot PAT still does every write

## Status

Accepted. Refines the end-user auth decision in [`toky.md`](../../../toky.md)'s Auth &
permissions section, resolving points it left open (session strategy, gating
mechanism, preview-deployment behavior, denied UX) and one internal gap (the bot
PAT's documented repo-only scope can't satisfy the org-membership check it's also
meant to run).

## Context

`toky.md` already decided that end-user auth lives in Toky itself via Auth.js
(NextAuth) with the GitHub provider, and that GitHub writes always go through a
single bot user's PAT rather than a user's own token. Toky ships on Vercel. None of
this is built yet: `TOKY_GITHUB_TOKEN` is currently the only credential in the app,
used unauthenticated for every read and write, and `/api/propose-change` accepts a
free-text `description` with no identity attached to it at all.

The alternative — using each signed-in user's own OAuth token to perform the actual
write — was considered and rejected: it would make GitHub's own per-user permissions
the enforcement boundary instead of Toky's org-membership check, is a bigger
divergence from the already-documented bot-PAT model, and gains little since every
write is PR-mediated and reviewed regardless of which credential opened it.

## Decision

- **Sign-in** is Auth.js with the GitHub provider, default scopes only
  (`read:user`) — the user's token is used purely to establish identity, never for
  writes or the org check.
- **Writes** stay on the existing shared bot PAT (`TOKY_GITHUB_TOKEN`), per `toky.md`.
- **Authorization** is org membership in `baloise` (`GET
/orgs/{org}/members/{username}`), checked server-side. Rather than widening
  `TOKY_GITHUB_TOKEN` itself to also cover org-member read — undersold by `toky.md`'s
  "repo-only" framing, but still a broader single credential than necessary — this
  check uses its own token, `TOKY_GITHUB_ORG_TOKEN`: a fine-grained PAT scoped to the
  `baloise` org with only Organization permissions → Members (read-only), no repo
  access at all. A fine-grained PAT can only target one resource owner (a repo or an
  org), so this couldn't be folded into `TOKY_GITHUB_TOKEN` without reverting to a
  classic PAT carrying both `repo` and `read:org` — broader than either job needs on
  its own. `isOrgMember` (`src/tokens/github-org.ts`) falls back to
  `TOKY_GITHUB_TOKEN` when `TOKY_GITHUB_ORG_TOKEN` is unset, so a single classic PAT
  still works as a lighter-weight setup.
- **Sessions are JWT-based**; no database is introduced. Org membership is
  re-verified whenever Auth.js refreshes the JWT, bounding how long a since-removed
  member keeps access without adding a GitHub call to every request.
- **Attribution** in the PR title/body is read from the server-side session only —
  never from client-supplied request data, which `propose-change` currently trusts
  for everything.
- **A single `proxy.ts`** (Next.js's current name for what used to be the
  `middleware.ts` file convention — same mechanism, one file) gates every UI and API
  route, including `propose-change`, instead of per-route checks.
- **A new GitHub OAuth App** is registered for Toky, with its callback scoped to the
  production domain only.
- **Preview _deployments_ are blocked outright** — concretely, `VERCEL` is set (i.e.
  the app is running on Vercel at all) **and** `VERCEL_ENV !== 'production'` ⇒ 403,
  not merely left with broken sign-in. Neither var is set for local dev, so this
  guard leaves local runs untouched — it has to, since local is the only place the
  signed-in flow can still be exercised (see Consequences below); a bare
  `VERCEL_ENV !== 'production'` check would have caught local dev too, which isn't
  the intent. A GitHub OAuth App can't have a callback matching Vercel's per-branch
  preview URLs, and leaving previews open would otherwise be an unauthenticated
  write path to the real repo via the bot PAT.
- Someone who signs in but fails the org check lands on a dedicated "access denied"
  page, not a generic auth error.

## Consequences

- Reviewing UI changes on a preview deployment now requires running Toky locally —
  previews can't exercise the signed-in flow at all.
- Two credentials to provision and rotate instead of one (`TOKY_GITHUB_TOKEN` for
  writes, `TOKY_GITHUB_ORG_TOKEN` for the org check) — a deliberate trade for keeping
  each one narrowly scoped, rather than the single broader PAT `toky.md` originally
  assumed.
- Because writes never use the signed-in user's own token, GitHub's own
  per-repo/per-branch permissions are not the enforcement mechanism — Toky's org
  check is the sole gate, so it must not be allowed to drift out of sync with actual
  repo write access.
