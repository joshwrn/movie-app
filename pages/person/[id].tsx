import React from 'react'
import styled from 'styled-components'

import {
  getCredits,
  getPersonCredits,
  getPersonDetails,
  getPersonSocials,
} from '@lib/tmdb'

import { ColorProvider } from '@contexts/MovieInfoContext'

import type {
  MovieTypes,
  OneMovie,
  CreditTypes,
  ReviewInfoTypes,
  TrailerTypes,
} from '@customTypes/MovieTypes'

import { GetServerSideProps } from 'next'
import { PersonDetails, PersonSocials } from '@customTypes/PersonTypes'

interface Props {
  credits: CreditTypes
  socials: PersonSocials
  details: PersonDetails
}

const Person = ({ credits, socials, details }: Props) => {
  console.log(socials, credits, details)

  return <PageContainer></PageContainer>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string

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
  max-width: 1440px;
`

export default Person
