import { intersect as intersectArray } from "../array";

export function intersect(a, b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0, l = length; i < l; i++) {
    if (intersectArray(a[i], b[i])) return true;
  }

  return false;
}
