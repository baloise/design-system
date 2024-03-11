import { CustomFiltersBuilder, ExtensionContext } from '@nxkit/style-dictionary/extensions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customFiltersBuilder: CustomFiltersBuilder = (extensionContext: ExtensionContext) => {
  return {
    figmaColor: function (token) {
      return token.deprecated !== true && token.attributes.category === 'color'
    },
    figmaSize: function (token) {
      return token.deprecated !== true && token.attributes.category === 'size'
    },
    withoutDeprecated: function (token) {
      return token.deprecated !== true
    },
    onlyDeprecated: function (token) {
      return token.deprecated === true
    },
  }
}

export default customFiltersBuilder
