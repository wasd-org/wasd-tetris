import { intersect } from '../../utils/game'

export default function (Tetris) {
  const proto = Tetris.prototype

  proto._detectCollision = function () {
    const { matrix, block } = this
    // OVERFLOW
    const left = matrix.x
    const right = matrix.x + matrix.col
    const bottom = matrix.y + matrix.row

    const { x, y } = block.coordinate
    const { margin } = block.shape

    if (x + margin.left < left) {
      return false
    }

    if (x + margin.left + margin.col > right) {
      return false
    }

    // HIT

    if (y + margin.top + margin.row > bottom) {
      return false
    }

    if (intersect(this.matrix.coordinate, this.block.coordinate)) {
      return false
    }

    return true
  }
}
