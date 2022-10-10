export const formatISO = (date: string): string => {
  return new Date(date).toLocaleDateString(`en-us`, {
    year: `numeric`,
    month: `short`,
    day: `numeric`,
  })
}
