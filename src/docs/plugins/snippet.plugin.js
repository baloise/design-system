(function() {
  function SnippetPlugin(hook, vm) {
    hook.beforeEach(function(content) {
      let result = "";
      let markdown = content;
      const lineBreak = "\n";
      const prefix = "```html" + lineBreak;
      const suffix = "```" + lineBreak;

      if (markdown.indexOf(prefix) >= 0) {
        while (markdown.indexOf(prefix) >= 0) {
          const startIndex = markdown.indexOf(prefix);
          const endIndex = markdown.indexOf(suffix);

          const codeBlock = markdown.substring(
            startIndex + prefix.length,
            endIndex,
          );

          result = result + markdown.substring(0, startIndex);
          result = result + lineBreak;
          result = result + `<section class="bal-app">${codeBlock}</section>`;
          result = result + lineBreak + lineBreak;
          result = result + prefix;
          result = result + codeBlock;
          result = result + suffix + lineBreak;

          markdown = markdown.substring(
            endIndex + suffix.length,
            markdown.length,
          );
        }

        return result + markdown;
      }
      return content;
    });
  }

  window.$docsify.plugins = [].concat(SnippetPlugin, window.$docsify.plugins);
})();
