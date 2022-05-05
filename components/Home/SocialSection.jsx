import React from 'react';
import styled from 'styled-components';
import { getImage } from '../../lib/tmdb';
import ReviewCard from './ReviewCard';

const checkFirstLetter = (string) => {
  return string.charAt(1) === 'h' || string.charAt(0) === 'h';
};

const SocialSection = ({ movieReviews }) => {
  return (
    <Container>
      <Header>What your friends are saying.</Header>
      <ReviewList>
        {movieReviews.map((review, index) => {
          const profile = review.reviewInfo.author_details.avatar_path;
          return (
            <ReviewCard
              key={index}
              avatar={
                checkFirstLetter(profile)
                  ? 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                  : getImage('w185', profile)
              }
              title={review.title}
              author={review.reviewInfo.author_details.username}
              rating={review.reviewInfo.author_details.rating}
              content={review.reviewInfo.content}
              backdrop={review.image}
            />
          );
        })}
      </ReviewList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 100%;
  margin-top: 60px;
`;

const Header = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const ReviewList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => theme.fontColor.primary};
  gap: 60px;
`;

export default SocialSection;
