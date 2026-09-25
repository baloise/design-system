---
'@helvetia-design/core': minor
'@helvetia-design/assets': minor
---

**core/assets/phone-input**: Bundle ds-phone-input's country flags as inline SVGs in @helvetia-design/assets (same build-time approach as ds-icon) instead of resolving them lazily via Stencil's getAssetPath — consumers no longer need any asset-copy configuration for flags to render (see ADR-0033, supersedes ADR-0024)
