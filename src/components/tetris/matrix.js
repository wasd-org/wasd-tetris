import { intersect, union } from '../../utils/game'
import { copy } from '../../utils/array2'

export default function (Tetris) {
  const proto = Tetris.prototype

  proto._union = function () {
    this.matrix.matrix = union(this.matrix.coordinate, this.block.coordinate).array
  }
}
