import type { FC } from "react"
import React, { useState } from "react"

import type { MovieTypes } from "@customTypes/MovieTypes"
import { getBackdropImage, getImage } from "@lib/tmdb"
import { DEVICE } from "@styles/devices"
import { motion, AnimatePresence } from "framer-motion"
import { ColorExtractor } from "react-color-extractor"
import styled from "styled-components"

import MovieCard from "../reusable/MovieCard"

const HeroSection: FC<{
  movies: MovieTypes[]
  user: string
}> = ({ movies, user }) => {
  const [currentMovie, setCurrentMovie] = useState<number>(0)
  const [color, setColor] = useState({})

  return (
    <HeroContainer>
      <HeaderContainer>
        <Header>
          Welcome back, <HeaderUser>{user}. </HeaderUser>
          {`Here's what people are
          watching.`}
        </Header>
      </HeaderContainer>
      <MovieList>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie?.id ?? index}
            movie={movie}
            index={index}
            currentMovie={currentMovie}
            setCurrentMovie={setCurrentMovie}
          />
        ))}
      </MovieList>
      <BackdropTop color={`#000000`} />
      {movies[0] &&
        movies.map((movie, index) => {
          return (
            <AnimatePresence key={movie.id} mode="wait">
              {currentMovie === index && (
                <BackdropContainer
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                >
                  <ColorExtractor
                    src={getBackdropImage(`w300`, movie.backdrop_path)}
                    getColors={(colors: string[]) =>
                      setColor({ [index]: colors[0] })
                    }
                  />
                  <BackdropGradient color={color[currentMovie]} />
                  <Backdrop src={getImage(`w1280`, movie.backdrop_path)} />
                </BackdropContainer>
              )}
            </AnimatePresence>
          )
        })}
    </HeroContainer>
  )
}

const BackdropContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
`

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100%;
  color: var(--font-color-primary);
  margin-top: 190px;
  gap: 70px;
`

const BackdropGradient = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  z-index: 1;
  background: ${({ color }) => `linear-gradient(
    180deg,
    ${color}CC 0%,
    ${color}B3 52.89%,
    var(--background-primary) 100%
  );`};
  opacity: 1;
`
const BackdropTop = styled(BackdropGradient)`
  display: ${({ theme }) => (theme.type === `light` ? `none` : `block`)};
  z-index: 2;
  opacity: 1;
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
  color: var(--font-color-content-primary);
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
  padding: 0 var(--padding-h);
`

const HeaderUser = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: var(--font-color-content-primary);
`

const MovieList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5%;
  z-index: 3;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  position: relative;
  @media ${DEVICE.mobile} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    overflow-x: auto;
    width: 100vw;
    gap: var(--padding-h);
    scroll-snap-type: x mandatory;
    padding: 0 var(--padding-h);
    scroll-padding: 0 var(--padding-h);
  }
`

export default HeroSection
