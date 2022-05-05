import React, { useState, useEffect } from 'react';
import { MOVIE_API_KEY } from '../../lib/tmdb';
import { getImage } from '../../lib/tmdb';
import styled from 'styled-components';

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
  console.log(
    'left over',
    (176 / 60).toString().slice(0, 1) + 'H',
    (176 % 60) + 'MIN'
  );
  return (
    <PageContainer>
      <HeroContainer>
        <LeftContainer>
          <MoviePosterContainer>
            <MoviePoster src={getImage('w780', movie.poster_path)} />
          </MoviePosterContainer>
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieInfoSectionSub>{movie.tagline}</MovieInfoSectionSub>
            <MovieInfoSection>
              <MovieInfoSectionTitle>
                {movie.release_date.slice(0, 4)}
              </MovieInfoSectionTitle>
              <MovieInfoSectionTitle>
                <MovieInfoSectionSub>Directed By </MovieInfoSectionSub>
                {credits.crew.find((p) => p.job === 'Director').name}
              </MovieInfoSectionTitle>
            </MovieInfoSection>
          </MovieInfo>
        </LeftContainer>
        <RatingInfo>
          <Rating>
            <RatingLabel>Rating </RatingLabel>
            {movie.vote_average}
          </Rating>
        </RatingInfo>
        <BackdropGradient />
        <Backdrop src={getImage('w1280', movie.backdrop_path)} />
      </HeroContainer>
    </PageContainer>
  );
};

export const getServerSideProps = async (context) => {
  const movieDetails = await fetch(search(context.query.id));
  const movieData = await movieDetails.json();

  const creditsDetails = await fetch(getCredits(context.query.id));
  const creditsData = await creditsDetails.json();

  const trailerDetails = await fetch(getTrailers(context.query.id));
  const trailerData = await trailerDetails.json();

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
  gap: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: fit-content;
  color: ${({ theme }) => theme.fontColor.primary};
  margin-top: 190px;
  width: 100%;
`;

const BackdropGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.72) 52.89%,
    #000000 100%
  );
`;

const Backdrop = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  object-fit: cover;
  z-index: -3;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 30px;
`;

const MoviePosterContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  width: 342px;
`;

const MoviePoster = styled.img`
  border-radius: 18px;
  object-fit: cover;
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: 100%;
  object-position: center;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
`;

const MovieTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const MovieInfoSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 50px;
`;

const MovieInfoSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const MovieInfoSectionSub = styled.span`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

const RatingInfo = styled.div``;

const Rating = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const RatingLabel = styled.span`
  color: ${({ theme }) => theme.fontColor.secondary};
`;

const VideoContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
`;

const Video = styled.iframe`
  position: absolute;
  border: none;
  top: -12%;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2;
`;

export default MovieDetail;
