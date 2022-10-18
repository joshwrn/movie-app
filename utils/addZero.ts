export const addZero = (num: number): string => {
  if (!num) return ``
  const str = num.toFixed(1).toString().split(``)
  if (str.includes(`.`)) return str.join(``)
  return str.join(``) + `.0`
}
