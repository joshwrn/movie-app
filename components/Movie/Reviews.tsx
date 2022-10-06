import React, { useRef } from 'react'
import styled from 'styled-components'
import { SectionTitle } from '@styles/textStyles'
import { useColor } from '@contexts/MovieInfoContext'
import { trimArray } from '@utils/arrays'

import { ReviewInfoTypes } from '@customTypes/MovieTypes'
import ExpandableText from '@reusable/ExpandableText'
import { CircleWithNumber } from '@reusable/CircleWithNumber'

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
  const percent = (rating / 10) * 100
  const { color } = useColor()

  return (
    <ReviewCardContainer>
      <ReviewCardTop>
        <CircleWithNumber
          number={rating}
          progress={percent}
          accentColors={color}
          rounded={false}
        />
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
