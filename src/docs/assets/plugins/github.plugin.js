"use strict";

(function () {

  function GithubPlugin(hook, vm) {
    hook.beforeEach(function (html) {
      var url = 'https://github.com/baloise/ui-library/blob/master/src/' + vm.route.file;
      var editHtml = '[:memo: Edit Document](' + url + ')\n'
      return editHtml + html
    })
  }

  window.$docsify.plugins = [].concat(GithubPlugin, window.$docsify.plugins);
})();
