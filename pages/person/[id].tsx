import React from 'react'
import styled from 'styled-components'

import { getCredits, getPersonCredits, getPersonSocials } from '@lib/tmdb'

import { ColorProvider } from '@contexts/MovieInfoContext'

import type {
  MovieTypes,
  OneMovie,
  CreditTypes,
  ReviewInfoTypes,
  TrailerTypes,
} from '@customTypes/MovieTypes'

import { GetServerSideProps } from 'next'
import { PersonSocials } from '@customTypes/PersonTypes'

interface Props {
  credits: CreditTypes
  socials: PersonSocials
}

const Person = ({ credits, socials }: Props) => {
  console.log(socials)

  return <PageContainer></PageContainer>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string

  const [creditsData, socialsData] = await Promise.all([
    fetch(getPersonCredits(id)).then((res) => res.json()),
    fetch(getPersonSocials(id)).then((res) => res.json()),
  ])

  return {
    props: {
      credits: creditsData,
      socials: socialsData,
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
