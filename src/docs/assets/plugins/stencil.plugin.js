"use strict";

(function () {
  function StencilPlugin(hook, vm) {
    hook.beforeEach(function (content) {
      var divider = '----------------------------------------------'
      var contentWithoutDividers = content.replace(divider, '').replace(divider, '')
      var search = '*Built with [StencilJS](https://stenciljs.com/)*'
      return contentWithoutDividers.replace(search, '')
    });
  }

  window.$docsify.plugins = [].concat(StencilPlugin, window.$docsify.plugins);
})();
