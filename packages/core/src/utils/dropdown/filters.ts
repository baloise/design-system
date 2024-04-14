export function startsWith(text: string, input: string): boolean {
  const content = text.trim().toLowerCase()
  const value = input.trim().toLowerCase()
  return content.startsWith(value)
}

export function includes(text: string, input: string): boolean {
  const content = text.trim().toLowerCase()
  const value = input.trim().toLowerCase()
  return content.includes(value)
}
