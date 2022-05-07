import React from 'react';
import styled from 'styled-components';

import MovieDetailHero from '../../components/Movie/Hero';
import MovieInfoSection from '../../components/Movie/MovieInfoSection';

import {
  getMovie,
  getCredits,
  getTrailers,
  getRelated,
  getReviews,
} from '../../lib/tmdb';

import { ColorProvider } from '../../contexts/MovieInfoContext';

const MovieDetail = ({ movie, credits, trailer, related, reviews }) => {
  return (
    <PageContainer>
      <ColorProvider>
        <MovieDetailHero movie={movie} credits={credits} />
        <MovieInfoSection
          movie={movie}
          credits={credits}
          trailer={trailer}
          related={related}
          reviews={reviews}
        />
      </ColorProvider>
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

  const [movieData, creditsData, trailerData, relatedData, reviewsData] =
    await Promise.all([
      getResults(id, getMovie),
      getResults(id, getCredits),
      getResults(id, getTrailers),
      getResults(id, getRelated),
      getResults(id, getReviews),
    ]);

  const trailer = trailerData.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return {
    props: {
      movie: movieData,
      credits: creditsData,
      trailer: trailer.key,
      related: relatedData.results,
      reviews: reviewsData.results,
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
