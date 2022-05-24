import HeroSection from '../components/Home/HeroSection';
import TrendingSection from '../components/Home/TrendingSection';
import SocialSection from '../components/Home/SocialSection';
import { getImage, getReviews, getPopular } from '../lib/tmdb';

import styled from 'styled-components';
import { MovieTypes, MovieReviewTypes } from '../types/MovieTypes';

interface Props {
  movies: MovieTypes[];
  movieReviews: MovieReviewTypes[];
}

const Index = ({ movies, movieReviews }: Props) => {
  const topMovies = movies.slice(0, 4);
  const trendingMovies = movies.slice(4, 8);
  return (
    <PageContainer>
      <HeroSection movies={topMovies} user={'josh'} />
      <TrendingSection movies={trendingMovies} />
      <SocialSection movieReviews={movieReviews} />
    </PageContainer>
  );
};

const fetchReviews = async (movieList: MovieTypes[]) => {
  const temp = [];
  if (!movieList) return temp;
  for (let i = 0; i < movieList.length; i++) {
    if (temp.length > 5) return temp;

    const res = await fetch(getReviews(movieList[i].id));
    const data = await res.json();
    if (data && data.results && data.results[0]) {
      temp.push({
        reviewInfo: data.results[0],
        title: movieList[i].title,
        image: getImage('w1280', movieList[i].backdrop_path),
      });
    }
  }
  return temp;
};

export async function getStaticProps() {
  const popularRes = await fetch(getPopular);
  const popularResults = await popularRes.json();
  const popular = popularResults ? popularResults.results : [];

  const reviews = await fetchReviews(popular);

  return {
    props: {
      movies: popular ? popular : [],
      movieReviews: reviews ? reviews : [],
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
`;

export default Index;
