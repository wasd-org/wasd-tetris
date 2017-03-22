import { transpose } from './transpose';
import { reverseRow, reverseCol } from './reverse';

export function rotate(array, clockwise = true) {
  const transposed = transpose(array);
  if (clockwise) {
    return reverseRow(transposed);
  } else {
    return reverseCol(transposed);
  }
}
