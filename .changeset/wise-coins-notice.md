---
'@baloise/ds-react': patch
---

**react**: Fix ds-input-phone flag rendering crash under Vite (`TypeError: Invalid base URL` from Stencil's `resourcesUrl` auto-detection) — superseded by [ADR-0032](../docs/adr/0032-ds-input-phone-bundled-svg-flags.md), which removes the runtime asset path this crash came from entirely
