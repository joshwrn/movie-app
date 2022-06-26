import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { SectionTitle } from './styles'
import CircularProgress from '@reusable/Circle'
import { useColor } from '@contexts/MovieInfoContext'
import { trimArray } from '@utils/arrays'

import { ReviewInfoTypes } from '@customTypes/MovieTypes'

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
  const [open, setOpen] = useState(false)
  const circleRef = useRef<HTMLDivElement>(null)
  const percent = (rating / 10) * 100
  const { color } = useColor()

  const contentShort =
    content.length > 500 ? content.slice(0, 500) + '... ' : content

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
      <ReviewCardContent>
        {open ? content : contentShort}
        <ReadMore onClick={() => setOpen(!open)}>
          {!open && content.length > 500 && ' Read More'}
        </ReadMore>
      </ReviewCardContent>
      <ReadMore onClick={() => setOpen(!open)}>{open && 'Show Less'}</ReadMore>
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

const ReviewCardContent = styled.p`
  line-height: 30px;
  font-size: 20px;
  color: var(--font-color-secondary);
`

const ReadMore = styled.span`
  font-weight: bold;
  color: var(--font-color-primary);
  opacity: 0.8;
  cursor: pointer;
  transition: color 0.35s;
  width: fit-content;
  font-size: 20px;
`

export default Reviews
