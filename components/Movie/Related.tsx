import type { FC } from "react"
import React from "react"

import type { MovieTypes } from "@customTypes/MovieTypes"
import Carousel from "@reusable/Carousel"
import MovieCard from "@reusable/MovieCard"
import { SectionContainer } from "@styles/BaseStyles"
import { DEVICE } from "@styles/devices"
import { SectionTitle } from "@styles/textStyles"
import styled from "styled-components"

const Related: FC<{ related: MovieTypes[] }> = ({ related }) => {
  return (
    <SectionContainer>
      <SectionTitle>Related</SectionTitle>
      <Carousel>
        {related.map((movie) => (
          <MovieCardContainer key={movie.id}>
            <MovieCard movie={movie} />
          </MovieCardContainer>
        ))}
      </Carousel>
    </SectionContainer>
  )
}

const MovieCardContainer = styled.div`
  width: calc(100% / 3 - (var(--padding-h) / 2) - 4px);
  @media ${DEVICE.mobile} {
    width: 100%;
  }
  height: fit-content;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
`

export default Related
