import { copy } from "../../utils/array2";

export default function(Tetris) {
  const proto = Tetris.prototype;

  proto.save = function() {
    this._lastState = {
      matrix: {
        x: this.matrix.x,
        y: this.matrix.y,
        matrix: copy(this.matrix.matrix),
      },
      block: {
        x: this.block.x,
        y: this.block.y,
        index: this.block.shape.index,
      },
    };
  };

  proto.restore = function() {
    const { matrix, block } = this._lastState;

    this.matrix.x = matrix.x;
    this.matrix.y = matrix.y;
    this.matrix.matrix = copy(matrix.matrix);

    this.block.x = block.x;
    this.block.y = block.y;
    this.block.shape.index = block.index;
  };
}
