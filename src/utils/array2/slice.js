export function slice ({ array, startRow, endRow, startCol, endCol }) {
  const row = array.length
  const col = array[0].length
  if (!row || !col) return

  startRow = Math.min(Math.max(0, startRow), row)
  startCol = Math.min(Math.max(0, startCol), col)
  endRow = Math.min(Math.max(0, endRow), row)
  endCol = Math.min(Math.max(0, endCol), col)

  let ret = []

  for (let i = 0, rowLength = endRow - startRow; i < rowLength; i++) {
    ret.push([])
    for (let j = 0, colLength = endCol - startCol; j < colLength; j++) {
      ret[i].push(array[i + startRow][j + startCol])
    }
  }

  return ret
}
