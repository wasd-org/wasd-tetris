export function create(row, col, fill = 0) {
  let ret = [];

  for (let i = 0; i < row; i++) {
    ret.push([]);

    for (let j = 0; j < col; j++) {
      ret[i].push(fill);
    }
  }

  return ret;
}
