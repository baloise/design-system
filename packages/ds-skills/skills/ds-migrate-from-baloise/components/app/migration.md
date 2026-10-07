# app → root

Migrate every `bal-app` usage to `ds-root`. Init has already added the `@helvetia-design/*` packages. This task rewrites usages only.

The legacy folder has no child elements. Rewrite `bal-app` only. Leave slotted content in place, including legacy tags such as `bal-navbar` and `bal-footer`. Those belong to their own migrations.

There is normally one `bal-app` per project, so expect one or two findings rather than a list.

Read the Config section before rewriting. `bal-app` never configured anything, but `ds-root` does, and a rewrite that only changes the tag leaves the app running on default brand, region, and language without any error.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-app.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

The scan also lists `initializeBaloiseDesignSystem` and `useBaloiseDesignSystem` calls, which usually live in a startup file that never mentions `bal-app`. Those are not tags to rewrite. They are the source values for the Config section.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-app` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line. This step is finished when every finding matches the mapping.

### Config

`bal-app` held no configuration. The app set it once at startup:

```ts
initializeBaloiseDesignSystem({ language: 'fr', region: 'BE', allowedLanguages: ['fr', 'nl'], icons })
```

`ds-root` does hold configuration, and it reads a different global. When it finds none it configures itself with the defaults: brand `helvetia`, region `CH`, language `de`. Nothing throws. A rewrite that only changes the tag therefore switches a French Belgian app to German Swiss silently.

Copy the values from the legacy call onto `ds-root`.

| legacy config key  | new home                                               | handling                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `brand`            | `brand` attribute                                      | Copy the value. `baloise` and `helvetia` both still exist.                                                                                                                                     |
| `region`           | `region` attribute                                     | Copy the value. The legacy set was `CH`, `DE`, `BE`, `LU`; all four still exist.                                                                                                               |
| `language`         | `language` attribute                                   | Copy the value.                                                                                                                                                                                |
| `fallbackLanguage` | `fallback-language` attribute                          | Copy the value.                                                                                                                                                                                |
| `allowedLanguages` | `allowed-languages` attribute                          | The legacy value is an array. The attribute is one comma separated string: `['fr', 'nl']` becomes `allowed-languages="fr,nl"`. In React use `DsRootProvider`, which takes the array unchanged. |
| `animated`         | `animated` attribute                                   | Copy as-is. `bal-app` also had this prop; keep whichever value was set.                                                                                                                        |
| `icons`            | `initializeDesignSystem({ icons })`, or the React prop | There is no `icons` attribute. In HTML and Angular, call `initializeDesignSystem` from `@helvetia-design/core` at startup. In React, pass `icons` to `DsRootProvider`.                         |
| `logger`           | _(no equivalent)_                                      | Drop it. `ds-root` has a `logger` prop but it is `@internal` and takes component names, not a logger function. Mention each dropped `logger` in the summary.                                   |
| `httpFormSubmit`   | _(no equivalent)_                                      | Drop it. The option no longer exists. Mention each one in the summary.                                                                                                                         |

Leave the legacy `initializeBaloiseDesignSystem` or `useBaloiseDesignSystem` call exactly where it is in HTML and Angular projects. The `bal-*` components still in the app depend on it. The one exception is React, where `DsRootProvider` replaces `useBaloiseDesignSystem` for the new components; see Tags and imports.

When the scan found no legacy config call, write no config attributes and say in the summary that `ds-root` will use brand `helvetia`, region `CH`, and language `de`, so the consumer can confirm that is right.

### Props

| old (`bal-app`) | new (`ds-root`)                                                         | handling                                                                |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `animated`      | `animated`                                                              | Copy as-is, including `animated="false"` and `animated={false}`.        |
| `ready`         | `ready`                                                                 | Drop it. It was `@internal` on both and is set by the component.        |
| _(none)_        | `brand`, `region`, `language`, `allowed-languages`, `fallback-language` | New props. Fill them from the Config section, not from the old element. |
| _(none)_        | `icons`, `legalLinks`, `legalText`, `socialLinks`                       | New, and property only. They have no attribute. See the Config section. |

### Tags and imports

- **HTML**: `<bal-app>` becomes `<ds-root>`, including the closing tag. Keep the `class` attribute; `has-sticky-footer` still works.
- **Angular**: `<bal-app>` becomes `<ds-root>` in `.html` templates and in inline `template:` strings, including the closing tag. Add `DsRoot` from `@helvetia-design/angular` to the module or standalone component `imports`. Leave `BalLayoutBundle` and `BalComponentBundle` where they are: `BalApp` is only one entry in them and the other components are still in use. Mention in the summary that the bundle still registers `BalApp`.
- **React**: `<BalApp>` becomes `<DsRootProvider>` and `</BalApp>` becomes `</DsRootProvider>`, imported from `@helvetia-design/react`. Move the legacy config values onto it as props, keeping `allowedLanguages` as an array. Then delete the `useBaloiseDesignSystem()` call that element was paired with, because `DsRootProvider` calls the new initializer itself. When the existing `@baloise/ds-react` import also binds other symbols, move only `BalApp` and `useBaloiseDesignSystem` and leave the other symbols on the `@baloise` import.

```tsx
// before
import { useBaloiseDesignSystem, BalApp } from '@baloise/ds-react'
useBaloiseDesignSystem({ language: 'fr', region: 'BE', allowedLanguages: ['fr', 'nl'] })
return <BalApp>{children}</BalApp>

// after
import { DsRootProvider } from '@helvetia-design/react'
return (
  <DsRootProvider language="fr" region="BE" allowedLanguages={['fr', 'nl']}>
    {children}
  </DsRootProvider>
)
```

### Events

| old           | new                                                                                                                               | handling                                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `balAppReady` | `dsAppReady`                                                                                                                      | Rewrite `addEventListener('balAppReady'` to `addEventListener('dsAppReady'`. Angular: `(balAppReady)` becomes `(dsAppReady)`. React: `onBalAppReady` becomes `onDsAppReady`. The payload is empty in both. |
| _(none)_      | `dsAnimatedChange`, `dsBrandChange`, `dsRegionChange`, `dsLanguageChange`, `dsAllowedLanguagesChange`, `dsFallbackLanguageChange` | New events. Nothing to migrate from.                                                                                                                                                                       |

### Methods

`setFocus(elements)` keeps that name and signature.

### Other renames

Rewrite these wherever they appear in a file that has a finding:

| old                                               | new                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `getAppRoot(document)`                            | `getRootElement(document)`                                                                                                               |
| `--bal-app-height`                                | `--ds-root-height`                                                                                                                       |
| `.bal-app`, `.bal-app--safari`, `.bal-app--touch` | `.ds-root`, `.ds-root--safari`, `.ds-root--touch`                                                                                        |
| `bal-focusable` / `bal-focused`                   | `ds-focusable` / `ds-focused`                                                                                                            |
| `BalAppCustomEvent<T>`                            | `RootCustomEvent<T>` from `@helvetia-design/core`                                                                                        |
| `initializeBaloiseDesignSystem`                   | `initializeDesignSystem` from `@helvetia-design/core`, only when adding the new call for `icons`; never rewrite the legacy call in place |

Class and custom property renames also occur in `.css` and `.scss` files, which this scan does not read. Say so in the summary.

### Files to edit beyond the scan

In each file that has a finding, also rewrite `balAppReady` listeners and the renames above when they are not on the element itself, including `addEventListener`.

For every finding in a `.html` file, also open the file with the same name and a `.ts` extension in the same folder, and apply the Events and Other renames rules there. That is the Angular case where the template holds the tag and the class file holds the listener or a `getAppRoot` call, and the class file never names `bal-app`.

## 4. Report

Print a per-file summary of what changed, including every config value carried from the legacy call onto `ds-root`, or, when no legacy call was found, that `ds-root` now uses brand `helvetia`, region `CH`, and language `de`; every `allowedLanguages` array turned into a comma separated attribute; every `icons` value that now needs `initializeDesignSystem`; every dropped `logger` and `httpFormSubmit`; the `useBaloiseDesignSystem` call removed in React; that `BalLayoutBundle` still registers `BalApp` in Angular; each of the Other renames applied; and that `.css` and `.scss` files were not scanned and may still use `.bal-app` or `--bal-app-height`. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
