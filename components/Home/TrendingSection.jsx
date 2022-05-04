import React from 'react';
import WideMoviePoster from './WideMoviePoster';
import styled from 'styled-components';
import { getImage } from '../../lib/tmdb';

const TrendingSection = ({ movies }) => {
  return (
    <Outer>
      <TrendingHeader>Trending Movies</TrendingHeader>
      <TrendingWrapper>
        <TrendingContainer>
          <TrendingList>
            {movies.map((movie) => (
              <WideMoviePoster
                key={movie.id}
                title={movie.title}
                src={getImage('w1280', movie.backdrop_path)}
              />
            ))}
          </TrendingList>
        </TrendingContainer>
        <ArrowIcon>{'>'}</ArrowIcon>
        <TrendingGradient />
      </TrendingWrapper>
    </Outer>
  );
};

const Outer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

const TrendingWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const TrendingContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  overflow-x: scroll;
`;

const TrendingHeader = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: white;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(60px);
  right: 30px;
  z-index: 2;
  cursor: pointer;
  color: white;
`;

const TrendingGradient = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 215px;
  z-index: 1;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`;

const TrendingList = styled.div`
  display: flex;
  margin-top: 42px;
  gap: 83px;
`;

export default TrendingSection;
