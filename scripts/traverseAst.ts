export function traverseAst(root: any, forEveryNode: (child: any) => void) {
  forEveryNode(root);
  if (root && root.children && root.children.length > 0) {
    root.children.forEach((child: any) => traverseAst(child, forEveryNode));
  }
}
