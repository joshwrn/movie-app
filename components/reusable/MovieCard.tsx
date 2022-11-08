import type { FC } from "react"
import React, { useEffect, useState } from "react"

import type { MovieTypes, OneMovie } from "@customTypes/MovieTypes"
import { getMovie, getPosterImage } from "@lib/tmdb"
import Divider from "@reusable/Divider"
import { Link } from "@reusable/Link"
import { DEVICE } from "@styles/devices"
import { addCommas } from "@utils/addCommas"
import { AnimatePresence, motion } from "framer-motion"
import { ColorExtractor } from "react-color-extractor"
import styled from "styled-components"

import { CircleWithNumber } from "./CircleWithNumber"

const CardOverlay: FC<{
  movie: MovieTypes
  index: number
  color: string[]
  currentMovie: number
}> = ({ currentMovie, index, color, movie: movieBase }) => {
  const [movie, setMovie] = useState<OneMovie | Partial<OneMovie>>({})
  useEffect(() => {
    const getMovieData = async () => {
      const movieData = await getMovie(movieBase.id)
      setMovie(movieData)
    }
    getMovieData()
  }, [movie])

  return (
    <Overlay current={currentMovie === index}>
      <GradientContainer
        initial={{
          y: `200%`,
          scaleY: 1.3,
        }}
        animate={{ y: 0 }}
        exit={{ y: `200%` }}
        transition={{ type: `spring`, stiffness: 100, damping: 23 }}
      >
        <BackgroundGradient accentColors={color} />
      </GradientContainer>
      <MovieInfoContainer
        initial={{
          y: `200%`,
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: `200%`,
          transition: {
            type: `spring`,
            stiffness: 180,
            damping: 30,
            mass: 2,
            delay: 0,
          },
        }}
        transition={{
          type: `spring`,
          stiffness: 180,
          damping: 30,
          mass: 2,
          delay: 0.1,
        }}
      >
        <OverlayHeader>
          <div>
            <h3>{movie.original_title}</h3>
          </div>
        </OverlayHeader>
        <Bottom>
          <MoviePoster src={getPosterImage(`w780`, movie.poster_path)} />
          <CircleWithNumber
            number={movie.vote_average}
            accentColors={[color[0], color[1]]}
            rounded={false}
            size="60px"
            stroke={3}
            fontSize={20}
          />
          <div>
            <h2>{addCommas(movie.vote_count)}</h2>
            <p>Total Votes</p>
          </div>
        </Bottom>
        <Divider />
        <motion.p>{movie.overview}</motion.p>
      </MovieInfoContainer>
    </Overlay>
  )
}

interface CardProps {
  movie: MovieTypes
  index?: number
  currentMovie?: number
  setCurrentMovie?: React.Dispatch<React.SetStateAction<number>>
}

const MovieCard: FC<CardProps> = ({
  movie,
  index,
  currentMovie,
  setCurrentMovie,
}) => {
  const [color, setColor] = useState<string[]>([])
  const [hover, setHover] = useState(false)

  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <MoviePosterContainer
        onMouseEnter={() => setCurrentMovie?.(index)}
        current={index !== undefined && currentMovie === index}
        index={index}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <AnimatePresence>
          {hover && (
            <CardOverlay
              currentMovie={currentMovie}
              index={index}
              color={color}
              movie={movie}
            />
          )}
        </AnimatePresence>
        <ColorExtractor
          src={getPosterImage(`w92`, movie.poster_path)}
          getColors={(colors: string[]) => setColor(colors)}
        />
        <MoviePoster src={getPosterImage(`w780`, movie.poster_path)} />
      </MoviePosterContainer>
    </Link>
  )
}

const Overlay = styled(motion.div)<{ current: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  @media ${DEVICE.tablet} {
    display: none;
  }
`
const MoviePosterContainer = styled.div<{ current: boolean; index: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -5px 10px 0px ${({ current }) => (current ? `#0000003d` : `transparent`)};
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 1s, border-color 0.3s;
  border: 4px solid rgba(0, 0, 0, 0);
  border-color: ${({ current }) =>
    current ? `var(--border-color-primary)` : `transparent`};
  @media ${DEVICE.mobile} {
    flex-shrink: 0;
    width: 70vw;
    scroll-snap-align: center;
    border: none;
  }
`

const MovieInfoContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  transition: filter 0.5s ease-in-out;
  padding: 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  h3 {
    font-size: 24px;
    font-weight: bold;
    @media ${DEVICE.laptop} {
      font-size: 16px;
    }
  }
  > p {
    font-size: 16px;
    color: #ffffffb0;
    overflow-y: auto;
  }
`
const GradientContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(10px);
`
const BackgroundGradient = styled(motion.div)<{ accentColors: string[] }>`
  position: absolute;
  background: linear-gradient(
    180deg,
    ${({ accentColors }) => accentColors[2]} 50%,
    ${({ accentColors }) => accentColors[0]} 100%
  );
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0.7;
`
const OverlayHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  h3 {
    color: var(--font-color-content-primary);
  }
`
const MoviePoster = styled.img`
  object-fit: cover;
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: 100%;
  object-position: center;
  box-shadow: 0 5px 10px 0px #0000003d;
`
const Bottom = styled(motion.div)`
  display: flex;
  width: 100%;
  ${MoviePoster} {
    flex-shrink: 0;
    flex-grow: 0;
    width: 40%;
    border-radius: 6px;
    margin-right: 10px;
  }
  div:last-of-type {
    margin-left: 10px;
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    h2 {
      font-size: 16px;
      color: var(--font-color-primary);
    }
    p {
      color: var(--font-color-secondary);
      font-size: 12px;
      font-weight: 300;
      color: var(--font-color-secondary);
      white-space: nowrap;
    }
  }
`
export default MovieCard
