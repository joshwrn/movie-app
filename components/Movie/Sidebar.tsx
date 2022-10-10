import type { FC } from "react"
import React from "react"

import type { CreditTypes, CastTypes, CrewTypes } from "@customTypes/MovieTypes"
import { getImage, getProfileImage } from "@lib/tmdb"
import Divider from "@reusable/Divider"
import { device } from "@styles/devices"
import { SectionTitle } from "@styles/textStyles"
import { trimArray } from "@utils/arrays"
import { getFirstRole } from "@utils/strings"
import Link from "next/link"
import styled from "styled-components"

const Sidebar: FC<{ credits: CreditTypes }> = ({ credits }) => {
  const creditsShort = trimArray(credits.cast, 0, 5)
  const crewShort = trimArray(credits.crew, 0, 5)
  return (
    <SidebarContainer>
      <SectionContainer>
        <SectionTitle>Cast</SectionTitle>
        <CastContainer>
          {creditsShort.map((cast: CastTypes) => (
            <Link
              href={`/person/${cast.id}`}
              key={cast.id + cast.character}
              passHref
            >
              <PersonItemContainer>
                <PersonImage src={getProfileImage(`w185`, cast.profile_path)} />
                <PersonInfoContainer>
                  <PersonName>{cast.name}</PersonName>
                  <PersonRole>{getFirstRole(cast.character)}</PersonRole>
                </PersonInfoContainer>
              </PersonItemContainer>
            </Link>
          ))}
        </CastContainer>
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTitle>Crew</SectionTitle>
        <CastContainer>
          {crewShort.map((crew: CrewTypes) => (
            <Link href={`/person/${crew.id}`} key={crew.id + crew.job} passHref>
              <PersonItemContainer>
                <PersonImage src={getProfileImage(`w185`, crew.profile_path)} />
                <PersonInfoContainer>
                  <PersonName>{crew.name}</PersonName>
                  <PersonRole>{getFirstRole(crew.job)}</PersonRole>
                </PersonInfoContainer>
              </PersonItemContainer>
            </Link>
          ))}
        </CastContainer>
      </SectionContainer>
    </SidebarContainer>
  )
}

// Sidebar

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-shrink: 0;
  gap: 25px;
  @media ${device.tablet} {
    flex-direction: row;
    margin-top: 75px;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  .divider {
    @media ${device.tablet} {
      display: none;
    }
  }
`

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-shrink: 0;
  gap: 20px;
  @media ${device.tablet} {
    width: fit-content;
    max-width: 45%;
    gap: 5px;
  }
  @media ${device.mobile} {
    max-width: fit-content;
  }
`

// cast

const CastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PersonItemContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 10px 10px 10px 10px;
  align-items: center;
  cursor: pointer;
  border-radius: 18px;
  background-color: none;
  transition: background-color 0.35s, transform 0.35s;
  &:hover {
    background-color: #ffffff15;
    transform: translateY(-2px);
  }
`

const PersonImage = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
`

const PersonInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PersonName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--font-color-primary);
`

const PersonRole = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color-secondary);
`

export default Sidebar
