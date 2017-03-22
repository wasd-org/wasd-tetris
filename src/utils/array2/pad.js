import { create } from './create'
import { copy } from './copy'
import { padStart, padEnd } from '../array'

export function padTop (array, length, fill = 0) {
  array = copy(array)
  const l = array.length
  if (!l) return array
  const row = length - l
  const col = array[0].length

  if (row <= 0 || col <= 0) return array

  return create(row, col, fill).concat(array)
}

export function padBottom (array, length, fill = 0) {
  array = copy(array)
  const l = array.length
  const row = length - l
  const col = array[0].length

  if (row <= 0 || col <= 0) return array

  return array.concat(create(row, col, fill))
}

export function padLeft (array, length, fill = 0) {
  return array.map(a => padStart(a, length, fill))
}

export function padRight (array, length, fill = 0) {
  return array.map(a => padEnd(a, length, fill))
}
