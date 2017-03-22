import Shape from "./index";
import { pick } from "../../utils/object";

const shapes = {
  I: [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],

  J: [[0, 0, 0], [1, 1, 1], [0, 0, 1]],

  L: [[0, 0, 0], [1, 1, 1], [1, 0, 0]],

  O: [[1, 1], [1, 1]],

  S: [[0, 0, 0], [0, 1, 1], [1, 1, 0]],

  T: [[0, 0, 0], [1, 1, 1], [0, 1, 0]],

  Z: [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
};

let _ = {};

for (let key in shapes) {
  _[key] = new Shape(shapes[key]);
}

export function create(type) {
  if (!type) {
    return pick(_);
  } else {
    return _[type].clone();
  }
}

export default _;
