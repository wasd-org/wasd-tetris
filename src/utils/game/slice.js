import { slice as sliceArray2 } from '../array2'

export function slice ({ block, startX, endX, startY, endY }) {
  const { x, y, array } = block

  const startCol = startX - x
  const endCol = endX - x
  const startRow= startY - y
  const endRow = endY - y

  return {
    array: sliceArray2({ array, startCol, endCol, startRow, endRow }),
    x,
    y
  }
}
