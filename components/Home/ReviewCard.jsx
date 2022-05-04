import React from 'react';
import styled from 'styled-components';

const ReviewCard = ({ content, author, title, rating, avatar, backdrop }) => {
  console.log(rating);
  const trimContent =
    content.length > 123 ? content.slice(0, 123) + '...' : content;
  return (
    <ReviewContainer>
      <InfoContainer>
        <TopSection>
          <Avatar src={avatar} />
          <Details>
            <Author>{author}</Author>
            <Title>{title}</Title>
          </Details>
          <Title>{rating ? rating + '.0' : '5.2'}</Title>
        </TopSection>
        <Content>{trimContent}</Content>
      </InfoContainer>
      <Gradient />
      <BackgroundImage src={backdrop} />
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  color: white;
  font-size: 18px;
  flex: 1;
  min-width: 360px;
  height: 550px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  background: #06071a;
  cursor: pointer;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 200px;
  justify-content: center;
  bottom: 0;
  color: white;
  z-index: 3;
  font-size: 18px;
  padding: 0 36px 50px 36px;
  gap: 24px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Author = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
const Title = styled.p`
  font-size: 23px;
  font-weight: bold;
`;

const Avatar = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
`;

const Content = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  color: #b5b5b5;
`;

const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(180deg, rgba(6, 5, 30, 0) 0%, #06071a 100%);
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 80%;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  top: 0;
  height: 80%;
`;

export default ReviewCard;
