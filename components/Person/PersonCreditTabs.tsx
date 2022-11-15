import type { FC } from "react"
import React, { useEffect, useState } from "react"

import type {
  PersonCastCredit,
  PersonCredits,
  PersonCrewCredit,
} from "@customTypes/PersonTypes"
import { SectionContainer } from "@styles/BaseStyles"
import { SectionTitle } from "@styles/textStyles"
import { AnimatePresence } from "framer-motion"
import styled from "styled-components"

import { CreditTile } from "./CreditTile"

export const getFieldsFromISO = <T,>(date: string, fields: T): string => {
  return new Date(date).toLocaleDateString(`en-us`, fields)
}

type Person = PersonCastCredit & PersonCrewCredit

const PersonCreditTabs: FC<{ credits: PersonCredits }> = ({ credits }) => {
  const [currentCredits, setCurrentCredits] = useState([])
  const [currentTab, setCurrentTab] = useState(``)
  const [sortedCredits, setSortedCredits] = useState<Person[]>([])
  const [allRoles, setAllRoles] = useState<{ name: string; value: string }[]>([])

  useEffect(() => {
    const sorted: Person[] = [...credits.cast, ...credits.crew].sort((a, b) => {
      return a.release_date > b.release_date ? -1 : 1
    })
    setSortedCredits(sorted)
    const allRolesMap = new Map()
    credits.cast.length && allRolesMap.set(`Acting`, credits.cast.length)
    for (const credit of credits.crew) {
      if (allRolesMap.has(credit.department)) {
        const cur = allRolesMap.get(credit.department)
        allRolesMap.set(credit.department, cur + 1)
      } else {
        allRolesMap.set(credit.department, 1)
      }
    }
    const all = Array.from(allRolesMap, ([name, value]) => ({
      name,
      value,
    })).sort((a, b) => {
      return a.value > b.value ? -1 : 1
    })
    setAllRoles(all)

    setCurrentTab(all.length ? all[0].name : ``)
  }, [credits])

  useEffect(() => {
    const filteredCredits = sortedCredits.filter((credit) => {
      if (currentTab !== `Acting`) return credit.department === currentTab
      return credit.character
    })
    setCurrentCredits(filteredCredits.slice(0, 12))
  }, [currentTab, sortedCredits, setCurrentCredits])

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
              {role.name + ` (` + role.value + `)`}
            </TabTitle>
          )
        })}
      </TabsContainer>
      <TileContainer>
        <AnimatePresence mode="wait">
          {currentCredits.map((movie: Person) => {
            return (
              <CreditTile
                key={movie.credit_id + currentTab + `tile`}
                movie={movie}
              />
            )
          })}
        </AnimatePresence>
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
    active ? `var(--font-color-primary)` : `var(--font-color-secondary)`};
`

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`

export default PersonCreditTabs
