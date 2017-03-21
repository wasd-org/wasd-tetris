import { padStart } from './pad'

export function intersect (a, b) {
  const aLength = a.length
  const bLength = b.length
  const offset = aLength - bLength

  let newA = a.slice()
  let newB = b.slice()


  if (offset > 0) {
    newB = padStart(newB, aLength)
  } else if (offset < 0) {
    newA = padStart(newA, bLength)
  }

  for (let i = 0, l = newA.length; i < l; i++) {
    if (newA[i] && newB[i]) return true
  }

  return false
}
