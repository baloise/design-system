import { traverseAst } from './traverseAst';
import { addSemicolon } from './addSemicolon';
import { formatScss } from './formatScss';
import { sassMixinIncludeHack } from './sassMixinIncludeHack';
import { sassMixinDefinitionHack } from './sassMixinDefinitionHack';
import { interpolationHack } from './interpolationHack';
import { removeTrailingSpacesForEachLine } from './removeTrailingSpacesForEachLine';
import { placeholderHack } from './placeholderHack';
import { cssVariableHack } from './cssVariableHack';
import { importQuotesHack } from './importQuotesHack';
import {
  operatorInArgumentsHack,
  operatorInArgumentsHackPostFormat,
} from './operatorInArgumentsHack';

let sast: any;

export async function convertSassToScss(sassStr: string): Promise<string> {
  sast = sast || await import('sast');

  const cleanedUpSassStr = removeTrailingSpacesForEachLine(sassStr);
  const ast = sast.parse(`${cleanedUpSassStr}\n\n`, { syntax: 'sass' });

  // eslint-disable-next-line no-param-reassign
  traverseAst(ast, (node) => delete node.position);

  traverseAst(ast, sassMixinIncludeHack);
  traverseAst(ast, sassMixinDefinitionHack);
  traverseAst(ast, addSemicolon);
  traverseAst(ast, interpolationHack);
  traverseAst(ast, placeholderHack);
  traverseAst(ast, cssVariableHack);
  traverseAst(ast, importQuotesHack);
  traverseAst(ast, operatorInArgumentsHack);

  const stringifiedTree = sast.stringify(ast, { syntax: 'scss' });
  let formattedScss = formatScss(stringifiedTree).trim().replace(/\r/g, '');

  formattedScss = operatorInArgumentsHackPostFormat(formattedScss);

  return formattedScss;
}
