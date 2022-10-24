import type { FC } from "react"
import React from "react"

import { useColor } from "@contexts/color/MovieInfoContext"
import type { ReviewInfoTypes } from "@customTypes/MovieTypes"
import { CircleWithNumber } from "@reusable/CircleWithNumber"
import ExpandableText from "@reusable/ExpandableText"
import { SectionTitle } from "@styles/textStyles"
import { trimArray } from "@utils/trimArray"
import styled from "styled-components"

const Reviews: FC<{ reviews: ReviewInfoTypes[] }> = ({ reviews }) => {
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
  year: `numeric`,
  month: `short`,
  day: `numeric`,
}

const convertDate = (date: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return new Date(date).toLocaleDateString(`en-us`, options)
}

const ReviewCard: FC<{
  rating: number
  author: string
  date: string
  content: string
}> = ({ rating, author, date, content }) => {
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
