import type { FC } from "react"
import React from "react"

import type { MovieReviewTypes, MovieTypes } from "@customTypes/MovieTypes"
import { useAsyncState } from "@hooks/useAsyncState"
import { getPopular, getReviews } from "@lib/tmdb"
import { DEVICE } from "@styles/devices"
import styled from "styled-components"

import ReviewCard from "./ReviewCard"

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

const SocialSection: FC = () => {
  const { state: reviews } = useAsyncState({
    get: getPopular,
    asyncModifier: fetchReviews,
    initial: [],
  })

  return (
    <Container>
      <h1>What your friends are saying.</h1>
      <ReviewList>
        {reviews.map((review, index) => {
          return <ReviewCard key={index} review={review} />
        })}
      </ReviewList>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 100%;
  > h1 {
    font-size: 36px;
    color: var(--font-color-primary);
  }
`

const ReviewList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  color: var(--font-color-primary);
  gap: 60px;
  @media ${DEVICE.tablet} {
    display: block;
  }
`

export default SocialSection
