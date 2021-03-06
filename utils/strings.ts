export const trimContent = (content: string, maxLength: number): string => {
  return content.length > maxLength
    ? content.slice(0, maxLength) + '...'
    : content
}

export const getFirstRole = (roles: string) => {
  if (!roles) return ''
  for (let i = 0; i < roles.length; i++) {
    if (roles[i] === '/' || roles[i] === '(') {
      return roles.slice(0, i - 1)
    }
  }
  return roles
}

export const createValidSocialLink = <A>(name: string, id: string, urls: A) => {
  const url = urls[name.toLowerCase()]
  if (!url) return { name, url: null }
  return {
    name: name,
    url: id && `${url}${id}`,
  }
}
