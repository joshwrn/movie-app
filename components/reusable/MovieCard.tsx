import type { FC } from "react"
import React, { useState } from "react"

import type { MovieTypes } from "@customTypes/MovieTypes"
import { getPosterImage } from "@lib/tmdb"
import Divider from "@reusable/Divider"
import { device } from "@styles/devices"
import { trimContent } from "@utils/strings"
import Link from "next/link"
import { ColorExtractor } from "react-color-extractor"
import styled from "styled-components"

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
  const [color, setColor] = useState<string[]>([`#ffffff0`, `#ffffff0`])
  const [isHovered, setIsHovered] = useState(false)
  const percent = (movie.vote_average / 10) * 100
  const overview = trimContent(movie.overview, 150)
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <MoviePosterContainer
        onMouseEnter={() => setCurrentMovie?.(index)}
        current={index !== undefined && currentMovie === index}
        index={index}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Overlay color={color[0]} current={currentMovie === index}>
          <div />
          <MovieInfoContainer>
            <BackgroundGradient color={color[0]} />
            <OverlayHeader>
              <div>
                <h3>{movie.original_title}</h3>
              </div>
              {/* <ReviewCardRating>
                <h2>{movie.vote_average.toFixed(1)}</h2>
                <CircleContainer>
                  <Circle
                    radius={35}
                    stroke={4}
                    progress={isHovered ? percent : 0}
                    accentColor={color}
                  />
                </CircleContainer>
              </ReviewCardRating> */}
            </OverlayHeader>
            <Divider />
            <p>{overview}</p>
          </MovieInfoContainer>
        </Overlay>
        <ColorExtractor
          src={getPosterImage(`w92`, movie.poster_path)}
          getColors={(colors: string[]) => setColor(colors)}
        />
        <MoviePoster src={getPosterImage(`w780`, movie.poster_path)} />
      </MoviePosterContainer>
    </Link>
  )
}

const Overlay = styled.div<{ current: boolean; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform: translateY(500px);
  transition: transform 0.3s ease-in-out;
  @media ${device.tablet} {
    display: none;
  }
  > :first-child {
    position: absolute;
    background: linear-gradient(180deg, rgba(6, 5, 30, 0) 0%, #000000b0 100%);
    border-radius: 16px;
    z-index: 1;
    width: 100%;
    height: 100%;
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
  &:hover {
    transform: translateY(-5px);
    ${Overlay} {
      transform: translateY(0);
      div {
        filter: blur(0px);
      }
    }
  }
  @media ${device.mobile} {
    flex-shrink: 0;
    width: 70vw;
    scroll-snap-align: center;
    border: none;
    &:hover {
      transform: initial;
      ${Overlay} {
        transform: initial;
        div {
          filter: initial;
        }
      }
    }
  }
`

const MovieInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  filter: blur(10px);
  transition: filter 0.5s ease-in-out;
  backdrop-filter: blur(10px);
  padding: 20px 20px;
  width: 100%;
  height: fit-content;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  h3 {
    font-size: 24px;
    font-weight: bold;
    @media ${device.laptop} {
      font-size: 16px;
    }
  }
  > p {
    font-size: 16px;
    color: #ffffffb0;
    height: 100%;
    overflow-y: hidden;
  }
`
const BackgroundGradient = styled.div<{ color: string }>`
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(6, 5, 30, 0) 0%,
    ${({ color }) => color} 100%
  );
  z-index: -1;
  width: 100%;
  height: 100%;
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
const ReviewCardRating = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  > h2 {
    font-size: 24px;
    font-weight: bold;
    color: var(--font-color-content-primary);
  }
`
const CircleContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`

const MoviePoster = styled.img`
  object-fit: cover;
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: 100%;
  object-position: center;
`

export default MovieCard
