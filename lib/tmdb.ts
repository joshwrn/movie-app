export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

export const getImage = (size: string, path: string) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
}
export const getPopular = `
https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}`

type MovieId = string
type PersonId = string

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
