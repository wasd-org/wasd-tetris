import Matrix from "../matrix";
import { extend } from "../../utils/object";
import { union } from "../../utils/game";

import BlockMixin from "./block";
import LoopMixin from "./loop";
import EventsMixin from "./events";
import StateMixin from "./state";
import KeyboardMixin from "./keyboard";
import MatrixMixin from "./matrix";
import DetectMixin from "./detect";

export default class Tetris {
  constructor(options) {
    this._options = extend(
      {
        matrix: new Matrix(),
        auto: true,
        speed: 500,
      },
      options
    );

    this._events = {};

    this._bind();

    this.reset();

    this.on("hit", () => {
      const { y } = this.block;
      const { margin } = this.block.shape;

      if (y + margin.top < this.matrix.y) {
        this.fail();
      } else {
        this._next();
      }
    });
  }

  get graph() {
    const { coordinate: block } = this.block;
    const { coordinate: matrix } = this.matrix;

    return union(matrix, block);
  }
}

LoopMixin(Tetris);
BlockMixin(Tetris);
EventsMixin(Tetris);
StateMixin(Tetris);
KeyboardMixin(Tetris);
MatrixMixin(Tetris);
DetectMixin(Tetris);
