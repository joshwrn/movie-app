import type { FC } from "react"

import { useScrollToTop } from "@hooks/useScrollToTop"
import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import styled from "styled-components"

import HeroSection from "../components/Home/HeroSection"
import SocialSection from "../components/Home/SocialSection"
import TrendingSection from "../components/Home/TrendingSection"
import { getReviews, getPopular } from "../lib/tmdb"
import type { MovieTypes, MovieReviewTypes } from "../types/MovieTypes"

const Index: FC = () => {
  const {
    data: { movies, reviews },
  } = useQuery(
    `popular`,
    async () => {
      const data = await getPopular()
      const reviews = await fetchReviews(data)
      return { movies: data, reviews }
    },
    {
      initialData: { movies: [], reviews: [] },
    }
  )
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
      <SocialSection movieReviews={reviews} />
    </PageContainer>
  )
}

const fetchReviews = async (
  movieList: MovieTypes[]
): Promise<MovieReviewTypes[]> => {
  const temp = []
  if (!movieList) return temp
  for (let i = 0; i < movieList.length; i++) {
    if (temp.length > 5) return temp

    const data = await getReviews({ id: movieList[i].id })

    if (data?.[0]) {
      temp.push({
        reviewInfo: data[0],
        title: movieList[i].title,
        image: movieList[i].backdrop_path,
        key: `home`,
      })
    }
  }
  return temp
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      key: `home`,
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
