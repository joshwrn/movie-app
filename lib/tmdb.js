export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const getImage = (size, path) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';
};
