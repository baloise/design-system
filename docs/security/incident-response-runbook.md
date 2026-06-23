# Incident Response Runbook — Exploited Vulnerability

**Audience:** On-call maintainer / security lead  
**Trigger:** A vulnerability in a published version of the Baloise Design System is confirmed actively exploited in the wild  
**Legal basis:** EU Cyber Resilience Act, Article 14 (active since September 2026)

---

## Quick Reference

| Step | What                                        | Deadline               |
| ---- | ------------------------------------------- | ---------------------- |
| 1    | Confirm exploitation and assess severity    | Immediately            |
| 2    | Notify team lead and open private advisory  | T+1h                   |
| 3    | File early warning with authorities         | T+24h                  |
| 4    | File detailed notification with authorities | T+72h                  |
| 5    | Release fix or mitigation                   | T+90d (target: sooner) |
| 6    | File final report with authorities          | T+14d after fix        |
| 7    | Publish GitHub Security Advisory            | After fix is released  |
| 8    | Post-incident review                        | Within 30 days         |

---

## Step 1 — Confirm and Assess (Immediately)

Before any reporting, confirm that the vulnerability is:

- [ ] Present in a **published** version of `@baloise/ds-core` or another published package
- [ ] **Actively exploited** (not just theoretically possible) — exploitation evidence may come from:
  - A Dependabot alert flagging a CVE marked "exploited in wild"
  - An external security researcher's report with a proof of concept
  - A consumer reporting an active incident involving this library
  - A public threat intelligence feed (NVD, OSV, GitHub Advisory Database)

If exploitation is not confirmed, follow the standard [CVD process](../../SECURITY.md#disclosure-policy) instead — authority reporting is only triggered for actively exploited vulnerabilities.

**Assess:**

- Which package(s) and version range(s) are affected?
- What is the CVSS score and attack vector?
- Is a fix or workaround already available?
- How many consumers are likely affected? (Check npm download stats)

---

## Step 2 — Notify Team and Open Private Advisory (T+1h)

- [ ] Notify the security lead and one other maintainer immediately (do not handle alone)
- [ ] Open a private [GitHub Security Advisory](https://github.com/baloise/design-system/security/advisories/new):
  - Title: `[CVE-YYYY-XXXXX] Short description`
  - Ecosystem: npm
  - Package name: `@baloise/ds-core` (and any other affected packages)
  - Affected versions: semver range
  - Patched version: leave blank until fix is ready
- [ ] Request a CVE ID via [cveform.mitre.org](https://cveform.mitre.org) if one has not been assigned yet — reference the GitHub advisory URL in the request
- [ ] Do **not** publish the advisory yet — keep it private until a fix is ready

---

## Step 3 — Early Warning to Authorities (T+24h)

File an early warning with both authorities if EU consumers are affected. Duplicate reports are explicitly permitted.

### ENISA EUVDB (EU)

1. Go to [euvdb.europa.eu](https://euvdb.europa.eu)
2. Log in or register an account for the organisation
3. Submit an early warning with the minimum required fields:

```
Product name:     Baloise Design System
Package:          @baloise/ds-core (and affected packages)
Affected version: <semver range>
CVE ID:           <CVE-YYYY-XXXXX or "pending">
Short description: <1–2 sentences — what the vulnerability is>
Exploitation:     Actively exploited in the wild
Fix available:    Yes / No / In progress
```

4. Save the submission reference number — you need it for the follow-up reports in Steps 4 and 6.

### Swiss NCSC (Switzerland)

1. Go to [ncsc.admin.ch — Report a vulnerability](https://www.ncsc.admin.ch/ncsc/en/home/meldungen/meldung-ncsc.html)
2. Select "Vulnerability in a product"
3. Fill in the same fields as above
4. Note the confirmation email and ticket number

---

## Step 4 — Detailed Notification (T+72h)

Update both authority submissions (reference the ticket numbers from Step 3) with full details:

```
Product:           Baloise Design System
Package(s):        @baloise/ds-core <semver>
CVE ID:            CVE-YYYY-XXXXX
CVSS score:        <score> (<vector string>)
CWE:               CWE-XXXX — <name>
Description:       <paragraph — root cause, attack vector, what an attacker can do>
Impact:            <what is at risk for consumers — XSS, data exposure, etc.>
Affected users:    ~<N> weekly npm downloads (see npmjs.com/package/@baloise/ds-core)
Mitigation:        <workaround if available; or "update to vX.Y.Z once released">
Fix status:        In progress — expected release: <date>
Timeline:
  <ISO date> — Vulnerability reported / discovered
  <ISO date> — Exploitation confirmed
  <ISO date> — Early warning filed
  <ISO date> — This detailed notification
```

---

## Step 5 — Develop and Release Fix (Target: As Fast As Possible, Hard Limit T+90d)

- [ ] Develop the fix on a private branch (do not push to a public branch until the advisory is ready to publish)
- [ ] Run the full test suite: `npm test && npm run play`
- [ ] Run `npm audit --audit-level=high` to confirm no remaining critical/high CVEs
- [ ] Create a changeset entry: `npm run changeset` — mark as `patch`
- [ ] Trigger the release workflow (this generates the SBOM, provenance attestation, and publishes to npm)
- [ ] For LTS branches: apply the same fix via the `lts-release` workflow

---

## Step 6 — Final Report to Authorities (Within 14 Days of Fix Release)

Update both authority submissions with the final report:

```
Fix released:      Yes — version <X.Y.Z>, released <ISO date>
npm package:       https://www.npmjs.com/package/@baloise/ds-core/v/X.Y.Z
GitHub release:    https://github.com/baloise/design-system/releases/tag/vX.Y.Z
SBOM:              Bundled in npm package as sbom.cdx.json
Provenance:        GitHub Actions provenance attestation (see npm package page)
Root cause:        <1 paragraph>
Prevention:        <what was changed to prevent recurrence>
Timeline:
  <ISO date> — Discovered
  <ISO date> — Early warning filed
  <ISO date> — Detailed notification filed
  <ISO date> — Fix released
  <ISO date> — This final report
```

---

## Step 7 — Publish GitHub Security Advisory (After Fix Is Released)

- [ ] Return to the private GitHub Security Advisory created in Step 2
- [ ] Set "Patched version" to the released version
- [ ] Write the public advisory text (consumers will see this):
  - What the vulnerability is
  - Which versions are affected
  - How to update
  - Workaround if applicable
- [ ] Publish the advisory — this creates the CVE entry and notifies repository watchers
- [ ] Post a notice in the release notes and CHANGELOG entry for the patched version

---

## Step 8 — Post-Incident Review (Within 30 Days)

- [ ] Document what happened in a brief post-mortem (internal, not public)
- [ ] Answer: How was this introduced? How was it detected? What slowed down the response?
- [ ] Update this runbook or `SECURITY.md` if any step was unclear or missing
- [ ] File a follow-up item if a process gap needs a long-term fix (e.g., a new CodeQL query, a new Dependabot rule)

---

## Contacts

| Role               | Responsibility                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Security lead      | Owns the authority report filings and advisory publication                                      |
| On-call maintainer | First responder — escalates to security lead within 1 hour                                      |
| Legal / compliance | Notified if the vulnerability affects a regulated system or triggers data breach considerations |

For maintainer contact details, see [CONTRIBUTING.md](../../CONTRIBUTING.md).

---

## Reference Links

- [ENISA EUVDB reporting platform](https://euvdb.europa.eu)
- [Swiss NCSC vulnerability report form](https://www.ncsc.admin.ch/ncsc/en/home/meldungen/meldung-ncsc.html)
- [Request a CVE ID (MITRE)](https://cveform.mitre.org)
- [GitHub Security Advisories — this repo](https://github.com/baloise/design-system/security/advisories)
- [NVD — National Vulnerability Database](https://nvd.nist.gov)
- [CRA Article 14 full text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202402847#art_14)
- [SECURITY.md](../../SECURITY.md)
