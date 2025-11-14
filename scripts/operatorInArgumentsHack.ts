const operatorPlaceholders: any = {
  '+': 'MrtPyipTydnmjdcDLXdpxJjJeYrZSokL',
  '-': 'EcSBYTlVJGmwAPuKxNvzTiUxWBhxreEY',
  '*': 'KsuHvGEtnLHzspHzGCYwMLVYXqzgwImf',
  '/': 'DeLpZOMdooUfCxXMqMHJLqQACFGyQmjC',
  '%': 'uOkBVVmetuaspgkCnyBpcPdEJMBDMzWd',
};

export function operatorInArgumentsHack(child: any) {
  if (child.type === 'arguments') {
    child.children.forEach((c: any) => {
      if (operatorPlaceholders[c.value]) {
        // eslint-disable-next-line no-param-reassign
        c.value = operatorPlaceholders[c.value];
      }
    });
  }
}

export function operatorInArgumentsHackPostFormat(scssString: string): string {
  // eslint-disable-next-line
  for (const operator in operatorPlaceholders) {
    const placeholder = operatorPlaceholders[operator];
    // eslint-disable-next-line no-param-reassign
    scssString = scssString.replaceAll(placeholder, operator);
  }
  return scssString;
}
