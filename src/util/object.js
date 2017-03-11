export const random = obj => {
  const keys = Object.keys(obj)
  const key = keys[Math.floor(Math.random() * keys.length)]
  return obj[key]
}
