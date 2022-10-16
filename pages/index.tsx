import type { FC } from "react"
import { useEffect } from "react"

import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import styled from "styled-components"

import HeroSection from "../components/Home/HeroSection"
import SocialSection from "../components/Home/SocialSection"
import TrendingSection from "../components/Home/TrendingSection"
import { getReviews, getPopular } from "../lib/tmdb"
import type { MovieTypes, MovieReviewTypes } from "../types/MovieTypes"

interface Props {
  movies: MovieTypes[]
  movieReviews: MovieReviewTypes[]
}

const Index: FC<Props> = ({ movies, movieReviews }) => {
  const topMovies = movies.slice(0, 4)
  const trendingMovies = movies.slice(4, 8)
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
      <HeroSection movies={topMovies} user={`josh`} />
      <TrendingSection movies={trendingMovies} />
      <SocialSection movieReviews={movieReviews} />
    </PageContainer>
  )
}

const fetchReviews = async (movieList: MovieTypes[]) => {
  const temp = []
  if (!movieList) return temp
  for (let i = 0; i < movieList.length; i++) {
    if (temp.length > 5) return temp

    const res = await fetch(getReviews(movieList[i].id))
    const data = await res.json()
    if (data?.results?.[0]) {
      temp.push({
        reviewInfo: data.results[0],
        title: movieList[i].title,
        image: movieList[i].backdrop_path,
        key: `home`,
      })
    }
  }
  return temp
}

export const getServerSideProps: GetServerSideProps = async () => {
  const popularRes = await fetch(getPopular)
  const popularResults = await popularRes.json()
  const popular = popularResults?.results ?? []

  const reviews = await fetchReviews(popular)

  return {
    props: {
      movies: popular ?? [],
      movieReviews: reviews ?? [],
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
