import {
  PersonCastCredit,
  PersonCredits,
  PersonCrewCredit,
} from '@customTypes/PersonTypes'
import { getBackdropImage, getPosterImage } from '@lib/tmdb'
import { SectionContainer } from '@styles/BaseStyles'
import { SectionTitle, StandardText } from '@styles/textStyles'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const getFieldsFromISO = <T,>(date: string, fields: T) => {
  return new Date(date).toLocaleDateString('en-us', fields)
}

type Person = PersonCastCredit & PersonCrewCredit

const PersonCreditTabs = ({ credits }: { credits: PersonCredits }) => {
  const [currentCredits, setCurrentCredits] = useState([])
  const [currentTab, setCurrentTab] = useState('Acting')
  const sortedCredits: Person[] = [...credits.cast, ...credits.crew].sort(
    (a, b) => {
      return a.release_date > b.release_date ? -1 : 1
    }
  )
  const allRolesMap = new Map()
  allRolesMap.set('Acting', credits.cast.length)
  for (const credit of credits.crew) {
    if (allRolesMap.has(credit.department)) {
      const cur = allRolesMap.get(credit.department)
      allRolesMap.set(credit.department, cur + 1)
    } else {
      allRolesMap.set(credit.department, 1)
    }
  }
  const allRoles = Array.from(allRolesMap, ([name, value]) => ({
    name,
    value,
  })).sort((a, b) => {
    return a.value > b.value ? -1 : 1
  })
  useEffect(() => {
    const filteredCredits = sortedCredits.filter((credit) => {
      if (currentTab !== 'Acting') return credit.department === currentTab
      return credit.character
    })
    setCurrentCredits(filteredCredits.slice(0, 12))
  }, [currentTab])

  return (
    <SectionContainer>
      <TabsContainer>
        {allRoles.map((role) => {
          return (
            <TabTitle
              key={role.name}
              onClick={() => setCurrentTab(role.name)}
              active={currentTab === role.name}
            >
              {role.name + ' (' + role.value + ')'}
            </TabTitle>
          )
        })}
      </TabsContainer>
      <TileContainer>
        {currentCredits.map((movie: Person) => {
          return (
            <Tile key={movie.credit_id}>
              <div>
                <img
                  src={getPosterImage('w92', movie.poster_path)}
                  alt={movie.title}
                />
                <div>
                  <SectionTitle>{movie.title}</SectionTitle>
                  <StandardText>
                    {movie.character ?? movie.department}
                  </StandardText>
                </div>
                <h3>{movie.vote_average.toFixed(1)}</h3>
                <h3>
                  {getFieldsFromISO(movie.release_date, { year: 'numeric' })}
                </h3>
              </div>
              <img
                datatype="backdrop"
                src={getBackdropImage('w780', movie.backdrop_path)}
                alt={movie.title}
              />
            </Tile>
          )
        })}
      </TileContainer>
    </SectionContainer>
  )
}

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  h2 {
    cursor: pointer;
  }
`
const TabTitle = styled(SectionTitle)<{ active: boolean }>`
  color: ${({ active }) =>
    active ? 'var(--font-color-primary)' : 'var(--font-color-secondary)'};
`

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`

const Tile = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 0;
  width: 100%;
  position: relative;
  &:hover {
    cursor: pointer;
    img[datatype='backdrop'] {
      opacity: 0.15;
    }
  }
  > div {
    display: flex;
    width: 100%;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    > img {
      height: 125px;
      width: 83px;
      object-fit: cover;
      border-radius: 5px;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
    }
  }
  img[datatype='backdrop'] {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.1;
    transition: opacity 0.5s ease-in-out;
    border-radius: 0;
  }
`

export default PersonCreditTabs
