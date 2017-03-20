import { padEnd } from './pad'

export function shift (array, offset = 0, pad = 0) {
  const length = array.length
  if (offset >= 0) {
    return padEnd(array, length + offset, pad)
  }

  const count = -offset

  if (count > length) {
    return []
  }

  return array.slice(0, length - count)
}
