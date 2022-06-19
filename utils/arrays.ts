export const trimArray = <T>(arr: T[], start: number, count: number): T[] => {
  return arr.length > count ? arr.slice(start, count) : arr
}
