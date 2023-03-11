import type { FC } from "react"

import { useScrollToTop } from "@hooks/useScrollToTop"
import { SpotlightItem } from "@reusable/SpotItem"
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

const Test = styled.div`
  /* background-color: black; */
  border: 1px solid red;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  z-index: 500;
`

const Index: FC = () => {
  const {
    data: { movies, reviews },
  } = useQuery(
    `popular`,
    async () => {
      const movies = await getPopular()
      const reviews = await fetchReviews(movies)
      return { movies, reviews }
    },
    {
      placeholderData: { movies: [null, null, null, null], reviews: [] },
      staleTime: Infinity,
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
      <div
        style={{
          position: `absolute`,
        }}
      >
        <Test>
          <SpotlightItem opacity={0.8} />
        </Test>
      </div>
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
