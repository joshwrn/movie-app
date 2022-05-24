import React from 'react'
import Link from 'next/link'
import { getImage } from '../../lib/tmdb'

import styled from 'styled-components'

import { MovieTypes } from '../../types/MovieTypes'

interface CardProps {
  movie: MovieTypes
  index: number
  currentMovie: number
  setCurrentMovie: React.Dispatch<React.SetStateAction<number>>
}

const MovieCard = ({
  movie,
  index,
  currentMovie,
  setCurrentMovie,
}: CardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <MoviePosterContainer
        onMouseEnter={() => setCurrentMovie(index)}
        current={currentMovie === index}
      >
        <Overlay current={currentMovie === index}>
          <Text>{movie.overview.slice(0, 200)}</Text>
        </Overlay>
        <MoviePoster src={getImage('w780', movie.poster_path)} />
      </MoviePosterContainer>
    </Link>
  )
}

const Text = styled.p`
  position: absolute;
  bottom: 0;
  filter: blur(10px);
  transition: filter 0.5s ease-in-out;
  color: ${({ theme }) => theme.fontColor.secondary};
`

const Overlay = styled.div<{ current: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform: translateY(100%);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 52.89%,
    #000000 100%
  );
  transition: transform 0.3s ease-in-out;
`

const MoviePosterContainer = styled.div<{ current: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -5px 10px 0px ${({ current }) => (current ? '#0000005e' : 'transparent')};
  border-radius: 18px;
  overflow: hidden;
  transform: translateY(${({ current }) => (current ? '-5px' : '0')});
  transition: transform 0.3s ease-in-out, box-shadow 1s;
  &:hover {
    transform: translateY(-5px);
    ${Overlay} {
      transform: translateY(0);
    }
    ${Text} {
      filter: blur(0);
    }
  }
`

const MoviePoster = styled.img`
  border-radius: 18px;
  object-fit: cover;
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: 100%;
  object-position: center;
`

export default MovieCard
