export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const getImage = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
