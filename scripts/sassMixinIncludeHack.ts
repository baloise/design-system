// + to @include hack:
export function sassMixinIncludeHack(child: any) {
  if (child.type === 'include' && child.children) {
    const [firstChild, ...otherChildren] = child.children;
    if (firstChild.value === '+') {
      firstChild.type = 'atkeyword';
      delete firstChild.value;
      firstChild.children = [
        {
          type: 'ident',
          value: 'include',
        },
      ];

      // eslint-disable-next-line no-param-reassign
      child.children = [
        firstChild,
        {
          type: 'space',
          value: ' ',
        },
        ...otherChildren,
      ];
    }
  } else if (child.type === 'selector' && (child.children && child.children[0] && child.children[0].value === '+')) {
    // fix for top-level @include's:

    const [firstChild, ...otherChildren] = child.children;
    // eslint-disable-next-line no-param-reassign
    child.type = 'include';

    delete firstChild.value;
    firstChild.type = 'atkeyword';
    firstChild.children = [
      {
        type: 'ident',
        value: 'include',
      },
    ];

    // eslint-disable-next-line no-param-reassign
    child.children = [
      firstChild,
      {
        type: 'space',
        value: ' ',
      },
      // eslint-disable-next-line no-shadow
      ...(otherChildren || []).flatMap((child: any) => child.children || []) || [],
    ];
  }
}
