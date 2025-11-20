// eslint-disable-next-line @typescript-eslint/no-var-requires
const scssfmt = require('scssfmt');

export function formatScss(rawStr: string): string {
  return scssfmt(rawStr);
}
