<bal-doc-banner id="anchor--development-internationalization--page" subtitle="Development">Internationalization</bal-doc-banner>

The [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) of the browser
provides the Design System number and date formats.

## Regions & Languages

The following **regions** and **languages** are supported:

| Region | Languages      | Interface               |
| ------ | -------------- | ----------------------- |
| CH     | de, fr, it, en | `BalSwissLanguage`      |
| BE     | fr, nl         | `BalBelgiumLanguage`    |
| DE     | de             | `BalGermanLanguage`     |
| LU     | fr, de, en     | `BalLuxembourgLanguage` |

Additionally an **allowedLanguages** should be passed to the configuration.
It is used to display the language selection for the user.
