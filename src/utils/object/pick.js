export function pick (object) {
  const array = Object.keys(object)
  const index = Math.floor(Math.random() * array.length)

  return object[array[index]]
}
