import { union as unionArray } from '../array'
import { copy } from './copy'

export function union (a, b) {
  let ret = copy(a)

  for (let i = 0, l = Math.min(a.length, b.length); i < l; i++) {
    ret[i] = unionArray(a[i], b[i])
  }

  return ret
}
