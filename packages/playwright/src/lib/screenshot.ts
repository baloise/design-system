export const screenshot = (tag: string) => (name: string) => `${tag}__${name}.png`

export const wait = (ms = 0): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}
