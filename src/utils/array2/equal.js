export function equal (a, b) {
  const aLength = a.length
  const bLength = b.length

  if (aLength !== bLength) {
    return false
  }

  for (let i = 0; i < aLength; i++) {
    const aArray = a[i]
    const bArray = b[i]

    const aArrayLength = aArray.length
    const bArrayLength = bArray.length

    if (aArrayLength !== bArrayLength) {
      return false
    }

    for (let j = 0; j < aArrayLength; j++) {
      if (aArray[j] !== bArray[j]) {
        return false
      }
    }
  }

  return true
}
