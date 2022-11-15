import type { FC } from "react"
import React, { useEffect } from "react"

import type { CreditTypes, CastTypes, CrewTypes } from "@customTypes/MovieTypes"
import Divider, { StyledDivider } from "@reusable/Divider"
import { DEVICE } from "@styles/devices"
import { SectionTitle } from "@styles/textStyles"
import { getFirstRole } from "@utils/getFirstRole"
import { trimArray } from "@utils/trimArray"
import styled from "styled-components"

import { PersonItem } from "./PersonItem"

const Sidebar: FC<{ credits?: CreditTypes }> = ({ credits }) => {
  const [shortCredits, setShortCredits] = React.useState<CreditTypes>({
    cast: [],
    crew: [],
  })
  useEffect(() => {
    setShortCredits({
      cast: trimArray(credits.cast, 0, 5),
      crew: trimArray(credits.crew, 0, 5),
    })
  }, [credits])

  return (
    <SidebarContainer>
      <SectionContainer>
        <SectionTitle>Cast</SectionTitle>
        <PeopleContainer>
          {shortCredits.cast.map((cast: CastTypes) => (
            <PersonItem
              key={cast.id + cast.character}
              name={cast.name}
              role={cast.character}
              id={cast.id}
              profilePath={cast.profile_path}
            />
          ))}
        </PeopleContainer>
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTitle>Crew</SectionTitle>
        <PeopleContainer>
          {shortCredits.crew.map((crew: CrewTypes) => (
            <PersonItem
              key={crew.id + crew.job}
              name={crew.name}
              role={getFirstRole(crew.job)}
              id={crew.id}
              profilePath={crew.profile_path}
            />
          ))}
        </PeopleContainer>
      </SectionContainer>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  gap: 25px;
  @media ${DEVICE.tablet} {
    flex-direction: row;
    margin-top: 75px;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  ${StyledDivider} {
    @media ${DEVICE.tablet} {
      display: none;
    }
  }
`
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  gap: 20px;
  @media ${DEVICE.tablet} {
    width: fit-content;
    max-width: 45%;
    gap: 5px;
  }
  @media ${DEVICE.mobile} {
    max-width: fit-content;
  }
`
const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export default Sidebar
