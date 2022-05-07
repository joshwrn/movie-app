export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const getImage = (size, path) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';
};

export const getReviews = (movie) => {
  return `https://api.themoviedb.org/3/movie/${movie}/reviews?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
};

export const getPopular = `
https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}`;

export const getMovie = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`;
};

export const getCredits = (movieId) => {
  return `
  https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}&language=en-US`;
};

export const getTrailers = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`;
};

export const getRelated = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${MOVIE_API_KEY}&language=en-US&page=1 
  `;
};
