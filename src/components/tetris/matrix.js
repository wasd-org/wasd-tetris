import { intersect, union } from "../../utils/game";
import { copy, padTop } from "../../utils/array2";

export default function(Tetris) {
  const proto = Tetris.prototype;

  proto._union = function() {
    this.matrix.matrix = union(
      this.matrix.coordinate,
      this.block.coordinate
    ).array;
  };

  proto._clearLines = function() {
    const { matrix } = this.matrix;
    const length = matrix.length;

    let ret = [];
    let lines = [];

    for (let i = length - 1; i >= 0; i--) {
      const array = matrix[i];

      let isEmpty = true;
      let isFull = true;

      for (let j = 0, l = array.length; j < l; j++) {
        array[j] ? (isEmpty = false) : (isFull = false);
        if (!isEmpty && !isFull) break;
      }

      if (isFull) {
        lines.unshift(i);
      } else {
        ret.unshift(array);
      }
    }

    if (lines.length) {
      this.emit("clear:lines", lines);
    }

    this.matrix.matrix = padTop(ret, length);

    return lines;
  };
}
