import { slice } from "./slice";
import { intersect as intersectArray2 } from "../array2";

export function intersect(a, b) {
  const { x: ax, y: ay, array: aArray } = a;
  const aRow = aArray.length;
  const aCol = aArray[0].length;
  const aStartX = ax;
  const aEndX = aStartX + aCol;
  const aStartY = ay;
  const aEndY = aStartY + aRow;

  const { x: bx, y: by, array: bArray } = b;
  const bRow = bArray.length;
  const bCol = bArray[0].length;
  const bStartX = bx;
  const bEndX = bStartX + bCol;
  const bStartY = by;
  const bEndY = bStartY + bRow;

  if (aEndX < bStartX || aEndY < bStartY) return false;
  if (aStartX > bEndX || aStartY > bEndY) return false;

  const startX = Math.max(aStartX, bStartX);
  const startY = Math.max(aStartY, bStartY);
  const endX = Math.min(aEndX, bEndX);
  const endY = Math.min(aEndY, bEndY);

  const slicedA = slice({
    block: a,
    startX,
    endX,
    startY,
    endY,
  });

  const slicedB = slice({
    block: b,
    startX,
    endX,
    startY,
    endY,
  });

  return intersectArray2(slicedA.array, slicedB.array);
}
