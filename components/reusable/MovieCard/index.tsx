import type { FC } from "react"
import React, { useState } from "react"

import type { MovieTypes } from "@customTypes/MovieTypes"
import { getPosterImage } from "@lib/tmdb"
import { Link } from "@reusable/Link"
import { DEVICE } from "@styles/devices"
import { AnimatePresence, motion } from "framer-motion"
import { ColorExtractor } from "react-color-extractor"
import styled from "styled-components"

import { LoadingCard } from "../LoadingCard"
import { CardOverlay, MoviePoster } from "./MovieCardOverlay"

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
    <Link href={`/movie/${movie?.id}`} passHref>
      <MoviePosterContainer
        onMouseEnter={() => setCurrentMovie?.(index)}
        current={index !== undefined && currentMovie === index}
        index={index}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <LoadingCard />
        {movie && (
          <>
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
            <AnimatePresence>
              <MoviePoster
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  type: `spring`,
                  bounce: 0,
                  duration: 1,
                }}
                src={getPosterImage(`w780`, movie.poster_path)}
              />
            </AnimatePresence>
          </>
        )}
      </MoviePosterContainer>
    </Link>
  )
}

export const MoviePosterContainer = styled.div<{
  current: boolean
  index: number
}>`
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
export const BackgroundGradient = styled(motion.div)<{ accentColors: string[] }>`
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

export default MovieCard
