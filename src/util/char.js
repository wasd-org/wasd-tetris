export function padStart(str, length, place = ' ') {
  while (str.length < length) {
    str = place + str
  }
  return str
}

export const times = (str, num) => Array(num + 1).join(str)
