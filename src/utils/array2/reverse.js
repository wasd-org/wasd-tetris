import { copy } from "./copy";

export function reverseRow(array) {
  return copy(array).map(a => a.reverse());
}

export function reverseCol(array) {
  return copy(array).reverse();
}

export function reverse(array) {
  return reverseRow(reverseCol(array));
}
