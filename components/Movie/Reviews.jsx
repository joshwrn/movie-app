import React, { useState } from 'react';
import styled from 'styled-components';
import SectionTitle from './SectionTitle';
import CircularProgress from './Circle';
import { useColor } from '../../contexts/MovieInfoContext';

const Reviews = ({ reviews }) => {
  const reviewsFilter = reviews.filter((r) => r.author_details.rating);
  const reviewsShort =
    reviewsFilter.length > 3 ? reviewsFilter.slice(0, 3) : reviewsFilter;
  return (
    <Container>
      {reviews.length > 0 && (
        <>
          <SectionTitle>Reviews</SectionTitle>
          <ReviewsContainer>
            {reviewsShort.map((review) => {
              return (
                <ReviewCard
                  rating={review.author_details.rating}
                  author={review.author}
                  date={review.created_at}
                  content={review.content}
                />
              );
            })}
          </ReviewsContainer>
        </>
      )}
    </Container>
  );
};

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const convertDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', options);
};

const ReviewCard = ({ rating, author, date, content }) => {
  const [open, setOpen] = useState(false);
  const percent = (rating / 10) * 100;
  const { color } = useColor();

  const contentShort =
    content.length > 500 ? content.slice(0, 500) + '... ' : content;

  return (
    <ReviewCardContainer>
      <ReviewCardTop>
        <ReviewCardRating>
          <Rating>{rating}</Rating>
          <div style={{ position: 'absolute' }}>
            <CircularProgress
              radius={50}
              stroke={4}
              progress={percent}
              accentColor={color}
            />
          </div>
          <div style={{ position: 'absolute', zIndex: '-1' }}>
            <CircularProgress
              radius={50}
              stroke={4}
              progress={100}
              accentColor={'#2e2e2e'}
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
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ReviewCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height: 100px;
`;

const ReviewCardRating = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
`;

const Rating = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

const ReviewCardTopInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AuthorText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const DateText = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

const ReviewCardContent = styled.p`
  line-height: 30px;
  font-size: 20px;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

const ReadMore = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.fontColor.primary};
  opacity: 0.8;
  cursor: pointer;
  transition: color 0.35s;
  width: fit-content;
  font-size: 20px;
`;

export default Reviews;
