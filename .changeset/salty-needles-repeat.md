---
'@baloise/ds-css': minor
---

**css**: Add real CSS minification (cssnano) for all dist/css outputs and fix the exports map to match built files

Follow-up (not in this change): a per-component CSS split and utility-class purging/tree-shaking remain open as future options if minified sizes are still too large for CMS use.
