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

export const addZero = (num: number): string => {
  if (!num) return ``
  const str = num.toFixed(1).toString().split(``)
  if (str.includes(`.`)) return str.join(``)
  return str.join(``) + `.0`
}

export const formatRuntime = (runtime: number): string => {
  if (!runtime) return ``
  const hours = (runtime / 60).toString().slice(0, 1)
  let minutes = (runtime % 60).toString().slice(0)
  if (minutes.length === 1) {
    minutes = `0` + minutes
  }
  return hours + `H ` + minutes + `M`
}

export const numberToHex = (n: number): string => {
  return Math.floor((1 - n) * 255).toString(16)
}
