export const formatRuntime = (runtime: number): string => {
  if (!runtime) return ``
  const hours = (runtime / 60).toString().slice(0, 1)
  let minutes = (runtime % 60).toString().slice(0)
  if (minutes.length === 1) {
    minutes = `0` + minutes
  }
  return hours + `H ` + minutes + `M`
}
