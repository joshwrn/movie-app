import { MOVIE_API_KEY } from '../lib/tmdb';

import Nav from '../components/Nav/Nav';
import HeroSection from '../components/Home/HeroSection';
import TrendingSection from '../components/Home/TrendingSection';
import SocialSection from '../components/Home/SocialSection';
import Footer from '../components/Footer/Footer';

import styled from 'styled-components';

const Index = ({ movies }) => {
  const topMovies = movies.results.slice(0, 4);
  const trendingMovies = movies.results.slice(4, 8);
  return (
    <Wrapper>
      <Nav />
      <PageContainer>
        <HeroSection movies={topMovies} user={'josh'} />
        <TrendingSection movies={trendingMovies} />
        <SocialSection movieList={movies.results} />
        <Footer />
      </PageContainer>
    </Wrapper>
  );
};

const search = `
https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}`;

export async function getStaticProps() {
  const popularRes = await fetch(search);
  const popular = await popularRes.json();
  return {
    props: {
      movies: popular,
    },
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

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
