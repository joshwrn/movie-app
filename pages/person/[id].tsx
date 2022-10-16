import type { FC } from "react"
import React, { useEffect } from "react"

import PersonCreditTabs from "@components/Person/PersonCreditTabs"
import PersonInfo from "@components/Person/PersonInfo"
import PersonShowcase from "@components/Person/PersonShowcase"
import type {
  PersonCredits,
  PersonDetails,
  PersonSocials,
} from "@customTypes/PersonTypes"
import { getPersonCredits, getPersonDetails, getPersonSocials } from "@lib/tmdb"
import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import styled from "styled-components"

interface Props {
  credits: PersonCredits
  socials: PersonSocials
  details: PersonDetails
}

const Person: FC<Props> = ({ credits, socials, details }) => {
  const isActor = details.known_for_department === `Acting`
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <PersonInfo details={details} socials={socials} />
      <PersonShowcase credits={isActor ? credits.cast : credits.crew} />
      <PersonCreditTabs credits={credits} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.query.id === `object` ? context.query.id[0] : context.query.id

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
      key: id,
    },
  }
}

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 75px;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 1440px;
`

export default Person
