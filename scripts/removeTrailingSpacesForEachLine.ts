export function removeTrailingSpacesForEachLine(str: string): string {
  return str
    .split('\n')
    .map((line) => line.replace(/\s*$/, ''))
    .join('\n');
}
