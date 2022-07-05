import React from 'react'
import styled from 'styled-components'
import Carousel from '@reusable/Carousel'
import MovieCard from '@reusable/MovieCard'
import { PersonCastCredit, PersonCrewCredit } from '@customTypes/PersonTypes'
import { device } from '@styles/devices'
import { SectionTitle } from '@styles/textStyles'
import { SectionContainer } from '@styles/BaseStyles'

const PersonShowcase = ({
  credits,
}: {
  credits: PersonCastCredit[] | PersonCrewCredit[]
}) => {
  const sliced = credits.slice(0, 12)
  const knownFor = sliced.sort(
    (a, b) =>
      b.popularity * (b.vote_average * b.vote_count) -
      a.popularity * (a.vote_average * a.vote_count)
  )
  return (
    <SectionContainer>
      <SectionTitle>Known For</SectionTitle>
      <Carousel>
        {knownFor.map((credit: PersonCastCredit) => (
          <MovieCardContainer key={credit.id}>
            <MovieCard movie={credit} />
          </MovieCardContainer>
        ))}
      </Carousel>
    </SectionContainer>
  )
}

const MovieCardContainer = styled.div`
  width: calc(100% / 4 - (var(--padding-h) / 2) - 8px);
  @media ${device.mobile} {
    width: 100%;
  }
  height: fit-content;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
`

export default PersonShowcase
