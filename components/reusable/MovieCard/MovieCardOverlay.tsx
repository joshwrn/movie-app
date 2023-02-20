import type { FC } from "react"
import React from "react"

import type { MovieTypes } from "@customTypes/MovieTypes"
import { useCast } from "@hooks/useCast"
import { useMovie } from "@hooks/useMovie"
import { getPosterImage } from "@lib/tmdb"
import Divider from "@reusable/Divider"
import { DEVICE } from "@styles/devices"
import { motion } from "framer-motion"
import styled from "styled-components"

import { CircleWithNumber } from "../CircleWithNumber"

export const CardOverlay: FC<{
  movie: MovieTypes
  index: number
  color: string[]
  currentMovie: number
}> = ({ currentMovie, index, color, movie: movieBase }) => {
  const { movie } = useMovie({ id: movieBase.id })
  const { cast } = useCast({ id: movieBase.id })
  return (
    <Overlay current={currentMovie === index}>
      <GradientContainer
        initial={{
          y: `200%`,
          scaleY: 1.3,
          scaleX: 1,
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
        <div
          style={{
            width: `100%`,
          }}
        >
          <OverlayHeader>
            <h3>{movie.original_title}</h3>
          </OverlayHeader>
          <ReleaseContainer>
            <h4>Release Date</h4>
            <p>{movie.release_date.slice(0, 4)}</p>
          </ReleaseContainer>
        </div>
        <Top>
          <MoviePoster
            style={{ position: `relative` }}
            src={getPosterImage(`w780`, movie.poster_path)}
          />
          <InfoContainer>
            <InfoTop>
              <CircleWithNumber
                number={movie.vote_average}
                accentColors={[color[0], color[1]]}
                rounded={false}
                size="60px"
                stroke={3}
                fontSize={20}
              />
              {/* <VoteContainer>
                <h2>{addCommas(movie.vote_count)}</h2>
                <p>Total Votes</p>
              </VoteContainer> */}
            </InfoTop>
            {cast.map((person) => {
              return (
                <CastContainer key={person.credit_id}>
                  {/* <img src={getProfileImage(`w45`, person.profile_path)} /> */}
                  <div>
                    <p>{person.name}</p>
                    <p>{person.character}</p>
                  </div>
                </CastContainer>
              )
            })}
          </InfoContainer>
        </Top>

        <Divider />
        <motion.p>{movie.overview}</motion.p>
      </MovieInfoContainer>
    </Overlay>
  )
}

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

const CastContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    object-fit: cover;
    flex-shrink: 0;
  }
  p {
    font-size: 9px;
    color: var(--font-color-content-secondary);
    :first-of-type {
      font-size: 12px;
      font-weight: 500;
      color: var(--font-color-content-primary);
    }
  }
`
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

const GradientContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(10px);
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
const OverlayHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  h3 {
    color: var(--font-color-content-primary);
    span {
      color: var(--font-color-content-secondary);
      font-size: 16px;
      margin-left: auto;
    }
  }
`
export const MoviePoster = styled(motion.img)`
  object-fit: cover;
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: 100%;
  object-position: center;
  position: absolute;
  box-shadow: 0 5px 10px 0px #0000003d;
`

const Top = styled(motion.div)`
  display: flex;
  width: 100%;
  ${MoviePoster} {
    flex-shrink: 0;
    flex-grow: 0;
    width: 40%;
    border-radius: 6px;
    margin-right: 10px;
  }
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  align-items: flex-start;
`
const InfoTop = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
`
const ReleaseContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  h4 {
    color: var(--font-color-secondary);
  }
  p {
    font-weight: 500;
  }
`
