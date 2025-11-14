export function cssVariableHack(child: any) {
  if (child.type === 'customProperty') {
    // eslint-disable-next-line no-param-reassign
    child.children[0].value = `--${child.children[0].value}`;
  }
}
