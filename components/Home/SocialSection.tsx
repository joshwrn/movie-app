import React from 'react'
import styled from 'styled-components'
import { MovieReviewTypes } from '../../types/MovieTypes'
import ReviewCard from './ReviewCard'

const SocialSection = ({
  movieReviews,
}: {
  movieReviews: MovieReviewTypes[]
}) => {
  return (
    <Container>
      <h1>What your friends are saying.</h1>
      <ReviewList>
        {movieReviews.map((review, index) => {
          return <ReviewCard key={index} review={review} />
        })}
      </ReviewList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 100%;
  margin-top: 60px;
  > h1 {
    font-size: 36px;
    color: ${({ theme }) => theme.fontColor.primary};
  }
`

const ReviewList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => theme.fontColor.primary};
  gap: 60px;
`

export default SocialSection
