import type { FC } from "react"
import React from "react"

import { getAccentColorByPopularity } from "@components/Person/PersonInfo"
import type { MovieTypes, BasePersonType } from "@customTypes/MovieTypes"
import { getPosterImage, getProfileImage } from "@lib/tmdb"
import { CircleWithNumber } from "@reusable/CircleWithNumber"
import { Link } from "@reusable/Link"
import { motion } from "framer-motion"
import { useSetRecoilState } from "recoil"
import styled, { css } from "styled-components"
import type { FlattenSimpleInterpolation } from "styled-components"

import { searchBarIsOpenState } from "./SearchBar"

export const GradientItem = styled(motion.div)`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  :before {
    background: radial-gradient(#ffffff2b 0%, transparent);
    opacity: 0;
    position: absolute;
    pointer-events: none;
    content: "";
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(30px);
    transition: opacity 0.2s ease-in-out;
    transform: translateY(20%);
  }
  :hover {
    border: 1px solid var(--border-color-primary);
    :before {
      background: radial-gradient(#ffffff2b 0%, transparent);
      filter: blur(30px);
      transform: translateY(20%);
      opacity: 1;
    }
  }
`

const StyledResult = styled(GradientItem)<{ css: FlattenSimpleInterpolation }>`
  gap: 20px;
  width: 100%;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 10px;
  height: 100px;
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-margin-top: 10px;

  ${({ css }) => css}
`
const TextWrapper = styled.div`
  margin-right: auto;
  p {
    :last-of-type {
      color: var(--font-color-secondary);
      font-size: 14px;
    }
  }
`
const StyledPerson = css`
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`
const StyledMovie = css`
  > img {
    height: 75px;
    max-width: 50px;
    border-radius: 5px;
    object-fit: cover;
  }
`

const Wrapper = ({ children, index, css, id, type }) => {
  const setSearchBarIsOpen = useSetRecoilState(searchBarIsOpenState)
  return (
    <Link href={type === `movie` ? `/movie/${id}` : `/person/${id}`}>
      <StyledResult
        onClick={() => setSearchBarIsOpen(false)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        custom={index}
        css={css}
      >
        {children}
      </StyledResult>
    </Link>
  )
}

const PersonResult = ({ result }: { result: BasePersonType }) => {
  return (
    <>
      <img src={getProfileImage(`w45`, result.profile_path)} alt={result.name} />
      <TextWrapper>
        <p>{result.name}</p>
        <p>{result.known_for_department}</p>
      </TextWrapper>
      <CircleWithNumber
        number={result.popularity}
        progress={result.popularity}
        accentColors={getAccentColorByPopularity(101)}
        fontSize={16}
        size={`60px`}
        stroke={3}
      />
    </>
  )
}

const MovieResult = ({ result }: { result: MovieTypes }) => {
  return (
    <>
      <img src={getPosterImage(`w92`, result.poster_path)} alt={result.title} />
      <TextWrapper>
        <p>{result.title}</p>
        <p>{result.release_date?.slice(0, 4)}</p>
      </TextWrapper>
      <CircleWithNumber
        number={result.vote_average}
        progress={result.vote_average * 10}
        accentColors={getAccentColorByPopularity(50)}
        fontSize={16}
        rounded={false}
        size={`60px`}
        stroke={3}
      />
    </>
  )
}

const SearchResult: FC<{
  result: BasePersonType | MovieTypes
  type: string
  index: number
}> = ({ result, type, index }) => {
  let css = null
  let Component = null

  if (type === `person`) {
    css = StyledPerson
    Component = <PersonResult result={result as BasePersonType} />
  }

  if (type === `movie`) {
    css = StyledMovie
    Component = <MovieResult result={result as MovieTypes} />
  }

  return (
    <Wrapper index={index} css={css} id={result.id} type={type}>
      {Component}
    </Wrapper>
  )
}

const variants = {
  initial: {
    opacity: 0,
  },
  animate: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index < 5 ? index * 0.1 : 0,
      duration: 0.2,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export default SearchResult
