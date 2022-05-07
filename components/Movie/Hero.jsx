import React from 'react';

import { getImage } from '../../lib/tmdb';
import styled from 'styled-components';
import { ColorExtractor } from 'react-color-extractor';

import { useColor } from '../../contexts/MovieInfoContext';

const addCommas = (num) => {
  if (!num) return '';
  const arr = num.toString().split('').reverse();
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newArr.push(',');
    }
    newArr.push(arr[i]);
  }
  return newArr.reverse();
};

const addZero = (num) => {
  if (!num) return '';
  const str = num.toString().split('');
  if (str.includes('.')) return str.join('');
  return str.join('') + '.0';
};

const MovieDetailHero = ({ movie, credits }) => {
  const { setColor } = useColor();

  return (
    <HeroContainer>
      <LeftContainer>
        <MoviePosterContainer>
          <ColorExtractor getColors={(colors) => setColor(colors[0])}>
            <img
              style={moviePoster}
              src={getImage('w780', movie.poster_path)}
            />
          </ColorExtractor>
        </MoviePosterContainer>
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
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
          {addZero(movie.vote_average)}
        </Rating>
        <MovieInfoSectionTitle>
          <MovieInfoSectionSub>Total Votes</MovieInfoSectionSub>
          {addCommas(movie.vote_count)}
        </MovieInfoSectionTitle>
      </RatingInfo>
      <BackdropGradient />
      <Backdrop src={getImage('w1280', movie.backdrop_path)} />
    </HeroContainer>
  );
};

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
  z-index: 1;
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
  gap: 50px;
  z-index: 2;
`;

const MoviePosterContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  width: 342px;
`;

const moviePoster = {
  borderRadius: '18px',
  objectFit: 'cover',
  cursor: 'pointer',
  flex: 1,
  width: '100%',
  height: '100%',
  objectPosition: 'center',
};

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 750px;
`;

const MovieTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const MovieInfoSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

const MovieInfoSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  gap: 12px;
`;

const MovieInfoSectionSub = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

const RatingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  z-index: 2;
`;

const Rating = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const RatingLabel = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

export default MovieDetailHero;