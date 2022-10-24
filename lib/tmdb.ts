export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

const DEFAULT_IMAGE = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`

type ProfileImageSizes = `h632` | `original` | `w45` | `w185`
type BackdropImageSizes = `original` | `w300` | `w780` | `w1280`
type LogoImageSizes =
  | `original`
  | `w45`
  | `w92`
  | `w154`
  | `w185`
  | `w300`
  | `w500`
type PosterImageSizes =
  | `original`
  | `w92`
  | `w154`
  | `w185`
  | `w342`
  | `w500`
  | `w780`
type StillImageSizes = `original` | `w92` | `w185` | `w300`
export const getImage = (
  size: string,
  path: string,
  alt: string = DEFAULT_IMAGE
): string => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : alt
}
export const getProfileImage = (
  size: ProfileImageSizes,
  path: string
): string => {
  return getImage(size, path)
}
export const getBackdropImage = (
  size: BackdropImageSizes,
  path: string
): string => {
  return getImage(size, path)
}
export const getLogoImage = (size: LogoImageSizes, path: string): string => {
  return getImage(size, path)
}
export const getPosterImage = (size: PosterImageSizes, path: string): string => {
  return getImage(size, path)
}
export const getStillImage = (size: StillImageSizes, path: string): string => {
  return getImage(size, path)
}

type Id = number | string
type UrlFn = (id: Id, page?: number) => string
const BASE_URL = `https://api.themoviedb.org/3`

const buildUrl = ({
  id,
  property,
  mediaType,
  page,
}: {
  id: Id
  mediaType: string
  property?: string
  page?: number
}): string =>
  `${BASE_URL}/${mediaType}/${id}${
    property ? `/${property}` : ``
  }?api_key=${MOVIE_API_KEY}&language=en-US${page ? `&page=${page}` : ``}`

export const getPopular = `
${BASE_URL}/trending/movie/day?api_key=${MOVIE_API_KEY}`

export const getMovie: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `movie`,
  })
export const getCredits: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `movie`,
    property: `credits`,
  })
export const getTrailers: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `movie`,
    property: `videos`,
  })
export const getRelated: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `movie`,
    property: `similar`,
  })
export const getReviews: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `movie`,
    property: `reviews`,
  })

// people
export const getPersonCredits: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `person`,
    property: `movie_credits`,
    page: 1,
  })
export const getPersonSocials: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `person`,
    property: `external_ids`,
    page: 1,
  })
export const getPersonDetails: UrlFn = (id) =>
  buildUrl({
    id,
    mediaType: `person`,
    page: 1,
  })

// search
export const searchMulti = (query: string): string => {
  return `${BASE_URL}/search/multi?api_key=${MOVIE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
}
