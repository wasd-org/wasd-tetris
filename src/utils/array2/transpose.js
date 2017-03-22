export function transpose(array) {
  const row = array.length;
  const col = array[0].length;

  if (!row || !col) {
    return array;
  }

  let ret = [];

  for (let i = 0; i < col; i++) {
    ret.push([]);
    for (let j = 0; j < row; j++) {
      ret[i][j] = array[j][i];
    }
  }

  return ret;
}
