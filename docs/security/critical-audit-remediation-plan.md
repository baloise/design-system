# Critical `npm audit` Remediation Plan (LTS)

> **Scope:** Resolve the **11 critical** `npm audit` findings only, one root cause at a time.
> **Package manager:** **npm** (this repo uses npm workspaces — not pnpm/yarn).
> **Strategy:** Prefer npm [`overrides`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides) and **stay within the current major** of every package. No major framework upgrades (no Angular 18→20, no nx 20→23). Overrides are acceptable for this LTS line.
> **Win-win note:** Most of these overrides also clear several `high`/`moderate` advisories on the same packages for free — that's a bonus, not a goal.

Audit baseline at time of writing: **184 total** — `critical: 11`, `high: 87`, `moderate: 82`, `low: 4`.

---

## Why 11 criticals collapse into 4 actions

Only **4** packages are _independently_ vulnerable. The other 7 critical entries are packages that are flagged critical **only because they depend on** a vulnerable package — fix the root and the dependents clear automatically.

| #   | Critical finding                | Independent?    | Root cause                               | Resolved by Step     |
| --- | ------------------------------- | --------------- | ---------------------------------------- | -------------------- |
| 1   | `handlebars`                    | ✅ own advisory | `handlebars`                             | **Step 1**           |
| 2   | `shell-quote`                   | ✅ own advisory | `shell-quote`                            | **Step 2**           |
| 3   | `koa`                           | ✅ own advisory | `koa`                                    | **Step 3**           |
| 4   | `@module-federation/dts-plugin` | ❌ inherits     | `koa`                                    | **Step 3** (cascade) |
| 5   | `@module-federation/manifest`   | ❌ inherits     | `dts-plugin` → `koa`                     | **Step 3** (cascade) |
| 6   | `@module-federation/rspack`     | ❌ inherits     | `dts-plugin`/`manifest` → `koa`          | **Step 3** (cascade) |
| 7   | `@module-federation/enhanced`   | ❌ inherits     | `dts-plugin`/`manifest`/`rspack` → `koa` | **Step 3** (cascade) |
| 8   | `@nx/module-federation`         | ❌ inherits     | `@module-federation/enhanced` → `koa`    | **Step 3** (cascade) |
| 9   | `vitest` (RCE)                  | ✅ own advisory | `vitest`                                 | **Step 4**           |
| 10  | `@vitest/ui`                    | ❌ inherits     | `vitest`                                 | **Step 4** (removed) |
| 11  | `@nx/vite`                      | ❌ inherits     | `vitest`                                 | **Step 4** (cascade) |

---

## Final state — what `package.json` looks like after all steps

Root `package.json`:

```jsonc
{
  "devDependencies": {
    // ...
    "vitest": "~1.6.1", // ⬆ from 1.3.1 (minor bump, see Step 4)
    // "@vitest/ui": "1.3.1"  // ❌ REMOVED (see Step 4)
  },
  "overrides": {
    "handlebars": "^4.7.9", // Step 1
    "shell-quote": "^1.8.4", // Step 2
    "koa": "^2.16.4", // Step 3
    "ws": "^8.21.0", // Step 3 (win-win, clears the `high` ws DoS in the same chain)
  },
}
```

`e2e/package.json`: bump `vitest` `~1.3.1` → `~1.6.1` (Step 4).
`packages/core/package.json`: remove the `test:ui` script (Step 4).

> `handlebars`, `shell-quote`, `koa`, `ws` are **transitive only** (not declared in any workspace), so they go in `overrides`. `vitest` **is** a direct devDependency, so it is bumped directly rather than overridden.

---

## Execution rules

1. Do **one step at a time**, in order.
2. After each step: `npm install` then re-audit and confirm the targeted critical(s) are gone:
   ```bash
   npm install
   npm audit --json | npx --no-install node -e "process.stdin.resume()" # or simply:
   npm audit
   ```
3. Sanity-check the build/tests for the affected area before moving on (`npm run build`, `npm run test`).
4. Commit per step so each fix is independently revertable.

---

## Step 1 — `handlebars` (1 critical)

| Field                 | Value                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **Dep to update**     | `handlebars`                                                                                          |
| **Current**           | `4.7.8`                                                                                               |
| **Target**            | `^4.7.9` (latest 4.x — **no major change**)                                                           |
| **Mechanism**         | root `overrides` (transitive dep)                                                                     |
| **Connected deps**    | None — standalone leaf. No dependent needs touching.                                                  |
| **Critical resolved** | AST Type Confusion JS injection (`GHSA`, range `<=4.7.8`)                                             |
| **Bonus (high/mod)**  | Also clears the `high` DoS/CLI-injection and `moderate` prototype-pollution advisories on handlebars. |

```jsonc
"overrides": { "handlebars": "^4.7.9" }
```

**Verify:** `npm audit | grep -A2 handlebars` → no critical.

---

## Step 2 — `shell-quote` (1 critical)

| Field                 | Value                                                                       |
| --------------------- | --------------------------------------------------------------------------- |
| **Dep to update**     | `shell-quote`                                                               |
| **Current**           | `1.8.3`                                                                     |
| **Target**            | `^1.8.4` (**no major change**)                                              |
| **Mechanism**         | root `overrides` (transitive dep)                                           |
| **Connected deps**    | None — standalone leaf.                                                     |
| **Critical resolved** | `quote()` does not escape newlines in object `.op` values (range `<=1.8.3`) |

```jsonc
"overrides": { "handlebars": "^4.7.9", "shell-quote": "^1.8.4" }
```

**Verify:** `npm audit | grep -A2 shell-quote` → no critical.

---

## Step 3 — `koa` (1 critical + 5 cascading criticals)

This is the high-value step: one override clears **6** of the 11 criticals.

| Field                                       | Value                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dep to update**                           | `koa`                                                                                                                                                                                                                                                                                                                                                                     |
| **Current**                                 | `2.15.3`                                                                                                                                                                                                                                                                                                                                                                  |
| **Target**                                  | `^2.16.4` (latest 2.x — **no major change**)                                                                                                                                                                                                                                                                                                                              |
| **Mechanism**                               | root `overrides` (transitive dep)                                                                                                                                                                                                                                                                                                                                         |
| **Critical resolved (direct)**              | Inefficient RegExp Complexity / ReDoS in koa (range `<2.15.4`)                                                                                                                                                                                                                                                                                                            |
| **Connected deps that clear automatically** | `@module-federation/dts-plugin` (depends on koa) → `@module-federation/manifest` (depends on dts-plugin) → `@module-federation/rspack` (depends on dts-plugin + manifest) → `@module-federation/enhanced` (depends on dts-plugin + manifest + rspack) → `@nx/module-federation` (depends on enhanced). **All inherit koa's critical — none need their own version bump.** |
| **Bonus (high/mod)**                        | Also clears koa's `high` host-header-injection and `moderate`/`low` open-redirect + `ctx.redirect()` XSS advisories.                                                                                                                                                                                                                                                      |

**Also bump `ws` in the same step (win-win):** the same `@module-federation/dts-plugin` chain pulls in a vulnerable `ws`. It is `high` (memory-exhaustion DoS), not critical, but it lives in the exact same dependency chain, so fix it now:

```jsonc
"overrides": {
  "handlebars": "^4.7.9",
  "shell-quote": "^1.8.4",
  "koa": "^2.16.4",
  "ws": "^8.21.0"
}
```

**Verify:**

```bash
npm audit | grep -E "koa|module-federation"
```

Expect: `koa`, `@module-federation/*` and `@nx/module-federation` no longer listed as **critical**.

> ⚠️ **Note:** `@nx/module-federation` may still appear with `high`/`moderate` advisories inherited from _other_ transitive deps (e.g. `webpack`). Those are **out of scope** (not critical) and are part of the broader nx/webpack `high` cluster. npm's auto-`fixAvailable` for this package suggests `@nx/react@23` (a major) — **do not** take that; the koa override is what removes the _critical_.

---

## Step 4 — `vitest` cluster (2 criticals fixed in audit + 1 mitigated)

| Field              | Value                                                                                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dep to update**  | `vitest` (direct devDep)                                                                                                                                                                                                                            |
| **Current**        | `1.3.1` (root + `e2e`)                                                                                                                                                                                                                              |
| **Target**         | `~1.6.1` (latest 1.x — **minor bump, no major, nx-20 compatible**)                                                                                                                                                                                  |
| **Mechanism**      | direct devDependency bump in `package.json` **and** `e2e/package.json`                                                                                                                                                                              |
| **Dep to remove**  | `@vitest/ui` (root devDep) + the `test:ui` script in `packages/core/package.json`                                                                                                                                                                   |
| **Connected deps** | `@vitest/ui` and `@nx/vite` are flagged critical **only because they depend on vulnerable `vitest`**. `@nx/vite@20.4.0` peer-requires `vitest@^1.3.1 \|\| ^2.0.0`, so `~1.6.1` is fully compatible — `@nx/vite` clears with no change to nx itself. |

**Criticals addressed:**

| Critical                                      | Range            | Action                          | Result                                    |
| --------------------------------------------- | ---------------- | ------------------------------- | ----------------------------------------- |
| Vitest RCE via malicious website + API server | `>=1.0.0 <1.6.1` | bump to `~1.6.1`                | ✅ **cleared in audit**                   |
| `@vitest/ui` arbitrary file read/exec         | needs `>=3.2.6`  | remove `@vitest/ui` + `test:ui` | ✅ **node removed** (attack surface gone) |
| `@nx/vite` (inherits vitest)                  | —                | cascade from vitest bump        | ✅ **cleared in audit**                   |

**Why not `vitest@3.2.6`?** The "UI server arbitrary file read/exec" advisory (`<3.2.6`) is filed against the `vitest` package itself, and `@vitest/ui` must match vitest's major. Reaching `3.2.6` would force `vitest 3` (and likely `vite 6`), which **breaks the `@nx/vite@20` peer range** and amounts to a major nx/vite upgrade — explicitly out of scope for this LTS line.

**Known, accepted residual:** After this step, `npm audit` will **still print one critical line for `vitest <3.2.6`** (the UI-server advisory), because audit is version-based, not config-aware. This is **not practically exploitable** here: the Vitest UI server cannot be started without `@vitest/ui`, which we removed along with the only script (`test:ui`) that launched it. **Full closure of this line is deferred to a future `vitest 3` / `nx 23` upgrade** (track as a separate, non-LTS task).

Changes:

```jsonc
// package.json (root)
"devDependencies": {
  "vitest": "~1.6.1"        // was 1.3.1
  // "@vitest/ui": "1.3.1"  // removed
}
```

```jsonc
// e2e/package.json
"vitest": "~1.6.1"          // was ~1.3.1
```

```jsonc
// packages/core/package.json  → remove:
// "test:ui": "vitest --ui"
```

**Verify:**

```bash
npm install
npm run test            # confirm vitest 1.6.x still runs the suites
npm audit | grep -E "vitest|@nx/vite"
```

Expect: `@vitest/ui` and `@nx/vite` gone; `vitest` shows **only** the residual `<3.2.6` line documented above.

---

## Expected outcome after all 4 steps

| Critical (baseline 11)        | After plan                                                                             |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| handlebars                    | ✅ resolved                                                                            |
| shell-quote                   | ✅ resolved                                                                            |
| koa                           | ✅ resolved                                                                            |
| @module-federation/dts-plugin | ✅ resolved (cascade)                                                                  |
| @module-federation/manifest   | ✅ resolved (cascade)                                                                  |
| @module-federation/rspack     | ✅ resolved (cascade)                                                                  |
| @module-federation/enhanced   | ✅ resolved (cascade)                                                                  |
| @nx/module-federation         | ✅ critical resolved (may retain non-critical)                                         |
| vitest (RCE)                  | ✅ resolved                                                                            |
| @vitest/ui                    | ✅ removed                                                                             |
| @nx/vite                      | ✅ resolved (cascade)                                                                  |
| vitest (UI-server `<3.2.6`)   | ⚠️ **1 residual line** — mitigated (UI removed), full fix deferred to vitest 3 / nx 23 |

**Net:** 10 of 11 criticals fully cleared in `npm audit`; the 11th is mitigated in practice with a documented deferral. **No major framework upgrades.** Several `high`/`moderate` advisories on koa, ws, handlebars and shell-quote are cleared as a bonus.

## Out of scope (not critical)

- The `high` Angular 18 cluster (`@angular/*`) — would require Angular 18→20 (major). Track separately.
- Residual `high`/`moderate` on the nx/webpack/esbuild/vite transitive tree.
- `@babel/plugin-transform-modules-systemjs` (`high`, non-`--force` fix available) — can be tackled later via `npm audit fix` without a major.
