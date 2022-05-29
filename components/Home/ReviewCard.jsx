import React, { useState } from 'react'

import styled from 'styled-components'
import { ColorExtractor } from 'react-color-extractor'
import { trimContent } from '../../utils/trimContent'

const ReviewCard = ({ content, author, title, rating, avatar, backdrop }) => {
  const [color, setColor] = useState('')
  const overview = trimContent(content, 123)
  return (
    <ReviewContainer color={color}>
      <InfoContainer>
        <TopSection>
          <Avatar src={avatar} />
          <Details>
            <Author>{author}</Author>
            <Title>{title}</Title>
          </Details>
          <Title>{rating ? rating + '.0' : '5.2'}</Title>
        </TopSection>
        <Content>{overview}</Content>
      </InfoContainer>
      <BlackGradient />
      <Gradient color={color} />
      <ColorExtractor getColors={(colors) => setColor(colors[0])}>
        <img src={backdrop} style={backgroundImageStyles} />
      </ColorExtractor>
    </ReviewContainer>
  )
}

const ReviewContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.fontColor.primary};
  font-size: 18px;
  flex: 1;
  min-width: 360px;
  height: 550px;
  border-radius: 18px;
  position: relative;
  background: ${({ color }) => color};
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`

const TopSection = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  min-height: 200px;
  justify-content: center;
  bottom: 0;
  color: ${({ theme }) => theme.fontColor.primary};
  z-index: 3;
  font-size: 18px;
  padding: 0 36px 50px 36px;
  gap: 24px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
`

const Author = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor.secondary};
`
const Title = styled.p`
  font-size: 23px;
  font-weight: bold;
`

const Avatar = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
`

const Content = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  color: ${({ theme }) => theme.fontColor.secondary};
`

const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(6, 5, 30, 0) 0%,
    ${({ color }) => color} 100%
  );
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 80%;
`

const BlackGradient = styled.div`
  position: absolute;
  background: linear-gradient(180deg, rgba(6, 5, 30, 0) 0%, #000000b0 100%);
  border-radius: 16px;
  z-index: 2;
  width: 100%;
  height: 100%;
`

const backgroundImageStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  top: 0,
  height: '80%',
  borderRadius: '18px 18px 0 0 ',
}

export default ReviewCard
