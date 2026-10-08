---
'@helvetia-design/core': minor
---

**core/modal**: Add label prop/option to ds-modal for setting aria-label on component-overlay modals, which have no header slot content, and support modalWidth, closable, and fullscreen options in dsModalController.create(). Also fix mounted overlay components not being detached on dismiss (`ds-modal.dismiss()` now resolves only after the close transition has finished) and `dismiss()` running the close sequence twice when called again before the modal has fully closed
