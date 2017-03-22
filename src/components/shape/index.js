import { extend } from "../../utils/object";
import { rotate, equal, copy } from "../../utils/array2";

export default class Shape {
  constructor(shape = []) {
    this._shape = shape;
    this._index = 0;

    this.maxCol = (this.maxRow = shape.length);

    this._init();
  }

  clone() {
    return new Shape(this._shape);
  }

  get shape() {
    return this._shapes[this._index];
  }

  get index() {
    return this._index;
  }

  set index(val) {
    this._index = val;
  }

  get margin() {
    const gutter = Array(this.maxCol).fill(0).join("");
    const shape = this.shape;

    const check = array => {
      let start = 0;
      let block = 0;
      let end = 0;

      array.map(a => a.join("")).forEach(a => {
        if (a === gutter) {
          if (!block) {
            start++;
          } else {
            end++;
          }
        } else {
          block++;
        }
      });

      return {
        start,
        block,
        end,
      };
    };

    const { start: top, block: row, end: bottom } = check(shape);
    const { start: left, block: col, end: right } = check(rotate(shape));

    return {
      top,
      row,
      bottom,

      left,
      col,
      right,
    };
  }

  rotate(clockwise = true) {
    if (clockwise) {
      this._index++;
    } else {
      this._index--;
    }

    const length = this._shapes.length;
    if (this._index < 0) {
      this._index = length - 1;
    }

    if (this._index >= length) {
      this._index = 0;
    }

    return this.shape;
  }

  _init() {
    const { _shape: shape } = this;
    const shapes = [shape];
    let lastShape = shape;

    while (true) {
      lastShape = rotate(lastShape);
      if (equal(lastShape, shape)) {
        break;
      } else {
        shapes.push(lastShape);
      }
    }

    this._shapes = shapes;
  }
}
