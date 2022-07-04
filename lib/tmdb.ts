export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

const DEFAULT_IMAGE =
  'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'

type ProfileImageSizes = 'w45' | 'w185' | 'h632' | 'original'
type BackdropImageSizes = 'w300' | 'w780' | 'w1280' | 'original'
type LogoImageSizes =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w500'
  | 'original'
type PosterImageSizes =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original'
type StillImageSizes = 'w92' | 'w185' | 'w300' | 'original'
export const getImage = (
  size: string,
  path: string,
  alt: string = DEFAULT_IMAGE
) => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : alt
}
export const getProfileImage = (size: ProfileImageSizes, path: string) => {
  return getImage(size, path)
}
export const getBackdropImage = (size: BackdropImageSizes, path: string) => {
  return getImage(size, path)
}
export const getLogoImage = (size: LogoImageSizes, path: string) => {
  return getImage(size, path)
}
export const getPosterImage = (size: PosterImageSizes, path: string) => {
  return getImage(size, path)
}
export const getStillImage = (size: StillImageSizes, path: string) => {
  return getImage(size, path)
}

type MovieId = number | string
export const getPopular = `
https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}`
export const getMovie = (movieId: MovieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
}
export const getCredits = (movieId: MovieId) => {
  return `
  https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}&language=en-US`
}
export const getTrailers = (movieId: MovieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`
}
export const getRelated = (movieId: MovieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
export const getReviews = (movieId: MovieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
}

// people
type PersonId = string | number
export const getPersonCredits = (personId: PersonId) => {
  return `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
export const getPersonSocials = (personId: PersonId) => {
  return `https://api.themoviedb.org/3/person/${personId}/external_ids?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
export const getPersonDetails = (personId: PersonId) => {
  return `https://api.themoviedb.org/3/person/${personId}?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `
}
