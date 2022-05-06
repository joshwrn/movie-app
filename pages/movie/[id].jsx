import React from 'react';
import { MOVIE_API_KEY } from '../../lib/tmdb';
import styled from 'styled-components';

import MovieDetailHero from '../../components/Movie/Hero';
import MovieInfoSection from '../../components/Movie/MovieInfoSection';

const search = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`;
};

const getCredits = (movieId) => {
  return `
  https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}&language=en-US`;
};

const getTrailers = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`;
};

const MovieDetail = ({ movie, credits, trailer }) => {
  return (
    <PageContainer>
      <MovieDetailHero movie={movie} credits={credits} trailer={trailer} />
      <MovieInfoSection movie={movie} credits={credits} trailer={trailer} />
    </PageContainer>
  );
};

const getResults = async (id, f) => {
  const dataRes = await fetch(f(id));
  const data = await dataRes.json();
  return data;
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;

  const [movieData, creditsData, trailerData] = await Promise.all([
    getResults(id, search),
    getResults(id, getCredits),
    getResults(id, getTrailers),
  ]);

  const trailer = trailerData.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return {
    props: {
      movie: movieData,
      credits: creditsData,
      trailer: trailer.key,
    },
  };
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 75px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`;

export default MovieDetail;
