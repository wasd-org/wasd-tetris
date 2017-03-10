export function padStart(str, length, place = ' ') {
  while (str.length < length) {
    str = place + str
  }
  return str
}
