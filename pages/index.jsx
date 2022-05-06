import { MOVIE_API_KEY } from '../lib/tmdb';

import HeroSection from '../components/Home/HeroSection';
import TrendingSection from '../components/Home/TrendingSection';
import SocialSection from '../components/Home/SocialSection';
import Footer from '../components/Footer/Footer';
import { getImage } from '../lib/tmdb';

import styled from 'styled-components';

const Index = ({ movies, movieReviews }) => {
  const topMovies = movies.slice(0, 4);
  const trendingMovies = movies.slice(4, 8);
  return (
    <PageContainer>
      <HeroSection movies={topMovies} user={'josh'} />
      <TrendingSection movies={trendingMovies} />
      <SocialSection movieReviews={movieReviews} />
      <Footer />
    </PageContainer>
  );
};

const search = `
https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}`;

const getReviews = (movie) => {
  return `https://api.themoviedb.org/3/movie/${movie}/reviews?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
};

const fetchReviews = async (movieList) => {
  const temp = [];
  if (!movieList) return temp;
  for (let i = 0; i < movieList.length; i++) {
    if (temp.length > 5) return temp;

    const res = await fetch(getReviews(movieList[i].id));
    const data = await res.json();
    data &&
      data.results &&
      data.results[0] &&
      temp.push({
        reviewInfo: data.results[0],
        title: movieList[i].title,
        image: getImage('w1280', movieList[i].backdrop_path),
      });
  }
  return temp;
};

export async function getStaticProps() {
  const popularRes = await fetch(search);
  const popularResults = await popularRes.json();
  const popular = popularResults.results;

  const reviews = await fetchReviews(popular);
  return {
    props: {
      movies: popular,
      movieReviews: reviews,
    },
  };
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`;

export default Index;
