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

type MovieId = number | string
const BASE_URL = `https://api.themoviedb.org/3`
export const getPopular = `
${BASE_URL}/trending/movie/day?api_key=${MOVIE_API_KEY}`
export const getMovie = (movieId: MovieId): string => {
  return `${BASE_URL}/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
}
export const getCredits = (movieId: MovieId): string => {
  return `
  ${BASE_URL}/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}&language=en-US`
}
export const getTrailers = (movieId: MovieId): string => {
  return `${BASE_URL}/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`
}
export const getRelated = (movieId: MovieId): string => {
  return `${BASE_URL}/movie/${movieId}/similar?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
export const getReviews = (movieId: MovieId): string => {
  return `${BASE_URL}/movie/${movieId}/reviews?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
}

// people
type PersonId = number | string
export const getPersonCredits = (personId: PersonId): string => {
  return `${BASE_URL}/person/${personId}/movie_credits?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
export const getPersonSocials = (personId: PersonId): string => {
  return `${BASE_URL}/person/${personId}/external_ids?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
export const getPersonDetails = (personId: PersonId): string => {
  return `${BASE_URL}/person/${personId}?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}

// search
export const searchMulti = (query: string): string => {
  return `${BASE_URL}/search/multi?api_key=${MOVIE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
}
