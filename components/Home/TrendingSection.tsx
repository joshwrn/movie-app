import type { FC } from "react"
import React from "react"

import type { MovieTypes } from "@customTypes/MovieTypes"
import styled from "styled-components"

import Carousel from "../reusable/Carousel"
import WideMoviePoster from "./WideMoviePoster"

const TrendingSection: FC<{ movies: MovieTypes[] }> = ({ movies }) => {
  return (
    <Outer>
      <TrendingHeader>Trending Movies</TrendingHeader>
      <Carousel>
        {movies.map((movie) => (
          <WideMoviePoster
            key={movie.id}
            id={movie.id}
            title={movie.title}
            backdrop_path={movie.backdrop_path}
          />
        ))}
      </Carousel>
    </Outer>
  )
}

const Outer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`

const TrendingHeader = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: var(--font-color-primary);
  margin-bottom: 42px;
`

export default TrendingSection
