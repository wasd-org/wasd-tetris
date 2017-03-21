import { shift as shiftArray } from '../array'
import { copy } from './copy'

export function shift (array, offset = 0, fill = 0) {
  return array.map(a => shiftArray(a, offset, fill))
}
