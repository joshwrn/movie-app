import React, { useState } from 'react';
import { getImage } from '../../lib/tmdb';
import styled from 'styled-components';

import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = ({ movies, user }) => {
  const [currentMovie, setCurrentMovie] = useState(0);

  return (
    <HeroContainer>
      <HeaderContainer>
        <Header>
          Welcome back, <HeaderUser>{user}.</HeaderUser> Here's what people are
          watching.
        </Header>
      </HeaderContainer>
      <MovieList>
        {movies.map((movie, index) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
            <MoviePosterContainer
              onMouseEnter={() => setCurrentMovie(index)}
              current={currentMovie === index}
            >
              <MoviePoster src={getImage('w780', movie.poster_path)} />
            </MoviePosterContainer>
          </Link>
        ))}
      </MovieList>
      <BackdropGradient />

      {movies.map((movie, index) => {
        return (
          <AnimatePresence key={movie.id} exitBeforeEnter>
            {currentMovie === index && (
              <Backdrop
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65 }}
                src={getImage('w1280', movie.backdrop_path)}
              />
            )}
          </AnimatePresence>
        );
      })}
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  color: ${({ theme }) => theme.fontColor.primary};
  margin-top: 190px;
  gap: 70px;
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

const Backdrop = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  object-fit: cover;
  z-index: -2;
`;

const Header = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderUser = styled.span`
  font-size: 36px;
  font-weight: 700;
`;

const MovieList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5%;
`;

const MoviePosterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -5px 10px 0px ${({ current }) => (current ? '#0000005e' : 'transparent')};
  border-radius: 18px;
  transform: translateY(${({ current }) => (current ? '-5px' : '0')});
  transition: transform 0.3s ease-in-out, box-shadow 1s;
  &:hover {
    transform: translateY(-5px);
  }
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

export default HeroSection;
