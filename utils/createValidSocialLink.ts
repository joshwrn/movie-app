export const createValidSocialLink = <A>(
  name: string,
  id: string,
  urls: A
): {
  name: string
  url: string
} => {
  const url = urls[name.toLowerCase()]
  if (!url) return { name, url: null }
  return {
    name: name,
    url: id && `${url}${id}`,
  }
}
