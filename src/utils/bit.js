/**
 * Transpose a matrix
 * @param  {Array} matrix - matrix to transpose
 * @return {Array}
 */
export function transpose (matrix) {
  let newMatrix = []
  const l = matrix.length

  for (let i = 0; i < l; i++) {
    const row = []

    for (let j = 0; j < l; j++) {
      row.unshift(matrix[j][i])
    }

    newMatrix.push(row)
  }

  return newMatrix
}

/**
 * Generate a bitmap for shape
 * @param  {2d Array}
 * @return {Array}
 */
export function generateBitmap (shape) {
  return shape.map(row => parseInt(row.map(col => col ? 1 : 0).join(''), 2))
}

/**
 * Whether the two bitmap is same.
 * @param  {Array}
 * @param  {Array}
 * @return {Boolean}
 */
export function equalBitmap (a, b) {
  const l = a.length
  if (l !== b.length) {
    return false
  }

  for (let i = 0; i < l; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

/**
 * Calculate margin of shape.
 * @param  {Array}
 * @return {Object}
 */
export function calcMargin (bitmap) {
  const { length } = bitmap

  let hitNotEmptyRow = false
  let top = 0
  let bottom = 0
  bitmap.forEach(r => {
    if (r) {
      hitNotEmptyRow = true
    } else {
      if (hitNotEmptyRow) {
        bottom++
      } else {
        top++
      }
    }
  })
  const row = length - top - bottom

  let hitNotEmptyColumn = false
  const bitwiseOrColumns = bitmap.reduce((p, c) => p | c, 0).toString(2)
  const left = length - bitwiseOrColumns.length
  const col = bitwiseOrColumns.split('0')[0].length
  const right = length - left - col

  return {
    top,
    right,
    bottom,
    left,
    row,
    col
  }
}

/**
 * Calcuate attributes for shape
 * @param  {Object} shape - shape to generate atributes
 * @return {Object}
 */
export function generateAttribute (shape) {
  const { origin, bitmap } = shape

  return {
    margin: calcMargin(bitmap),
    bitmap,
    origin,
    maxRow: bitmap.length,
    maxCol: bitmap.length
  }
}
