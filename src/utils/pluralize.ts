export function plural(num: number, postfixes: string[]) {
  if (!num) {
    console.warn('wrong number in plural')
    return ''
  }

  let n = Math.abs(num)
  n %= 100

  if (n >= 5 && n <= 20) return postfixes[2]
  n %= 10
  if (n === 1) return postfixes[0]
  if (n >= 2 && n <= 4) return postfixes[1]
  return postfixes[2]
}
