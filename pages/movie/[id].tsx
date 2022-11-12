import type { FC } from "react"
import React from "react"

import MovieDetailHero from "@components/Movie/Hero"
import MovieInfoSection from "@components/Movie/MovieInfoSection"
import { ColorProvider } from "@contexts/color/MovieInfoContext"
import type {
  CreditTypes,
  MovieTypes,
  ReviewInfoTypes,
  TrailerTypes,
} from "@customTypes/MovieTypes"
import { useMovie } from "@hooks/entity/useMovie"
import { useAsyncState } from "@hooks/useAsyncState"
import { useScrollToTop } from "@hooks/useScrollToTop"
import { getTrailers, getRelated, getReviews, getCredits } from "@lib/tmdb"
import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import styled from "styled-components"

interface Props {
  reviews: ReviewInfoTypes[]
  related: MovieTypes[]
}

const MovieDetail: FC = () => {
  const router = useRouter()
  useScrollToTop()

  const id =
    typeof router.query.id === `object` ? router.query.id[0] : router.query.id

  const { movie } = useMovie({ args: { id } })

  const { state: credits } = useAsyncState({
    get: getCredits,
    args: { id },
    initial: { cast: [], crew: [] },
  }) as { state: CreditTypes }

  const { state: trailers } = useAsyncState({
    get: getTrailers,
    args: { id },
    initial: [],
  }) as { state: TrailerTypes[] }
  const trailer = trailers.find(
    (v: TrailerTypes) => v.type === `Trailer` && v.site === `YouTube`
  )

  const { state: related } = useAsyncState({
    get: getRelated,
    initial: [],
    args: { id },
  }) as { state: MovieTypes[] }

  const { state: reviews } = useAsyncState({
    get: getReviews,
    initial: [],
    args: { id },
  }) as { state: ReviewInfoTypes[] }

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
