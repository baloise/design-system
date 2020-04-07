"use strict";

(function() {
  function PropsPlugin(hook, vm) {
    hook.beforeEach(function(content) {
      var lineBreak = "\n";
      var lines = content.split(lineBreak).map(function(line) {
        if (line.startsWith("- [bal-") || line.startsWith(" - [bal-")) {
          var tagName = line.split("[")[1].split("]")[0];
          return "- [" + tagName + "](components/" + tagName + "/readme.md)";
        }
        return line;
      });

      return lines.join(lineBreak);
    });
  }

  window.$docsify.plugins = [].concat(PropsPlugin, window.$docsify.plugins);
})();
