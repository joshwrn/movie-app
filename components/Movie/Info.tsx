import React from 'react';
import styled from 'styled-components';
import SectionTitle from './SectionTitle';

const getTime = (runtime: number): string => {
  if (!runtime) return '';
  const hours = (runtime / 60).toString().slice(0, 1);
  let minutes = (runtime % 60).toString().slice(0, 1);
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  return hours + 'H ' + minutes + 'M';
};

const Info = ({ runtime, overview }: { runtime: number; overview: string }) => {
  const time = getTime(runtime);
  return (
    <InfoContainer>
      <RatingContainer>
        <RatingText>PG-13</RatingText>
        <RatingText>{time}</RatingText>
      </RatingContainer>
      <StoryLineContainer>
        <SectionTitle>Storyline</SectionTitle>
        <StoryLine>{overview}</StoryLine>
      </StoryLineContainer>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  gap: 60px;
  width: 100%;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  white-space: nowrap;
`;

const RatingText = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor.primary};
`;

// Storyline

const StoryLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StoryLine = styled.p`
  line-height: 30px;
  font-size: 20px;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

export default Info;
