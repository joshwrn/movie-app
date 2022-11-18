import type { FC } from "react"
import React, { useEffect } from "react"

import PersonCreditTabs from "@components/Person/PersonCreditTabs"
import PersonInfo from "@components/Person/PersonInfo"
import PersonShowcase from "@components/Person/PersonShowcase"
import { useScrollToTop } from "@hooks/useScrollToTop"
import { getPersonCredits, getPersonDetails, getPersonSocials } from "@lib/tmdb"
import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import styled from "styled-components"

const Person: FC<{ id: string }> = ({ id }) => {
  const [isActor, setIsActor] = React.useState(false)

  const { data: credits } = useQuery(
    `credits-${id}`,
    async () => {
      const data = getPersonCredits({ id })
      return data
    },
    {
      placeholderData: { cast: [], crew: [] },
      staleTime: Infinity,
    }
  )

  const { data: socials } = useQuery(
    `socials-${id}`,
    async () => {
      const data = getPersonSocials({ id })
      return data
    },
    {
      placeholderData: { id: Number(id), imdb_id: null, facebook_id: null },
      staleTime: Infinity,
    }
  )

  const { data: details } = useQuery(
    `details-${id}`,
    async () => {
      const data = getPersonDetails({ id })
      return data
    },
    {
      placeholderData: { id: Number(id), imdb_id: null },
      staleTime: Infinity,
    }
  )

  useEffect(() => {
    const actor = details.known_for_department === `Acting`
    setIsActor(actor)
  }, [details])

  useScrollToTop()

  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <PersonInfo details={details} socials={socials} />
      <PersonShowcase
        details={details}
        credits={isActor ? credits.cast : credits.crew}
      />
      <PersonCreditTabs credits={credits} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.query.id === `object` ? context.query.id[0] : context.query.id

  return {
    props: {
      key: id,
      id,
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
