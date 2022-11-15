import type { FC } from "react"
import React from "react"

import MovieDetailHero from "@components/Movie/Hero"
import MovieInfoSection from "@components/Movie/MovieInfoSection"
import { ColorProvider } from "@contexts/color/MovieInfoContext"
import type {
  MovieTypes,
  ReviewInfoTypes,
  TrailerTypes,
} from "@customTypes/MovieTypes"
import { useMovie } from "@hooks/useMovie"
import { useScrollToTop } from "@hooks/useScrollToTop"
import { getTrailers, getRelated, getReviews, getCredits } from "@lib/tmdb"
import { pageVariants } from "@styles/pageVariants"
import { asyncDataModifier } from "@utils/asyncDataModifier"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import styled from "styled-components"

const MovieDetail: FC<{ id: string }> = ({ id }) => {
  useScrollToTop()
  const { movie } = useMovie({ id })

  const { data: credits } = useQuery(
    `credits-${id}`,
    async () => {
      const data = getCredits({ id })
      return data
    },
    {
      initialData: { cast: [], crew: [] },
    }
  )

  const { data: trailer } = useQuery(
    `trailer-${id}`,
    async () => {
      const data = await asyncDataModifier<TrailerTypes[], TrailerTypes>({
        get: () => getTrailers({ id }),
        modifier: (data) =>
          data.find(
            (item) => item.type === `Trailer` && item.site === `YouTube`
          ),
      })
      return data
    },
    {
      initialData: [],
    }
  ) as { data: TrailerTypes }

  const { data: related } = useQuery(
    `related-${id}`,
    async () => {
      const data = await asyncDataModifier<MovieTypes[]>({
        get: () => getRelated({ id }),
      })
      return data
    },
    {
      initialData: [],
    }
  )

  const { data: reviews } = useQuery(
    `reviews-${id}`,
    async () => {
      const data = await asyncDataModifier<ReviewInfoTypes[]>({
        get: () => getReviews({ id }),
      })
      return data
    },
    {
      initialData: [],
    }
  )

  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <ColorProvider>
        <MovieDetailHero movie={movie} credits={credits} />
        <MovieInfoSection
          movie={movie}
          credits={credits}
          trailer={trailer?.key ?? ``}
          related={related}
          reviews={reviews}
        />
      </ColorProvider>
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

const PageContainer = styled(motion.main)`
  display: flex;
  flex-direction: column;
  gap: 75px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`

export default MovieDetail
