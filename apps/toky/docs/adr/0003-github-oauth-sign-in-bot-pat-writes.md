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
- **Writes** stay on the existing shared bot PAT, per `toky.md`.
- **Authorization** is org membership in `baloise` (`GET
/orgs/{org}/members/{username}`), checked server-side with the bot PAT. The PAT's
  scope is widened to include org-member read — `toky.md`'s "repo-only" framing
  undersold what it actually needs.
- **Sessions are JWT-based**; no database is introduced. Org membership is
  re-verified whenever Auth.js refreshes the JWT, bounding how long a since-removed
  member keeps access without adding a GitHub call to every request.
- **Attribution** in the PR title/body is read from the server-side session only —
  never from client-supplied request data, which `propose-change` currently trusts
  for everything.
- **A single `middleware.ts`** gates every UI and API route, including
  `propose-change`, instead of per-route checks.
- **A new GitHub OAuth App** is registered for Toky, with its callback scoped to the
  production domain only.
- **Preview deployments are blocked outright** (`VERCEL_ENV !== 'production'` ⇒
  403), not merely left with broken sign-in — a GitHub OAuth App can't have a
  callback matching Vercel's per-branch preview URLs, and leaving previews open
  would otherwise be an unauthenticated write path to the real repo via the bot PAT.
- Someone who signs in but fails the org check lands on a dedicated "access denied"
  page, not a generic auth error.

## Consequences

- Reviewing UI changes on a preview deployment now requires running Toky locally —
  previews can't exercise the signed-in flow at all.
- The bot PAT is a slightly broader credential than `toky.md` originally described
  (repo write + org-member read, not repo-only), which should be reflected when the
  dedicated bot user/fine-grained PAT is actually provisioned.
- Because writes never use the signed-in user's own token, GitHub's own
  per-repo/per-branch permissions are not the enforcement mechanism — Toky's org
  check is the sole gate, so it must not be allowed to drift out of sync with actual
  repo write access.
