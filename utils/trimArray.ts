export const trimArray = <T>(arr: T[], start: number, count: number): T[] => {
  if (!arr) return []
  return arr.length > count ? arr.slice(start, count) : arr
}
