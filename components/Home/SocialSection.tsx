import React from 'react'
import styled from 'styled-components'
import { MovieReviewTypes } from '@customTypes/MovieTypes'
import ReviewCard from './ReviewCard'
import { device } from '~/styles/devices'

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
  @media ${device.tablet} {
    display: block;
  }
`

export default SocialSection
