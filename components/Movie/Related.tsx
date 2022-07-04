import Carousel from '@reusable/Carousel'
import { MovieTypes } from '@customTypes/MovieTypes'
import React from 'react'
import { SectionTitle } from '@styles/textStyles'
import { SectionContainer } from '@styles/BaseStyles'
import MovieCard from '@reusable/MovieCard'
import styled from 'styled-components'
import { device } from '@styles/devices'

const Related = ({ related }: { related: MovieTypes[] }) => {
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
  @media ${device.mobile} {
    width: 100%;
  }
  height: fit-content;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
`

export default Related
