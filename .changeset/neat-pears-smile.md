---
'@baloise/ds-core': patch
---

**icon**: prevent from caching icons and log an error if an icon does not exist in the configuration. Check your app during runtime on the pages where you use icons, if you see an error in the console like:`Icon "${iconName}" not found in design system configuration.`
