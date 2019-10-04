(function() {
  function PropsPlugin(hook, vm) {
    hook.beforeEach(function(content) {
      const lineBreak = "\n";
      let lines = content.split(lineBreak).map(line => {
        if (line.startsWith("- [bal-") || line.startsWith(" - [bal-")) {
          const tagName = line.split("[")[1].split("]")[0];
          return `- [${tagName}](components/${tagName}/readme.md)`;
        }
        return line;
      });

      return lines.join(lineBreak);
    });
  }

  window.$docsify.plugins = [].concat(PropsPlugin, window.$docsify.plugins);
})();
