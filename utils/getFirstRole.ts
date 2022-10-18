export const getFirstRole = (roles: string): string => {
  if (!roles) return ``
  for (let i = 0; i < roles.length; i++) {
    if (roles[i] === `/` || roles[i] === `(`) {
      return roles.slice(0, i - 1)
    }
  }
  return roles
}
