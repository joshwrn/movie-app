import React from 'react'
import styled from 'styled-components'
import { getImage } from '@lib/tmdb'
import Divider from '@reusable/Divider'
import { SectionTitle } from '@styles/textStyles'
import { getFirstRole } from '@utils/strings'
import { trimArray } from '@utils/arrays'

import { CreditTypes, CastTypes, CrewTypes } from '@customTypes/MovieTypes'
import { device } from '@styles/devices'
import Link from 'next/link'

const Sidebar = ({ credits }: { credits: CreditTypes }) => {
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
              <CastItemContainer>
                <CastImage src={getImage('w185', cast.profile_path)} />
                <CastInfoContainer>
                  <CastName>{cast.name}</CastName>
                  <CastRole>{getFirstRole(cast.character)}</CastRole>
                </CastInfoContainer>
              </CastItemContainer>
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
              <CastItemContainer>
                <CastImage src={getImage('w185', crew.profile_path)} />
                <CastInfoContainer>
                  <CastName>{crew.name}</CastName>
                  <CastRole>{getFirstRole(crew.job)}</CastRole>
                </CastInfoContainer>
              </CastItemContainer>
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
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
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
  }
`

// cast

const CastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const CastItemContainer = styled.div`
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

const CastImage = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
`

const CastInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CastName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--font-color-primary);
`

const CastRole = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color-secondary);
`

export default Sidebar
