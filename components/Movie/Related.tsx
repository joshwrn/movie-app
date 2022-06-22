import Carousel from '@reusable/Carousel'
import WideMoviePoster from '@components/Home/WideMoviePoster'
import { MovieTypes } from '@customTypes/MovieTypes'
import React from 'react'
import { SectionTitle, SectionContainer } from './styles'
import MovieCard from '@components/Home/MovieCard'
import styled from 'styled-components'

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
  height: fit-content;
  position: relative;
  scroll-snap-align: start;
  flex-shrink: 0;
  cursor: pointer;
`

export default Related
