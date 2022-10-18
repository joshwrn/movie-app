export const addCommas = (num: number): string => {
  if (!num) return ``
  const arr = num.toString().split(``).reverse()
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newArr.push(`,`)
    }
    newArr.push(arr[i])
  }
  return newArr.reverse().join(``)
}
