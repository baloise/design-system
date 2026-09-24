---
'@baloise/ds-core': minor
'@baloise/ds-assets': minor
---

**core/assets/input-phone**: Bundle ds-input-phone's country flags as inline SVGs in @baloise/ds-assets (same build-time approach as ds-icon) instead of resolving them lazily via Stencil's getAssetPath — consumers no longer need any asset-copy configuration for flags to render (see ADR-0032, supersedes ADR-0024)
