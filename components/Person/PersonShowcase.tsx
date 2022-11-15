import type { FC } from "react"
import React, { useEffect } from "react"

import type {
  PersonCastCredit,
  PersonCrewCredit,
  PersonDetails,
} from "@customTypes/PersonTypes"
import Carousel from "@reusable/Carousel"
import MovieCard from "@reusable/MovieCard"
import { SectionContainer } from "@styles/BaseStyles"
import { DEVICE } from "@styles/devices"
import { SectionTitle } from "@styles/textStyles"
import styled from "styled-components"

const PersonShowcase: FC<{
  credits: PersonCastCredit[] | PersonCrewCredit[]
  details: PersonDetails
}> = ({ credits }) => {
  const [knownFor, setKnownFor] = React.useState<
    (PersonCastCredit | PersonCrewCredit)[]
  >([])
  useEffect(() => {
    const sliced = credits.slice(0, 12)
    const known = sliced.sort(
      (a, b) =>
        b.popularity * (b.vote_average * b.vote_count) -
        a.popularity * (a.vote_average * a.vote_count)
    )
    setKnownFor(known)
  }, [credits])

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
  @media ${DEVICE.mobile} {
    width: 100%;
  }
  height: fit-content;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
`

export default PersonShowcase
