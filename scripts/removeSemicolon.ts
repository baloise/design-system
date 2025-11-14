export function removeSemicolon(child: any) {
  if (child.type === 'declarationDelimiter') {
    // eslint-disable-next-line no-param-reassign
    child.value = '';
  }
}
