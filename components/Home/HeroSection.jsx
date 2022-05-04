import React from 'react';
import { getImage } from '../../lib/tmdb';
import styled from 'styled-components';

const HeroSection = ({ movies, user }) => {
  return (
    <HeroContainer>
      <Header>
        Welcome back, <HeaderUser>{user}.</HeaderUser> Here's what people are
        watching.
      </Header>
      <MovieList>
        {movies.map((movie) => (
          <MoviePosterContainer key={movie.id}>
            <MoviePoster src={getImage('w342', movie.poster_path)} />
          </MoviePosterContainer>
        ))}
      </MovieList>
      <BackdropGradient />
      <Backdrop src={getImage('w1280', movies[0].backdrop_path)} />
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  color: white;
  margin-top: 190px;
  gap: 70px;
`;

const BackdropGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 670px;
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
  height: 670px;
  object-fit: cover;
  z-index: -2;
`;

const Header = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: white;
`;

const HeaderUser = styled.span`
  font-size: 36px;
  font-weight: 700;
`;

const MovieList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
`;

const MoviePosterContainer = styled.div`
  flex: 1;
`;

const MoviePoster = styled.img`
  border-radius: 18px;
  object-fit: cover;
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: auto;
`;

export default HeroSection;
