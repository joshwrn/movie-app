import React from 'react'
import styled from 'styled-components'

import { getPersonCredits, getPersonDetails, getPersonSocials } from '@lib/tmdb'

import { GetServerSideProps } from 'next'
import {
  PersonCredits,
  PersonDetails,
  PersonSocials,
} from '@customTypes/PersonTypes'
import PersonInfo from '@components/Person/PersonInfo'
import PersonShowcase from '@components/Person/PersonShowcase'
import PersonCreditTabs from '@components/Person/PersonCreditTabs'

interface Props {
  credits: PersonCredits
  socials: PersonSocials
  details: PersonDetails
}

const Person = ({ credits, socials, details }: Props) => {
  const isActor = details.known_for_department === 'Acting'
  return (
    <PageContainer>
      <PersonInfo details={details} socials={socials} />
      <PersonShowcase credits={isActor ? credits.cast : credits.crew} />
      <PersonCreditTabs credits={credits} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.query.id === 'object'
      ? context.query.id[0]
      : context.query.id

  const [creditsData, socialsData, detailsData] = await Promise.all([
    fetch(getPersonCredits(id)).then((res) => res.json()),
    fetch(getPersonSocials(id)).then((res) => res.json()),
    fetch(getPersonDetails(id)).then((res) => res.json()),
  ])

  return {
    props: {
      credits: creditsData,
      socials: socialsData,
      details: detailsData,
    },
  }
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 75px;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  width: 100%;
  max-width: 1440px;
`

export default Person
