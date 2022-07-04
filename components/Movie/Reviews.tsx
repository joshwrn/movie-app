import React, { useRef } from 'react'
import styled from 'styled-components'
import CircularProgress from '@reusable/Circle'
import { SectionTitle } from '@styles/textStyles'
import { useColor } from '@contexts/MovieInfoContext'
import { trimArray } from '@utils/arrays'

import { ReviewInfoTypes } from '@customTypes/MovieTypes'
import ExpandableText from '@reusable/ExpandableText'

const Reviews = ({ reviews }: { reviews: ReviewInfoTypes[] }) => {
  const reviewsFilter = reviews.filter((r) => r.author_details.rating)
  const reviewsShort = trimArray(reviewsFilter, 0, 3)
  return (
    <Container>
      {reviews.length > 0 ? (
        <>
          <SectionTitle>Reviews</SectionTitle>
          <ReviewsContainer>
            {reviewsShort.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  rating={review.author_details.rating}
                  author={review.author}
                  date={review.created_at}
                  content={review.content}
                />
              )
            })}
          </ReviewsContainer>
        </>
      ) : (
        <SectionTitle>No Reviews Yet...</SectionTitle>
      )}
    </Container>
  )
}

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

const convertDate = (date: string) => {
  //@ts-ignore
  return new Date(date).toLocaleDateString('en-us', options)
}

const ReviewCard = ({ rating, author, date, content }) => {
  const circleRef = useRef<HTMLDivElement>(null)
  const percent = (rating / 10) * 100
  const { color } = useColor()

  return (
    <ReviewCardContainer>
      <ReviewCardTop>
        <ReviewCardRating>
          <Rating>{rating}</Rating>
          <div ref={circleRef}>
            <CircularProgress
              radius={circleRef.current ? circleRef.current.clientWidth / 2 : 0}
              stroke={4}
              progress={percent}
              accentColor={color}
            />
          </div>
        </ReviewCardRating>
        <ReviewCardTopInfo>
          <AuthorText>{author}</AuthorText>
          <DateText>{convertDate(date)}</DateText>
        </ReviewCardTopInfo>
      </ReviewCardTop>
      <ExpandableText content={content} length={500} />
    </ReviewCardContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`

const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const ReviewCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height: 100px;
`

const ReviewCardRating = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
  > div {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

const Rating = styled.h2`
  font-size: 30px;
  font-weight: bold;
`

const ReviewCardTopInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const AuthorText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--font-color-primary);
`

const DateText = styled.h2`
  font-size: 24px;
  color: var(--font-color-secondary);
`

export default Reviews
