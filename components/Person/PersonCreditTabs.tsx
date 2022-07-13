import {
  PersonCastCredit,
  PersonCredits,
  PersonCrewCredit,
} from '@customTypes/PersonTypes'
import { getBackdropImage, getPosterImage } from '@lib/tmdb'
import { SectionContainer } from '@styles/BaseStyles'
import { SectionTitle, StandardText } from '@styles/textStyles'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import Link from 'next/link'

export const getFieldsFromISO = <T,>(date: string, fields: T) => {
  return new Date(date).toLocaleDateString('en-us', fields)
}

type Person = PersonCastCredit & PersonCrewCredit

const PersonCreditTabs = ({ credits }: { credits: PersonCredits }) => {
  const [currentCredits, setCurrentCredits] = useState([])
  const sortedCredits: Person[] = [...credits.cast, ...credits.crew].sort(
    (a, b) => {
      return a.release_date > b.release_date ? -1 : 1
    }
  )
  const allRolesMap = new Map()
  credits.cast.length && allRolesMap.set('Acting', credits.cast.length)
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
  const [currentTab, setCurrentTab] = useState(allRoles[0].name)
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
            <AnimatePresence key={movie.credit_id + currentTab} exitBeforeEnter>
              <Link
                href={`/movie/${movie.id}`}
                key={movie.credit_id + currentTab + 'tile'}
                passHref
              >
                <Tile
                  whileTap={{ scale: 0.99 }}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.1 },
                  }}
                >
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
                      {getFieldsFromISO(movie.release_date, {
                        year: 'numeric',
                      })}
                    </h3>
                  </div>
                  <Backdrop
                    datatype="backdrop"
                    src={getBackdropImage('w780', movie.backdrop_path)}
                  />
                </Tile>
              </Link>
            </AnimatePresence>
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
  width: 100%;
  position: relative;
  overflow-x: scroll;
  h2 {
    cursor: pointer;
    white-space: nowrap;
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

const Tile = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 40px 0;
  width: 100%;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    div[datatype='backdrop'] {
      opacity: 0.15;
      filter: blur(0px);
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
  div[datatype='backdrop'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
    opacity: 0.08;
    transition: opacity 0.5s ease-in-out, filter 0.5s ease-in-out;
    border-radius: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`

const Backdrop = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
`

const Gradient = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgb(0, 0, 0, 0) 0%, black 100%);
  opacity: 0.5;
  z-index: -1;
`

export default PersonCreditTabs
