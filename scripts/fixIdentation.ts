export function fixIdentation(node: any) {
  if (node.type === 'block') {
    const spaces = node.children.filter((child: any) => child.type === 'space');
    const indentationForThisBlock = spaces[0].value.replaceAll('\n', '');
    spaces.forEach((child: any) => {
      // eslint-disable-next-line no-param-reassign
      child.value = child.value.replaceAll(' ', '') + indentationForThisBlock;
      if (!child.value.startsWith('\n')) {
        // eslint-disable-next-line no-param-reassign
        child.value = `\n${child.value}`;
      }
    });
    const [lastChild] = node.children.slice(-1);
    if (lastChild.type === 'space') {
      node.children.pop();
    }
  }
}
