import React, { useState } from 'react'
import MovieCard from './MovieCard'
import { getImage } from '../../lib/tmdb'

import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

import { MovieTypes } from '@customTypes/MovieTypes'

const HeroSection = ({
  movies,
  user,
}: {
  movies: MovieTypes[]
  user: string
}) => {
  const [currentMovie, setCurrentMovie] = useState<number>(0)

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
          <MovieCard
            key={movie.id}
            movie={movie}
            index={index}
            currentMovie={currentMovie}
            setCurrentMovie={setCurrentMovie}
          />
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
        )
      })}
    </HeroContainer>
  )
}

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  color: ${({ theme }) => theme.fontColor.primary};
  margin-top: 190px;
  gap: 70px;
`

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
`

const Backdrop = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  object-fit: cover;
`

const Header = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor.primary};
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
`

const HeaderUser = styled.span`
  font-size: 36px;
  font-weight: 700;
`

const MovieList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5%;
  z-index: 2;
`

export default HeroSection
