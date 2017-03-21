import { slice } from './slice'
import { copy, shift, union as unionArray2 } from '../array2'

export function union (a, b) {
  const { x: ax, y: ay, array: aArray } = a
  const aRow = aArray.length
  const aCol = aArray[0].length
  const aStartX = ax
  const aEndX = aStartX + aCol
  const aStartY = ay
  const aEndY = aStartY + aRow

  const { x: bx, y: by, array: bArray } = b
  const bRow = bArray.length
  const bCol = bArray[0].length
  const bStartX = bx
  const bEndX = bStartX + bCol
  const bStartY = by
  const bEndY = bStartY + bRow

  if (aEndX < bStartX || aEndY < bStartY) return a
  if (aStartX > bEndX || aStartY > bEndY) return a

  const startX = Math.max(aStartX, bStartX)
  const startY = Math.max(aStartY, bStartY)
  const endX = Math.min(aEndX, bEndX)
  const endY = Math.min(aEndY, bEndY)


  const slicedA = slice({
    block: a,
    startX: aStartX,
    endX: aEndX,
    startY,
    endY
  })

  const slicedB = slice({
    block: b,
    startX,
    endX,
    startY,
    endY
  })

  const unionedArray = unionArray2(slicedA.array, shift(slicedB.array, aEndX - endX))

  let ret = copy(aArray)

  ret.splice(startY, endY - startY, ...unionedArray)

  return {
    array: ret,
    x: aStartX,
    y: aStartY
  }
}
