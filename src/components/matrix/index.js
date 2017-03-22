import { extend } from "../../utils/object";
import { create } from "../../utils/array2";

export default class Matrix {
  constructor(options) {
    this._options = extend(
      {
        row: 20,
        col: 10,
        x: 0,
        y: 0,
      },
      options
    );

    this.x = this._options.x;
    this.y = this._options.y;
    this.row = this._options.row;
    this.col = this._options.col;

    this.reset();
  }

  get coordinate() {
    return {
      x: this.x,
      y: this.y,
      array: this.matrix,
    };
  }

  reset() {
    this.matrix = create(this.row, this.col);
  }
}
