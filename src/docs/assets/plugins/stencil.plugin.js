"use strict";

(function () {
  function StencilPlugin(hook, vm) {
    hook.beforeEach(function (content) {
      const divider = `----------------------------------------------`
      const contentWithoutDividers = content.replace(divider, '').replace(divider, '')
      const search = `*Built with [StencilJS](https://stenciljs.com/)*`
      return contentWithoutDividers.replace(search, '')
    });
  }

  window.$docsify.plugins = [].concat(StencilPlugin, window.$docsify.plugins);
})();
