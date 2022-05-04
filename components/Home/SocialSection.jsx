import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MOVIE_API_KEY } from '../../lib/tmdb';
import { getImage } from '../../lib/tmdb';
import ReviewCard from './ReviewCard';

// probably want to move this to the index file so i can fetch it from there
const getReviews = (movie) => {
  return `https://api.themoviedb.org/3/movie/${movie}/reviews?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
};

const getOneReview = (review) => {
  return `https://api.themoviedb.org/3/review/${review}?api_key=${MOVIE_API_KEY}`;
};

const checkFirstLetter = (string) => {
  return string.charAt(1) === 'h' || string.charAt(0) === 'h';
};

const SocialSection = ({ movieList }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieList) return;
    const temp = [];

    const fetchReviews = async () => {
      for (let i = 0; i < movieList.length; i++) {
        if (temp.length > 5) return setReviews(temp);

        const res = await fetch(getReviews(movieList[i].id));
        const data = await res.json();
        data &&
          data.results &&
          data.results[0] &&
          temp.push({
            reviewInfo: data.results[0],
            title: movieList[i].title,
            image: getImage('w1280', movieList[i].backdrop_path),
          });
      }
      setReviews(temp);
    };

    fetchReviews();
  }, [movieList]);

  return (
    <Container>
      <Header>What your friends are watching.</Header>
      <ReviewList>
        {reviews.map((review, index) => {
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
  color: white;
`;

const ReviewList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  color: white;
  gap: 60px;
`;

export default SocialSection;
