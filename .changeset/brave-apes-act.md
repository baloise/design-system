---
'@baloise/ds-core': patch
---

**core/spinner/logo**: Rewrite dynamic import() to a static import in compiled components/*.js so single-file/non-code-splitting builds don't break on the spinner/logo Lottie animation chunks
