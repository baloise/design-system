export function importQuotesHack(child: any) {
  if (
    child.type === 'atrule' && child.children?.find((c: any) => c.type === 'atkeyword')?.children[0]?.value === 'import'
  ) {
    const importUrl = child.children.find((c: any) => c.type === 'ident');
    if (importUrl) {
      importUrl.type = 'string';
      if (!importUrl.value?.startsWith('"')) {
        importUrl.value = `"${importUrl?.value}`;
      }
      if (!importUrl.value?.endsWith('"')) {
        importUrl.value = `${importUrl?.value}"`;
      }
    }
  }
}
