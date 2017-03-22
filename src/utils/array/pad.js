export function padStart(array, targetLength = 0, pad = 0) {
  const length = array.length;

  if (length > targetLength) {
    return array.slice();
  }

  const extra = Array(targetLength - length).fill(pad);

  return extra.concat(array);
}

export function padEnd(array, targetLength, pad = 0) {
  const length = array.length;

  if (length > targetLength) {
    return array.slice();
  }

  const extra = Array(targetLength - length).fill(pad);

  return array.concat(extra);
}
