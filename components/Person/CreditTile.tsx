import type { FC } from "react"
import React from "react"

import type {
  PersonCastCredit,
  PersonCrewCredit,
} from "@customTypes/PersonTypes"
import { getPosterImage, getBackdropImage } from "@lib/tmdb"
import { CircleWithNumber } from "@reusable/CircleWithNumber"
import { SectionTitle, StandardText } from "@styles/textStyles"
import { motion } from "framer-motion"
import Link from "next/link"
import styled from "styled-components"

import { getFieldsFromISO } from "./PersonCreditTabs"
import { getAccentColorByPopularity } from "./PersonInfo"

type Credit = PersonCastCredit & PersonCrewCredit

export const CreditTile: FC<{ movie: Credit }> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <Tile
        whileTap={{ scale: 0.99 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.1 },
        }}
      >
        <div>
          <img
            src={getPosterImage(`w92`, movie.poster_path)}
            alt={movie.title}
          />
          <Left>
            <SectionTitle>{movie.title}</SectionTitle>
            <StandardText>{movie.character ?? movie.department}</StandardText>
          </Left>
          <CircleWithNumber
            number={movie.vote_average}
            accentColors={getAccentColorByPopularity(0)}
            progress={movie.vote_average * 10}
            fontSize={16}
            stroke={3}
            size="80px"
          />
          <h3>
            {getFieldsFromISO(movie.release_date, {
              year: `numeric`,
            })}
          </h3>
        </div>
        <Backdrop src={getBackdropImage(`w780`, movie.backdrop_path)} />
      </Tile>
    </Link>
  )
}

const Backdrop = styled.div<{ src: string }>`
  top: 0;
  left: 0;
  position: absolute !important;
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  object-fit: cover;
  z-index: -2;
  opacity: 0.08;
  transition: opacity 0.5s ease-in-out, filter 0.5s ease-in-out;
  border-radius: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Tile = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 40px 0;
  width: 100%;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    ${Backdrop} {
      opacity: 0.15;
      filter: blur(0px);
    }
  }
  > div {
    display: flex;
    width: 100%;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    > img {
      height: 125px;
      width: 83px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`
