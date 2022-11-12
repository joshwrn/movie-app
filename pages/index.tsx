import type { FC } from "react"

import { useScrollToTop } from "@hooks/useScrollToTop"
import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import styled from "styled-components"

import HeroSection from "../components/Home/HeroSection"
import SocialSection from "../components/Home/SocialSection"
import TrendingSection from "../components/Home/TrendingSection"
import { getPopular } from "../lib/tmdb"
import type { MovieTypes } from "../types/MovieTypes"

interface Props {
  movies: MovieTypes[]
}

const Index: FC<Props> = ({ movies }) => {
  const topMovies = movies.slice(0, 4)
  const trendingMovies = movies.slice(4, 8)
  useScrollToTop()
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <HeroSection movies={topMovies} user={`josh`} />
      <TrendingSection movies={trendingMovies} />
      <SocialSection />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const popular = await getPopular()

  return {
    props: {
      movies: popular ?? [],
    },
  }
}

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export default Index
